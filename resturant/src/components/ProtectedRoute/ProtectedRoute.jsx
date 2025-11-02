import { Navigate ,Outlet} from "react-router-dom";
import {Header} from "../Header/Header";
import { AuthContext } from "../../context/Auth/AuthContext";
import {  useContext } from "react";


export function ProtectedRoute() {
   const { user } = useContext(AuthContext);
 
   if (!user?.token) {
    return <Navigate to="/login" replace />;
  }
  return (
    <>
    <Header />
    <Outlet />;
    </>
  )
}












// // import { Navigate, Outlet } from 'react-router-dom';
// // import { useAuth } from '../../hooks/useAuth';
// // import { useAuth } from 'react';

// // const ProtectedRoute = () => {
// //   const { user,loading } = useAuth();
// // console.log(user,loading);
// //   if (loading) {
// //     return <div>Loading...</div>; // or a spinner
// //   }
// //   // If the user is not authenticated, redirect them to the login page.
// //   if (!user?.token) {
// //     return <Navigate to="/login" replace />;
// //   }

// //   // If the user is authenticated, render the child routes.
// //   return <Outlet />;
// // };

// // export default ProtectedRoute;