import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../page/Home/Home";
import Menu from "../page/Produtos/Menu";
import CartPage from "../page/CartPage";
import NotFound from "../page/NotFound/NotFound";

const AppRoutes = ({
  cart,
  updateQuantity,
  removeFromCart,
  addToCart, // aqui
}) => {
  return (
    <Routes>
      <Route path="/" element={<Home cart={cart} addToCart={addToCart} />} />
      <Route
        path="/menu"
        element={<Menu addToCart={addToCart} cart={cart} />}
      />
      <Route
        path="/carrinho"
        element={
          <CartPage
            cart={cart}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
            addToCart={addToCart}
          />
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
