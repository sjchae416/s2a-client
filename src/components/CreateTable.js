import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";
import test from "./test2.json";
import Modal from "react-modal";
import fs from 'fs';

export default function CreateTable() {
  let navigate = useNavigate();
  const [showTable, setShowTable] = useState(false);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [sheetIndex, setSheetIndex] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const keys = Object.keys(test[0]);

  const handleLoad = () => {
    if (name && url && sheetIndex) {
      // Create the JSON object
      const data = {
        name: name,
        url: url,
        sheetidx: sheetIndex,
      };

      //requires backend to save the data for tables
      

    } else {
      alert("Please fill out all fields before submitting");
      return;
    }
    //let test = "./" + url.toString();
    //let file = require(test);
    
    //keys = Object.keys(test[0]);
    // alert(keys);
    setShowTable(true);
  };

  useEffect(() => {
    const create_app_modal_btn = document.querySelector("#create-app");
    const create_app_modal = document.querySelector("#create-app-modal");
    const dismiss_create_app_modal = document.querySelector(
      "#dismiss_create_app_modal"
    );
    const create_app_btn = document.querySelector("#create-app-btn");

    create_app_modal_btn.onclick = () => {
      create_app_modal.style.display = "block";
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

  function handleSave() {
    setShowConfirmation(true);
  }

  function handleConfirmSave() {
    setShowConfirmation(false);
    // Navigate to dashboard
    navigate('/dashboard');
  }

  function handleCancelSave() {
    setShowConfirmation(false);
    // Stay on current screen
  }

  // let ManageTableDetail = (
  //   {showTable && ( 
  //       <table>
  //         <thead>
  //           <tr>
  //             <th>Header 1</th>
  //             <th>Header 2</th>
  //             <th>Header 3</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           <tr>
  //             <td>Data 1</td>
  //             <td>Data 2</td>
  //             <td>Data 3</td>
  //           </tr>
  //         </tbody>
  //       </table>
  //     )}
  // );

  return (
    <Box>
      <br />
      <br />
      <div class="container">
        <div class="card text-right card_one">
          <h3 id="create-app">S2A</h3>

          <span class=" ml-auto">
            <button class="btn btn-info"> {"<"} </button>&nbsp;
            <span class=" ml-auto" />
            <button class="btn btn-info"> {">"} </button>&nbsp;
            <span class=" ml-auto" />
            <button className="btn btn-info" onClick={handleSave}>
              Save
            </button>
            &nbsp;
            <a className="profile-letter" href="profile.html">
              P
            </a>
          </span>
          {showConfirmation && (
            <div className="modal">
              <div className="modal-content">
                <p>Are you sure you want to save changes?</p>
                <button onClick={handleConfirmSave}>Yes</button>
                <button onClick={handleCancelSave}>No</button>
              </div>
            </div>
          )}
        </div>

        <br />
          <div class="card p-0">
            <div class="row no-gutters mt-2">
              <div class="col-1 border-right text-center">
                <button>Table</button>
              </div>
              <div class="col-1 border-right text-center">
                <button>Add Table</button> <hr />
              </div>
              <div class="col-auto">
                <div class="container">
                  <br />
                  <div
                    class="card"
                    style={{
                      margin: "10px auto",
                      width: "480px",
                      maxWidth: "100%",
                    }}
                  >
                    <div class="form-group">
                      <label>Name</label>
                      <input
                        required
                        type="text"
                        class="form-control"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div class="form-group">
                      <label>URL</label>
                      <input
                        required
                        type="text"
                        class="form-control"
                        onChange={(e) => setUrl(e.target.value)}
                      />
                    </div>
                    <div class="form-group">
                      <label>Sheet Index</label>
                      <input
                        required
                        class="form-control"
                        type="number" 
                        defaultvalue="1"
                        onChange={(e) => setSheetIndex(e.target.value)}
                      />
                    </div>

                    <div class="text-right">
                      <button onClick={handleLoad} class="btn btn-info">
                        Load
                      </button>
                    </div>
                  {showTable && ( 
                    <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Key</th>
                        <th>Function</th>
                        <th>Label</th>
                        <th>Reference</th>
                        <th>Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {keys.map((key) => (
                        <tr key={key}>
                          <td>{key}</td>
                          <td><input type="checkbox" /></td>
                          <td />
                          <td>
                            <input type="radio" />
                          </td>
                          <td />
                          <td>
                            <select>
                              <option />
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  )}

                  <br />
                  <br />
                </div>
                <br />
                <br />
              </div>
              <div class="modal" id="create-app-modal">
                <div class="modal-dialog-centered">
                  <div class="modal-content">
                    <div class="card">
                      <div class="form-group save_ur_chnage">
                        <h5>Save Changes</h5>
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
                          onClick={() => navigate("/dashboard")}
                          class="btn btn-success"
                          id="create-app-btn"
                        >
                          Save
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
