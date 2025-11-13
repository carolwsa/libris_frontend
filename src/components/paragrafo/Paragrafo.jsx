import style from "./Paragrafo.module.css";

const Paragrafo = ({ children, type }) => {
  return (
    <p
      className={
        type === "paragrafo"
          ? style.p_paragrafo
          : type === "titulo"
          ? style.p_titulo
          : type === "descricao"
          ? style.p_descricao
          : type === "error"
          ? style.p_error
          : style.p_padrao
      }
    >
      {children}
    </p>
  );
};

export default Paragrafo;
