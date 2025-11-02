import express, { Router } from "express";
import authorize from '../middleware/authorize.js';
import {getOrderById, createOrder, getAllOrders, deleteOrder, updateOrder,getDailyRenvenue } from'../controller/order.js';
import orderModel from "../models/order.js"
import axios from "axios";
const router=express.Router()
// Create a new order
router.post('/', createOrder);

// Get all orders
router.get('/',getAllOrders);

router.get("/:id",authorize("admin"),getOrderById)

// Delete an order
router.delete('/:id',authorize("admin"),deleteOrder);
//update an order
router.patch('/:id',authorize("admin"),updateOrder);

router.get('/report/daily-revenue', authorize('admin'),getDailyRenvenue);



router.post("/create", async (req, res) => {
  const { userID, orderItems,paymentMethod } = req.body;
console.log(orderItems);

  // Calculate totals
  let totalPrice = 0;
  const orderItemsTotal = orderItems.map((item) => {
    const price = item.price || 0;
    const totalSubPrice = price * item.quantity;
    totalPrice += totalSubPrice;

    return {
      itemId: item.itemId,
      quantity: item.quantity,
      price,
      totalSubPrice,
  }})

  // Create new order
  const order = await orderModel.create({
     userID,
    orderItems:orderItemsTotal,
    totalPrice,
    paymentMethod,
    // paymentStatus: paymentMethod === "cash" ? "cash" : "pending",
  });
try{
  // If Paymob, generate payment token
  if (paymentMethod === "paymob") {
    const authRes = await axios.post("https://accept.paymob.com/api/auth/tokens", {
      api_key: process.env.PAYMOB_API_KEY,
    });
    const token = authRes.data.token;
  
    console.log(totalPrice);
    
const orderRes = await axios.post(
      "https://accept.paymob.com/api/ecommerce/orders",
      {
        auth_token: token,
        delivery_needed: "false",
        amount_cents: Math.round(totalPrice * 100), // 💰 convert EGP → piasters
        currency: "EGP",
        items: orderItemsTotal.map((item) => ({
            name: item.itemId,
            amount_cents: Math.round(item.price * 100),
            quantity: item.quantity,
          })),
      }
    );
     const paymobOrderId = orderRes.data.id;


    const paymentRes = await axios.post(
      "https://accept.paymob.com/api/acceptance/payment_keys",
      {
        auth_token: token,
         delivery_needed: "false",
        amount_cents: Math.round(totalPrice * 100),
        order_id: paymobOrderId,
        currency: "EGP",
        // items: orderItemsTotal.map((item) => ({
        //     name: item.itemId,
        //     amount_cents: Math.round(item.price * 100),
        //     quantity: item.quantity,
        //   })),
        integration_id: Number(process.env.INTEGRATION_ID),
        billing_data: {
          first_name: "Customer",
          last_name: "Test",
          email: "test@example.com",
          phone_number: "01000000000",
          country: "EG",
           street: "Example St",
          building: "2",
           floor: "1",
            apartment: "1",
            postal_code: "12345",
            city: "Cairo",
            state: "Cairo",
            shipping_method: "PKG",
        },
        //  currency: "EGP",
        // integration_id: INTEGRATION_ID,
      }
    );
    //  const paymentToken = paymentRes.data.token;
    //   return res.json({ order, paymentToken });
//  return paymentRes.data.token;


    return res.json({ order, paymentToken: paymentRes.data.token });
  }

  // Cash payment
  // return res.json({ order });
}catch(err){
console.log(err.response?.data);

}
});













export default router;