import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DetailView from "./DetailView";
import { readTableAPI } from "../api";
import { loadSheetAPI, updateSheetAPI } from "../api";

export default function TableView({ view, listViews, user }) {
  const [tableData, setTableData] = useState([]);
  const [tableConfig, setTableConfig] = useState([]);
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

  const [filteredtableViewObjArr, setFilteredtableViewObjArr] = useState(null);

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
  let newRowDataKeyVal = "";

  if (view.filter != "") viewFilter = view.filter;
   if (view.userFilter != "") userFilter = view.userFilter;

  useEffect(() => {
    getTableData();
  }, []);

  useEffect(() => {
    console.log(tableViewObjArr);
  }, [tableViewObjArr]);

  // useEffect(() => {
  //   console.log("tableViewObjArr in useEffect", tableViewObjArr);
  // }, [tableViewObjArr]);

  const getTableData = async () => {
    const data = await readTableAPI(view.table);
    setTableData(data);
    setTableConfig(data.columns)

    const sheetData = {
      name: data.name,
      url: data.url,
      sheetIndex: data.sheetIndex,
    };
    const sheetTableData = await loadSheetAPI(sheetData);
    //gets the array of the data except for the name of the column

    let result = sheetTableData.slice(1).map((row) => {
      const obj = {};
      sheetTableData[0].forEach((key, index) => {
        obj[key] = row[index];
      });
      if(obj.length != 0)
        return obj;
      else  
        return null;  
    });


    if(result)
      settableViewObjArr(result);
    else
      settableViewObjArr(null);
    

    let filteredResult = {};
    if(viewFilter == "" && userFilter == ""){
      filteredResult = result;
    }
    else{
      filteredResult = result.filter((row) => row[viewFilter] === "TRUE");
      if(userFilter)
        filteredResult = filteredResult.filter((row) => row[userFilter] == user.email);
    }
    
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
    for (let i = 0; i < tableData.columns.length; i++) {
      if (tableData.columns[i].key) {
        keyColumn = tableData.columns[i].name;
      }
    }
    let keys = [];
    for (let i = 0; i < tableViewObjArr.length; i++) {
      keys.push(tableViewObjArr[i][keyColumn]);
    }
    newRowDataKeyVal = newRowData[keyColumn].toString();
    return !keys.includes(newRowDataKeyVal);
  };

  const handleAddRow = async () => {
    //check if the fields are empty and type correctness
    if (!checkKeyIntegrity()) {
      alert(`Input a unique key. Key: "${newRowDataKeyVal}" already exists!`);
      return;
    }
    if (newRowData.Name && typeof newRowData.Name !== "string") {
      return window.alert(`Name must be string only!`);
    } else if (
      newRowData["Allergen 1"] &&
      !["true", "false"].includes(newRowData["Allergen 1"].toLowerCase())
    ) {
      return window.alert(`Allergen 1 must be bool only!`);
    } else if (
      newRowData["Allergen 2"] &&
      !["true", "false"].includes(newRowData["Allergen 2"].toLowerCase())
    ) {
      return window.alert(`Allergen 2 must be bool only!`);
    } else if (
      newRowData["Allergen 3"] &&
      !["true", "false"].includes(newRowData["Allergen 3"].toLowerCase())
    ) {
      return window.alert(`Allergen 3 must be bool only!`);
    } else if (
      newRowData["Allergen 4"] &&
      !["true", "false"].includes(newRowData["Allergen 4"].toLowerCase())
    ) {
      return window.alert(`Allergen 4 must be bool only!`);
    } else if (newRowData.Student && typeof newRowData.Student !== "string") {
      return window.alert(`Student must be string only!`);
    } else if (newRowData.Classes && typeof newRowData.Classes !== "string") {
      return window.alert(`Classes must be string only!`);
    } else if (newRowData.Grades && typeof newRowData.Grades !== "string") {
      return window.alert(`Grades must be string only!`);
    } else if (newRowData.ID && isNaN(newRowData.ID)) {
      return window.alert(`ID must be number only!`);
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
    for(let i = 0; i < tableConfig.length; i ++){
        if(col.includes(tableConfig[i].name)){
            newRow[tableConfig[i].name] = newRowData[tableConfig[i].name];
        }
        else{ 
            if(tableConfig[i].initialValue){ //if there is initial value then set equal
                console.log(tableConfig[i].initialValue);
                if(tableConfig[i].initialValue === "=ADDED_BY();")
                    newRow[tableConfig[i].name] = user.email;
                else{
                    newRow[tableConfig[i].name] = tableConfig[i].initialValue;
                }
                
            }
            else
                newRow[tableConfig[i].name] = "";
        }
    }

    // col.forEach((column) => {
    //     newRow[column] = newRowData[column] || "";
    // });
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
      "!A2:" +
      String.fromCharCode(64 + Object.keys(deletedRow).length) +
      (tableViewObjArr.length + 1).toString();

    if (index !== -1) {
      const updatedtableViewObjArr = [...tableViewObjArr];
      updatedtableViewObjArr.splice(index, 1);
      settableViewObjArr(updatedtableViewObjArr);
      setFilteredtableViewObjArr(updatedtableViewObjArr);
    }

    let values = [];

    for (let i = 0; i < Object.keys(deletedRow).length; i++) {
      values[i] = "";
    }

    let arr2D = tableViewObjArr.map((obj) => Object.values(obj));
    arr2D.splice(index, 1);

    arr2D.push(values);

    const sheetData = {
      url: tableData.url,
      range: sheetIdx,
      values: arr2D,
    };

    console.log("sheetData", sheetData);

    await updateSheetAPI(sheetData);

    handleClose();
  };

  const handleRowClick = (row) => {
    // const foundRow = tableViewObjArr.find((tableViewObjArrRow) => tableViewObjArrRow.Name === row.Name);
    setSelectedRow(row);

    const foundRowIndex = tableViewObjArr.findIndex(
      (tableViewObjArrRow) => tableViewObjArrRow === row
    );
    setSelectedRowPosition(foundRowIndex);
    // console.log(tableViewObjArr);
  };

  const updateRecord = (data) => {
    const index = filteredtableViewObjArr.findIndex(
      (item) => item.Email === data.Email
    );
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
          {filteredtableViewObjArr?.map((row) => (
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
            tableData={tableData}
            tableViewObjArr={tableViewObjArr}
            settableViewObjArr={settableViewObjArr}
          />
        </Modal>
      )}
     <Modal open={open} onClose={handleClose}>
      <div className="modal-content" style={{ maxHeight: "80vh", overflowY: "auto" }}>
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
