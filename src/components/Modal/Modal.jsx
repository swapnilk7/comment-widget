/* eslint-disable react/prop-types */
import styles from "./Modal.module.css";

const Modal = ({ id, setShowDeleteModal, deleteComment }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete this comment?</p>
        <div className={styles.btnContainer}>
          <button
            className={styles.cancelbtn}
            onClick={() => setShowDeleteModal(false)}
          >
            Cancel
          </button>
          <button
            className={styles.deletebtn}
            onClick={() => {
              deleteComment(id);
              setShowDeleteModal(false);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
