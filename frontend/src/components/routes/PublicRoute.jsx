import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const PublicRoute = ({ redirectPath = "/product" }) => {
  const token = Cookies.get("token");

  if (token) {
    return <Navigate to={redirectPath} />;
  }

  return <Outlet />;
};

export default PublicRoute;
