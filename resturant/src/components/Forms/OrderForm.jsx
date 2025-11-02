import { getOrderById, updateOrder } from "../../api/orderApi";
import { Form, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
import { useState, useEffect } from "react";
import { useTranslation } from "../../hooks/useTranslation";

export function OrderForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(id);

  // const location = useLocation();
  // const resource = location.pathname.split("/")[2];

  const [formData, setFormData] = useState({
    orderItems: [{ itemId: "", name: "", price: 0, quantity: 1 }],
  });

  //   const [error,setError]=useState();
  const getdataById = async () => {
    console.log("here");
    try {
      const getByID = await getOrderById(id);
      console.log(getByID);

      if (getByID.status === 200) {
        setFormData(getByID.data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getdataById();
  }, []);
  // const handleChange = (e) => {
  // const { name, value } = e.target;
  //   setFormData((prevUser) => ({
  //     ...prevUser,
  //     [name]: value,
  //   }));
  // };

  // const handleUpdate=async(e)=>{
  //     e.preventDefault();
  //   const res = await updateOrderBYid(id,formData);
  //   if (res.status == 200) {
  //     navigate("/dashboard/order");
  //   }
  //   console.log(res);
  // }
  //   const handleSubmit = async(e) => {
  //    e.preventDefault();
  //     try {
  //       const res = await api.post(`orders`,formData);
  //       if (res.status == 201) {
  //         navigate("/dashboard/order");
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      orderItems: [
        ...prev.orderItems,
        { itemId: "", name: "", price: 0, quantity: 1 },
      ],
    }));
  };
  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const items = [...prev.orderItems];

      // If editing the name of the menu item
      if (name === "name") {
        items[index] = {
          ...items[index],
          itemId: {
            ...items[index].itemId,
            name: value,
          },
        };
      } else {
        // quantity or price
        items[index] = {
          ...items[index],
          [name]:
            name === "price" || name === "quantity" ? Number(value) : value,
        };
      }

      return { ...prev, orderItems: items };
    });
  };

  const removeItem = (index) => {
    setFormData((prev) => ({
      ...prev,
      orderItems: prev.orderItems.filter((_, i) => i !== index),
    }));
  };

  const calculateTotal = (items) => {
    const updatedItems = items.map((item) => ({
      ...item,
      totalSubPrice: (item.price || 0) * (item.quantity || 0),
    }));
    const totalPrice = updatedItems.reduce(
      (sum, item) => sum + item.totalSubPrice,
      0
    );

    return { updatedItems, totalPrice };
  };

  const handleOrder = async (e) => {
    e.preventDefault();
    console.log("submit");

    try {
      const { updatedItems, totalPrice } = calculateTotal(formData.orderItems);
      const token = localStorage.getItem("token");
      const updatedOrder = await updateOrder(
        formData._id,
        updatedItems,
        token,
        totalPrice
      );
      setFormData(updatedOrder); // update loc
      alert("Order updated successfully!");
      navigate("/dashboard/order");
    } catch (err) {
      console.error(err);
    }
  };
  // const res = await axios.patch(
  //   `http://localhost:3000/order/${orderId}`,
  //   payload,
  //   {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       "Content-Type": "application/json",
  //     },
  //   }
  // );

  //   console.log("Order updated:", res.data.updatedOrder);
  //   return res.data.updatedOrder;
  // } catch (err) {
  //   console.error("Error updating order:", err.response?.data || err.message);
  //   throw err;
  // }

  const { t, language } = useTranslation();
  return (
    <div
      className="container mt-5 p-4 border rounded-3 shadow-sm"
      style={{ maxWidth: "500px" }}
    >
      <h3 className="text-center mb-4">{t("addItem")}</h3>
      <Form>
        {formData.orderItems.map((item, index) => (
          <div key={index} className="mb-3 border p-2 rounded">
            <Form.Group className="mb-2">
              <Form.Label>{t("itemName")}</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={item.itemId?.name?.[language] || "No name"}
                onChange={(e) => handleItemChange(index, e)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>{t("price")}</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={item.price || ""}
                onChange={(e) => handleItemChange(index, e)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>{t("quantity")}</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                value={item.quantity || ""}
                onChange={(e) => handleItemChange(index, e)}
                required
              />
            </Form.Group>

            {formData.orderItems.length > 1 && (
              <Button variant="danger" onClick={() => removeItem(index)}>
                {t("removeItem")}
              </Button>
            )}
          </div>
        ))}

        <div style={{display:"flex" ,justifyContent:"space-between"}}>
          <Button variant="secondary" onClick={addItem} className="me-2">
            {t("addItem")}
          </Button>
          <Button type="submit" onClick={handleOrder} style={{backgroundColor:"#ffb84d"}}>
            {t("update")}
          </Button>
        </div>
      </Form>
    </div>
  );
}
