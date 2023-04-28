import { Route, Routes } from "react-router-dom";
import { CardapioPage } from "../pages/CardapioPage";
import { CartPage } from "../pages/CartPage";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPager } from "../pages/RegisterPage";
import { AdminPage } from "../pages/AdminPage";

export const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cardapio" element={<CardapioPage />} />
      <Route path="/carrinho" element={<CartPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPager />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
};
