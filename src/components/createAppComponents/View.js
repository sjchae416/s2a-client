import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import role from "../../testData/test-role-sheet.json";
import test from "../../testData/test2.json";

const View = () => {
    const [selectedColumns, setSelectedColumns] = useState([]);
    const [showTable, setShowTable] = useState(false);
    const columns = Object.keys(test[0]);

    const handleCheckboxChange = (e, column) => {
        const { name, checked } = e.target;
        if (checked) {
          setSelectedColumns([...selectedColumns, name]);
        } else {
          setSelectedColumns(selectedColumns.filter((column) => column !== name));
        }
        console.log(selectedColumns);
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
                    {columns.map((column) => (
                        <div key={column}>
                        <input
                            type="checkbox"
                            id={`checkbox-${column}`}
                            name={column}
                            onChange={(e) => handleCheckboxChange(e, column)}
                        />
                        <label htmlFor={`checkbox-${column}`}>{column}</label>
                        </div>
                    ))}
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