import React, { useEffect, useState } from "react";
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
    setEditingRow(updatedRow);
    setIsEditing(false);
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
    // TODO: handle delete row
    console.log("Row to delete:", rowToDelete);
    setOpenDelete(false);

  };


  return (
    <div style={{ backgroundColor: "white", padding: "20px", position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
    {!openDelete && <h3>{app.name}</h3>}
    {!openDelete && !isEditing && <Button variant="contained" disabled={!allowedActions.includes('Edit Record') || disableEditButton} onClick={handleEditClick}>Edit Record</Button>}
    {!openDelete &&!isEditing && (
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
              <br/>
              <TextField
                label={column}
                value={editingFields[column] ?? row[column]}
                onChange={(event) =>
                  handleFieldChange(column, event.target.value)
                }
              />
              <br/>
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
        <Button variant="contained" onClick={handleCancelClick}>Cancel</Button>
        <Button variant="contained" onClick={handleSaveClick}>Save</Button>
      </div>
    )}
  </div>
    
  );
}
export default DetailView;