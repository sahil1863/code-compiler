import { useContext } from "react";
import "./createPlaygroundModal.scss";
import { ModalContext } from "../ModalProvider";
import { PlaygroundContext } from "../PlaygroundProvider";
import { styles } from "./CreateFolderModal";

export const UpdateFolderTitleModal = () => {
  const { closeModal, modalPayload } = useContext(ModalContext);
  const { editFolderTitle } = useContext(PlaygroundContext);

  const onSubmitModal = (e) => {
    e.preventDefault();
    const folderName = e.target.folderName.value;
    editFolderTitle(folderName, modalPayload);
    closeModal();
  };

  return (
    <div className="modal-container">
      <form className="modal-body" onSubmit={onSubmitModal}>
        <span className="material-symbols-outlined" onClick={closeModal}>
          close
        </span>
        <h1>Update folder title</h1>
        <div style={styles.inputContainer}>
          <input
            required
            name="folderName"
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
