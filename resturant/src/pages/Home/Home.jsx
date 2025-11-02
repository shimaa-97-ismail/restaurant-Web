import { useEffect, useState, useContext, useCallback } from "react";
import { Slider } from "../../components";
// import { getALL } from "./../../api/menuApi";
import { MyCard, Header, CartOffcanvas } from "../../components";
import { handleAddOrder } from "../../utils/addOrder";
import { MenuOrderContext } from "../../context/MenuOrderContext/CreateMenuOrderContext";
import { AuthContext } from "../../context/Auth/AuthContext";
import { LangContext } from "../../context/Language/LanguageContext";
import axios from "axios";
import {orderByPaybom} from "../.././utils/addorderByPaymob";
import styled from "styled-components";
//  style={{ direction: language === "ar" ? "rtl" : "ltr" }}
//             class="d-flex flex-wrap justify-content-between gap-5  m-5 
const Container=styled.section`
display:flex;
flex-wrap:wrap;
justify-content:space-between;
gap: 3rem;
margin: 3rem;
 @media (max-width: 480px) {
    justify-content:center !important;
   
  }
`
export function Home() {
  const {
    handleOrder,
    show,
    handleClose,
    orderMenu,
    handleDelete,
    incrementQuntity,
    deincrementQuntity,
    clearCart,
    total,
  } = useContext(MenuOrderContext);
  const { user } = useContext(AuthContext);
  const { language  } = useContext(LangContext);
  // console.log(user);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  //get all menu items
  // const allMenuItems = async () => {
  //   try {
  //     const res = await getALL();
  //     setLoading(false);
  //     setMenuItems(res.data);
  //   } catch (err) {
  //     throw new Error("Failed to fetch menu items", err);
  //   }
  // };

  // useEffect(() => {
  //   allMenuItems();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try{
  const token=localStorage.getItem("token");
   
  const res= await axios
        .get("http://localhost:3000/menuItem", {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept-Language": language,
          },
        })
         setLoading(false);
        setMenuItems(res.data)
      }catch(err){
        console.log(err);
        
      }

    }
    
    fetchData()
  }, [language]);
const checkoutByPaybom=useCallback(()=>{
  orderByPaybom(orderMenu, clearCart, user)
},[orderMenu, clearCart, user])

  const onAddOrder = useCallback(() => {
    handleAddOrder(orderMenu, clearCart, user);
  }, [orderMenu, clearCart, user]);
  return (
    <>
      {loading ? (
        <h2>Loading......</h2>
      ) : (
        <>
          <Header />
          <Slider />
          <CartOffcanvas
            show={show}
            handleClose={handleClose}
            orderItem={orderMenu}
            incrementQuantity={incrementQuntity}
            deincrementQuantity={deincrementQuntity}
            handleDelete={handleDelete}
            handleAddOrder={onAddOrder}
            handleCreateOrder={checkoutByPaybom}
            total={total}
          />

          <Container
            style={{ direction: language === "ar" ? "rtl" : "ltr" }}
            // class="d-flex flex-wrap justify-content-between gap-5  m-5 "
          >
            {menuItems.length>0&&menuItems.map((item) => {
              return <MyCard key={item._id} item={item} onShow={handleOrder} />;
            })}
          </Container>
        </>
      )}
    </>
  );
}

// onDelete={handleDeleteItem}
// onUpdate={editItem}
