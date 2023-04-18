import React, { useEffect, useState } from "react";
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


export default function TableView({app}) {
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

  const [open, setOpen] = useState(false);
  const [openDelete, setDeleteOpen] = useState(false);
  const [newRowData, setNewRowData] = useState({});
  const [selectedRowData, setSelectedRowData] = useState(null);

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

  const handleRowClick = (rowData) => {
    setSelectedRowData(rowData);
    setDeleteOpen(true);
  };

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

  const filteredTest = test.filter(row => row[filter]);

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>Add Row</Button>
      <br/>
      <table>
        <thead>
          <tr>
            {col.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredTest.map((row) => (
            <tr key={row.Name} onClick={() => handleRowClick(row)}>
              {col.map((column) => (
                <td key={column}>{row[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
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
