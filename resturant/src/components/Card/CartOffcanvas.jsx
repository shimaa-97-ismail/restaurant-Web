import Offcanvas from "react-bootstrap/Offcanvas";
import {BasicButton} from "../../styledComponents"; // your button
import PropTypes from "prop-types";
import { useTranslation } from "../../hooks/useTranslation";
import styled from "styled-components";

const ResponsiveOffcanvas = styled(Offcanvas)`
  width: 400px;
  display: flex;
  flex-direction: column;


  @media (max-width: 576px) {
    width: 100%;
    /* justify-content: center; */
    /* align-items: center; */
    border-radius: 0;
    padding: 10px;
  }

   .offcanvas-body {
    padding: 1rem;
  }

  .btn {
    @media (max-width: 576px) {
      /* width: 100%; */
      margin-bottom: 0.5rem;
    } }
  
`;

// // Total heading
// const TotalText = styled.h5`
//   font-weight: 700; /* fw-bold */
// `;
export const CartOffcanvas = ({
  show,
  handleClose,
  orderItem = [],
  incrementQuantity,
  deincrementQuantity,
  handleDelete,
  handleAddOrder,
  handleCreateOrder,
total

}) => {

  const {t,language}=useTranslation();
  // const [paymentMethod,setpaymentMethod]=useState{}
  return (
    <ResponsiveOffcanvas style={{ direction: language === "ar" ? "rtl" : "ltr"}} show={show} onHide={handleClose} placement="start">
      <Offcanvas.Header  closeButton>
        <Offcanvas.Title style={{margin:"auto"}}>{t("cart")}</Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body>
        {Array.isArray(orderItem) && orderItem.length > 0 ? (
          orderItem.map((item) => (
            <div key={item._id} className="d-flex flex-column flex-md-row mt-3 align-items-start align-items-md-center gap-2">
              <div className="flex-shrink-0" style={{ width: "100%", maxWidth: "120px" }}>
                <img
                  style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "0.5rem" }}
                  src={item.img}
                  alt={item.name}
                />
              </div>
              <div className="flex-grow-1">
                <div className="d-flex justify-content-between align-items-center flex-wrap">
                  <p className="mb-1 fw-bold">{item.name[language]}</p>
                  <p className="mb-1 text-success">${item.price}</p>
                </div>

                <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                  <div className="d-flex gap-1 align-items-center">
                    <button className="btn btn-outline-dark btn-sm" onClick={() => incrementQuantity(item._id)}>+</button>
                    <button className="btn btn-outline-dark btn-sm">{item.quantity}</button>
                    <button className="btn btn-outline-dark btn-sm" onClick={() => deincrementQuantity(item._id)}>-</button>
                  </div>

                  <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(item._id)}>
                    <i className="bi bi-trash3-fill"></i>
                  </button>
                </div>

                <p className="mt-2">
                  {t("subTotal")}: <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                </p>
                <hr />
              </div>
            </div>
          ))
        ) : (
          <p>{t("yourcartisempty")}</p>
        )}

        <div className="mt-4 border-top pt-3 d-flex flex-column gap-2" style={{ direction: language === "ar" ? "rtl" : "ltr"}}>
          <h5 className="fw-bold">{t("Total")}: ${total.toFixed(2)}</h5> 
           <BasicButton   onClick={handleAddOrder} >
            {t("cash")}
            </BasicButton>
            <BasicButton className="btn " onClick={handleCreateOrder}>
        {t("antherwaypayment")} 
      </BasicButton>
         </div>

        
      {/* <div className="mt-3 mb-3">
        <label>Payment Method: </label>
        <select
          className="form-select w-25"
          value={""}
          onChange={(e) => setpaymentMethod(e.target.value)}
        >
          <option value="cash">Cash</option>
          <option value="paymob">Paymob</option>
        </select>
      </div> */}
      {/* <button className="btn btn-success" onClick={handleCreateOrder}>
        Checkout
      </button> */}
      </Offcanvas.Body>
    </ResponsiveOffcanvas>
  );
};

CartOffcanvas.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  orderItem: PropTypes.array,
  incrementQuantity: PropTypes.func,
  deincrementQuantity: PropTypes.func,
  handleDelete: PropTypes.func,
  handleAddOrder: PropTypes.func,
  total: PropTypes.number,
};


