import React, { useEffect } from 'react';
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";


export default function Login() {
    const [anchorEl, setAnchorEl] = useState(null);

    let navigate = useNavigate(); 
    const testLogin = () => {
        alert(window.location.href);
        navigate("/dashboard");
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
                            <div style = {{
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}className="row">
                                <div className="col-6 text-center">
                                    <button onClick={testLogin} className="btn btn-success" id="login-btn">Connect with Google Account</button>
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
