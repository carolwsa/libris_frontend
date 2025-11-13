import style from "./Botao.module.css";

const Botao = ({ children, type, onClick, disabled }) => {
  return (
    <button
      className={
        type === "v1" ? style.b_v1 : type === "v2" ? style.b_v2 : style.b_v3
      }
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Botao;
