import { useTranslation } from "../hooks/useTranslation";
export  function SharedHeader({title}) {
  const{language} =useTranslation();
  return (
    <div className='m-4  mt-5 pt-3 ps-5 pe-5' style={{ direction: language === "ar" ? "rtl" : "ltr" }} >
        <h3 style={{color:"#d08729",fontSize:"3rem",textDecoration:"underline", textAlign:"center"}}>{title}</h3>
    </div>
  )
}
