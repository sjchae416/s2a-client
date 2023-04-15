import React, { useEffect, useState } from "react";

export default function Table({ tablelist, setTableList }) {
  const [sheetIndex, setSheetIndex] = useState("");
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [tableDataArray, setTableDataArray] = useState([]);
  const dummyRef = ["test1", "test2"];
   const [config, setConfig] = useState([]);

   const keys = tableDataArray[0];

  const tableData = {
    name: name,
    url: url,
    sheetIndex: sheetIndex,
    config: config
  };

  useEffect(() => {
    tableData.name = name;
    tableData.url = url;
    tableData.sheetIndex = sheetIndex;
    tableData.config = config;
  }, [name, url, sheetIndex, config]);

  const handleLoad = async () => {
    if (tableData.name && tableData.url && tableData.sheetIndex) {
      // Create the JSON object
      // console.log(tableData);
      try {
        const response = await fetch("http://localhost:3333/tables/loadtable", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(tableData),
        });
        const responseBody = await response.text(); // Read the response body as text
        // console.log(responseBody ? responseBody : "no response");
        const parsedData = JSON.parse(responseBody);
        console.log(parsedData);
        setTableDataArray(parsedData);
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Please fill out all fields before submitting");
      return;
    }
    //let test = "./" + url.toString();
    //let file = require(test);
    //keys = Object.keys(test[0]);
    // alert(keys);
    setShowTable(true);
  };

  const handleCreateClick = () => {
    // Use the config array to perform desired action with the configuration
    console.log(config);
  };

  const handleInputChange = (event, key, field) => {
    const { value, type, checked } = event.target;
    setConfig((prevConfig) => {
      const updatedConfig = [...prevConfig];
    const configIndex = updatedConfig.findIndex((item) => item.name === key); // Find index of config object with the same name as key
    if (configIndex !== -1) {
      // If config already exists, update the field value
      if (type === "radio") {
        // If radio button is clicked, update field value based on checked status
        updatedConfig[configIndex][field] = checked;

        // if (checked && (field === "label" || field === "key")) {
        //   updatedConfig.forEach((item) => {
        //     if (item.name !== key && item[field] === true) {
        //       item[field] = false;
        //     }
        //   });
        // }
      } else {
        // If not a radio button, update field value directly
        updatedConfig[configIndex][field] = value;
      }
    } else {
      // If config does not exist, create a new config object
      const newConfig = {
        name: "",
        key: "",
        label: "",
        reference: "",
        type: "",
      };
      newConfig.name = key;
      if (field === "label" || field === "key") {
        newConfig[field] = type === "radio" ? checked : value === "true";
      } else {
        newConfig[field] = value;
      }
      updatedConfig.push(newConfig);
    }
    return updatedConfig;
  });
  };

  const handleAddTable = () => {
    if (name) setTableList([...tablelist, name]);
  };
  return (
    <div
      class="card"
      style={{
        margin: "10px auto",
        width: "600px",
        maxWidth: "100%",
      }}
    >
      <div class="form-group">
        <label>Name</label>
        <input
          required
          type="text"
          class="form-control"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div class="form-group">
        <label>URL</label>
        <input
          required
          type="text"
          class="form-control"
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <div class="form-group">
        <label>Sheet Index</label>
         <input
           required
           class="form-control"
           defaultvalue="1"
           onChange={(e) => setSheetIndex(e.target.value)}
         />
      </div>
      <div class="text-right">
        <button onClick={handleLoad} class="btn btn-info">
          Load
        </button>
      </div>
      <br />
      <br />
      {showTable && (
        <div>
        <table className="table table-bordered">
          <thead>
              <tr>
              <th>Name</th>
              <th>Key</th>
              <th>Label</th>
              <th>Reference</th>
              <th>Type</th>
              </tr>
          </thead>
          <tbody>
              {keys.map((key) => (
              <tr key={key}>
                  <td>{key}</td>
                  <td>
                  <label>
                      <input
                      type="radio"
                      name={`radio-col1`}
                      value={key}
                      onChange={(event) => handleInputChange(event, key, "key")}
                      />
                  </label>
                  </td>
                  <td>
                  <label>
                      <input
                      type="radio"
                      name={`radio-col2`}
                      value={key}
                      onChange={(event) => handleInputChange(event, key, "label")}
                      />
                  </label>
                  </td>
                  <td>
                  <select
                      name={`select-${key}`}
                      onChange={(event) => handleInputChange(event, key, "reference")}
                  >
                      <option></option>
                      {dummyRef.map((ref) => (
                      <option key={ref} value={ref}>
                          {ref}
                      </option>
                      ))}
                  </select>
                  </td>
                  <td>
                  <select
                      name={`select-${key}`}
                      onChange={(event) => handleInputChange(event, key, "type")}
                  >
                      <option></option>
                      <option value="int">Number</option>
                      <option value="bool">Boolean</option>
                      <option value="string">Text</option>
                      <option value="url">URL</option>
                  </select>
                  </td>
              </tr>
              ))}
          </tbody>
          </table>
          <div className="text-right">
              <button onClick={handleCreateClick} className="btn btn-danger can_btn">Cancel</button>
          <button onClick={handleCreateClick} className="btn btn-info">Create</button>
          </div>
      </div>
      )}
      <br />
      <br />
    </div>
  );
}