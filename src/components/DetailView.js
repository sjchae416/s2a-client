import React, { useEffect, useState } from "react";
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


export default function DetailView({app}) {
  const name = app.name;
  const table = app.table;
  const col = app.columns;
  const type = app.viewType;
  const allowedActions = app.allowedActions;
  const role = app.roles;

  let filter = "", userFilter = "", editFilter = "", editableCols = [];
  if(app.filter != "") filter = app.filter;
  if(app.userFilter != "") userFilter = app.userFilter;
  if(app.editFilter != "") editFilter = app.editFilter;
  if(app.editableCols != []) editableCols = app.editableCols;

  const [test, setTest] = useState([
    {
      "Name": "George Chen",
      "Email": "george@gmail.com",
      "Class": "CSE 314",
      "Grade": "B",
      "Passed": true
    },
    {
      "Name": "Bob Ross",
      "Email": "bob@gmail.com",
      "Class": "CSE 215",
      "Grade": "A",
      "Passed": true
    },
    {
      "Name": "John Smith",
      "Email": "john@gmail.com",
      "Class": "CSE 220",
      "Grade": "B-",
      "Passed": true
    },
    {
      "Name": "Kevin Lin",
      "Email": "kevin@gmail.com",
      "Class": "CSE 214",
      "Grade": "C-",
      "Passed": false
    },
    {
      "Name": "George Chen",
      "Email": "george@gmail.com",
      "Class": "CSE 312",
      "Grade": "A",
      "Passed": true
    },
    {
      "Name": "Bob Ross",
      "Email": "bob@gmail.com",
      "Class": "CSE 216",
      "Grade": "A",
      "Passed": true
    }
  ]);
  return (
    <div>
      
    </div>
  );
}