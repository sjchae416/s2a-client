import React, { useEffect } from 'react';
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";


export default function Dashboard() {
    const [anchorEl, setAnchorEl] = useState(null);

    let navigate = useNavigate(); 
    const testLogin = () => {
        navigate('/dashboard');
    }

    return (
        <Box>
            <br/><br/>
            <div className="container">
                <div className="card">
                    <h1 className="text-center">S 2 A</h1>

                    <div className="card">
                        <h1 className="text-center">G</h1>
                        <div className="card login-card mx-auto">
                            <p className="text-center">Please Login with Google Account</p>

                            <div className="form-group">
                                <label>Email</label>
                                <input type="text" name="" className="form-control"/>
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input type="text" name="" className="form-control"/>
                            </div>

                            <div className="row">
                                <div className="col-6 text-center">
                                    <a href="#">Sign up</a>
                                </div>
                                <div className="col-6 text-center">
                                    <button onClick={testLogin} className="btn btn-success" id="login-btn">Login</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <script src="js/login.js"></script>
        </Box>
    );
}
