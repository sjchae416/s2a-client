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
        console.log(view);
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

    // Event handler for save button click
    const handleSaveClick = () => {
        const updatedRow = { ...editingRow, ...editingFields };
        console.log(updatedRow);
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

        let sheetIdx = 
        table.sheetIndex + 
        "!A" + 
        rowPosition + 
        ":" + 
        String.fromCharCode(64 + Object.keys(rowToDelete).length) + 
        rowPosition;
        let values = [];

        for(let i = 0; i < Object.keys(rowToDelete).length; i++){
        values[i] = "";
        }
        let resource = {
        data:[
            {
            range: sheetIdx,
            values :''
            }
        ]
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
        width: "75%",
        transform: "translate(-50%, -50%)",
      }}
    >
        <div className="detail-sidebar">
            <h3>Detail Views</h3>
            {!openDelete && views.map((view) => (
                <button
                    key={view.name}
                    onClick={() => handleSelectView(view)}
                    className="button-link"
                >
                    {view.name}
                </button>
            ))}
        </div>
        <div className = "detail-main-container">
            {selectedView && !openDelete && <h3>{name}</h3>}
            {selectedView && !openDelete && !isEditing && (
                <Button
                variant="contained"
                disabled={!allowedActions.includes("Edit Record") || (disableEditButton && !allowedActions.includes("Edit Record"))}
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
