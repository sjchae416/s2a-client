import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DetailView from "./DetailView";

export default function TableView({ view, listViews }) {
  let name, table, col, type, allowedActions, role;
  let viewFilter = "",
    userFilter = "";
  name = view.name;
  table = view.table;
  col = view.columns;
  type = view.viewType;
  allowedActions = view.allowedActions;
  role = view.roles;

  if (view.filter != "") viewFilter = view.filter;
  if (view.userFilter != "") userFilter = view.userFilter;

  const [open, setOpen] = useState(false);
  const [openDelete, setDeleteOpen] = useState(false);
  const [newRowData, setNewRowData] = useState({});
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  // const [openDetail, setOpenDetail] = useState(false);
  const [showMinusButtons, setShowMinusButtons] = useState(false);
  const [selectedRowPosition, setSelectedRowPosition] = useState(0);

  // States to store the position of the row added in the sheet
  const [addRowPosition, setAddRowPosition] = useState({});

  // States to store the position of the row edited in the sheet
  const [editPosition, setEditRowPosition] = useState({});

  // States to store the position of the row delete in the sheet
  const [deleteRowPosition, setDeleteRowPosition] = useState({});


  const [test, setTest] = useState([
    {
      Name: "George Chen",
      Email: "george@gmail.com",
      Class: "CSE 314",
      Grade: "B",
      Passed: true,
    },
    {
      Name: "Bob Ross",
      Email: "bob@gmail.com",
      Class: "CSE 215",
      Grade: "A",
      Passed: true,
    },
    {
      Name: "John Smith",
      Email: "john@gmail.com",
      Class: "CSE 220",
      Grade: "B-",
      Passed: true,
    },
    {
      Name: "Kevin Lin",
      Email: "kevin@gmail.com",
      Class: "CSE 214",
      Grade: "C-",
      Passed: false,
    },
    {
      Name: "Henry Chen",
      Email: "henry@gmail.com",
      Class: "CSE 312",
      Grade: "A",
      Passed: true,
    },
    {
      Name: "Bob Chen",
      Email: "bob@gmail.com",
      Class: "CSE 216",
      Grade: "A",
      Passed: true,
    },
  ]);

  const [filteredTest, setFilteredTest] = useState([...test]);

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
    //check if the fields are empty and type correctness
    for (let i = 0; i < col.length; i++) {
      if (!newRowData[col[i]]) {
        alert("Please fill in all fields");
        return;
      }
      if (typeof newRowData[col[i]] !== "string") {
        return window.alert(`${newRowData[col[i]]} must be string only!`);
      }
    }

    const newRow = {};
    col.forEach((column) => {
      newRow[column] = newRowData[column] || "";
    });
    const updatedTest = [...test, newRow];
    setTest(updatedTest);
    setFilteredTest([...filteredTest, newRow]);
    setNewRowData({});

    //does not fill in default values for fields not added
    //test.length is the end of the array ie the last row in tab;e
    let sheetIdx = table.sheetIndex + "!A" + test.length + ":" + String.fromCharCode(64 + newRow.length) + test.length;
    let newValues = [];
    for (let key in newRow) {
      newValues.push(newRow[key]);
    }

    console.log(newValues);

    let resource = {
      data: [
        {
          range: sheetIdx,
          values: [newValues]
        }
      ],
      valueInputOption: "USER_ENTERED"
    };

    setAddRowPosition(resource);

    console.log(newRow);
    console.log(updatedTest);
    handleClose();
  };

  const handleDeleteRow = (rowData) => {
    setSelectedRowData(rowData);
    setDeleteOpen(true);
  };

  const handleDeleteClick = () => {
    setShowMinusButtons(!showMinusButtons);
  };

  const handleDelete = () => {
    const deletedRow = {};
    col.forEach((columnName) => {
      deletedRow[columnName] = selectedRowData[columnName];
    });
    console.log("Deleted Row:", deletedRow);

    // Find index of row to delete
    const index = test.findIndex((row) => {
      return Object.keys(row).every((key) => {
        return row[key] === selectedRowData[key];
      });
    });

    let resource = {
      "deleteDimension": {
        "range": {
          "sheetId": table.sheetIndex,
          "dimension": "ROWS",
          "startIndex": index,
          "endIndex": index
        }
      }
    };
    setDeleteRowPosition(resource);


    // Remove row from test array
    if (index !== -1) {
      const updatedTest = [...test];
      updatedTest.splice(index, 1);
      setTest(updatedTest);
      setFilteredTest(updatedTest);
      console.log(updatedTest);
    }
    handleClose();
  };

  const handleRowClick = (row) => {
    const foundRow = test.find((testRow) => testRow.Name === row.Name);
    setSelectedRow(foundRow);

    const foundRowIndex = test.findIndex((testRow) => testRow.Name === row.Name);
    setSelectedRowPosition(foundRowIndex);
    // console.log(foundRowIndex);
    // console.log(test);
  };

  useEffect(() => {
    const result = test.filter((row) => row[viewFilter]);
    setFilteredTest(result);
  }, []);

  const updateRecord = (data) => {
    const index = filteredTest.findIndex((item) => item.Email === data.Email);
    filteredTest[index] = data;
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleOpen}
        disabled={!allowedActions.includes("Add Record") ? true : false}
      >
        Add Record
      </Button>
      <Button
        variant="contained"
        onClick={handleDeleteClick}
        disabled={!allowedActions.includes("Delete Record") ? true : false}
      >
        Delete Record
      </Button>
      <br />
      <br />
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
            <tr key={row.Name} onClick={() => handleRowClick(row)}>
              {col.map((column) => (
                <td key={column}>{row[column]}</td>
              ))}
              {showMinusButtons && (
                <td>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteRow(row);
                    }}
                  >
                    -
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {selectedRow && (
        <Modal open={true} onClose={() => setSelectedRow(null)}>
          <DetailView
            updateRecord={updateRecord}
            row={selectedRow}
            views={listViews}
            rowPosition = {selectedRowPosition}
            onSelectedRowChange={setSelectedRow}
            editPosition = {setEditRowPosition}
            deleteRowPosition = {setDeleteRowPosition}
          />
        </Modal>
      )}
      <Modal open={open} onClose={handleClose}>
        <div className="modal-content">
          <h2>ADD ROW</h2>
          {col.map((columnName) => (
            <div key={columnName}>
              <TextField
                name={columnName}
                label={columnName}
                value={newRowData[columnName] || ""}
                onChange={handleModalInputChange}
              />
              <br />
              <br />
            </div>
          ))}
          <br />
          <div>
            <Button variant="contained" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              className="btn btn-danger "
              variant="contained"
              onClick={handleAddRow}
            >
              Add
            </Button>
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
