import { useContext } from "react";
import "./createPlaygroundModal.scss";
import { ModalContext } from "../ModalProvider";
import { styles } from "./CreateFolderModal";
import { PlaygroundContext } from "../PlaygroundProvider";

export const UpdateFileTitleModal = () => {
  const { closeModal, modalPayload } = useContext(ModalContext);
  const { editFileTitle } = useContext(PlaygroundContext);

  const onSubmitModal = (e) => {
    e.preventDefault();
    const fileName = e.target.fileName.value;
    editFileTitle(fileName, modalPayload.folderId, modalPayload.fileId);
    closeModal();
  };

  return (
    <div className="modal-container">
      <form className="modal-body" onSubmit={onSubmitModal}>
        <span className="material-symbols-outlined" onClick={closeModal}>
          close
        </span>
        <h1>Update file title</h1>
        <div style={styles.inputContainer}>
          <input
            required
            name="fileName"
            style={styles.input}
            placeholder="Enter Folder Name"
          />
          <button style={styles.btn} type="submit">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};
