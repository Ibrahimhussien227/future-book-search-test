import React from "react";
import { Routes, Route } from "react-router-dom";

import { Home, Login, Register } from "./pages";

const AppRoutes = () => (
  <Routes>
    <Route exact path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
  </Routes>
);

export default AppRoutes;
