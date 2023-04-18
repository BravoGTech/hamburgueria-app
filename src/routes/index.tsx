import { Route, Routes } from "react-router-dom";
import { CardapioPage } from "../pages/CardapioPage";
import { CartPage } from "../pages/CartPage";

export const Routers = () => {
  return (
    <Routes>
      <Route path="/cardapio" element={<CardapioPage />} />
      <Route path="/carrinho" element={<CartPage />} />
    </Routes>
  );
};
