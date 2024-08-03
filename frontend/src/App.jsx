import React from "react";
import Login from "./components/user/Login";
import { Routes, Route, useLocation } from "react-router-dom";
import Product from "./components/user/Product";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import PublicRoute from "./components/routes/PublicRoute";
import EditProduct from "./components/manager/EditProduct";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./components/user/Sidebar";
import Users from "./components/admin/Users";
import EditUser from "./components/admin/EditUser";
import AddProduct from "./components/manager/AddProduct";

const App = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  return (
    <div>
      {!isLoginPage && <Sidebar />}
      <ToastContainer />
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Login />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/product" element={<Product />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/manager/product/:id" element={<EditProduct />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/manager/product/new" element={<AddProduct />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/admin/users" element={<Users />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/admin/user/:id" element={<EditUser />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
