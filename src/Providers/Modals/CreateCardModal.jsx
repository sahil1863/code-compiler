import { useContext } from "react";
import "./createPlaygroundModal.scss";
import { ModalContext } from "../ModalProvider";
import { v4 } from "uuid";
import { defaultCodes, PlaygroundContext } from "../PlaygroundProvider";

export const CreateCardModal = () => {
  const { closeModal, modalPayload } = useContext(ModalContext);
  const { createPlayground } = useContext(PlaygroundContext);

  const onSubmitModal = (e) => {
    e.preventDefault();
    const fileName = e.target.fileName.value;
    const language = e.target.language.value;

    const file = {
      id: v4(),
      title: fileName,
      language,
      code: defaultCodes[language],
    };
    createPlayground(modalPayload, file);
    closeModal();
  };

  return (
    <div className="modal-container">
      <form className="modal-body" onSubmit={onSubmitModal}>
        <span onClick={closeModal} className="material-symbols-outlined">
          close
        </span>
        <h1>Create New File</h1>
        <div className="item">
          <input name="fileName" placeholder="enter file details" required />
        </div>

        <div className="item">
          <select name="language" required>
            <option value="cpp">CPP</option>
            <option value="java">java</option>
            <option value="javascript">javascript</option>
            <option value="python">python</option>
          </select>

          <button type="submit">Add file</button>
        </div>
      </form>
    </div>
  );
};
