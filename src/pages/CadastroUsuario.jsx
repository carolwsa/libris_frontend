import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Login/Login.module.css";
import Paragrafo from "../components/paragrafo/Paragrafo";
import Header from "../components/header/Header";
import Label from "../components/label/Label";
import Botao from "../components/button/Botao";
import Footer from "../components/footer/footer";

const CadastroUsuario = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (erro) {
      const timer = setTimeout(() => {
        setErro("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [erro]);

  const handleCancelar = () => {
    navigate("/login");
  };

  const handleCadastrar = async () => {
    if (!email || !senha || !nome) {
      setErro("Preencha todos os campos!");
      return;
    }

    setLoading(true);
    setErro("");

    try {
      const response = await fetch("http://localhost:3000/cadastro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, senha, email }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/login");
      } else {
        setErro(data.message || "Erro ao cadastrar usuário!");
      }
    } catch (error) {
      setErro("Erro de conexão com o servidor");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header type="login" />
      <div className={style.container}>
        <section>
          <Paragrafo type="titulo">Cadastro</Paragrafo>

          <div className={style.div_label}>
            <Label
              type="text"
              text="Digite seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            >
              Nome
            </Label>

            <Label
              type="email"
              text="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            >
              Email
            </Label>

            <Label
              type="password"
              text="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            >
              Senha
            </Label>
          </div>

          {erro && (
            <Paragrafo type="error" style={{ color: "red" }}>
              {erro}
            </Paragrafo>
          )}

          <div className={style.div_botoes_cadastro}>
            <Botao type="v1" onClick={handleCadastrar} disabled={loading}>
              {loading ? "Salvando..." : "Salvar"}
            </Botao>
            <Botao type={"v3"} onClick={handleCancelar}>
              Cancelar
            </Botao>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default CadastroUsuario;
