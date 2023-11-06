import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "../pages/Homepage";
import Errorpage from "../pages/Errorpage";
import Contact from "../pages/Contact";
import ProductsPage from "../pages/ProductsPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import AdminPage from "../pages/AdminPage";

const RoutesView = () => {
  return (
    <Routes>
      <Route path="/admin" element={<AdminPage/>}/>
      <Route path="/products" element={<ProductsPage/>}/>
      <Route path="/register" element={<RegisterPage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/contact" element={<Contact />} />
      <Route path="/" element={<Homepage />} />
      <Route path="*" element={<Errorpage />} />
      <Route />
    </Routes>
  );
};

export default RoutesView;
