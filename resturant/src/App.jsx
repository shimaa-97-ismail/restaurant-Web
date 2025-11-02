import "./App.css";
import { MainLayout } from "./layout/MainLayout";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from "./hooks/useTranslation";
import ChatBot from "./components/ChatBot/ChatBot";
function App() {
   const {  language } =useTranslation();
  return (
    <>
    <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        draggable
      />
      <ChatBot/>
        <MainLayout style={{ direction: language === "ar" ? "rtl" : "ltr"}} />
     </>
  );
}

export default App;
