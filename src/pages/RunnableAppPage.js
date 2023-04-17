import Box from '@mui/material/Box';
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

import { TableView } from '../components';


export default function RunnableAppPage({user}) {
    const { name } = useParams();
    const [showMenu, setShowMenu] = useState(false);
    const loggedInUser = user;
    const logOut = () => {
        window.open(
          `http://localhost:3333/auth/logout`,
          // `http://localhost:${process.env.SERVER_PORT}/auth/logout`,
          "_self"
        );
    };

    const toggleMenu = () => {
    setShowMenu(!showMenu);
    };

    return (
        <div>
            <br />
            <br />
            <div className="container">
                <div className="card card_one">
                <Link to="/">
                    {/* <Link to="/dashboard"> */}
                    <h3>S2A</h3>
                </Link>
                <span className="profile-letter ml-auto" onClick={toggleMenu}>
                    {loggedInUser.name && loggedInUser.name.charAt(0).toUpperCase()}
                </span>
                {showMenu && (
                    <div className="dropdown-menu">
                    <button className="btn-logout-dropdown" onClick={logOut}>
                        Logout
                    </button>
                    </div>
                )}
                </div>
                <div>
                    <h2>{name}</h2>
                    <TableView/>
                </div>
            </div>
        </div>
    );
}