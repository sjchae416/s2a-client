import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { DashboardApp, NavigationBar } from "../components";
import dummyApps from "../testData/test-apps.json";
import UserContext from "../UserContext";

export const name = "";

export default function DashboardPage({
  setIsAppSaved,
  isDeveloper,
  runnableApps,
  publishedApps,
  unpublishedApps,
}) {
  const { user, setUser } = useContext(UserContext);
  // const [section, setSection] = useState("all");
  const [showMenu, setShowMenu] = useState(false);

  runnableApps = dummyApps.filter((app) => app.runnable);
  publishedApps = dummyApps.filter((app) => app.status === "published");
  unpublishedApps = dummyApps.filter((app) => app.inDevelopment);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleManageButton = () => {
    setIsAppSaved(false);
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
                </div>
              </div>
            </div>
            <div className="box_two">
              <h3>All Apps</h3>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
