import {MenuOrderContext} from "./CreateMenuOrderContext"
import { useState, useEffect } from "react";

export function MenuOrderProvider({ children }) {
  const [orderMenu, setOrderMenu] = useState(() => {
    const saved = localStorage.getItem("orderItems");
    return saved ? JSON.parse(saved) : [];
  });
  const [show, setShow] = useState(false);
  useEffect(() => {
    localStorage.setItem("orderItems", JSON.stringify(orderMenu));;
  }, [orderMenu]);

   // Functions to open/close Offcanvas
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

    const handleOrder = (item) => {
    setOrderMenu((prev) => {
      const existing = prev.find((i) => i._id === item._id);
      if (existing) {
        return prev.map((i) =>
          i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
 handleShow();
  };
    const handleDelete = (id) => {
      setOrderMenu((prev) =>
        prev.filter((item) => {
          return item._id !== id;
        })
      );
    };
    const incrementQuntity = (id) => {
      setOrderMenu((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    };
    const deincrementQuntity = (id) => {
      setOrderMenu((prev) =>
        prev
          .map((item) =>
            item._id === id ? { ...item, quantity: item.quantity - 1 } : item
          )
          .filter((item) => item.quantity > 0)
      );
    };

    // Clear cart
  const clearCart = () => setOrderMenu([]);

    // Total price
  const total = orderMenu.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  return (
     <MenuOrderContext.Provider
      value={{
        handleOrder,
        orderMenu,
        handleDelete,
        incrementQuntity,
        deincrementQuntity,
        clearCart,
        total,
         show,
       handleShow,
        handleClose,
      }}
    >
      {children}
    </MenuOrderContext.Provider>
  );
}

