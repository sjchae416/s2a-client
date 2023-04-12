import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";

import DashboardApp from "../components/DashboardApp";

import apps from "../testData/test-apps.json";

export const name = "";

export default function Dashboard({ user }) {
  const loggedInUser = user;
  const [section, setSection] = useState("all");
  const [showMenu, setShowMenu] = useState(false);

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

  const logOut = () => {
    window.open(
      `http://localhost:3333/auth/logout`,
      // `http://localhost:${process.env.SERVER_PORT}/auth/logout`,
      "_self"
    );
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div>
      <br />
      <br />
      <div className="container">
        <div className="card card_one">
          <Link to="/">
            {/* <Link to="/dashboard"> */}
            <h3>S2A</h3>
          </Link>
          {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
						Hello, {loggedInUser.name}. You are now logged in with {loggedInUser.email}.
					</div>
					<button className="btn-log-out" onClick={logOut}>
						Log Out
					</button> */}
          <span className="profile-letter ml-auto" onClick={toggleMenu}>
            {loggedInUser.name && loggedInUser.name.charAt(0).toUpperCase()}
          </span>
          {showMenu && (
            <div className="dropdown-menu">
              <button className="btn-logout-dropdown" onClick={logOut}>
                Logout
              </button>
            </div>
          )}
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
                      className={section === "all" ? "active" : ""}
                      onClick={() => setSection("all")}
                    >
                      All Apps
                    </li>
                    <li
                      className={section === "publish" ? "active" : ""}
                      onClick={() => setSection("publish")}
                    >
                      Published Apps
                    </li>
                    <li
                      className={section === "indevelopment" ? "active" : ""}
                      onClick={() => setSection("indevelopment")}
                    >
                      In Development Apps
                    </li>
                    <li
                      className={section === "runnable" ? "active" : ""}
                      onClick={() => setSection("runnable")}
                    >
                      Runnable Apps
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="box_two">
              {section === "all" ? (
                <ul>
                  <p>All Apps</p>
                  <div className="row">
                    {apps.map((app) => (
                      <DashboardApp name={app.name} date={app.date} />
                    ))}
                  </div>
                </ul>
              ) : section === "publish" ? (
                <ul>
                  <p>Published Apps</p>
                  <div className="row">
                    {publishedApps.map((app) => (
                      <DashboardApp name={app.name} date={app.date} />
                    ))}
                  </div>
                </ul>
              ) : section === "indevelopment" ? (
                <ul>
                  <p>In Development Apps</p>
                  <div className="row">
                    {inDevelopmentApps.map((app) => (
                      <DashboardApp name={app.name} date={app.date} />
                    ))}
                  </div>
                </ul>
              ) : section === "runnable" ? (
                <ul>
                  <p>Runnable Apps</p>
                  <div className="row">
                    {runnableApps.map((app) => (
                      <DashboardApp name={app.name} date={app.date} />
                    ))}
                  </div>
                </ul>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
