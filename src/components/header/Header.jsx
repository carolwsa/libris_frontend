import { useNavigate } from "react-router-dom";
import Icones from "../icones/Icones";
import logo from "../../assets/logo.png";
import Paragrafo from "../paragrafo/Paragrafo";
import perfil from "../../assets/user.png";
import style from "./Header.module.css";

const Header = ({ type, userId }) => {
  const navigate = useNavigate();

  const handlePerfil = () => {
    try {
      if (userId) {
        navigate(`/perfil/${userId}`);
      } else {
        console.error("ID do usuário não encontrado");
      }
    } catch (error) {
      console.error("Erro ao acessar o usuário.", error);
    }
  };

  return (
    <header>
      <Icones children={logo} type={"logo"} />

      {type === "login" ? (
        <div className={style.container} onClick={() => navigate("/login")}>
          <Paragrafo children={"Login"} type={"paragrafo"} />
        </div>
      ) : (
        <div className={style.container}>
          <div
            onClick={() => navigate("/estante")}
            style={{ cursor: "pointer" }}
          >
            <Paragrafo children={"Minha estante"} type={"paragrafo"} />
          </div>
          <div onClick={handlePerfil} style={{ cursor: "pointer" }}>
            <Icones children={perfil} type={"perfil"} />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
