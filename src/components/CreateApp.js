import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";

export default function CreateTable() {
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

  const handleLoad = () => {
    navigate("/manage-table");
  };

  return (
    <Box>
      <br />
      <br />
      <div class="container">
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

        <div class="card p-0">
          <div class="row no-gutters mt-2">
            <div class="col-1 border-right text-center">
              <button>Table</button>
            </div>
            <div class="col-1 border-right text-center">
              <button>Add Table</button> <hr />
              Student Table
              <hr />
            </div>
            <div class="col-auto">
              <div class="container">
                <br />
                <div
                  class="card"
                  style={{
                    margin: "10px auto",
                    width: "480px",
                    maxWidth: "100%",
                  }}
                >
                  <div class="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      value="Student table"
                      class="form-control"
                    />
                  </div>
                  <div class="form-group">
                    <label>URL</label>
                    <input type="text" class="form-control" />
                  </div>
                  <div class="form-group">
                    <label>Sheet Index</label>
                    <input type="text" value="Table1" class="form-control" />
                  </div>

                  <div class="text-right">
                    <button onClick={handleLoad} class="btn btn-info">
                      Load
                    </button>
                  </div>

                  <br />
                  <br />
                </div>
                <br />
                <br />
              </div>
              <div class="modal" id="create-app-modal">
                <div class="modal-dialog-centered">
                  <div class="modal-content">
                    <div class="card">
                      <div class="form-group save_ur_chnage">
                        <h5>Save Chnages</h5>
                        <h5>
                          Would you like to save your changes before proceeding?
                        </h5>
                        <button
                          class="btn btn-danger "
                          id="dismiss_create_app_modal"
                        >
                          Discard
                        </button>
                        <button
                          onClick={() => navigate("/dashboard")}
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
