import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const auth = useSelector((state) => state.user.auth);
  const location = useLocation();

  if (!auth) {
    // Redirect to /user or login page, preserving current location for after-login redirect
    return <Navigate to="/user" state={{ from: location }} replace />;
  }

  // If authenticated, render children components
  return children;
};

export default PrivateRoute;
