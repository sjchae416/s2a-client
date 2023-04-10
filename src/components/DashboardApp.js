import React from "react";

const DashboardApp = ({name, date}) => {
    return (
        <div className="col-3">
              <a href="#">
                <div className="card p-0 text-center">
                  <h2 className="">{name}</h2>
                  <hr />
                  <div className="p-1">
                    <small>Last modified {date}</small>
                  </div>
                </div>
              </a>
        </div>
    );
  };
  
  export default DashboardApp;
  