import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "../pages/Homepage";
import Errorpage from "../pages/Errorpage";
import Contact from "../pages/Contact";
import ProductsPage from "../pages/ProductsPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import AdminPage from "../pages/AdminPage";
import OneProductPage from "../pages/OneProductPage";
import ConfirmMailPage from "../pages/ConfirmMailPage";
import PrivateRoutes from "../components/PrivateRoutes";
import CartPage from "../pages/CartPage";
import BuyOrdersPage from "../pages/BuyOrdersPage";
import MailRecoveryPassPage from "../pages/MailRecoveryPassPage";
import NewUserPassPage from "../pages/NewUserPassPage.";

const RoutesView = () => {
  return (
    <Routes>
      <Route
        path="/cart"
        element={
          <PrivateRoutes role={"user"}>
            <CartPage />
          </PrivateRoutes>
        }
      />
      <Route
        path="/admin"
        element={
          <PrivateRoutes role={"admin"}>
            <AdminPage />
          </PrivateRoutes>
        }
      />
      <Route
        path="/orders"
        element={
          <PrivateRoutes role={"user"}>
            <BuyOrdersPage />
          </PrivateRoutes>
        }
      />
      <Route path="/product/:id" element={<OneProductPage />} />
      <Route path="/newUserPass/:token" element={<NewUserPassPage />} />
      <Route path="/sendMailRecoveryPass" element={<MailRecoveryPassPage />} />
      <Route path="/confirm" element={<ConfirmMailPage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/" element={<Homepage />} />
      <Route path="*" element={<Errorpage />} />
      <Route />
    </Routes>
  );
};

export default RoutesView;
