import Paragrafo from "../paragrafo/Paragrafo";
import style from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={style.footer}>
      <Paragrafo type="" children="© Ana Carolina da Silva | 2025" />
    </footer>
  );
};

export default Footer;
