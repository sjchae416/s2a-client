import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";
import RunnableApps from "./RunnableApps";
import InDevelopmentApps from "./InDevelopmentApps";
import PublishedApps from "./PublishedApps";
import AllApps from "./AllApps";

export const name = "";

export default function Dashboard() {
  const [section, setSection] = useState(1);

  let navigate = useNavigate();
  const createApp = (event) => {
    event.preventDefault();
    // name that the user enters is stored in name atm
    // name = event.target;
    // when the google sheets API is connected, update the database here

    navigate("/manage-table");
  };

  const handleOpen = () => {
    // name that the user enters is stored in name atm
    // name = event.target;
    // when the google sheets API is connected, update the database here

    navigate("/table-view");
  };

  return (
    <Box>
      <br />
      <br />
      <div className="container">
        <div className="card card_one">
          <Link to="/dashboard">
            <h3>S2A</h3>
          </Link>
          <span className="profile-letter ml-auto">P</span>
        </div>

        <br />

        <div className="card">
          <div className="box_one">
            <div className="box_three">
              <div className="row">
                <div className="col-auto">
                  <Link to="/add-view">
                    <button className="btn btn-info">Create App</button>
                  </Link>
                  <br />
                  <Link to="/create-table">
                    <button className="btn btn-info create_table_btn">
                      Create Table
                    </button>
                  </Link>
                  <ul className="app_list">
                    <li
                      className={section === 1 ? "active" : ""}
                      onClick={() => setSection(1)}
                    >
                      All Apps
                    </li>
                    <li
                      className={section === 2 ? "active" : ""}
                      onClick={() => setSection(2)}
                    >
                      Published Apps
                    </li>
                    <li
                      className={section === 3 ? "active" : ""}
                      onClick={() => setSection(3)}
                    >
                      In Development Apps
                    </li>
                    <li
                      className={section === 4 ? "active" : ""}
                      onClick={() => setSection(4)}
                    >
                      Runnable Apps
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {section === 1 ? (
              <AllApps handleOpen={handleOpen} />
            ) : section === 2 ? (
              <PublishedApps handleOpen={handleOpen} />
            ) : section === 3 ? (
              <InDevelopmentApps handleOpen={handleOpen} />
            ) : (
              <RunnableApps handleOpen={handleOpen} />
            )}
          </div>
        </div>

        <div class="modal" id="create-app-modal">
          <div class="modal-dialog-centered">
            <div class="modal-content">
              <div class="card">
                <div class="form-group">
                  <label>App name</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="enter a name for your app"
                  />
                </div>

                <div class="form-group">
                  <button class="btn btn-danger" id="dismiss_create_app_modal">
                    Cancel
                  </button>
                  <button
                    onClick={createApp}
                    class="btn btn-success"
                    id="create-app-btn"
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
}
