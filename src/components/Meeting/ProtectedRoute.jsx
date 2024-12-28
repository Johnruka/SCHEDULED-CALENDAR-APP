import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./auth"; 
const ProtectedRoute = ({ element: Component, ...props }) => {
  return isAuthenticated() ? <Component {...props} /> : <Navigate to="/Login" />;
};

export default ProtectedRoute;