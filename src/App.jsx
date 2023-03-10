import React from "react";
import { BrowserRouter } from "react-router-dom";

import AppRoutes from "./AppRoutes";
import Navbar from "./components/Navbar";

const App = () => (
  <BrowserRouter>
    <Navbar />

    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <AppRoutes />
    </div>
  </BrowserRouter>
);

export default App;
