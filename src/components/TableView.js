import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DetailView from "./DetailView";
import { readTableAPI } from "../api";
import { loadSheetAPI } from "../api";

export default function TableView({view, listViews }) {
  const [tableData, setTableData] = useState([]);
  const [test, setTest] = useState([]);
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

  const [filteredTest, setFilteredTest] = useState([...test]);

  const detailApps = listViews.filter((view) => view.viewType === "Detail");
  console.log(detailApps);

  let name, table, col, type, allowedActions, role;
  let viewFilter = "",
  userFilter = "";
  name = view.name;
  table = view.table;
  col = view.columns;
  type = view.viewType;
  allowedActions = view.allowedActions;
  role = view.roles;

  const getTableData = async () => {
    const data = await readTableAPI(view.table)
    setTableData(data);

    //console.log(data);

    const sheetData = {
      name: data.name,
      url: data.url,
      sheetIndex: data.sheetIndex,
    };
    const tableData = await loadSheetAPI(sheetData);
    //gets the array of the data except for the name of the column

    const result = tableData.slice(1).map(row => {
      const obj = {};
      tableData[0].forEach((key, index) => {
        obj[key] = row[index];
      });
      return obj;
    });
    
    setTest(result);

  };
  
  useEffect(() => {
    //console.log(view);
		getTableData();
    //console.log(test);

    const result = test.filter((row) => row[viewFilter]);
    setFilteredTest(result);

    console.log(result);
	}, []);

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
    console.log(newRow.length);
    console.log(sheetIdx);
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
          "endIndex": index + 1
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


  const updateRecord = (data) => {
    const index = filteredTest.findIndex((item) => item.Email === data.Email);
    filteredTest[index] = data;
  };

  return (
    <div>
      <h2>{name}</h2>
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
        {test.map((row) => (
          <tr
            key={row.Name}
            onClick={() => {
              if (detailApps.length > 0) {
                handleRowClick(row);
              }
            }}
            className={detailApps.length > 0 ? 'clickable' : ''}
          >
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
            views={detailApps}
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
