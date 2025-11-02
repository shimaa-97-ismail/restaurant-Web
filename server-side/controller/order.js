import AppError from "../config/appError.js";
import orderModel from "../models/order.js";
import MenuItem from "../models/items.js";
import mongoose from "mongoose";
function findOrderById(ID) {
  return orderModel.findOne({ _id: ID });
}
// Create a new order
async function createOrder(req, res, next) {
  try {
    const userID = req.user._id;
    const {orderItems} = req.body;
  
    // const { orderItems, userID } = req.body;
    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ error: "orderItems cannot be empty" });
    }

    if (!mongoose.Types.ObjectId.isValid(userID)) {
      return res.status(400).json({ error: "Invalid userID" });
    }

    for (const item of orderItems) {
  
      if (!mongoose.Types.ObjectId.isValid(item.itemId)) {
        return res.status(400).json({ error: `Invalid itemId ${item.itemId}` });
      }

      const menuItem = await MenuItem.findById(item.itemId);
      if (!menuItem)
        return res
          .status(404)
          .json({ error: `MenuItem ${item.itemId} not found` });
    }

    const order = new orderModel({ userID, orderItems });
   

    if (!order) {
      throw new AppError("Order data is required", 400);
    }
    const savedOrder = await order.save();
  

    // const ordersInDb = await orderModel.find();
    // console.log("All orders in DB:", ordersInDb);
    res.status(201).json({ success: true, savedOrder });
  } catch (err) {
    console.log(err.message);

    next(err);
  }
}

//order by online
export const updateOrderAndPay = async (req, res) => {
  try {
    const { orderId, updatedItems } = req.body;

    // 1️⃣ Recalculate totals
    const order = await orderModel.findById(orderId).populate("orderItems.itemId");
    if (!order) return res.status(404).json({ error: "Order not found" });

    let totalPrice = 0;

    const orderItems = updatedItems.map((item) => {
      const price = item.price || item.itemId.price || 0;
      const totalSubPrice = price * item.quantity;
      totalPrice += totalSubPrice;

      return {
        itemId: item.itemId._id || item.itemId,
        quantity: item.quantity,
        price,
        totalSubPrice,
      };
    });

    order.orderItems = orderItems;
    order.totalPrice = totalPrice;
    await order.save();

    // 2️⃣ Create Paymob payment token
    const apiKey = process.env.PAYMOB_API_KEY;

    // Auth token
    const authRes = await axios.post("https://accept.paymob.com/api/auth/tokens", {
      api_key: apiKey,
    });
    const token = authRes.data.token;

    // Create Paymob order
    const paymobOrderRes = await axios.post(
      "https://accept.paymob.com/api/ecommerce/orders",
      {
        auth_token: token,
        delivery_needed: "false",
        amount_cents: totalPrice * 100,
        currency: "EGP",
        merchant_order_id: order._id,
        items: orderItems.map((item) => ({
          name: item.itemId.name.en || item.itemId.name || "Item",
          amount_cents: item.price * 100,
          quantity: item.quantity,
        })),
      }
    );

    const paymobOrderId = paymobOrderRes.data.id;

    // Request payment key
    const paymentRes = await axios.post(
      "https://accept.paymob.com/api/acceptance/payment_keys",
      {
        auth_token: token,
        amount_cents: totalPrice * 100,
        expiration: 3600,
        order_id: paymobOrderId,
        billing_data: {
          first_name: "Customer",
          last_name: "Test",
          email: "test@example.com",
          phone_number: "01000000000",
          country: "EG",
        },
        currency: "EGP",
        integration_id: Number(process.env.PAYMOB_INTEGRATION_ID),
      }
    );

    const paymentToken = paymentRes.data.token;

    res.json({ order, paymentToken });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Failed to update order or create payment" });
  }
};



// Get all orders
async function getAllOrders(req, res, next) {
  try {
    console.log("from order");

    const orders = await orderModel.find()
    .populate('orderItems.itemId', 'name price')
    .populate("userID","userName")
    .sort({ createdAt: -1 });
  
    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
}
// async function getAllOrders(req, res, next) {
//   try {
//      console.log("test order");

//     // Calculate start of today
//     const today = new Date();
//     today.setHours(0, 0, 0, 0); // midnight today

//     // Get all orders created after midnight (today)
//     const orders = await orderModel
//       .find({ createdAt: { $gte: today } })
//       .populate('orderItems.itemId', 'name price')
//       .populate('userID', 'userName')
//       .sort({ createdAt: -1 });
//       console.log(orders);

// // console.log("get or);
//     res.status(200).json(orders);
//   } catch (err) {
//     next(err);
//   }
// }
// Delete an order
async function deleteOrder(req, res, next) {
  try {
    const id = req.params.id;
    if (!id) {
      throw new AppError("ID is required", 400);
    }
    const deletedOrder = findOrderById(id);
    if (!deletedOrder) {
      throw new AppError("Order not found", 404);
    }
    await orderModel.deleteOne({ _id: req.params.id });
    res.status(200).json({ id: id });
  } catch (err) {
    next(err);
  }
}
//update an order
async function updateOrder(req, res, next) {
  try {
    console.log(req.body);
    
    const id = req.params.id;
    if (!id) {
      throw new AppError("ID is required", 400);
    }
    const updatedOrder = findOrderById(id);
    if (!updatedOrder) {
      throw new AppError("Order not found", 404);
    }
    await orderModel.updateOne(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({ id: id });
  } catch (err) {
    next(err);
  }
}

const getDailyRenvenue = async (req, res, next) => {
  try {
    const revenue = await orderModel.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          totalRevenue: { $sum: "$totalPrice" },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    res.status(200).json(revenue);
  } catch (err) {
    next(err);
  }
};

const getOrderById=async(req,res,next)=>{
   try {
    const { id } = req.params;
    if (!id) {
      throw new AppError("ID is required", 400);
    }
    const orderfound = await orderModel.findOne({ _id: id }).populate("orderItems.itemId");
   
    
    if (!orderfound) {
      throw new AppError("order not found", 404);
    }
    res.status(200).json({ data: orderfound });
  } catch (err) {
    console.log(err);
    next(err);
  }
}
export {
  createOrder,
  getAllOrders,
  deleteOrder,
  updateOrder,
  getDailyRenvenue,
  getOrderById
};
