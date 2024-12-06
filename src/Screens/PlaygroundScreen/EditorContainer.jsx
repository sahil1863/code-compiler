import { useState, useRef, useContext } from "react";
import "./editorContainer.scss";
import { Editor } from "@monaco-editor/react";
import { PlaygroundContext } from "../../Providers/PlaygroundProvider";
import { makeSubmission } from "./Service";

const editorOptions = {
  fontSize: 16,
  wordWrap: "on",
};

const fileExtensionMapping = {
  cpp: "cpp",
  javascript: "js",
  python: "py",
  java: "java",
};

export const EditorContainer = ({ fileId, folderId, runCode }) => {
  const { getDefaultCode, getLanguage, updateLanguage, saveCode } =
    useContext(PlaygroundContext);
  const [code, setCode] = useState(() => {
    return getDefaultCode(fileId, folderId);
  });
  const codeRef = useRef(code);
  // console.log(codeRef);

  const [language, setLanguage] = useState(() => getLanguage(fileId, folderId));
  const [theme, setTheme] = useState("vs-dark");
  // console.log({ theme }, { language });
  const [isFullScreen, setIsFullScreen] = useState(false);

  const onChangeCode = (newCode) => {
    // console.log(newCode);
    codeRef.current = newCode;
  };

  const importCode = (event) => {
    // console.log(event.target.files);
    const file = event.target.files[0];
    // const fileType = file.type.includes("text");
    const fileName = file.name;
    const fileExtension = fileName.split(".").pop();
    // console.log(fileExtension);
    const allowedExtensions = ["py", "cpp", "java", "js"];

    if (allowedExtensions.includes(fileExtension)) {
      const fileReader = new FileReader();
      fileReader.readAsText(file);
      fileReader.onload = function (value) {
        // console.log(value.target.result);
        const importedCode = value.target.result;
        setCode(importedCode);
        codeRef.current = importedCode;
        setLanguage(fileExtensionMapping[fileExtension]);
      };
    } else {
      alert("Please choose file of type .cpp/.java/.js/.py ");
    }
  };

  const exportCode = () => {
    // console.log(codeRef.current);
    const codeVal = codeRef.current?.trim(); // .trim() will remove extra spaces
    if (!codeVal) {
      alert("Please type some code to editor before exporting!");
    }
    // 1.create a blob/instant file in the memory
    const codeBlob = new Blob([codeVal], { type: "text/plain" });
    // 2. create new downloadable link with blob data
    const downloadUrl = URL.createObjectURL(codeBlob);
    // 3. create a clickable link to download the file/blob
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = `code.${fileExtensionMapping[language]}`;
    link.click();
  };

  const onChangeLanguage = (e) => {
    updateLanguage(fileId, folderId, e.target.value);
    const newCode = getDefaultCode(fileId, folderId);
    setCode(newCode);
    codeRef.current = newCode;
    setLanguage(e.target.value);
  };

  const onChangeTheme = (e) => {
    setTheme(e.target.value);
  };

  const onSaveCode = () => {
    saveCode(fileId, folderId, codeRef.current);
    alert("your code save successfully");
  };

  const fullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const onRunCode = () => {
    runCode({
      code: codeRef.current,
      language,
    });
  };

  return (
    <div
      className="root-editor-container"
      style={isFullScreen ? styles.fullScreen : {}}
    >
      <div className="editor-header">
        <div className="editor-left-container">
          {/* <b className="title">{"title of file"}</b>
          <span className="material-symbols-outlined">edit</span> */}
          <button onClick={onSaveCode}>Save Code</button>
        </div>
        <div className="editor-right-container">
          <select onChange={onChangeLanguage} value={language}>
            <option value="cpp">cpp</option>
            <option value="java">java</option>
            <option value="python">python</option>
            <option value="javascript">javascript</option>
          </select>

          <select onChange={onChangeTheme} value={theme}>
            <option value="vs-dark">vs-dark</option>
            <option value="vs-light">vs-light</option>
          </select>
        </div>
      </div>

      <div className="editor-body">
        <Editor
          height={"100%"}
          language={language}
          options={editorOptions}
          theme={theme}
          onChange={onChangeCode}
          value={code}
        />
      </div>

      <div className="editor-footer">
        <button className="btn" onClick={fullScreen}>
          <span className="material-symbols-outlined">fullscreen</span>
          <span>{isFullScreen ? "Minimize" : "FullScreen"}</span>
        </button>
        <label htmlFor="import-code" className="btn">
          <span className="material-symbols-outlined">upload_file</span>
          <span>Import Code</span>
        </label>
        <input
          type="file"
          id="import-code"
          style={{ display: "none" }}
          onChange={importCode}
        />
        <button className="btn" onClick={exportCode}>
          <span className="material-symbols-outlined">download</span>
          <span>Export Code</span>
        </button>
        <button className="btn-run" onClick={onRunCode}>
          <span className="material-symbols-outlined">play_arrow</span>
          <span>Run Code</span>
        </button>
      </div>
    </div>
  );
};

const styles = {
  fullScreen: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
  },
};
