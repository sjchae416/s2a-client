import React, { useEffect } from 'react';
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

export const name = '';

export default function Dashboard() {

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

  }, []);

  let navigate = useNavigate(); 
  const createApp = (event) =>{
    event.preventDefault();
    // name that the user enters is stored in name atm
   // name = event.target;
    // when the google sheets API is connected, update the database here

    navigate("/manage-table");
  }

  const handleOpen = () =>{
    // name that the user enters is stored in name atm
   // name = event.target;
    // when the google sheets API is connected, update the database here

    navigate("/sheet");
  }

  return (
    <Box>
      <br /><br />
      <div className="container">

        <div className="card">
          <span className="profile-letter ml-auto">P</span>
        </div>

        <br />

        <div className="card">

          <div className="row">
            <div className="col-3">
              <input type="text" className="form-control" placeholder="Search..." />
            </div>

            <div className="col-auto">
              <button id="create-app" className="btn btn-info">Create App</button>
            </div>
          </div>


          <div className="row">
            <div className="col">

              <br /><br />

              <span>Apps Created by You</span>
              <hr />

              <br /><br />

              <div className="row">
                <div className="col-3">
                  <a href="#">
                    <div onClick = {handleOpen} className="card p-0 text-center">
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
                        <button onClick = {createApp} class="btn btn-success" id="create-app-btn">Create</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    </Box>
    );
}
