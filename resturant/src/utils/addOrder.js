  import { toast } from "react-toastify";
  import { AddOrder } from "../api/orderApi";

  export const handleAddOrder = async (orderMenu,clearCart,user) => {
    const userID = user._id;    
    const orderItems = orderMenu.map((item) => ({
      itemId: item._id,
      quantity: item.quantity,
    }));
    const orderData = { orderItems, userID };
    try {
      await AddOrder(orderData);
      // setorderItem([]);
      clearCart();
      toast.success("Order Add Successfull");
    } catch (err) {
      toast.error("Not Vaild Order");
      console.error(err);
    }
  };