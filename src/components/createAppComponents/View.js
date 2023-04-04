import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import role from "../test-role-sheet.json";
import test from "../test2.json";

const View = () => {
    const [selectedColumns, setSelectedColumns] = useState([]);
    const [showTable, setShowTable] = useState(false);
    const columns = Object.keys(test[0]);

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
          setSelectedColumns([...selectedColumns, value]);
        } else {
          setSelectedColumns(selectedColumns.filter((column) => column !== value));
        }
    };

    return (
        <div
            class="card"
            style={{
                margin: "10px auto",
                width: "480px",
                maxWidth: "100%",
            }}
            >
            <div class="form-group">
                <label>View Name</label>
                <input type="text" class="form-control" />
            </div>
            <div class="form-group">
                <label>Table</label>
                <select class="form-control">
                <option value="">test</option>
                </select>
            </div>
            <div>
                <div className="form-group">
                <label>Columns</label>
                <select multiple onChange={handleCheckboxChange}>
                    {columns.map((column) => (
                    <option key={column} value={column}>
                        {column}
                    </option>
                    ))}
                </select>
                </div>
                <p>Selected Columns: {selectedColumns.join(', ')}</p>
            </div>
            <div class="form-group">
                <label className="can_btn">View Type</label>
                <button class="btn btn-info can_btn">Table</button>
                <button class="btn btn-info">Detail</button>
            </div>
            <div class="form-group">
                <label>Allowed Action</label>
                <select class="form-control">
                <option value="">edit record</option>
                <option value="">add record</option>
                </select>
            </div>
            <div class="form-group">
                <label>Role</label>
                <select class="form-control">
                <option value="">developer</option>
                <option value="">end user</option>
                </select>
            </div>

            <div class="text-right">
                <button class="btn btn-danger can_btn">Cancel</button>
                <button class="btn btn-info">Create</button>
            </div>

            <br />
            <br />
            </div>
    );
} 
export { View }