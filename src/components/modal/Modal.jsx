import styles from "./Modal.module.css";
import Botao from "../../components/button/Botao";

const Modal = ({ isOpen, onClose, livro, onDelete, onEdit }) => {
  if (!isOpen || !livro) return null;

  const handleEdit = () => {
    if (onEdit) {
      onEdit(livro);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Tem certeza que deseja excluir este livro?")) {
      try {
        const response = await fetch(
          `http://localhost:3000/livro/${livro._id}`,
          {
            method: "DELETE",
          }
        );

        console.log("Status da resposta:", response.status);

        if (response.status >= 200 && response.status < 300) {
          if (onDelete) {
            onDelete(livro._id);
          }
          onClose();
        } else {
          alert("Erro ao excluir o livro");
        }
      } catch (error) {
        alert("Erro ao excluir o livro");
        console.log(error);
      }
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      {/* .stopPropagation impede que cliques na modal fechem ela, somente cliques fora dela a fecham */}
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.content}>
          <img src={livro.img} alt={livro.titulo} className={styles.capa} />
          <div className={styles.content_mor}>
            <div className={styles.info}>
              <div className={styles.info_header}>
                <h2>{livro.titulo}</h2>
                <button className={styles.closeButton} onClick={onClose}>
                  ×
                </button>
              </div>
              <p>
                <strong>Autor:</strong> {livro.autor}
              </p>
              <p>
                <strong>Editora:</strong> {livro.editora}
              </p>
              <p>
                <strong>Data de Leitura:</strong>{" "}
                {new Date(livro.dataLeitura).toLocaleDateString("pt-BR")}
              </p>
              {livro.comentario && (
                <p>
                  <strong>Comentário:</strong> {livro.comentario}
                </p>
              )}
            </div>
            <div className={styles.container_button}>
              <Botao children={"Editar"} type={"v1"} onClick={handleEdit} />
              <Botao children={"Excluir"} type={"v3"} onClick={handleDelete} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
