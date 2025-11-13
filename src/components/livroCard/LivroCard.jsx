import Icones from "../icones/Icones";
import Paragrafo from "../paragrafo/Paragrafo";
import styles from "./LivroCard.module.css";

const LivroCard = ({ livro, onClick }) => {
  return (
    <div className={styles.card} onClick={() => onClick(livro)}>
      <Icones children={livro.img} type={"capa"} alt={livro.titulo} />
      <Paragrafo>{livro.titulo}</Paragrafo>
    </div>
  );
};

export default LivroCard;
