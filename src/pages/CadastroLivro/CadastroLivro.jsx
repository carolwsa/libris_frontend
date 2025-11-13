import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Botao from "../../components/button/Botao";
import Label from "../../components/label/Label";
import Paragrafo from "../../components/paragrafo/Paragrafo";
import style from "./CadastroLivro.module.css";

const CadastroLivro = () => {
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [editora, setEditora] = useState("");
  const [dataLeitura, setDataLeitura] = useState("");
  const [linkImg, setLinkImg] = useState("");
  const [comentario, setComentario] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  const handleSalvar = async () => {
    if (!titulo || !autor || !editora) {
      setErro("Preencha os campos obrigatórios: Título, Autor e Editora");
      return;
    }

    setLoading(true);
    setErro("");

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/cadastroLivro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          titulo,
          autor,
          editora,
          link_img: linkImg,
          dataLeitura,
          comentario,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/estante");
      } else {
        setErro(data.error || "Erro ao cadastrar livro");
      }
    } catch (error) {
      setErro("Erro de conexão com o servidor");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelar = () => {
    navigate("/estante");
  };

  return (
    <section className={style.livro_container}>
      <div className={style.titulo_container}>
        <Paragrafo type="titulo">Cadastro de Livros</Paragrafo>
      </div>

      <Label
        type="text"
        text="Insira o titulo do livro"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      >
        Titulo
      </Label>

      <Label
        type="text"
        text="Insira o autor do livro"
        value={autor}
        onChange={(e) => setAutor(e.target.value)}
      >
        Autor
      </Label>

      <Label
        type="text"
        text="Insira a editora do livro"
        value={editora}
        onChange={(e) => setEditora(e.target.value)}
      >
        Editora
      </Label>

      <Label
        type="date"
        value={dataLeitura}
        onChange={(e) => setDataLeitura(e.target.value)}
      >
        Data de Leitura
      </Label>

      <Label
        type="text"
        text="Insira a URL da imagem do livro"
        value={linkImg}
        onChange={(e) => setLinkImg(e.target.value)}
      >
        Imagem
      </Label>

      <div className={style.textarea_container}>
        <label>Comentário:</label>
        <textarea
          placeholder="Insira um comentário sobre o livro"
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
        />
      </div>

      {erro && <Paragrafo type="error">{erro}</Paragrafo>}

      <div className={style.botao_container}>
        <Botao type="v1" onClick={handleSalvar} disabled={loading}>
          {loading ? "Salvando..." : "Salvar"}
        </Botao>
        <Botao type="v3" onClick={handleCancelar}>
          Cancelar
        </Botao>
      </div>
    </section>
  );
};

export default CadastroLivro;
