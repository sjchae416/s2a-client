import React, { useEffect } from 'react';
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

export default function AddFile() {

    let navigate = useNavigate(); 
    const handleDataView = () =>{

        navigate("/manage-table");
      }
    
      const handleViewView = () =>{
    
        navigate("/add-view");
      }

      const handleCreate = () =>{
    
        navigate("/table-view");
      }

    return (
        <Box>
            <br/><br/>
            <div class="container">

                <div class="card text-right">
                        <span class=" ml-auto">
                            <button class="btn btn-info"> {'<'} </button>&nbsp;
                            <span class=" ml-auto"/><button class="btn btn-info"> {'>'} </button>&nbsp;
                            <span class=" ml-auto"/><button class="btn btn-info">Save</button>&nbsp;
                            <a class="profile-letter" href="profile.html">P</a>
                        </span>
                </div>

                <br/>

                <div class="card p-0">

                    <div class="row no-gutters mt-2">
                        <div class="col-1 border-right text-center">
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
                        <div class="col-1 border-right text-center">
                            View+ <hr/>
                            Empty V<hr/>
                        </div>
                        <div class="col-auto">
                            
                            <div class="container">
                                <br/>
                                <div class="card" style={{margin: '10px auto', width: '480px', maxWidth: '100%'}}>

                                    <div class="form-group">
                                        <label>View Name</label>
                                        <input type="text" value="Empty V" class="form-control"/>
                                    </div>

                                    <div class="form-group">
                                        <label>Table</label>
                                        <select class="form-control">
                                            <option></option>
                                        </select>
                                    </div>

                                    <div class="form-group">
                                        <label>Column</label>
                                        <input type="text" class="form-control"/>
                                    </div>

                                    <div class="form-group">
                                        <label>View Type</label><br/>
                                        <button class="btn btn-info w-auto">Table</button>
                                        <button class="btn btn-info w-auto">Detail</button>
                                    </div>

                                    <div class="form-group">
                                        <label>Allowed Action</label>
                                        <select class="form-control">
                                            <option></option>
                                        </select>
                                    </div>

                                    <div class="form-group">
                                        <label>Roles</label>
                                        <select class="form-control">
                                            <option></option>
                                        </select>
                                    </div>

                                    <div class="text-right">
                                        <button class="btn btn-danger">Cancel</button>
                                        <button onClick = {handleCreate} class="btn btn-info">Create</button>
                                    </div>

                                    <br/><br/>

                                </div>

                                <br/><br/>

                            </div>

                        </div>
                    </div>
             </div>
            <br/>
            <br/><br/>
            </div>
        </Box>
    );
}