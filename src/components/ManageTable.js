import React, { useEffect } from 'react';

import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

export default function ManageDataSource() {

    let navigate = useNavigate(); 
  const handleDataView = () =>{

    navigate("/manage-table");
  }

  const handleViewView = () =>{

    navigate("/add-view");
  }

  return (
    <Box>
        <br />
        <br />
        <div className="container">
        <div className="card text-right">
            <span className=" ml-auto">
            <button className="btn btn-info"> &lt; </button>&nbsp;
            <span className=" ml-auto">
                <button className="btn btn-info"> &gt; </button>&nbsp;
                <span className=" ml-auto">
                <button className="btn btn-info">Save</button>&nbsp;
                <a className="profile-letter" href="profile.html">
                    P
                </a>
                </span>
            </span>
            </span>
        </div>
        <br />
        <div className="card p-0">
            <div className="row no-gutters mt-2">
            <div className="col-1 border-right text-center">
                <button onClick = {handleDataView}>
                Data
                </button>
                <hr />
                <button>Access Control</button>
                <hr />
                <button onClick = {handleViewView} >View</button>
                <hr />
                <button>Display</button>
                <hr />
            </div>
            <div className="col-1 border-right text-center">
                Data + <hr />
                Student Table
                <hr />
            </div>
            <div className="col-auto">
                <div className="container">
                <br />
                <div className="card" style={{ margin: "10px auto" }}>
                    <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        defaultValue="Student table"
                        className="form-control"
                    />
                    </div>
                    <div className="form-group">
                    <label>URL</label>
                    <input type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                    <label>Sheet Index</label>
                    <input
                        type="text"
                        defaultValue="Table1"
                        className="form-control"
                    />
                    </div>
                    <div className="form-group">
                    <label>Columns</label>
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
                        <tr>
                            <td>Name</td>
                            <td />
                            <td />
                            <td>
                            <input type="checkbox" />
                            </td>
                            <td />
                            <td>
                            <select>
                                <option />
                            </select>
                            </td>
                        </tr>
                        <tr>
                            <td>ID</td>
                            <td />
                            <td />
                            <td>
                            <input type="checkbox" />
                            </td>
                            <td />
                            <td>
                            <select>
                                <option />
                            </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td />
                            <td />
                            <td>
                            <input type="checkbox" />
                            </td>
                            <td />
                            <td>
                            <select>
                                <option />
                            </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Assignment</td>
                            <td />
                            <td />
                            <td>
                            <input type="checkbox" />
                            </td>
                            <td />
                            <td>
                            <select>
                                <option />
                            </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Grade</td>
                            <td />
                            <td />
                            <td>
                            <input type="checkbox" />
                            </td>
                            <td />
                            <td>
                            <select>
                                <option />
                            </select>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    </div>
                    <div className="text-right">
                    <button className="btn btn-danger">Cancel</button>
                    <button className="btn btn-info">Add</button>
                    </div>
                    <br />
                    <br />
                </div>
                <br />
                <br />
                </div>
            </div>
            </div>
        </div>
        <br />
        <br />
        </div>
  </Box>
  
  );
}