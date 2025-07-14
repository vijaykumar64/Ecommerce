import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const auth = useSelector((state) => state.user.auth);
  const location = useLocation();

  if (!auth) {
  
    return <Navigate to="/user" state={{ from: location }} replace />;
  }

  
  return children;
};

export default PrivateRoute;
