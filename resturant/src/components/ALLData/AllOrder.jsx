import { useEffect, useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/Auth/AuthContext";
import { OrderCard } from "../Card/OrderCard";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "../../hooks/useTranslation";

export function AllOrder() {
    const navigate=useNavigate()
  const { token } = useContext(AuthContext);
  const{t}=useTranslation()
  const [orders, setOrders] = useState([]);
  const getOrders = async (token) => {
    try {

      const res = await axios.get("http://localhost:3000/order", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setOrders(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (id) => {
  navigate(`${id}/edit`);
  };
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3000/order/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        setOrders((prevItems) => prevItems.filter((item) => item._id !== id));
        getOrders(token);
      }
    } catch (error) {
      console.error(`Error deleting :`, error);
    }
  };
  useEffect(() => {
    if (token) getOrders(token);
  }, [token]);
  //4[orders]);
  return (
  
   
  orders.length > 0 ? (
    <OrderCard
      data={orders}
      title={t("allOrders")}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  ) : (
    <p>{t("loadingorders")}...</p>
  )
)
}
