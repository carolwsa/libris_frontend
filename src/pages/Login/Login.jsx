import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Botao from "../../components/button/Botao";
import Label from "../../components/label/Label";
import Paragrafo from "../../components/paragrafo/Paragrafo";
import styles from "./Login.module.css";
import style from "./Login.module.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/footer";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
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

  const handleLogin = async () => {
    if (!email || !senha) {
      setErro("Preencha todos os campos!");
      return;
    }

    setLoading(true);
    setErro("");

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("usuario", JSON.stringify(data.usuario));
        navigate("/estante");
      } else {
        setErro(data.message || "Verifique suas credenciais!");
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
      <div className={styles.container}>
        <section>
          <Paragrafo type="titulo">Login</Paragrafo>

          <div className={style.div_label}>
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

          <div className={style.div_botoes}>
            <Botao type="v1" onClick={handleLogin} disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </Botao>

            <div className={style.div_cadastro}>
              <Paragrafo type="descricao">Ainda não tem uma conta?</Paragrafo>
              <Botao type={"v2"}>Cadastre-se</Botao>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Login;
