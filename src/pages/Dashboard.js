import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";

export const name = "";

const apps = [
  {
    name: "App 1",
    status: "published",
    runnable: true,
    inDevelopment: false,
  },
  {
    name: "App 2",
    status: "inDevelopment",
    runnable: false,
    inDevelopment: true,
  },
  {
    name: "App 3",
    status: "published",
    runnable: true,
    inDevelopment: false,
  },
  {
    name: "App 4",
    status: "inDevelopment",
    runnable: false,
    inDevelopment: true,
  },
  {
    name: "App 5",
    status: "runnable",
    runnable: true,
    inDevelopment: false,
  },
  {
    name: "App 6",
    status: "inDevelopment",
    runnable: false,
    inDevelopment: true,
  },
];

export default function Dashboard() {
  const [section, setSection] = useState(1);

  const publishedApps = apps.filter((app) => app.status === "published");
  const inDevelopmentApps = apps.filter((app) => app.inDevelopment);
  const runnableApps = apps.filter((app) => app.runnable);

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

  // let app = (
  //   <div className="col-4 mb-4">
  //     <a href="#">
  //       <div className="card p-0 text-center">
  //         <h2 className="card-title">{app.name}</h2>
  //         <hr />
  //         <div className="p-1">
  //           <small>Last modified mm/dd/yy</small>
  //         </div>
  //       </div>
  //     </a>
  //   </div>
  // );

  return (
    <div>
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
              <ul>
                <span>All Apps</span>
                <div className = "row">
                  {apps.map((app) => (
                      <div className="col-3">
                        <a href="#">
                          <div className="card p-0 text-center">
                            <h2 className="card-title">{app.name}</h2>
                            <hr />
                            <div className="p-1">
                              <small>Last modified mm/dd/yy</small>
                            </div>
                          </div>
                        </a>
                        <br/>
                      </div>
                    ))}
                  </div>
              </ul>
            ) : section === 2 ? (
              <ul>
                <span>Published Apps</span>
                <div className = "row">
                  {publishedApps.map((app) => (
                      <div className="col-3">
                        <a href="#">
                          <div className="card p-0 text-center">
                            <h2 className="card-title">{app.name}</h2>
                            <hr />
                            <div className="p-1">
                              <small>Last modified mm/dd/yy</small>
                            </div>
                          </div>
                        </a>
                        <br/>
                      </div>
                    ))}
                  </div>
              </ul>
            ) : section === 3 ? (
              <ul>
                <span>In Development Apps</span>
                <div className = "row">
                  {inDevelopmentApps.map((app) => (
                      <div className="col-3">
                        <a href="#">
                          <div className="card p-0 text-center">
                            <h2 className="card-title">{app.name}</h2>
                            <hr />
                            <div className="p-1">
                              <small>Last modified mm/dd/yy</small>
                            </div>
                          </div>
                        </a>
                        <br/>
                      </div>
                    ))}
                  </div>
              </ul>
            ) : (
              <ul>
                <span>Runnable Apps</span>
                <div className = "row">
                  {runnableApps.map((app) => (
                      <div className="col-3">
                        <a href="#">
                          <div className="card p-0 text-center">
                            <h2 className="card-title">{app.name}</h2>
                            <hr />
                            <div className="p-1">
                              <small>Last modified mm/dd/yy</small>
                            </div>
                          </div>
                        </a>
                        <br/>
                      </div>
                    ))}
                  </div>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
