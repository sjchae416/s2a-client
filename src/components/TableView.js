import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DetailView from "./DetailView";
import { readTableAPI } from "../api";
import { loadSheetAPI, updateSheetAPI } from "../api";

export default function TableView({ view, listViews, user }) {
  const [tableData, setTableData] = useState([]);
  const [tableViewObjArr, settableViewObjArr] = useState([]);
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

  const [filteredtableViewObjArr, setFilteredtableViewObjArr] = useState([...tableViewObjArr]);

  const detailApps = listViews.filter((view) => view.viewType === "Detail");
  // console.log('detailApps', detailApps);

  let name, table, col, type, allowedActions, role;
  let viewFilter = "", userFilter = "";
  name = view.name;
  table = view.table;
  col = view.columns;
  type = view.viewType;
  allowedActions = view.allowedActions;
  role = view.roles;

  if (view.filter != "") viewFilter = view.filter;
   if (view.userFilter != "") userFilter = view.userFilter;

  useEffect(() => {
    getTableData();
  }, []);

  // useEffect(() => {
  //   console.log("tableViewObjArr in useEffect", tableViewObjArr);
  // }, [tableViewObjArr]);

  const getTableData = async () => {
    const data = await readTableAPI(view.table);
    setTableData(data);


    const sheetData = {
      name: data.name,
      url: data.url,
      sheetIndex: data.sheetIndex,
    };

    const tableData = await loadSheetAPI(sheetData);
    //gets the array of the data except for the name of the column

    const result = tableData.slice(1).map((row) => {
      const obj = {};
      tableData[0].forEach((key, index) => {
        obj[key] = row[index];
      });
      return obj;
    });
    settableViewObjArr(result);

    let filteredResult = tableViewObjArr.filter((row) => row[viewFilter] === "TRUE");
    filteredResult = filteredResult.filter((row) => row[userFilter] === user.email);
    setFilteredtableViewObjArr(filteredResult);

    console.log(filteredResult);

  };

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

  const checkKeyIntegrity = () => {
    let keyColumn = "";
    // Find Key Column
    for(let i = 0; i < tableData.columns.length; i++){
      if(tableData.columns[i].key){
        keyColumn = tableData.columns[i].name;
      }
    }
    let keys = [];
    for(let i = 0; i < tableViewObjArr.length; i++){
      keys.push(tableViewObjArr[i][keyColumn]);

    }
    let newRowDataKeyVal = newRowData[keyColumn].toString();
    return !keys.includes(newRowDataKeyVal);
  }


  const handleAddRow = async () => {
    //check if the fields are empty and type correctness
    if(!checkKeyIntegrity()){
      alert("Input a unique key. Key already exists!");
      return;
    }

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
    const updatedtableViewObjArr = [...tableViewObjArr, newRow];
    settableViewObjArr(updatedtableViewObjArr);
    setFilteredtableViewObjArr([...filteredtableViewObjArr, newRow]);
    setNewRowData({});

    //does not fill in default values for fields not added
    //tableViewObjArr.length is the end of the array ie the last row in tab;e
    let sheetIdx =
      tableData.sheetIndex +
      "!A" +
      (updatedtableViewObjArr.length + 1) +
      ":" +
      String.fromCharCode(64 + Object.keys(newRow).length) +
      (updatedtableViewObjArr.length + 1);
    let newValues = [];
    for (let key in newRow) {
      newValues.push(newRow[key]);
    }
    
    const sheetData = {
      url: tableData.url,
      range: sheetIdx,
      values: [newValues],
    };
    // console.log('tableData.url', tableData.url);
    // console.log('sheetIdx', sheetIdx);
    // console.log('newValues', newValues);
    await updateSheetAPI(sheetData);

    handleClose();
  };

  const handleDeleteRow = (rowData) => {
    setSelectedRowData(rowData);
    setDeleteOpen(true);
  };

  const handleDeleteClick = () => {
    setShowMinusButtons(!showMinusButtons);
  };

  const handleDelete = async () => {
    const deletedRow = {};
    col.forEach((columnName) => {
      deletedRow[columnName] = selectedRowData[columnName];
    });
    // console.log("Deleted Row:", deletedRow);

    // Find index of row to delete
    const index = tableViewObjArr.findIndex((row) => {
      return Object.keys(row).every((key) => {
        return row[key] === selectedRowData[key];
      });
    });

    let sheetIdx =
      tableData.sheetIndex +
      "!A" +
      (index + 2) +
      ":" +
      String.fromCharCode(64 + Object.keys(deletedRow).length) +
      (index + 2);
    let values = [];

    for (let i = 0; i < Object.keys(deletedRow).length; i++) {
      values[i] = "";
    }

   
    const sheetData = {
      url: tableData.url,
      range: sheetIdx,
      values: [values],
    };
    console.log('tableData.url', tableData.url);
    console.log('sheetIdx', sheetIdx);
    console.log('values', values);

    await updateSheetAPI(sheetData);

    // const sheetData = {
    //   url: "https://docs.google.com/spreadsheets/d/190mGZY2-lVzsT9W95nJxYMwIuc6OSSkdfT8dqIuHnpY/edit#gid=0",
    //   range: "Sheet1!A10:D10",
    //   values: [
    //     ["", "", "", ""],
    //   ],
    // };
    // await updateSheetAPI(sheetData);

    // let resource = {
    //     data:[
    //         {
    //             range: sheetIdx,
    //             values :''
    //         }
    //     ]
    // };

    // setDeleteRowPosition(resource);

    //Remove row from tableViewObjArr array
    if (index !== -1) {
      const updatedtableViewObjArr = [...tableViewObjArr];
      updatedtableViewObjArr.splice(index, 1);
      settableViewObjArr(updatedtableViewObjArr);
      setFilteredtableViewObjArr(updatedtableViewObjArr);
      console.log("updatedtableViewObjArr", updatedtableViewObjArr);
    }
    handleClose();
  };

  const handleRowClick = (row) => {
    const foundRow = tableViewObjArr.find((tableViewObjArrRow) => tableViewObjArrRow.Name === row.Name);
    setSelectedRow(foundRow);

    const foundRowIndex = tableViewObjArr.findIndex(
      (tableViewObjArrRow) => tableViewObjArrRow.Name === row.Name
    );
    setSelectedRowPosition(foundRowIndex);
    // console.log(foundRowIndex);
    // console.log(tableViewObjArr);
  };

  const updateRecord = (data) => {
    const index = filteredtableViewObjArr.findIndex((item) => item.Email === data.Email);
    filteredtableViewObjArr[index] = data;
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
          {filteredtableViewObjArr.map((row) => (
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
            views={detailApps}
            rowPosition={selectedRowPosition}
            onSelectedRowChange={setSelectedRow}
            editPosition={setEditRowPosition}
            deleteRowPosition={setDeleteRowPosition}
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
