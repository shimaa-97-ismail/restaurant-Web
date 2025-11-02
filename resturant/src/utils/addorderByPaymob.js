import axios from "axios";
import { toast } from "react-toastify";
export async function orderByPaybom(updatedItems, clearCart, user) {
  if (updatedItems <= 0) {
    toast.error("order have items");
    return;
  }
  const userID = user._id;
  const paymentMethod = "paymob";
  const orderItems = updatedItems.map((item) => ({
    itemId: item._id,
    quantity: item.quantity,
    price: item.price,
  }));
  const orderData = { orderItems, userID, paymentMethod };
  const token = localStorage.getItem("token");
  try {
    const res = await axios.post(
      "http://localhost:3000/order/create",
      orderData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  const PAYMOB_IFRAME_ID=import.meta.env.PAYMOB_IFRAME_ID
    // if (paymentMethod === "paymob") {
    const iframeUrl = `https://accept.paymob.com/api/acceptance/iframes/${PAYMOB_IFRAME_ID}?payment_token=${res.data.paymentToken}`;
    window.open(iframeUrl, "_blank");
    clearCart();
    toast.success("Order Add Successfull");
    clearCart();

    // } else {
    //   toast.success("Order created. Pay cash on delivery.");
    // }
  } catch (err) {
    toast.error("Not Vaild Order");
    console.error(err);
  }
}
