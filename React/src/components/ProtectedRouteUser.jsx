import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRouteUser({ children }) {
  const token = localStorage.getItem("token");
  
  if (!token) {
    return <Navigate to="/user/signin" replace />;
  }
  
  return children;
}

export default ProtectedRouteUser;
