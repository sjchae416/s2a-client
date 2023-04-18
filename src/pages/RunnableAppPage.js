import Box from '@mui/material/Box';
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import NavigationBar from '../components/NavigationBar.js';

import { TableView } from '../components';


export default function RunnableAppPage({user}) {
    const { name } = useParams();
    const loggedInUser = user;

    const app1 = {
        "name" : "test1",
        "table": {
            "name": "test",
            "url" : "https://docs.google.com/spreadsheets/d/1yHt-_Pbu52TJW3znWxo9VlHnHOQaFVvRMTpkrWYtM_s/edit#gid=1530492309",
            "sheetIndex" : "Sheet1",
            "columns": [
                {"name" : "Name", "key" : "true", "label":"false","reference": "test2", "type": "string"},
                {"name" : "Email", "key" : "false", "label":"true","reference": "test1", "type": "string"},
                {"name" : "Class", "key" : "false", "label":"false","reference": "test1", "type": "string"},
                {"name" : "Grade", "key" : "false", "label":"false","reference": "test2", "type": "string"},
                {"name" : "Passed", "key" : "false", "label":"false","reference": "test2", "type": "bool"},
            ]
        },
        "columns" : ["Name", "Email", "Class", "Grade"],
        "viewType" : "Table",
        
    };

    const logOut = () => {
        window.open(
          `http://localhost:3333/auth/logout`,
          // `http://localhost:${process.env.SERVER_PORT}/auth/logout`,
          "_self"
        );
    };

    return (
        <div>
            <br />
            <br />
            <div className="container">
                <NavigationBar googleUser={user}/>
                <div>
                    <h2>{name}</h2>
                    <TableView/>
                </div>
            </div>
        </div>
    );
}