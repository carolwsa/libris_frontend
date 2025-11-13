import styles from "./Modal.module.css";

const Modal = ({ isOpen, onClose, livro }) => {
  if (!isOpen || !livro) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      {/* .stopPropagation impede que cliques na modal fechem ela, somente cliques fora dela a fecham */}
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <div className={styles.content}>
          <img src={livro.img} alt={livro.titulo} className={styles.capa} />
          <div className={styles.info}>
            <h2>{livro.titulo}</h2>
            <p>
              <strong>Autor:</strong> {livro.autor}
            </p>
            <p>
              <strong>Editora:</strong> {livro.editora}
            </p>
            <p>
              <strong>Data de Leitura:</strong> {livro.dataLeitura}
            </p>
            {livro.comentario && (
              <p>
                <strong>Comentário:</strong> {livro.comentario}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
