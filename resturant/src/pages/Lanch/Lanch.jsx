import {getMenu} from './../../api/menuApi';
import SharedCardMenu from "../../shared/sharedCardMenu";
import {SharedHeader} from "../../shared/SharedHeader";
import { MenuOrderContext } from "../../context/MenuOrderContext/CreateMenuOrderContext";
import { AuthContext } from "../../context/Auth/AuthContext";
import {CartOffcanvas } from "../../components";
import {handleAddOrder} from "../../utils/addOrder"
import { useContext,useCallback } from "react";
import { useTranslation } from "../../hooks/useTranslation";
import {orderByPaybom} from "../.././utils/addorderByPaymob"
export function Lanch() {
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
    const{t}=useTranslation();
    const {user}=useContext(AuthContext)
  const onAddOrder = useCallback(() => {
    handleAddOrder(orderMenu, clearCart, user);
  }, [orderMenu, clearCart, user]);
    
  return (<>
    <SharedHeader title={t("lunch")}/>
    <SharedCardMenu cbfun={async () => {
          const menuItems = await getMenu("lanch"); // getMenu should return an array
          return menuItems; // ✅ return it so SharedCardMenu receives it
        }}
        handleOrder={handleOrder}/>
        <CartOffcanvas
        show={show}
        handleClose={handleClose}
        orderItem={orderMenu}
        incrementQuantity={incrementQuntity}
        deincrementQuantity={deincrementQuntity}
        handleDelete={handleDelete}
        handleAddOrder={onAddOrder}
          handleCreateOrder={()=>orderByPaybom(orderMenu, clearCart, user)}
        total={total}
      />
      </>
  )
}
