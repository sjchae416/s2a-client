import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";
import { App } from "./createAppComponents/App.js";
import { View } from "./createAppComponents/View.js";
import ViewList from "./ViewList";
import NavigationBar from "./NavigationBar";
import { useDispatch, useSelector } from "react-redux";
import { actionClearInput } from "../redux/action.js";

export default function CreateApp({ user }) {
  const [view, setView] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewName, setViewName] = useState("");
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [viewType, setViewType] = useState("Table");
  const [allowedAction, setAllowAction] = useState("Add");
  const [role, setRole] = useState("Developer");
  const { isViewSelected } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  let navigate = useNavigate();

  const myfun = () => {
    if (viewName) {
      if (
        window.confirm(
          "You have unsaved changes, Are you sure you want to leave!"
        ) == true
      ) {
        const create_app_modal = document.querySelector("#create-app-modal");
        create_app_modal.style.display = "block";
      }
    } else {
      const create_app_modal = document.querySelector("#create-app-modal");
      create_app_modal.style.display = "block";
    }
  };

  useEffect(() => {
    const create_app_modal_btn = document.querySelector("#create-app");
    const create_app_modal = document.querySelector("#create-app-modal");
    const dismiss_create_app_modal = document.querySelector(
      "#dismiss_create_app_modal"
    );
    const create_app_btn = document.querySelector("#create-app-btn");
    const create_app_btns = document.querySelector("#create-app-btns");

    if (create_app_modal_btn) {
      create_app_modal_btn.onclick = () => {
        create_app_modal.style.display = "block";
      };
    }

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
    setIsModalOpen(true);
  };

  const handleConfirmClick = () => {
    // TODO: handle the confirmation
    setIsModalOpen(false);
  };

  const handleCancelClick = () => {
    setIsModalOpen(false);
  };

  return (
    <Box>
      <br />
      <br />
      <div className="container">
      <NavigationBar user={user}/>
        <br />

        <div className="card p-0">
          <div className="row no-gutters mt-2">
            <div className="col-1 border-right text-center">
              <button
                onClick={() => {
                  if (!isViewSelected && viewName) {
                    if (
                      window.confirm(
                        "You have unsaved changes, Are you sure you want to leave!"
                      ) == true
                    ) {
                      setView(1);
                    }
                  } else {
                    setView(1);
                  }
                }}
              >
                App
              </button>
              <hr />
              <button onClick={() => setView(4)}>View</button>
              <hr />
              <button onClick={myfun}>Publish</button>
              <hr />
            </div>
            <div className="col-1 border-right text-center">
              {view === 4 ? (
                <>
                  <button onClick={() => dispatch(actionClearInput(true))}>
                    Add View
                  </button>
                  <ViewList />
                </>
              ) : (
                ""
              )}
            </div>
            <div className="col-auto">
              <div className="container">
                <br />
                {view === 1 ? (
                  <App developer={user} />
                ) : view === 4 ? (
                  <View
                    role={role}
                    setRole={setRole}
                    allowedAction={allowedAction}
                    setAllowAction={setAllowAction}
                    viewType={viewType}
                    setViewType={setViewType}
                    selectedColumns={selectedColumns}
                    setSelectedColumns={setSelectedColumns}
                    viewName={viewName}
                    setViewName={setViewName}
                  />
                ) : (
                  ""
                )}

                <br />
                <br />
              </div>
            </div>
          </div>
        </div>
        <div className="modal" id="save-change-modal">
          <div className="modal-dialog-centered">
            <div className="modal-content">
              <div className="card">
                <div className="form-group save_ur_chnage">
                  <h5>Save Changes</h5>
                  <h5>
                    Would you like to save your changes before proceeding?
                  </h5>
                  <button
                    className="btn btn-danger "
                    id="dismiss_create_app_modals"
                  >
                    Discard
                  </button>
                  <button
                    onClick={() => navigate("/")}
                    // onClick={() => navigate("/dashboard")}
                    className="btn btn-success"
                    id="save-change-btns"
                  >
                    Save
                  </button>
                  <button className="btn btn-danger " id="save-change-btn">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="modal" id="create-app-modal">
          <div className="modal-dialog-centered">
            <div className="modal-content">
              <div className="card">
                <div className="form-group save_ur_chnage">
                  <h5>
                    Would you like to publish your app? <br /> If not, it will
                    be saved under in development and will not be availble to
                    users.
                  </h5>
                  <button
                    className="btn btn-danger"
                    id="dismiss_create_app_modal"
                  >
                    No
                  </button>
                  <button className="btn btn-success" id="create-app-btn">
                    Yes
                  </button>
                  <button className="btn btn-danger" id="create-app-btns">
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
