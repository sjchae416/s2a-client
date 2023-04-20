import React, { useEffect, useState } from "react";
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


const DetailView = ({row, app}) => {
  const name = app.name;
  const table = app.table;
  const col = app.columns;
  const type = app.viewType;
  const allowedActions = app.allowedActions;
  const role = app.roles;

  let editFilter = "", editableCols = [];
  if(app.editFilter != "") editFilter = app.editFilter;
  if(app.editableCols != []) editableCols = app.editableCols;

  const disableEditButton = editFilter && !row[editFilter];

  return (
    <div style={{ backgroundColor: "white", padding: "20px", position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
      <h3>{app.name}</h3>
      <Button variant="contained" disabled={!allowedActions.includes('Edit Record') || disableEditButton}>Edit Record</Button>
      <Button variant="contained" disabled={!allowedActions.includes('Delete Record') ? true : false}>Delete Record</Button>
      {col.map((column) => (
        <div key={column}>
          <strong>{column}: </strong>{row[column]}
        </div>
      ))}
    </div>
    
  );
}
export default DetailView;