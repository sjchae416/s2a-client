import React from "react";
import { Link } from "react-router-dom";

const DashboardApp = ({ name, date }) => {
  return (
    <div className="col-3">
      <Link to={`/runnable-apps/${name}`}>
        <div className="card p-0 text-center">
          <h2 className="">{name}</h2>
          <hr />
          <div className="p-1">
            <small>Last modified {date}</small>
          </div>
        </div>
      </Link>
      <br />
    </div>
  );
};

export default DashboardApp;
