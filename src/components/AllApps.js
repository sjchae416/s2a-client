import React from "react";

const apps = [
  {
    title: "App1",
    lastOpened: "mm/dd/vy",
    type: "published",
  },
  {
    title: "App2",
    lastOpened: "mm/dd/vy",
    type: "published",
  },
  {
    title: "App3",
    lastOpened: "mm/dd/vy",
    type: "published",
  },
  {
    title: "App1",
    lastOpened: "mm/dd/vy",
    type: "development",
  },
  {
    title: "App2",
    lastOpened: "mm/dd/vy",
    type: "development",
  },
  {
    title: "App3",
    lastOpened: "mm/dd/vy",
    type: "development",
  },
  {
    title: "App1",
    lastOpened: "mm/dd/vy",
    type: "runnable",
  },
  {
    title: "App2",
    lastOpened: "mm/dd/vy",
    type: "runnable",
  },
  {
    title: "App3",
    lastOpened: "mm/dd/vy",
    type: "runnable",
  },
];

const AllApps = ({ handleOpen }) => {

  const renderApps = (appType) => {
    return apps
      .filter((app) => app.type === appType)
      .map((app, index) => (
        <div className="col-3" key={index}>
          <a href="#">
            <div onClick={handleOpen} className="card p-0 text-center">
              <h2 className="">{app.title}</h2>
              <hr />
              <div className="p-1">
                <small>Last opened {app.lastOpened}</small>
              </div>
            </div>
          </a>
        </div>
      ));
  };
  return (
    <div className="box_two">
      <div className="row">
        <div className="col">
          <div className="col-3 input_box">
            <input type="text" className="form-control" placeholder="Search..." />
          </div>
          <br />
          <br />

          <span>Published Apps</span>
          <hr />

          <br />
          <br />

          <div className="row">{renderApps("published")}</div>

          <div className="col-3">
            <a href="#">more...</a>
          </div>

          <br />
          <br />
          <br />
          <br />

          <span>In Development Apps</span>
          <hr />

          <br />
          <br />

          <div className="row">{renderApps("development")}</div>

          <div className="col-3">
            <a href="#">more...</a>
          </div>

          <br />
          <br />
          <br />
          <br />

          <span>Runnable Apps</span>
          <hr />

          <br />
          <br />

          <div className="row">{renderApps("runnable")}</div>
        </div>
      </div>
    </div>
  );
};

export default AllApps;
