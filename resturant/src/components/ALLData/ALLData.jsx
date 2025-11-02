import { Outlet, useNavigate } from "react-router-dom";
import { deleteUser } from "../../api/userApi";
import { getALL } from "../../api/menus";
import { useEffect } from "react";
import SimpleCard from "../Card/SimpleCard";
import { useState } from "react";
import { GetEndpoint } from "./../../utils/getEndPoint";
import { OrderCard } from "../Card/OrderCard";
// import { useAuth } from "../../hooks/useAuth";
import {styled} from "styled-components"

const Container=styled.div`
    @media (max-width: 768px) {
      display: flex;
      justify-content: center;
      
    }
`
export default function ALLData() {
  // const { logout } = useAuth();
  const navigate = useNavigate();
  let endPoint = GetEndpoint();

  const [Data, setData] = useState([]);

   const Getu = async () => {
    try {
      const res = await getALL(endPoint);
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };


  const HandleDelete = async(id) => {
    try {
      const res =await deleteUser(endPoint, id);
      if (res.status === 200) {
        setData((prevItems) => prevItems.filter((item) => item._id !== id));
        Getu();
        // if (endPoint === "user") {
        //   // logout();
        // }
      }
    } catch (error) {
      console.error(`Error deleting :`, error);
    }
  };

  const handlAdd = async () => {
    navigate(`add`);
  };

  const getdataBeforeUpdate = (id) => {
    navigate(`${id}/edit`);
  };

  useEffect(() => {
    Getu()
  }, [ endPoint]);
  const translations = {
  allOrders: "جميع الطلبات",
  allUsers: "جميع المستخدمين",
  allMenus: "جميع القوائم",
  allItemMenus: "جميع عناصر القائمة"
};

  //    if (loading) return <div>Loading menu...</div>;
  // if (errors) return <div>Error: {errors}</div>;
  // if (!users) return <div>No menu data available</div>;
  // const CardComponent = endPoint === "order" ? OrderCard : SimpleCard;
  return (
    <>
    <Container >
      <SimpleCard
        data={Data}
        title={translations[`all${endPoint}s`] || `all${endPoint}s`}
        onAdd={handlAdd}
        onDelete={HandleDelete}
        onEdit={getdataBeforeUpdate}
      />

      <Outlet />
      </Container>
    </>
  );
}
// onDelete={handleDelete} onEdit={getdataBeforeUpdate} onAdd={handlAdd}
