import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login/Login";
import Estante from "../pages/Estante/Estante";
import CadastroLivro from "../pages/CadastroLivro/CadastroLivro";
import Header from "../components/header/Header";
import Footer from "../components/footer/footer";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/estante"
          element={
            <PrivateRoute>
              <Header />
              <Estante />
              <Footer />
            </PrivateRoute>
          }
        />
        <Route
          path="/cadastroLivro"
          element={
            <PrivateRoute>
              <Header />
              <CadastroLivro />
              <Footer />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
