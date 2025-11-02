import { Routes, Route, BrowserRouter, useLocation } from "react-router-dom";
import { Header, UserForm } from "../components";
import { Login, Home, Beakfast, Dinner, Lanch, Dashboard } from "../pages";
import { OrderForm } from "../components/Forms/OrderForm";
// import { ProtectedRoute } from "../components/ProtectedRoute/ProtectedRoute";
import ALLData from "../components/ALLData/ALLData";
import SimpleForm from "./../components/Forms/SimpleForm";
import { AllOrder } from './../components/ALLData/AllOrder';

export function MainLayout() {
  const location = useLocation();
  const hideHeaderPaths = ["/login"];
  const shouldShowHeader = !hideHeaderPaths.includes(location.pathname);
  return (
    <>
      {shouldShowHeader && <Header />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/breakfast" element={<Beakfast />} />
        <Route path="/dinner" element={<Dinner />} />
        <Route path="/lanch" element={<Lanch />} />
        <Route path="/dashboard" element={<Dashboard />}>
          {/* user */}
          <Route path="user" element={<ALLData />} />
          <Route path="user/add" element={<UserForm />} />
          <Route path="user/:id/edit" element={<UserForm />} />

          {/* menu */}
          <Route path="menu" element={<ALLData />} />
          <Route path="menu/:id/edit" element={<SimpleForm />} />
          <Route path="menu/add" element={<SimpleForm />} />
          {/* //menuitem */}
          <Route path="menuItem" element={<ALLData />} />
          <Route path="menuItem/:id/edit" element={<SimpleForm />} />
          <Route path="menuItem/add" element={<SimpleForm />} />
          {/* //order */}
          <Route path="order" element={<AllOrder />} />
          <Route path="order/:id/edit" element={<OrderForm />} />
          {/* <Route path="order/add" element={<OrderForm />} /> */}
        </Route>
        {/* </Route> */}
      </Routes>
    </>
  );
}
