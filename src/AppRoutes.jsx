import React from "react";
import { Routes, Route } from "react-router-dom";

import { BookDetails, Home } from "./pages";

const AppRoutes = () => (
  <Routes>
    <Route exact path="/" element={<Home />} />
    <Route exact path="/search" element={<Home />} />
    <Route path="/details/:bookId" element={<BookDetails />} />
  </Routes>
);

export default AppRoutes;
