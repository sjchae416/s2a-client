import React, { useEffect, useState } from "react";
import {
  createTableAPI,
  deleteTableAPI,
  loadSheetAPI,
  updateTableAPI,
  updateUserAPI,
} from "../api";
import SelectedTableConfig from "./SelectedTableConfig";

export default function TableConfig({
  user,
  setUser,
  tableIds,
  userTables,
  selectedTable,
  setSelectedTable,
  addTable,
  setTables,
}) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [sheetIndex, setSheetIndex] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [tableDataArray, setTableDataArray] = useState([]);
  const [config, setConfig] = useState([]);
  const [keys, setKeys] = useState([]);
  const [showSelectedTable, setShowSelectedTable] = useState(false);

  useEffect(() => {
    if (selectedTable !== null) {
      setShowSelectedTable(true);
      setName(selectedTable.name);
      setUrl(selectedTable.url);
      setSheetIndex(selectedTable.sheetIndex);
      setKeys(selectedTable.columns);
      setShowTable(false);
    } else {
      // setName("");
      // setUrl("");
      // setSheetIndex("");
    }
  }, [selectedTable]);

  const clearForms = () => {
    setSheetIndex("");
    setName("");
    setUrl("");
    setShowTable(false);
    setTableDataArray([]);
    setConfig([]);
    setKeys([]);
    setSelectedTable(null);
  };

  useEffect(() => {
    clearForms();
    setShowSelectedTable(false);
  }, [addTable]);

  const isTypeColumnValid = () => {
    for (let i = 0; i < config.length; i++) {
      if (!config[i].type || config[i].type === "") {
        return false;
      }
    }
    return true;
  };

  const isKeyChosen = () => {
    for (let i = 0; i < config.length; i++) {
      if (config[i].key) {
        return true;
      }
    }
    return false;
  };

  const isNameUnique = () => {
    for (let i = 0; i < userTables?.length; i++) {
      if (userTables[i]?.name === name) {
        return false;
      }
    }
    return true;
  };

  const tableData = {
    name: name,
    url: url,
    sheetIndex: sheetIndex,
    config: config,
  };

  useEffect(() => {
    if (tableDataArray.length > 0) {
      setKeys(tableDataArray[0]);
    }
  }, [tableDataArray]);

  useEffect(() => {
    tableData.name = name;
    tableData.url = url;
    tableData.sheetIndex = sheetIndex;
    tableData.config = config;
  }, [name, url, sheetIndex, config]);

  // Comment this out for table to load on first click, but it will not check for config consistency on first click.
  useEffect(() => {
    if (config.length > 0) {
      // setShowTable(true);
    }
  }, [config]);

  useEffect(() => {
    if (keys.length > 0) {
      setConfig(
        keys.map((key) => ({
          name: key,
          key: false,
          label: false,
          reference: "false",
          type: "string",
          initialValue: "",
        }))
      );
    }
  }, [keys]);

  const handleLoad = async () => {
    if (tableData.name && tableData.url && tableData.sheetIndex) {
      if (selectedTable) {
        return setShowTable(true);
      }
      // if (!isNameUnique()) {
      //   alert(
      //     "This table name already exists. Please choose a different name."
      //   );
      //   return;
      // }
      const sheetData = {
        url: tableData.url,
        sheetIndex: tableData.sheetIndex,
      };
      const tableRows = await loadSheetAPI(sheetData);
      if (tableRows && !tableRows.error) {
        console.log(tableRows);
        setTableDataArray(tableRows);
        setShowTable(true);
      } else {
        const errorMessage =
          tableRows && tableRows.message
            ? tableRows.message
            : "Error loading table. Please check your URL and sheet index.";
        alert(errorMessage);
        return;
      }
    } else {
      alert("Please fill out all fields before submitting");
      return;
    }
  };

  const handleCreateClick = async () => {
    // Use the config array to perform desired action with the configuration
    // console.log(config);
    // console.log(tableData);
    if (!isTypeColumnValid()) {
      alert("Please select a type for all rows");
      return;
    }

    if (!isKeyChosen()) {
      alert("Please choose a key for at least one row");
      return;
    }

    if(!validInitialValue()){
      alert("Please enter a valid Google Sheets forumla");
      return;
    }

    console.log("tableData", tableData);
    const createdTable = await createTableAPI(tableData);
    if (createdTable && !createdTable.error) {
      // console.log(createdTable);
      alert("Table created successfully");
    } else {
      const errorMessage =
        createdTable && createdTable.message
          ? createdTable.message
          : "Error creating table.";
      alert(errorMessage);
      return;
    }

    console.log(config);

    function validInitialValue(){
      for(let i  = 0; i < config.length; i++){
        console.log(config[i].initialValue);
        if ( config[i].initialValue !== "" && config[i].initialValue !== "=ADDED_BY();") {
          if (config[i].initialValue.charAt(0) !== "=") {
            return false;
          }
          else{
            // TODO check if it is a valid google sheets formula
          }
        }
      }
      return true;
    }

    const newTableIds =
      tableIds === null ? [createdTable._id] : [...tableIds, createdTable._id];
    const update = { tables: newTableIds };
    const updatedUser = await updateUserAPI(user._id, update);

    setUser(updatedUser);
    clearForms();
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

          if (field === "label" || field === "key") {
            updatedConfig.forEach((item) => {
              if (item.name !== key) {
                item[field] = false;
              }
            });
          }
        } else if (field === "reference") {
          // if it is a reference, store the table
          if (value === "none") updatedConfig[configIndex][field] = value;
          else {
            // const table = userTables?.find(
            //   (item) => item?._id === event.target.value
            // );
            updatedConfig[configIndex][field] = event.target.value;
          }
        } 
        else {
          // If not a radio button, update field value directly
          updatedConfig[configIndex][field] = value;
        }
      } else {
        // If config does not exist, create a new config object
        const newConfig = {
          name: "",
          key: false,
          label: false,
          reference: "none",
          type: "string",
          initialValue: "",
        };
        newConfig.name = key;
        if (field === "label" || field === "key") {
          newConfig[field] = type === "radio" ? checked : value === "true";
        } else {
          newConfig[field] = value;
        }
        updatedConfig.push(newConfig);
        console.log(updatedConfig);
      }

      return updatedConfig;
    });
  };

  const handleUpdateConfig = (event, key, field) => {
    const result = config.map((item) => item.name);
    const { value, type, name, checked } = event.target;

    if (field === "key") {
      result.forEach((item) => {
        if (item._id === value) {
          item.key = checked;
        } else {
          item.key = false;
        }
      });
    } else if (field === "label") {
      result.forEach((item) => {
        if (item._id === value) {
          item.label = checked;
        } else {
          item.label = false;
        }
      });
    } else if (field === "reference") {
      result.forEach((item) => {
        if (item._id === name) {
          item.reference = value === "None" ? "false" : value;
        }
      });
    } else if (field === "type") {
      result.forEach((item) => {
        if (item._id === name) {
          item.type = value;
        }
      });
    } else if (field === "initialValue") {
      result.forEach((item) => {
        if (item._id === key._id) {
          item.initialValue = value;
        }
      });
    }

    setKeys(result);
  };

  const handleCancelClick = () => {
    setName("");
    setUrl("");
    setSheetIndex("");
    setShowTable(false);
  };

  const handleDeleteTable = async (user, selectedTableId) => {
    try {
      const result = await deleteTableAPI(selectedTableId);

      if (result) {
        const updatedTableIds = tableIds?.filter(
          (tableId) => tableId !== selectedTableId
        );
        const update = { tables: updatedTableIds };
        const updatedUser = await updateUserAPI(user._id, update);
        setUser(updatedUser);
        setSelectedTable(null);
        clearForms();
      } else {
        window.alert("Failed to delete the Table");
      }
    } catch (error) {
      console.error(error);
      // window.alert(error);
      console.error("Error while deleting the Table: ", error);
    }
  };

  const handleUpdateTable = async (user, id) => {
    setTables((preVal) => {
      const index = preVal.findIndex((item) => item._id === id);
      preVal[index] = {
        _id: id,
        name: tableData.name,
        url: tableData.url,
        sheetIndex: tableData.sheetIndex,
        columns: keys,
      };
      return preVal;
    });
    clearForms();
    await updateTableAPI(id, {
      name: tableData.name,
      url: tableData.url,
      sheetIndex: tableData.sheetIndex,
      columns: keys,
    });
  };

  return (
    <div
      className="card"
      style={{
        margin: "10px auto",
        width: "600px",
        maxWidth: "100%",
      }}
    >
      <div className="form-group">
        <label>Name</label>
        <input
          required
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>URL</label>
        <input
          required
          type="text"
          className="form-control"
          value={url}
          onChange={(e) => {
            if (showTable) {
              setShowTable(false);
              setSelectedTable(null);
              setUrl(e.target.value);
            } else {
              setUrl(e.target.value);
            }
          }}
        />
      </div>
      <div className="form-group">
        <label>Sheet Index</label>
        <input
          required
          className="form-control"
          value={sheetIndex}
          onChange={(e) => setSheetIndex(e.target.value)}
        />
      </div>

      {!showTable && (
        <div className="text-right">
          <button onClick={handleLoad} className="btn btn-info">
            Load Table config
          </button>
        </div>
      )}
      <br />
      <br />

      {showTable && (
        <div>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Initial Value</th>
                <th>Key</th>
                <th>Label</th>
                <th>Reference</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {showSelectedTable ? (
                <SelectedTableConfig
                  handleUpdateConfig={handleUpdateConfig}
                  keys={keys}
                  userTables={userTables}
                />
              ) : (
                <>
                  {keys.map((key) => (
                    <tr key={key}>
                      <td>{key}</td>
                      <td>
                        <input 
                          type="text"
                          onChange={(event) =>
                            handleInputChange(event, key, "initialValue")
                          }
                        />
                      </td>
                      <td>
                        <label>
                          <input
                            type="radio"
                            name={`radio-col1`}
                            value={key}
                            onChange={(event) =>
                              handleInputChange(event, key, "key")
                            }
                          />
                        </label>
                      </td>
                      <td>
                        <label>
                          <input
                            type="radio"
                            name={`radio-col2`}
                            value={key}
                            onChange={(event) =>
                              handleInputChange(event, key, "label")
                            }
                          />
                        </label>
                      </td>
                      <td>
                        <select
                          name={`select-${key}`}
                          onChange={(event) =>
                            handleInputChange(event, key, "reference")
                          }
                          defaultValue="none"
                        >
                          <option value="none">None</option>
                          {userTables?.map((table) => (
                            <option key={table._id} value={table.name}>
                              {table.name}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <select
                          name={`select-${key}`}
                          onChange={(event) =>
                            handleInputChange(event, key, "type")
                          }
                        >
                          <option value="string">Text</option>
                          <option value="int">Number</option>
                          <option value="bool">Boolean</option>
                          <option value="url">URL</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
          {!showSelectedTable && (
            <div className="text-right">
              <button
                onClick={handleCancelClick}
                className="btn btn-danger can_btn"
              >
                Cancel
              </button>
              <button onClick={handleCreateClick} className="btn btn-info">
                Create
              </button>
            </div>
          )}
        </div>
      )}

      {/* {console.log("selectedTableselectedTable", selectedTable)} */}

      {showTable && selectedTable && (
        <div>
          <button
            className="btn btn-danger"
            onClick={() => handleDeleteTable(user, selectedTable._id)}
          >
            DELETE
          </button>

          <button
            className="btn btn-info"
            onClick={() => handleUpdateTable(user, selectedTable._id)}
          >
            SAVE
          </button>
        </div>
      )}
      <br />
      <br />
    </div>
  );
}
