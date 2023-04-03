import React from "react";

const PublishedApps = ({ handleOpen }) => {
  return (
    <div className="box_two">
      <div className="row">
        <div className="col">
          <div className="col-3 input_box">
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
            />
          </div>
          <br />
          <br />

          <span>Published Apps</span>
          <hr />

          <br />
          <br />

          <div className="row">
            <div className="col-3">
              <a href="#">
                <div onClick={handleOpen} className="card p-0 text-center">
                  <h2 className="">App1</h2>
                  <hr />
                  <div className="p-1">
                    <small>Last modified mm/dd/vy</small>
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
                    <small>Last modified mm/dd/vy</small>
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
                    <small>Last modified mm/dd/vy</small>
                  </div>
                </div>
              </a>
            </div>

            <div className="col-3">
              <a href="#">more...</a>
            </div>
          </div>

          <br />
          <br />
          <br />
          <br />
        </div>
      </div>
    </div>
  );
};

export default PublishedApps;
