import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Button } from 'react-bootstrap';
import test from "../testData/test2.json";
import role from "../testData/test-role-sheet.json";

import { App } from "./createAppComponents/App.js";
import Table from "./Table.js";
import { View } from "./createAppComponents/View.js";
import TableList from "./TableList";

export default function CreateApp() {
  const [view, setView] = useState(1);
  const [tablelist, setTableList] = useState([]);
  const [viewlist, setViewList] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    const create_app_modal_btn = document.querySelector("#create-app");
    const create_app_modal = document.querySelector("#create-app-modal");
    const dismiss_create_app_modal = document.querySelector(
      "#dismiss_create_app_modal"
    );
    const create_app_btn = document.querySelector("#create-app-btn");
    const create_app_btns = document.querySelector("#create-app-btns");

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
    create_app_btn.onclick = (event) => {
      create_app_modal.style.display = "none";
    };
    create_app_btns.onclick = (event) => {
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
    create_app_btn.onclick = (event) => {
      create_app_modal.style.display = "none";
    };
  }, []);

  const handleSaveChanges = () => {
    // navigate("/");
    // navigate("/dashboard");
  };

  const handleSaveClick = () => {
    setShowConfirmModal(true);
  };

  const handleConfirm = () => {
    // Your save logic here
    setShowConfirmModal(false);
  };

  const handleCancel = () => {
    setShowConfirmModal(false);
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
            <button className="btn btn-info" onClick={handleSaveClick}>Save</button>&nbsp;
              <Modal show={showConfirmModal} onHide={handleCancel}>
                <Modal.Header closeButton>
                  <Modal.Title>Confirm Save</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to save?</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={handleConfirm}>
                    Save
                  </Button>
                </Modal.Footer>
              </Modal>
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
              <button id="create-app">Publish</button>
              <hr />
            </div>
            <div class="col-1 border-right text-center">
              {view === 3 ? (
                <>
                  <button>Add Table</button>
                  <TableList tablelist={tablelist} />
                </>
              ) : view === 4 ? (
                <>
                  <button>Add View</button>
                  <TableList tablelist={viewlist} />
                </>
              ) : (
                ""
              )}
            </div>
            <div class="col-auto">
              <div class="container">
                <br />
                {view === 1 ? (
                  <App />
                ) : view === 4 ? (
                  <View viewlist={viewlist} setViewList={setViewList} />
                ) : view === 3 ? (
                  <Table tablelist={tablelist} setTableList={setTableList} />
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
                    onClick={() => navigate("/")}
                    // onClick={() => navigate("/dashboard")}
                    class="btn btn-success"
                    id="save-change-btns"
                  >
                    Save
                  </button>
                  <button class="btn btn-danger " id="save-change-btn">
                    Cancel
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
                  <button class="btn btn-success" id="create-app-btn">
                    Yes
                  </button>
                  <button class="btn btn-danger" id="create-app-btns">
                    Cancel
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
