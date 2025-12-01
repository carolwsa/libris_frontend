import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Botao from "../components/button/Botao";
import Label from "../components/label/Label";
import Paragrafo from "../components/paragrafo/Paragrafo";
import style from "./CadastroLivro/CadastroLivro.module.css";

const PerfilUsuario = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:3000/perfil/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setEmail(data.usuario.email);
        setNome(data.usuario.nome);
        setSenha(data.usuario.senha);
      })
      .catch((err) => {
        console.error(err);
        setErro("Erro ao carregar dados do perfil");
      });
  }, [id]);

  const handleSalvar = async () => {
    if (!nome || !email) {
      setErro("Preencha os campos obrigatórios: Nome e Email");
      return;
    }

    setLoading(true);
    setErro("");

    try {
      const token = localStorage.getItem("token");
      const body = { nome, email };

      if (senha) {
        body.senha = senha;
      }

      const response = await fetch(`http://localhost:3000/perfil/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Perfil atualizado com sucesso!");
        setSenha("");
      } else {
        setErro(data.error || "Erro ao atualizar perfil");
      }
    } catch (error) {
      setErro("Erro de conexão com o servidor");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <section className={style.livro_container}>
      <div className={style.titulo_container}>
        <Paragrafo type="titulo">Perfil do Usuário</Paragrafo>
      </div>

      <Label type="text" value={nome} onChange={(e) => setNome(e.target.value)}>
        Nome
      </Label>

      <Label
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      >
        Email
      </Label>

      <Label
        type="text"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      >
        Senha
      </Label>

      {erro && <Paragrafo type="error">{erro}</Paragrafo>}

      <div className={style.botao_container}>
        <Botao type="v1" onClick={handleSalvar} disabled={loading}>
          {loading ? "Salvando..." : "Salvar"}
        </Botao>
        <Botao type="v3" onClick={handleLogout}>
          Logout
        </Botao>
      </div>
    </section>
  );
};

export default PerfilUsuario;
