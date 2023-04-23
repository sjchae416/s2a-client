import React, { useEffect, useState } from "react";
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import DetailView from "./DetailView";


export default function TableView({app}) {
  let name, table, col, type, allowedActions, role;
  let viewFilter = "", userFilter = "";
  for(let i = 0; i < app.length; i++){
    if(app[i].viewType == 'Table'){
      name = app[i].name;
      table = app[i].table;
      col = app[i].columns;
      type = app[i].viewType;
      allowedActions = app[i].allowedActions;
      role = app[i].roles;

      if(app[i].filter != "") viewFilter = app[i].filter;
      if(app[i].userFilter != "") userFilter = app[i].userFilter;
    }
  }

  const [open, setOpen] = useState(false);
  const [openDelete, setDeleteOpen] = useState(false);
  const [newRowData, setNewRowData] = useState({});
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openDetail, setOpenDetail] = useState(false);
  const [showMinusButtons, setShowMinusButtons] = useState(false);

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
      "Name": "Henry Chen",
      "Email": "henry@gmail.com",
      "Class": "CSE 312",
      "Grade": "A",
      "Passed": true
    },
    {
      "Name": "Bob Chen",
      "Email": "bob@gmail.com",
      "Class": "CSE 216",
      "Grade": "A",
      "Passed": true
    }
  ]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDeleteOpen(false);
  };

  const handleModalInputChange = (event) => {
    const { name, value } = event.target;
    setNewRowData({ ...newRowData, [name]: value });
  };

  const handleAddRow = () => {
    //check if the fields are empty
    for(let i = 0; i < col.length; i++) {
      if(!newRowData[col[i]]) {
        alert("Please fill in all fields");
        return;
      }
    }

    const newRow = {};
    col.forEach((column) => {
      newRow[column] = newRowData[column] || '';
    });
    setTest([...test, newRow]); // Add the new row to the table data
    console.log(newRow);
    handleClose();
  };

  const handleDeleteRow = (rowData) => {
    setSelectedRowData(rowData);
    setDeleteOpen(true);
  };

  const handleDeleteClick = () => {
    setShowMinusButtons(!showMinusButtons);
  }

  const handleDelete = () => {
    const deletedRow = {};
    col.forEach((columnName) => {
      deletedRow[columnName] = selectedRowData[columnName];
    });
    console.log('Deleted Row:', deletedRow);
    // Call the delete function to remove the row from the data
    // ...
    handleClose();
  };

  const handleRowClick = (row) => {
    const foundRow = test.find((testRow) => testRow.Name === row.Name);
    setSelectedRow(foundRow);
    // console.log(foundRow);
  }

  let filteredTest = test;
  if (viewFilter !== "") {
    filteredTest = test.filter((row) => row[viewFilter]);
  }

  return (
    <div>
      <Button variant="contained" onClick={handleOpen} disabled={!allowedActions.includes('Add Record') ? true : false}>Add Record</Button>
      <Button variant="contained" onClick={handleDeleteClick} disabled={!allowedActions.includes('Delete Record') ? true : false}>Delete Record</Button>
      <br/>
      <table>
        <thead>
          <tr>
            {col.map((column) => (
              <th key={column}>{column}</th>
            ))}
            {showMinusButtons && <th></th>}
          </tr>
        </thead>
        <tbody>
          {filteredTest.map((row) => (
            <tr key={row.Name} onClick={() => type === 'Detail' && handleRowClick(row)}>
              {col.map((column) => (
                <td key={column}>{row[column]}</td>
              ))}
              {showMinusButtons && <td><button onClick={() => handleDeleteRow(row)}>-</button></td>}
            </tr>
          ))}
        </tbody>
      </table>
      {type === 'Detail' && selectedRow && (
        <Modal open={true} onClose={() => setSelectedRow(null)}>
          <DetailView row={selectedRow} app={app} />
        </Modal>
      )}
      <Modal open={open} onClose={handleClose}>
        <div className="modal-content">
          <h2>ADD ROW</h2>
          {col.map((columnName) => (
            <div>
              <TextField
                key={columnName}
                name={columnName}
                label={columnName}
                value={newRowData[columnName] || ''}
                onChange={handleModalInputChange}
              />
              <br/>
              <br/>
            </div>
          ))}
          <br/>
          <div>
           <Button variant="contained" onClick={handleClose}>Cancel</Button>
            <Button className="btn btn-danger " variant="contained" onClick={handleAddRow}>Add</Button>
          </div>
          
        </div>
      </Modal>
      <Modal open={openDelete} onClose={handleClose}>
        <div className="modal-content">
          <h2>Delete Row</h2>
          <h4>Are you sure you want to delete this row?</h4>
          {selectedRowData && (
            <div>
             {col.map((columnName) => (
              <div key={columnName}>
                <strong>{columnName}: </strong>
                <span>{selectedRowData[columnName]}</span>
                <br />
                <br />
              </div>
            ))}
            </div>
          )}
          <div>
            <Button variant="contained" onClick={handleClose}>
              Close
            </Button>
            <Button variant="contained" onClick={handleDelete}>
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
