import { useParams, useNavigate } from "react-router-dom";
import "./index.scss";
import { EditorContainer } from "./EditorContainer";
import { useCallback, useState } from "react";
import { makeSubmission } from "./Service";

export const PlaygroundScreen = () => {
  const params = useParams();
  const navigate = useNavigate();
  // console.log(params);

  const { fileId, folderId } = params;
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [showLoader, setShowLoader] = useState(false);

  const importInput = (event) => {
    const file = event.target.files[0];
    const fileType = file.type.includes("text");
    // console.log(fileType);
    if (fileType) {
      const fileReader = new FileReader();
      fileReader.readAsText(file);
      fileReader.onload = (e) => {
        // console.log(e.target.result);
        setInput(e.target.result);
      };
    } else {
      alert("Please choose a program file");
    }
  };

  const exportOutput = (e) => {
    // same like we did for export code in EditorContainer.jsx
    const outputValue = output.trim();
    if (!outputValue) {
      alert("output is empty!");
      return;
    }
    const blob = new Blob([outputValue], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `output.txt`;
    link.click();
  };

  const callback = ({ apiStatus, data, message }) => {
    if (apiStatus === "loading") {
      setShowLoader(true);
    } else if (apiStatus === "error") {
      setShowLoader(false);
      setOutput("Something went wrong");
    } else {
      setShowLoader(false);
      if (data.status.id === 3) {
        setOutput(atob(data.stdout));
      } else {
        setOutput(atob(data.stderr));
      }
    }
  };

  const runCode = useCallback(
    ({ code, language }) => {
      // console.log( code, language, input );
      makeSubmission({ code, language, callback, stdin: input });
    },
    [input]
  );

  const handleOnClick = () => {
    navigate("/");
  };

  return (
    <div className="playground-container">
      <div className="header-container">
        <img src="/logo.png" onClick={handleOnClick} />
        <h2 onClick={handleOnClick}>Budpiler</h2>
      </div>
      <div className="content-container">
        <div className="editor-container">
          <EditorContainer
            fileId={fileId}
            folderId={folderId}
            runCode={runCode}
          />
        </div>
        <div className="input-container">
          <div className="input-header">
            <b>Input:</b>
            <label htmlFor="input" className="icon-container">
              <span class="material-symbols-outlined">upload_file</span>
              <b>Import Input</b>
            </label>
            <input
              type="file"
              id="input"
              style={{ display: "none" }}
              onChange={importInput}
            />
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
          ></textarea>
        </div>
        <div className="input-container">
          <div className="input-header">
            <b>Output:</b>
            <button className="icon-container" onClick={exportOutput}>
              <span class="material-symbols-outlined">download</span>
              <b>Export Output</b>
            </button>
          </div>
          <textarea
            readOnly
            value={output}
            onChange={(e) => setOutput(e.target.value)}
          ></textarea>
        </div>
      </div>
      {showLoader && (
        <div className="fullpage-loader">
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
};