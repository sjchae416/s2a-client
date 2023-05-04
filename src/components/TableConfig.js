import React, { useEffect, useState } from "react";
import {
  createTableAPI,
  deleteTableAPI,
  loadSheetAPI,
  updateTableAPI,
  updateUserAPI,
} from "../api";

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
  const [keys, setKeys] = useState([]);
  // ====================
  const [showConfig, setShowConfig] = useState(false);
  const [selectedTablesss, setSelectedTablesss] = useState(false);
  const [idForTable, setIdForTable] = useState("");

  useEffect(() => {
    setKeys(null);
    clearForms();
    setShowConfig(false);
    setSelectedTablesss(false);
  }, [addTable]);

  useEffect(() => {
    if (selectedTable !== null) {
      setName(selectedTable.name);
      setUrl(selectedTable.url);
      setSheetIndex(selectedTable.sheetIndex);
      setShowConfig(false);
    }
  }, [selectedTable]);

  const clearForms = () => {
    setSheetIndex("");
    setName("");
    setUrl("");
    setShowConfig(false);
    setKeys([]);
    setSelectedTable(null);
  };

  const isTypeColumnValid = () => {
    for (let i = 0; i < keys.length; i++) {
      if (!keys[i].type || keys[i].type === "") {
        return false;
      }
    }
    return true;
  };

  const isKeyChosen = () => {
    for (let i = 0; i < keys.length; i++) {
      if (keys[i].key) {
        return true;
      }
    }
    return false;
  };

  const isLabelChosen = () => {
    for (let i = 0; i < keys.length; i++) {
      if (keys[i].label) {
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

  const handleLoad = async () => {
    if (name && url && sheetIndex) {
      if (!selectedTable?.name) {
        if (!isNameUnique()) {
          alert(
            "This table name already exists. Please choose a different name."
          );
          return;
        }

        const sheetData = {
          url,
          sheetIndex,
        };
        const tableRows = await loadSheetAPI(sheetData);
        if (tableRows && !tableRows.error) {
          let arr = [];
          for (let item of tableRows[0]) {
            arr.push({
              name: item,
              key: false,
              label: false,
              reference: "false",
              type: "string",
              initialValue: "",
            });
          }

          setKeys(arr);
          setShowConfig(true);
        } else {
          const errorMessage =
            tableRows && tableRows.message
              ? tableRows.message
              : "Error loading table. Please check your URL and sheet index.";
          alert(errorMessage);
          return;
        }
      } else {
        setKeys(selectedTable.columns);
        setShowConfig(true);
      }
    } else {
      alert("Please fill out all fields before submitting");
      return;
    }
  };

  const handleLoadSelected = async () => {
    if (name && url && sheetIndex) {
      const sheetData = {
        url,
        sheetIndex,
      };
      const tableRows = await loadSheetAPI(sheetData);
      if (tableRows && !tableRows.error) {
        let arr = [];
        for (let item of tableRows[0]) {
          arr.push({
            name: item,
            key: false,
            label: false,
            reference: "false",
            type: "string",
            initialValue: "",
          });
        }

        setKeys(arr);
        setShowConfig(true);
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

  const handleInputChange = (event, key, field) => {
    const { value, type, name, checked } = event.target;

    setKeys((prevConfig) => {
      const updatedConfig = [...prevConfig];
      if (field === "key") {
        updatedConfig.forEach((item) => {
          if (item.name === key.name) {
            item.key = checked;
          } else {
            item.key = false;
          }
        });
      } else if (field === "label") {
        updatedConfig.forEach((item) => {
          if (item.name === key.name) {
            item.label = checked;
          } else {
            item.label = false;
          }
        });
      } else if (field === "reference") {
        updatedConfig.forEach((item) => {
          if (item.name === key.name) {
            item.reference = value === "None" ? "false" : value;
          }
        });
      } else if (field === "type") {
        updatedConfig.forEach((item) => {
          if (item.name === key.name) {
            item.type = value;
          }
        });
      } else if (field === "initialValue") {
        updatedConfig.forEach((item) => {
          if (item.name === key.name) {
            item.initialValue = value;
          }
        });
      }

      return updatedConfig;
    });
  };

  const handleCreateClick = async () => {
    if (!isTypeColumnValid()) {
      alert("Please select a type for all rows");
      return;
    }

    if (!isKeyChosen()) {
      alert("Please choose a key for at least one row");
      return;
    }

    if (!isLabelChosen()) {
      alert("Please choose a key for at least one row");
      return;
    }

    const createdTable = await createTableAPI({
      name: name,
      url: url,
      sheetIndex: sheetIndex,
      config: keys,
    });
    if (createdTable && !createdTable.error) {
      alert("Table created successfully");
    } else {
      const errorMessage =
        createdTable && createdTable.message
          ? createdTable.message
          : "Error creating table.";
      alert(errorMessage);
      return;
    }

    const newTableIds =
      tableIds === null ? [createdTable._id] : [...tableIds, createdTable._id];
    const update = { tables: newTableIds };
    const updatedUser = await updateUserAPI(user._id, update);

    setUser(updatedUser);
    clearForms();
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
      console.error("Error while deleting the Table: ", error);
    }
  };

  const handleUpdateTable = async (user, id) => {
    setTables((preVal) => {
      const index = preVal.findIndex((item) => item._id === id);
      preVal[index] = {
        _id: id,
        name: name,
        url: url,
        sheetIndex: sheetIndex,
        columns: keys,
      };
      return preVal;
    });

    setSelectedTablesss(false);
    clearForms();
    await updateTableAPI(id, {
      name: name,
      url: url,
      sheetIndex: sheetIndex,
      columns: keys,
    });
  };

  return (
    <form
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
            if (showConfig) {
              setShowConfig(false);
              setIdForTable(selectedTable._id);
              // setSelectedTable(null);
              setSelectedTablesss(true);
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
          onChange={(e) => {
            if (showConfig) {
              setShowConfig(false);
              setIdForTable(selectedTable._id);
              // setSelectedTable(null);
              setSelectedTablesss(true);
              setSheetIndex(e.target.value);
            } else {
              setSheetIndex(e.target.value);
            }
          }}
        />
      </div>

      <div className="text-right">
        {selectedTablesss ? (
          <button
            type="button"
            onClick={handleLoadSelected}
            className="btn btn-info"
          >
            Load Table config
          </button>
        ) : (
          <button type="button" onClick={handleLoad} className="btn btn-info">
            Load Table config
          </button>
        )}
      </div>

      <br />
      <br />

      <div>
        {showConfig && (
          <>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Key</th>
                  <th>Label</th>
                  <th>Reference</th>
                  <th>Type</th>
                  <th>Initial value</th>
                </tr>
              </thead>
              <tbody>
                <>
                  {keys.map((key) => (
                    <tr key={key.name}>
                      <td>{key.name}</td>
                      <td>
                        <label>
                          <input
                            type="radio"
                            name={`radio-col1-${key.name}`}
                            checked={key.key}
                            value={key.key}
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
                            name={`radio-col2-${key.name}`}
                            checked={key.label}
                            value={key.label}
                            onChange={(event) =>
                              handleInputChange(event, key, "label")
                            }
                          />
                        </label>
                      </td>
                      <td>
                        <select
                          value={key.reference}
                          name={`select-${key.name}`}
                          onChange={(event) =>
                            handleInputChange(event, key, "reference")
                          }
                        >
                          <option value="false">None</option>
                          {userTables?.map((table) => (
                            <option key={table._id} value={table._id}>
                              {table.name}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <select
                          value={key.type}
                          name={`select-${key.name}`}
                          onChange={(event) =>
                            handleInputChange(event, key, "type")
                          }
                        >
                          {[
                            { type: "string", name: "Text" },
                            { type: "int", name: "Number" },
                            { type: "bool", name: "Boolean" },
                            { type: "url", name: "URL" },
                          ].map((item) => (
                            <option key={item.type} value={item.type}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <input
                          value={key.initialValue}
                          type="text"
                          onChange={(event) =>
                            handleInputChange(event, key, "initialValue")
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </>
              </tbody>
            </table>
            {!selectedTable && (
              <div className="text-right">
                <button
                  onClick={clearForms}
                  type="reset"
                  className="btn btn-danger can_btn"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleCreateClick}
                  className="btn btn-info"
                >
                  Create
                </button>
              </div>
            )}

            {selectedTable && showConfig && (
              <div>
                <button
                  onClick={() => handleDeleteTable(user, selectedTable._id)}
                  type="reset"
                  className="btn btn-danger"
                >
                  DELETE
                </button>
                <button
                  onClick={() =>
                    handleUpdateTable(
                      user,
                      selectedTable ? selectedTable._id : idForTable
                    )
                  }
                  type="button"
                  className="btn btn-info"
                >
                  SAVE
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <br />
      <br />
    </form>
  );
}
