import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";
import test from "./test.json";

export default function AddFile() {
  const [view, setView] = useState(1);
  const [showTable, setShowTable] = useState(false);
  const [showManageTable, setShowManageTable] = useState(false);
  const [showTableContent, setShowTableContent] = useState(false);
  const keys = Object.keys(test[0]);

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
                      <label>App Name</label>
                      <input type="text" class="form-control" />
                    </div>
                    <div class="form-group">
                      <label>Creator's Name</label>
                      <input type="text" class="form-control" />
                    </div>
                    <div class="form-group">
                      <label>URL</label>
                      <input type="text" class="form-control" />
                    </div>
                    <div class="text-right">
                      <button
                        onClick={() => setShowTable(true)}
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
                            {Object.keys(test[0]).map((header) => (
                              <th key={header}>{header}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {test.map((rowData) => (
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
                        <option value="">select</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label>Columns</label>
                      <input type="text" class="form-control" />
                    </div>
                    <div class="form-group">
                      <label className="can_btn">View Type</label>
                      <button class="btn btn-info can_btn">Table</button>
                      <button class="btn btn-info">Detail</button>
                    </div>
                    <div class="form-group">
                      <label>Alloted Action</label>
                      <select class="form-control">
                        <option value="">select</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label>Role</label>
                      <select class="form-control">
                        <option value="">select</option>
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
                        type="text"
                        defaultvalue="Student table"
                        class="form-control"
                      />
                    </div>
                    <div class="form-group">
                      <label>URL</label>
                      <input type="text" class="form-control" />
                    </div>
                    <div class="form-group">
                      <label>Sheet Index</label>
                      <input type="number" defaultvalue="1" class="form-control" />
                    </div>

                    <div class="text-right">
                      <button
                        onClick={() => setShowManageTable(true)}
                        class="btn btn-info"
                      >
                        Load
                      </button>
                    </div>

                    <br />
                    <br />
                    {showManageTable && ( 
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
