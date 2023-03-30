import React, { useEffect } from "react";

import Box from "@mui/material/Box";
<<<<<<< Updated upstream:src/components/ManageDataSource.js
=======
import { Link, useNavigate } from "react-router-dom";

export default function ManageTable() {
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

  let navigate = useNavigate();
  const handleDataView = () => {
    navigate("/manage-table");
  };

  const handleSaveChanges = () => {
    navigate("/dashboard");
  };
>>>>>>> Stashed changes:src/components/ManageTable.js

export default function ManageDataSource() {
  return (
    <Box>
      <br />
      <br />
      <div className="container">
        <div class="card text-right card_one">
          <h3 id="create-app">S2A</h3>

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
        <div className="card p-0">
          <div className="row no-gutters mt-2">
            <div className="col-1 border-right text-center">
<<<<<<< Updated upstream:src/components/ManageDataSource.js
                <a href="manage-data-source.html" className="active">
                Data
                </a>
                <hr />
                <a href="#">Access Control</a>
                <hr />
                <a href="add-view.html">View</a>
                <hr />
                <a href="#">Display</a>
                <hr />
=======
              <button>Table</button>
>>>>>>> Stashed changes:src/components/ManageTable.js
            </div>
            <div className="col-1 border-right text-center">
              <button>Add Table</button> <hr />
              Student Table
              <hr />
            </div>
            <div className="col-auto">
              <div className="container">
                <br />
                <div className="card" style={{ margin: "10px auto" }}>
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      defaultValue="Student table"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>URL</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label>Sheet Index</label>
                    <input
                      type="text"
                      defaultValue="Table1"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Columns</label>
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
                        <tr>
                          <td>Name</td>
                          <td />
                          <td />
                          <td>
                            <input type="checkbox" />
                          </td>
                          <td />
                          <td>
                            <select>
                              <option />
                            </select>
                          </td>
                        </tr>
                        <tr>
                          <td>ID</td>
                          <td />
                          <td />
                          <td>
                            <input type="checkbox" />
                          </td>
                          <td />
                          <td>
                            <select>
                              <option />
                            </select>
                          </td>
                        </tr>
                        <tr>
                          <td>Email</td>
                          <td />
                          <td />
                          <td>
                            <input type="checkbox" />
                          </td>
                          <td />
                          <td>
                            <select>
                              <option />
                            </select>
                          </td>
                        </tr>
                        <tr>
                          <td>Assignment</td>
                          <td />
                          <td />
                          <td>
                            <input type="checkbox" />
                          </td>
                          <td />
                          <td>
                            <select>
                              <option />
                            </select>
                          </td>
                        </tr>
                        <tr>
                          <td>Grade</td>
                          <td />
                          <td />
                          <td>
                            <input type="checkbox" />
                          </td>
                          <td />
                          <td>
                            <select>
                              <option />
                            </select>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="text-right">
                    <button className="btn btn-danger can_btn">Cancel</button>
                    <button id="save-change" className="btn btn-info">
                      Add
                    </button>
                  </div>

                  <div class="modal" id="save-change-modal">
                    <div class="modal-dialog-centered">
                      <div class="modal-content">
                        <div class="card">
                          <div class="form-group save_ur_chnage">
                            <h5>Save Chnages</h5>
                            <h5>
                              Would you like to save your changes before
                              proceeding?
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
                            <h5>Save Chnages</h5>
                            <h5>
                              Would you like to save your changes before
                              proceeding?
                            </h5>
                            <button
                              class="btn btn-danger "
                              id="dismiss_create_app_modal"
                            >
                              Discard
                            </button>
                            <button
                              onClick={handleSaveChanges}
                              class="btn btn-success"
                              id="create-app-btn"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <br />
                  <br />
                </div>
                <br />
                <br />
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
      </div>
    </Box>
  );
}
