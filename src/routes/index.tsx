import { Route, Routes } from "react-router-dom";
import { CardapioPage } from "../pages/CardapioPage";

export const Routers = () => {
  return (
    <Routes>
      <Route path="/cardapio" element={<CardapioPage />} />
    </Routes>
  );
};
