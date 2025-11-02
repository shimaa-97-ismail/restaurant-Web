import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/create-order", async (req, res) => {
  try {
    const { amount, orderId } = req.body; // amount in EGP * 100
    console.log(amount);
    
    const apiKey = process.env.PAYMOB_API_KEY;

    // Step 1: Get auth token
    const authRes = await axios.post("https://accept.paymob.com/api/auth/tokens", {
      api_key: apiKey},
     { headers: { "Content-Type": "application/json" }
    });
    const token = authRes.data.token;

    // Step 2: Create order in Paymob
    const orderRes = await axios.post(
      "https://accept.paymob.com/api/ecommerce/orders",
      {
        auth_token: token,
        delivery_needed: "false",
        amount_cents: amount,//amount * 100,
        currency: "EGP",
        merchant_order_id: orderId,
        items: [],
      },
       { headers: { "Content-Type": "application/json" } }
    );

    const paymobOrderId = orderRes.data.id;

    // Step 3: Request payment key
    const paymentRes = await axios.post(
      "https://accept.paymob.com/api/acceptance/payment_keys",
      {
        auth_token: token,
        amount_cents: amount,
        expiration: 3600,
        order_id: paymobOrderId,
        billing_data: {
          first_name: "Customer",
          last_name: "Test",
          email: "test@example.com",
          phone_number: "01000000000",
          country: "EG",
           building: "1",            
          floor: "1",               
          apartment: "101",
        },
        currency: "EGP",
        integration_id: Number(process.env.PAYMOB_INTEGRATION_ID),
      },
      { headers: { "Content-Type": "application/json" } }
    );

    const paymentToken = paymentRes.data.token;

    res.json({ paymentToken });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Failed to create payment" });
  }
});

export default router;
