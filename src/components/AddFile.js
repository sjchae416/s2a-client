import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";
import test from "./test2.json";
import role from "./test-role-sheet.json";

export default function AddFile() {
  const [view, setView] = useState(1);
  const [showTable, setShowTable] = useState(false);
  const [showManageTable, setShowManageTable] = useState(false);
  const [showTableContent, setShowTableContent] = useState(false);
  const [sheetIndex, setSheetIndex] = useState("");
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  const [app, setAppName] = useState("");
  const [appurl, setURLName] = useState("");
  const [selectedColumns, setSelectedColumns] = useState([]);
  const keys = Object.keys(test[0]);
  const roleKey = Object.keys(role[0]);

  const columns = Object.keys(test[0]);

  let navigate = useNavigate();

  useEffect(() => {
    const create_app_modal_btn = document.querySelector("#create-app");
    const create_app_modal = document.querySelector("#create-app-modal");
    const dismiss_create_app_modal = document.querySelector(
      "#dismiss_create_app_modal"
    );
    const create_app_btn = document.querySelector("#create-app-btn");

    create_app_modal_btn.onclick = () => {
      create_app_modal.style.display = "block";
    };

    window.onclick = (event) => {
      if (event.target === create_app_modal) {
        create_app_modal.style.display = "none";
      }
    };

    dismiss_create_app_modal.onclick = (event) => {
      create_app_modal.style.display = "none";
    };
  }, []);

  useEffect(() => {
    const create_app_modal_btn = document.querySelector("#save-change");
    const create_app_modal = document.querySelector("#save-change-modal");
    const dismiss_create_app_modal = document.querySelector(
      "#dismiss_create_app_modals"
    );
    const create_app_btn = document.querySelector("#save-change-btn");

    create_app_modal_btn.onclick = () => {
      create_app_modal.style.display = "block";
    };

    window.onclick = (event) => {
      if (event.target === create_app_modal) {
        create_app_modal.style.display = "none";
      }
    };

    dismiss_create_app_modal.onclick = (event) => {
      create_app_modal.style.display = "none";
    };
  }, []);

  const handleSaveChanges = () => {
    navigate("/dashboard");
  };

  const handleLoad = () => {
    if (name && url && sheetIndex) {
      // Create the JSON object
      const data = {
        name: name,
        url: url,
        sheetidx: sheetIndex,
      };

      //requires backend to save the data for tables
      

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
  
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedColumns([...selectedColumns, value]);
    } else {
      setSelectedColumns(selectedColumns.filter((column) => column !== value));
    }
  };

  const appLoad = () => {
    if (app && appurl) {
      // Create the JSON object
      //requires backend to save the data for tables

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

  return (
    <Box>
      <br />
      <br />
      <div class="container">
        <div class="card text-right card_one">
          <h3 id="save-change">S2A</h3>
          <span class=" ml-auto">
            <button class="btn btn-info"> {"<"} </button>&nbsp;
            <span class=" ml-auto" />
            <button class="btn btn-info"> {">"} </button>&nbsp;
            <span class=" ml-auto" />
            <button class="btn btn-info">Save</button>&nbsp;
            <a class="profile-letter" href="profile.html">
              P
            </a>
          </span>
        </div>

        <br />

        <div class="card p-0">
          <div class="row no-gutters mt-2">
            <div class="col-1 border-right text-center">
              <button onClick={() => setView(1)}>App</button>
              <hr />

              <button onClick={() => setView(3)}>Table</button>

              <hr />
              <button onClick={() => setView(4)}>View</button>
              <hr />
              <button id="create-app">Deploy</button>
              <hr />
            </div>
            <div class="col-1 border-right text-center"></div>
            <div class="col-auto">
              <div class="container">
                <br />
                {view === 1 ? (
                  <div
                    class="card"
                    style={{
                      margin: "10px auto",
                      width: "600px",
                      maxWidth: "100%",
                    }}
                  >
                    <div class="form-group">
                      <label>Creator's Name</label>
                      <div>John Smith</div>
                    </div>
                    <div class="form-group">
                      <label>App Name</label>
                      <input
                        required
                        type="text"
                        class="form-control"
                        onChange={(e) => setAppName(e.target.value)}
                      />
                    </div>
                    <div class="form-group">
                      <label>URL</label>
                      <input
                        required
                        type="text"
                        class="form-control"
                        onChange={(e) => setURLName(e.target.value)}
                      />
                    </div>
                    <div class="text-right">
                      <button
                        onClick={appLoad}
                        class="btn btn-info"
                      >
                        Load
                      </button>
                    </div>

                    <br />
                    <br />
                    {showTable ? (
                      <table>
                        <thead>
                          <tr>
                            {Object.keys(role[0]).map((header) => (
                              <th key={header}>{header}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {role.map((rowData) => (
                            <tr key={rowData.id}>
                              {Object.values(rowData).map((value, index) => (
                                <td key={index}>{value}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      ""
                    )}

                    <br />
                    <br />
                  </div>
                ) : view === 4 ? (
                  <div
                    class="card"
                    style={{
                      margin: "10px auto",
                      width: "480px",
                      maxWidth: "100%",
                    }}
                  >
                    <div class="form-group">
                      <label>View Name</label>
                      <input type="text" value="Empty V" class="form-control" />
                    </div>
                    <div class="form-group">
                      <label>Table</label>
                      <select class="form-control">
                        <option value="">test</option>
                      </select>
                    </div>
                    <div>
                      <div className="form-group">
                        <label>Columns</label>
                        <select multiple onChange={handleCheckboxChange}>
                          {columns.map((column) => (
                            <option key={column} value={column}>
                              {column}
                            </option>
                          ))}
                        </select>
                      </div>
                      <p>Selected Columns: {selectedColumns.join(', ')}</p>
                    </div>
                    <div class="form-group">
                      <label className="can_btn">View Type</label>
                      <button class="btn btn-info can_btn">Table</button>
                      <button class="btn btn-info">Detail</button>
                    </div>
                    <div class="form-group">
                      <label>Allowed Action</label>
                      <select class="form-control">
                        <option value="">edit record</option>
                        <option value="">add record</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label>Role</label>
                      <select class="form-control">
                        <option value="">developer</option>
                        <option value="">end user</option>
                      </select>
                    </div>

                    <div class="text-right">
                      <button class="btn btn-danger can_btn">Cancel</button>
                      <button class="btn btn-info">Create</button>
                    </div>

                    <br />
                    <br />
                  </div>
                ) : view === 3 ? (
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
                        type="number" 
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
                    <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Key</th>
                        <th>Function</th>
                        <th>Label</th>
                        <th>Reference</th>
                        <th>Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {keys.map((key) => (
                        <tr key={key}>
                          <td>{key}</td>
                          <td><input type="checkbox" /></td>
                          <td />
                          <td>
                            <input type="radio" />
                          </td>
                          <td />
                          <td>
                            <select>
                              <option />
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  )}

                    <br />
                    <br />
                  </div>
                ) : (
                  ""
                )}

                <br />
                <br />
              </div>
            </div>
          </div>
        </div>
        <div class="modal" id="save-change-modal">
          <div class="modal-dialog-centered">
            <div class="modal-content">
              <div class="card">
                <div class="form-group save_ur_chnage">
                  <h5>Save Changes</h5>
                  <h5>
                    Would you like to save your changes before proceeding?
                  </h5>
                  <button
                    class="btn btn-danger "
                    id="dismiss_create_app_modals"
                  >
                    Discard
                  </button>
                  <button
                    onClick={() => navigate("/dashboard")}
                    class="btn btn-success"
                    id="save-change-btn"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="modal" id="create-app-modal">
          <div class="modal-dialog-centered">
            <div class="modal-content">
              <div class="card">
                <div class="form-group save_ur_chnage">
                  <h5>
                    Would you like to publish your app? <br /> If not, it will
                    be saved under in development and will not be availble to
                    users.
                  </h5>
                  <button class="btn btn-danger" id="dismiss_create_app_modal">
                    No
                  </button>
                  <button
                    onClick={handleSaveChanges}
                    class="btn btn-success"
                    id="create-app-btn"
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
      </div>
    </Box>
  );
}
