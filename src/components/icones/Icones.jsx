import style from "./Icones.module.css";

const Icones = ({ children, type, onClick }) => {
  return (
    <img
      src={children}
      className={
        type === "logo"
          ? style.img_logo
          : type === "perfil"
          ? style.img_perfil
          : type === "capa"
          ? style.img_capa
          : style.img_add
      }
      onClick={onClick}
    ></img>
  );
};

export default Icones;
