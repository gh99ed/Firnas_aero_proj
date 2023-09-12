import React, { useState, useRef } from "react";
// import "./model_form.css";

// Importing the CSS

const Model_form = () => {
  const [model, setModel] = useState("tp_instancesegmentation_512px");
  const [version, setVersion] = useState("1");
  const [apiKey, setApiKey] = useState("Ozg0GjyxRm0bnzAmhK91");
  const [output, setOutput] = useState("");
  const [activeMethod, setActiveMethod] = useState("upload");
  const [activeFormat, setActiveFormat] = useState("json");
  const [fileName, setFileName] = useState("");
  const [url, setUrl] = useState("");
  const fileInputRef = useRef(null);


 

  // You can add the rest of the functions here, such as infer, getSettingsFromForm, etc.

  return (
    <form id="inputForm">
      <div className="header">
        <div className="header__grid">
          <img className="header__logo" src="https://firnas.aero/wp-content/uploads/2021/03/firnas-aero-logo.png" alt="Roboflow Inference" />
          <div>
            <label className="header__label" htmlFor="model">Model</label>
            <input className="input" type="text" id="model" value={model} onChange={e => setModel(e.target.value)} />
          </div>
          <div>
            <label className="header__label" htmlFor="version" value={version} onChange={a => setVersion(a.target.value)}>
              Version
            </label>
            <input className="input" type="number" id="version" />
          </div>
          <div>
            <label className="header__label" htmlFor="api_key">
              API Key
            </label>
            <input className="input" type="text" id="api_key" />
          </div>
        </div>
      </div>


      
      <div className="content">
  <div className="content__grid">
    <div className="col-12-s6-m4" id="method">
      <label className="input__label">Upload Method</label>
      <div>

        <button
          data-value="upload"
          id="computerButton"
          className="bttn left fill active"
        >
          Upload
        </button>
        
        <button data-value="url" id="urlButton" className="bttn right fill">
          URL
        </button>
      </div>
    </div>
    <div className="col-12-m8" id="fileSelectionContainer">
      <label className="input__label" htmlFor="file">
        Select File
      </label>
      <div className="flex">
        <input
          className="input input--left flex-1"
          type="text"
          id="fileName"
          disabled=""
        />
        <button id="fileMock" className="bttn right active">
          Browse
        </button>
      </div>
      <input style={{ display: "none" }} type="file" id="file" />
    </div>
    <div className="col-12-m8" id="urlContainer">
      <label className="input__label" htmlFor="file">
        Enter Image URL
      </label>
      <div className="flex">
        <input
          type="text"
          id="url"
          placeholder="https://path.to/your.jpg"
          className="input"
        />
        <br />
      </div>
    </div>
    <div className="col-12-m6">
      <label className="input__label" htmlFor="classes">
        Filter Classes
      </label>
      <input
        type="text"
        id="classes"
        placeholder="Enter class names"
        className="input"
      />
      <br />
      <span className="text--small">Separate names with commas</span>
    </div>
    <div className="col-6-m3 relative">
      <label className="input__label" htmlFor="confidence">
        Min Confidence
      </label>
      <div>
        <i className="fas fa-crown" />
        <span className="icon">%</span>
        <input
          type="number"
          id="confidence"
          defaultValue={50}
          max={100}
          accuracy={2}
          min={0}
          className="input input__icon"
        />
      </div>
    </div>
    <div className="col-6-m3 relative">
      <label className="input__label" htmlFor="overlap">
        Max Overlap
      </label>
      <div>
        <i className="fas fa-object-ungroup" />
        <span className="icon">%</span>
        <input
          type="number"
          id="overlap"
          defaultValue={50}
          max={100}
          accuracy={2}
          min={0}
          className="input input__icon"
        />
      </div>
    </div>
    <div className="col-6-m3" id="format">
      <label className="input__label">Inference Result</label>
      <div>
        <button
          id="imageButton"
          data-value="image"
          className="bttn left fill active"
        >
          Image
        </button>
        <button id="jsonButton" 
                data-value="json" 
                className="bttn right fill">
          JSON
        </button>
      </div>
    </div>
    <div className="col-12 content__grid" id="imageOptions">
      <div className="col-12-s6-m4" id="labels">
        <label className="input__label">Labels</label>
        <div>
          <button className="bttn left active">
            Off
          </button>
          <button data-value="on" className="bttn right">
            On
          </button>
        </div>
      </div>
      <div className="col-12-s6-m4" id="stroke">
        <label className="input__label">Stroke Width</label>
        <div>
          <button data-value={1} className="bttn left active">
            1px
          </button>
          <button data-value={2} className="bttn">
            2px
          </button>
          <button data-value={5} className="bttn">
            5px
          </button>
          <button data-value={10} className="bttn right">
            10px
          </button>
        </div>
      </div>
    </div>
    <div className="col-12">

      
      <button type="submit" value="Run Inference" className="bttn__primary">
        Run Inference
      </button>


    </div>
  </div>
  <div className="result" id="resultContainer">
    <div className="divider" />
    <div className="result__header">
      <h3 className="headline">Result</h3>
      <a href="#">Copy Code</a>
    </div>
    <pre id="output" className="codeblock">
      {" "}
      here is your json{" "}
    </pre>
  </div>
</div>

    </form>
  );
};

export default Model_form;
















