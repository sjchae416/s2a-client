import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";
import TableList from "./TableList";
import Table from "./Table";

import NavigationBar from "./NavigationBar"

export default function CreateTable() {
  const [tablelist, setTableList] = useState([]);

  let navigate = useNavigate();


  return (
    <Box>
      <br />
      <br />
      <div class="container">
        <NavigationBar/>
        <br />

        <div class="card p-0">
          <div class="row no-gutters mt-2">
            <div class="col-1 border-right text-center">
              <button>Table</button>
            </div>
            <div class="col-1 border-right text-center">
              <button>Add Table</button>
              <TableList tablelist={tablelist} />
            </div>
            <div class="col-auto">
              <Table tablelist={tablelist} setTableList={setTableList} />

              {/*Save modal here*/}
              <div class="modal" id="create-app-modal">
                <div class="modal-dialog-centered">
                  <div class="modal-content">
                    <div class="card">
                      <div class="form-group save_ur_chnage">
                        <h5>Save Chnages</h5>
                        <h5>
                          Would you like to save your changes before proceeding?
                        </h5>
                        <button
                          class="btn btn-danger "
                          id="dismiss_create_app_modal"
                        >
                          Discard
                        </button>
                        <button
                          onClick={() => navigate("/")}
                          class="btn btn-success"
                          id="create-app-btns"
                        >
                          Save
                        </button>
                        <button class="btn btn-danger" id="create-app-btn">
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
      </div>
    </Box>
  );
}
