import React from "react";
import { Routes, Route } from "react-router-dom";

import { Home, Login, Preferences, Register } from "./pages";

const AppRoutes = () => (
  <Routes>
    <Route exact path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/preferences" element={<Preferences />} />
  </Routes>
);

export default AppRoutes;
