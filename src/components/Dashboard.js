import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
<<<<<<< Updated upstream
=======
import { Link, useNavigate } from "react-router-dom";
import RunnableApps from "./RunnableApps";
import InDevelopmentApps from "./InDevelopmentApps";
import PublishedApps from "./PublishedApps";
import AllApps from "./AllApps";

export const name = "";
>>>>>>> Stashed changes

export default function Dashboard() {
  const [section, setSection] = useState(1);

<<<<<<< Updated upstream
  useEffect(() => {
    const create_app_modal_btn = document.querySelector("#create-app");
    const create_app_modal = document.querySelector("#create-app-modal");
    const dismiss_create_app_modal = document.querySelector("#dismiss_create_app_modal");
    const create_app_btn = document.querySelector("#create-app-btn");

    create_app_modal_btn.onclick = () => {
      create_app_modal.style.display = 'block';
    };

    window.onclick = (event) => {
      if (event.target === create_app_modal) {
        create_app_modal.style.display = "none";
      }
    };

    dismiss_create_app_modal.onclick = (event) => {
      create_app_modal.style.display = "none";
    };

    create_app_btn.onclick = () => {
      window.location = "manage-data-source.html";
    };
  }, []);
=======
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

    navigate("/sheet");
  };
>>>>>>> Stashed changes

  return (
    <Box>
      <br />
      <br />
      <div className="container">
<<<<<<< Updated upstream

        <div className="card">
          <span className="profile-letter ml-auto"><a href="profile.html">P</a></span>
=======
        <div className="card card_one">
          <Link to="/dashboard">
            <h3>S2A</h3>
          </Link>
          <span className="profile-letter ml-auto">P</span>
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream


          <div className="row">
            <div className="col">

              <br /><br />

              <span>Apps Created by You</span>
              <hr />

              <br /><br />

              <div className="row">
                <div className="col-3">
                  <a href="#">
                    <div className="card p-0 text-center">
                      <h2 className="">App1</h2>
                      <hr />
                      <div className="p-1">
                        <small>Last opened mm/dd/vy</small>
                      </div>
                    </div>
                  </a>
                </div>

                <div className="col-3">
                  <a href="#">
                    <div className="card p-0 text-center">
                      <h2 className="">App2</h2>
                      <hr />
                      <div className="p-1">
                        <small>Last opened mm/dd/vy</small>
                      </div>
                    </div>
                  </a>
                </div>

                <div className="col-3">
                  <a href="#">
                    <div className="card p-0 text-center">
                      <h2 className="">App3</h2>
                      <hr />
                      <div className="p-1">
                        <small>Last opened mm/dd/vy</small>
                      </div>
                    </div>
                  </a>
                </div>

                <div className="col-3">
                  <a href="#">more...</a>
                </div>

              </div>


              <br /><br />
              <br /><br />


              <span>Apps You can Access</span>
              <hr />

              <br /><br />

              <div className="row">
                <div className="col-3">
                  <a href="#">
                    <div className="card p-0 text-center">
                      <h2 className="">App1</h2>
                      <hr />
                      <div className="p-1">
                        <small>Last opened mm/dd/vy</small>
                      </div>
                    </div>
                  </a>
                </div>

                <div class="col-3">
							<a href="#"><div class="card p-0 text-center">
								<h2 class="">App2</h2>
								<hr/>
								<div class="p-1">
									<small>Last opened mm/dd/vy</small>
								</div>
							</div></a>
				</div>

                <div class="col-3">
                    <a href="#"><div class="card p-0 text-center">
                        <h2 class="">App3</h2>
                        <hr/>
                        <div class="p-1">
                            <small>Last opened mm/dd/vy</small>
                        </div>
                    </div></a>
                </div>

                <div class="col-3">
                    <a href="#">more...</a>
                </div>
            </div>
		</div>
	</div>
	</div>
    <div class="modal" id="create-app-modal">
        <div class="modal-dialog-centered">
            <div class="modal-content">
                <div class="card">
                    <div class="form-group">
                        <label>App name</label>
                        <input type="text" class="form-control" placeholder="enter a name for your app"/>
                    </div>

                    <div class="form-group">
                        <button class="btn btn-danger" id="dismiss_create_app_modal">Cancel</button>
                        <button class="btn btn-success" id="create-app-btn">Create</button>
                    </div>
                </div>
            </div>
=======
>>>>>>> Stashed changes
        </div>
      </div>
    </Box>
  );
}
