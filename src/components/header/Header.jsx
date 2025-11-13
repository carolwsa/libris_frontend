import { useNavigate } from "react-router-dom";
import Icones from "../icones/Icones";
import logo from "../../assets/logo.png";
import Paragrafo from "../paragrafo/Paragrafo";
import perfil from "../../assets/user.png";
import style from "./Header.module.css";

const Header = ({ type }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/login");
  };

  return (
    <header>
      <Icones children={logo} type={"logo"} />

      {type === "login" ? (
        <div className={style.container}>
          <Paragrafo children={"Login"} type={"paragrafo"} />
        </div>
      ) : (
        <div className={style.container}>
          <Paragrafo children={"Minha estante"} type={"paragrafo"} />
          <div onClick={handleLogout} style={{cursor: 'pointer'}}>
            <Icones children={perfil} type={"perfil"} />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
