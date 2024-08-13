import { useContext } from "react";
import "./createPlaygroundModal.scss";
import { ModalContext } from "../ModalProvider";
import { PlaygroundContext } from "../PlaygroundProvider";

export const CreateFolderModal = () => {
  const modalFeatures = useContext(ModalContext);
  const { createNewFolder } = useContext(PlaygroundContext);

  const closeModal = () => {
    modalFeatures.closeModal();
  };
  const onSubmitModal = (e) => {
    e.preventDefault();
    const folderName = e.target.folderName.value;
    console.log(folderName);
    createNewFolder(folderName);
    closeModal();
  };

  return (
    <div className="modal-container">
      <form className="modal-body" onSubmit={onSubmitModal}>
        <span onClick={closeModal} className="material-symbols-outlined">
          Close
        </span>
        <h1>Create New Folder</h1>
        <div style={styles.inputContainer}>
          <input
            name="folderName"
            style={styles.input}
            placeholder="enter folder name"
          />
          <button style={styles.btn} type="submit">
            Create Folder
          </button>
        </div>
      </form>
    </div>
  );
};

export const styles = {
  inputContainer: {
    display: "flex",
    gap: 10,
  },
  input: {
    flexGrow: 1,
    padding: 10,
  },
  btn: {
    backgroundColor: "#241F21",
    border: "none",
    borderRadius: 4,
    padding: "0px 10px",
    color: "white",
    cursor: "pointer",
  },
};
