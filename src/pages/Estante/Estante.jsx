import { useState, useEffect } from "react";
import Icones from "../../components/icones/Icones";
import Paragrafo from "../../components/paragrafo/Paragrafo";
import LivroCard from "../../components/livroCard/LivroCard";
import Modal from "../../components/modal/Modal";
import add from "../../assets/add.png";
import style from "./Estante.module.css";
import { useNavigate } from "react-router-dom";

const Estante = () => {
  const [livros, setLivros] = useState([]);
  const [selectedLivro, setSelectedLivro] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:3000/meusLivros", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setLivros(Array.isArray(data.livros) ? data.livros : []))
      .catch((err) => {
        console.error(err);
        setLivros([]);
      });
  }, []);

  const handleLivroClick = (livro) => {
    setSelectedLivro(livro);
    setIsModalOpen(true);
  };

  const navigate = useNavigate();

  const handleAddClick = () => {
    navigate("/cadastroLivro");
  };

  return (
    <section className={style.container}>
      <div className={style.container_div}>
        <Paragrafo type="titulo">Meus Livros</Paragrafo>
        <Icones type="add" onClick={handleAddClick}>
          {add}
        </Icones>
      </div>

      <div className={style.estante}>
        {Array.isArray(livros) && livros.length === 0 && (
          <Paragrafo type="descricao">Nenhum livro encontrado</Paragrafo>
        )}

        {Array.isArray(livros) &&
          livros.map((livro) => (
            <LivroCard
              key={livro.id}
              livro={livro}
              onClick={handleLivroClick}
            />
          ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        livro={selectedLivro}
      />
    </section>
  );
};

export default Estante;
