import React from "react";
import Index from "./pages/Index";
import { Route, Routes } from "react-router-dom";
import Products from "./pages/Products";
import Category from "./pages/Category";
import Billing from "./pages/Billing";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="product" element={<Products />} />
          <Route path="category" element={<Category />} />
          <Route path="billing" element={<Billing />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
