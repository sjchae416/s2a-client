import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const DetailView = ({ 
  row, 
  views, 
  rowPosition, 
  onSelectedRowChange, 
  updateRecord, 
  editPosition, 
  deleteRowPosition 
}) => {
  let name, table, col, type, allowedActions, role;
  let editFilter = "",
    editableCols = [];
  for (let i = 0; i < views.length; i++) {
    if (views[i].viewType == "Detail") {
      name = views[i].name;
      table = views[i].table;
      col = views[i].columns;
      type = views[i].viewType;
      allowedActions = views[i].allowedActions;
      role = views[i].roles;

      if (views[i].editFilter != "") editFilter = views[i].editFilter;
      if (views[i].editableCols != []) editableCols = views[i].editableCols;
    }
  }

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

  // Event handler for save button click
  const handleSaveClick = () => {
    const updatedRow = { ...editingRow, ...editingFields };
    console.log(updatedRow); // TODO: send updated row to server
    console.log(Object.keys(updatedRow).length);
    
    // get the sheet index and the values into array
    // row position is the position in table that was edited
    let sheetIdx = 
      table.sheetIndex + 
      "!A" + 
      rowPosition + 
      ":" + 
      String.fromCharCode(64 + Object.keys(updatedRow).length) + 
      rowPosition;
    let newValues = [];
    for (let key in updatedRow) {
      newValues.push(updatedRow[key]);
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
    
    editPosition(resource);

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

  const handleConfirmDelete = () => {
    console.log("Row to delete:", rowToDelete);
    let resource = {
      "deleteDimension": {
        "range": {
          "sheetId": table.sheetIndex,
          "dimension": "ROWS",
          "startIndex": rowPosition,
          "endIndex": rowPosition
        }
      }
    };
    deleteRowPosition(resource);

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
        transform: "translate(-50%, -50%)",
      }}
    >
      {!openDelete && <h3>{views.name}</h3>}
      {!openDelete && !isEditing && (
        <Button
          variant="contained"
          disabled={
            !allowedActions.includes("Edit Record") || disableEditButton
          }
          onClick={handleEditClick}
        >
          Edit Record
        </Button>
      )}
      {!openDelete && !isEditing && (
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
  );
};
export default DetailView;
