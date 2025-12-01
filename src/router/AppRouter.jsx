import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login/Login";
import Estante from "../pages/Estante/Estante";
import CadastroLivro from "../pages/CadastroLivro/CadastroLivro";
import EditarLivro from "../pages/EditarLivro";
import PerfilUsuario from "../pages/PerfilUsuario";
import Header from "../components/header/Header";
import Footer from "../components/footer/footer";
import CadastroUsuario from "../pages/CadastroUsuario";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastroUsuario" element={<CadastroUsuario />} />
        <Route
          path="/estante"
          element={
            <PrivateRoute>
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
        <Route
          path="/editarLivro/:id"
          element={
            <PrivateRoute>
              <Header />
              <EditarLivro />
              <Footer />
            </PrivateRoute>
          }
        />
        <Route
          path="/perfil/:id"
          element={
            <PrivateRoute>
              <Header />
              <PerfilUsuario />
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
