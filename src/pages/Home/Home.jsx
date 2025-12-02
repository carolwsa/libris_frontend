import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer/footer";
import Header from "../../components/header/Header";
import style from "./Home.module.css";

const Home = () => {
  const capas = [
    "https://m.media-amazon.com/images/I/81iqH8dpjuL.jpg",
    "https://m.media-amazon.com/images/I/71+yGuF-ioL._AC_UF1000,1000_QL80_.jpg",
    "https://m.media-amazon.com/images/I/81pB+joKL4L._UF1000,1000_QL80_.jpg",
    "https://m.media-amazon.com/images/I/61MCf2k-MgS._AC_UF1000,1000_QL80_.jpg",
    "https://m.media-amazon.com/images/I/61x1ZHomWUL._AC_UF1000,1000_QL80_.jpg",
    "https://m.media-amazon.com/images/I/91jjTBqfcNL._AC_UF1000,1000_QL80_.jpg",
    "https://m.media-amazon.com/images/I/91SDZ2eUj+L._AC_UF1000,1000_QL80_.jpg",
    "https://m.media-amazon.com/images/I/81YYbscvTsL._AC_UF1000,1000_QL80_.jpg",
  ];

  const navigate = useNavigate();

  return (
    <>
      <Header type={"login"} />

      <section className={style.section1}>
        <div className={style.div_quote}>
          <blockquote className={style.quote}>
            "Sempre imaginei que o paraíso fosse uma espécie de biblioteca."
          </blockquote>
          <blockquote className={style.quote_autor}>
            — Jorge Luis Borges
          </blockquote>
        </div>
      </section>

      <section className={style.section2}>
        <h3 className={style.titulo}>
          Descubra um novo jeito de viver a leitura
        </h3>
        <p className={style.texto}>
          Organize suas leituras, explore novos títulos e mergulhe em histórias
          que transformam. Tudo de forma simples, intuitiva e inspiradora.
        </p>
      </section>

      <section className={style.carouselContainer}>
        <div className={style.carouselTrack}>
          {capas.map((capa, index) => (
            <img
              key={index}
              src={capa}
              alt={`Capa do livro ${index + 1}`}
              className={style.carouselImage}
            />
          ))}
          {capas.map((capa, index) => (
            <img
              key={`duplicate-${index}`}
              src={capa}
              alt={`Capa do livro ${index + 1}`}
              className={style.carouselImage}
            />
          ))}
        </div>
      </section>

      <section className={style.section3}>
        <button className={style.ctaButton} onClick={() => navigate("/login")}>
          Comece Agora
        </button>
      </section>

      <Footer />
    </>
  );
};

export default Home;
