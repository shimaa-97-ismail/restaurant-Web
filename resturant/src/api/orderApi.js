
import axios from "axios";

const baseUrl= `http://localhost:3000/order`
console.log(baseUrl);

export async function AddOrder(data){
    const token = localStorage.getItem("token");
  return await axios.post(`${baseUrl}`,data,{
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
 } })

}

export async function  getOrderById(id){ //*//
     const token = localStorage.getItem("token");
     return await axios.get(`${baseUrl}/${id}`,{
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
 } })
}

export async function updateOrder(orderId, updatedItems, token,totalPrice){
  try {
    const payload = {
      orderItems: updatedItems.map((item) => ({
        itemId: item.itemId._id || item.itemId,
        quantity: item.quantity,
        price: item.price,
        totalSubPrice: item.totalSubPrice

      })),
      totalPrice,
    };
    const res = await axios.patch(
      `http://localhost:3000/order/${orderId}`,
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    
    return res.data.updatedOrder;
}catch (err) {
    console.error("Error updating order:", err.response?.data || err.message);
    throw err;
  }
};