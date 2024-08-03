import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ redirectPath = "/" }) => {
  const token = Cookies.get("token");

  if (!token) {
    return <Navigate to={redirectPath} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
