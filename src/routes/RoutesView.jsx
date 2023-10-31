import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "../pages/Homepage";
import Errorpage from "../pages/Errorpage";
import Contact from "../pages/Contact";

const RoutesView = () => {
  return (
    <Routes>
      <Route path="/contact" element={<Contact />} />
      <Route path="/" element={<Homepage />} />
      <Route path="*" element={<Errorpage />} />
      <Route />
    </Routes>
  );
};

export default RoutesView;
