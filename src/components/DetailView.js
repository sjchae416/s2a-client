import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { updateSheetAPI, loadSheetAPI } from "../api";

const DetailView = ({
  row,
  views,
  rowPosition,
  onSelectedRowChange,
  updateRecord,
  editPosition,
  deleteRowPosition,
  tableData,
  tableViewObjArr,
  settableViewObjArr,
  setFilteredtableViewObjArr,
  appLog, 
  appId
}) => {
  const [selectedView, setSelectedView] = useState(null);
  const [name, setName] = useState("");
  const [table, setTable] = useState("");
  const [col, setCol] = useState([]);
  const [type, setType] = useState("");
  const [allowedActions, setAllowedActions] = useState([]);
  const [role, setRole] = useState("");
  const [editFilter, setEditFilter] = useState("");
  const [editableCols, setEditableCols] = useState([]);

  const handleSelectView = (view) => {
    setSelectedView(view);
    setName(view.name);
    setTable(view.table);
    setCol(view.columns);
    setType(view.viewType);
    setAllowedActions(view.allowedActions);
    setRole(view.roles);
    setEditFilter(view.editFilter || "");
    setEditableCols(view.editableCols || []);
    // console.log(view);
  };

  const disableEditButton = editFilter && !row[editFilter];
  const [isEditing, setIsEditing] = useState(false);
  const [editingRow, setEditingRow] = useState(null);
  const [editingFields, setEditingFields] = useState({});
  const [openDelete, setOpenDelete] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);

  const handleEditClick = () => {
    setIsEditing(true);
    setEditingRow(row);
    setEditingFields({});
  };


  function isUrl(input) {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
		const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
		return (urlRegex.test(input) || gmailRegex.test(input));
	};

  
  // Event handler for save button click
  const handleSaveClick = async () => {
    const updatedRow = { ...editingRow, ...editingFields };
    const editingFieldsArray = Object.keys(editingFields);

    //Type Corectness HERE
    const tableConfig = tableData.columns;
    for (let k = 0; k < tableConfig.length; k++) {
      for (let i = 0; i < editingFieldsArray.length; i++) {

        if (tableConfig[k].name === editingFieldsArray[i]) {
          if (tableConfig[k].type === "int" && isNaN(editingFields[editingFieldsArray[i]])) {
            return window.alert(`${editingFieldsArray[i]} input must be a number!`);
          }
          else if (tableConfig[k].type === "bool" && !['true', 'false'].includes(editingFields[editingFieldsArray[i]].toLowerCase())) {
            return window.alert(`${editingFieldsArray[i]} input must be a boolean value!`); 
          }
          else if (tableConfig[k].type === "url" && !isUrl(editingFields[editingFieldsArray[i]])) {
            return window.alert(`${editingFieldsArray[i]} input must be a url value!`); 
          }
          else if (typeof editingFields[editingFieldsArray[i]] !== 'string'){
            return window.alert(`${editingFieldsArray[i]} must be a string!`);
          }
        }
      }
    }

    
    // get the sheet index and the values into array
    // row position is the position in table that was edited
    let sheetIdx =
      tableData.sheetIndex +
      "!A" +
      (rowPosition + 2) +
      ":" +
      String.fromCharCode(64 + Object.keys(updatedRow).length) +
      (rowPosition + 2);
    let newValues = [];
    for (let key in updatedRow) {
      newValues.push(updatedRow[key]);
    }

    const sheetData = {
      url: tableData.url,
      range: sheetIdx,
      values: [newValues],
    };

    await updateSheetAPI(sheetData);

    const appObj = appLog.find(obj => obj.app_id === appId);
		// If the object exists, append the new log entry to its log array
		if (appObj) {
			appObj.log.push({
				view_name: name,
				function: "edit",
				row_index: sheetIdx,
				change: updatedRow
			});
		}

    const updatedTableViewObjArr = tableViewObjArr;
    updatedTableViewObjArr[rowPosition] = updatedRow;
    settableViewObjArr(updatedTableViewObjArr);

    setEditingRow(updatedRow);
    onSelectedRowChange(updatedRow);
    setIsEditing(false);
    updateRecord(updatedRow);
  };

  // Event handler for cancel button click
  const handleCancelClick = () => {
    setIsEditing(false);
  };

  // Event handler for field change
  const handleFieldChange = (fieldName, value) => {
    setEditingFields((prevFields) => ({
      ...prevFields,
      [fieldName]: value,
    }));
  };

  const handleDeleteClick = () => {
    setRowToDelete(row);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleConfirmDelete = async () => {
    let selectedRowData = rowToDelete;
    const deletedRow = {};
    col.forEach((columnName) => {
      deletedRow[columnName] = selectedRowData[columnName];
    });

    // Find index of row to delete
    const index = tableViewObjArr.findIndex((row) => {
      return Object.keys(row).every((key) => {
        return row[key] === selectedRowData[key];
      });
    });

    let sheetTableData = await loadSheetAPI({
      url: tableData.url,
      sheetIndex: tableData.sheetIndex,
    });
    sheetTableData.splice(index + 1, 1);

    console.log(row);
    let sheetIdx =
      tableData.sheetIndex +
      "!A2:" +
      String.fromCharCode(64 + Object.keys(row).length) +
      (tableViewObjArr.length + 1).toString();

    if (index !== -1) {
      const updatedtableViewObjArr = [...tableViewObjArr];
      updatedtableViewObjArr.splice(index, 1);
      settableViewObjArr(updatedtableViewObjArr);
      setFilteredtableViewObjArr(updatedtableViewObjArr);
    }

    let values = [];

    for (let i = 0; i < Object.keys(row).length; i++) {
      values[i] = "";
    }

    sheetTableData.push(values);
    sheetTableData.splice(0, 1);

    const sheetData = {
      url: tableData.url,
      range: sheetIdx,
      values: sheetTableData,
    };

    await updateSheetAPI(sheetData);

    const appObj = appLog.find(obj => obj.app_id === appId);
		// If the object exists, append the new log entry to its log array
		if (appObj) {
			appObj.log.push({
				view_name: name,
				function: "delete",
				row_index: sheetIdx,
				change: deletedRow
			});
		}

    // deleteRowPosition(resource);

    setOpenDelete(false);
    onSelectedRowChange(null);
  };

  const handleClose = () => {
    onSelectedRowChange(null);
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "20px",
        position: "fixed",
        top: "50%",
        left: "50%",
        width: "75%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="detail-sidebar">
        <h3>Detail Views</h3>
        {!openDelete &&
          views.map((view) => (
            <button
              key={view.name}
              onClick={() => handleSelectView(view)}
              className="button-link"
            >
              {view.name}
            </button>
          ))}
      </div>
      <div className="detail-main-container">
        {views.length == 0 && <h4>You do not have access to any detail views</h4>}
        {selectedView && !openDelete && <h3>{name}</h3>}
        {selectedView && !openDelete && !isEditing && (
          <Button
            variant="contained"
            disabled={
              !allowedActions.includes("Edit Record") ||
              (disableEditButton && !allowedActions.includes("Edit Record"))
            }
            onClick={handleEditClick}
          >
            Edit Record
          </Button>
        )}
        {selectedView && !openDelete && !isEditing && (
          <Button
            variant="contained"
            disabled={!allowedActions.includes("Delete Record")}
            onClick={handleDeleteClick}
          >
            Delete Record
          </Button>
        )}
        {openDelete ? (
          <div className="modal-content">
            <h2>Delete Row</h2>
            <h4>Are you sure you want to delete this row?</h4>
            {row && (
              <div>
                {col.map((columnName) => (
                  <div key={columnName}>
                    <strong>{columnName}: </strong>
                    <span>{row[columnName]}</span>
                    <br />
                    <br />
                  </div>
                ))}
              </div>
            )}
            <div>
              <Button variant="contained" onClick={handleCloseDelete}>
                Cancel
              </Button>
              <Button variant="contained" onClick={handleConfirmDelete}>
                Confirm
              </Button>
            </div>
          </div>
        ) : (
          col.map((column) => (
            <div key={column}>
              {isEditing && editableCols.includes(column) ? (
                <div>
                  <br />
                  <TextField
                    label={column}
                    value={editingFields[column] ?? row[column]}
                    onChange={(event) =>
                      handleFieldChange(column, event.target.value)
                    }
                  />
                  <br />
                </div>
              ) : (
                <>
                  <strong>{column}: </strong>
                  {row[column]}
                </>
              )}
            </div>
          ))
        )}
        {isEditing && (
          <div>
            <Button variant="contained" onClick={handleCancelClick}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSaveClick}>
              Save
            </Button>
          </div>
        )}
        <Button onClick={handleClose}>Close</Button>
      </div>
    </div>
  );
};
export default DetailView;
