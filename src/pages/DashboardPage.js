import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { DashboardApp, NavigationBar } from "../components";
import dummyApps from "../testData/test-apps.json";
import UserContext from "../UserContext";

export const name = "";

export default function DashboardPage({ isDeveloper }) {
  const { user, setUser } = useContext(UserContext);
  const [section, setSection] = useState("all");
  const [showMenu, setShowMenu] = useState(false);

  // FIXME need a filter logic for 3 kinds
  const publishedApps = dummyApps.filter((app) => app.status === "published");
  const inDevelopmentApps = dummyApps.filter((app) => app.inDevelopment);
  const runnableApps = dummyApps.filter((app) => app.runnable);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  if (!user) {
    return (
      <div>
        <h1>Processing Authentication Please Wait ...</h1>;
        <h2>If the browser don't continue to the desired page, please go </h2>;
        <a href="http://localhost:3333/auth/google">
          Click here to log in again
        </a>
      </div>
    );
  }

  return (
    <div>
      <br />
      <br />
      <div className="container">
        <NavigationBar user={user} isDashboard={true} />
        <br />

        <div className="card">
          <div className="box_one">
            <div className="box_three">
              <div className="row">
                <div className="col-auto">
                  {isDeveloper ? (
                    <Link to="/manage-app">
                      <button className="btn btn-info">Manage App</button>
                    </Link>
                  ) : (
                    <></>
                  )}
                  <br />
                  {isDeveloper ? (
                    <Link to="/add-table">
                      <button className="btn btn-info create_table_btn">
                        Add Table
                      </button>
                    </Link>
                  ) : (
                    <></>
                  )}
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
                    {dummyApps.map((app) => (
                      <DashboardApp
                        key={app.name}
                        name={app.name}
                        date={app.date}
                      />
                    ))}
                  </div>
                </ul>
              ) : section === "publish" ? (
                <ul>
                  <p>Published Apps</p>
                  <div className="row">
                    {publishedApps.map((app) => (
                      <DashboardApp
                        key={app.name}
                        name={app.name}
                        date={app.date}
                      />
                    ))}
                  </div>
                </ul>
              ) : section === "indevelopment" ? (
                <ul>
                  <p>In Development Apps</p>
                  <div className="row">
                    {inDevelopmentApps.map((app) => (
                      <DashboardApp
                        key={app.name}
                        name={app.name}
                        date={app.date}
                      />
                    ))}
                  </div>
                </ul>
              ) : section === "runnable" ? (
                <ul>
                  <p>Runnable Apps</p>
                  <div className="row">
                    {runnableApps.map((app) => (
                      <DashboardApp
                        key={app.name}
                        name={app.name}
                        date={app.date}
                      />
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
