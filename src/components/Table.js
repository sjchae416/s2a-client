import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import test from "../testData/test2.json";
import role from "../testData/test-role-sheet.json";

export default function Table(){
    const [sheetIndex, setSheetIndex] = useState("");
    const [name, setName] = useState("");
    const [url, setUrl] = useState("");
    const [showTable, setShowTable] = useState(false);
    const keys = Object.keys(test[0]);
    const [columns, setColumns] = useState([]);

    const tableData = {
        name: name,
        url: url,
        sheetIndex: sheetIndex,
    };

  useEffect(() =>{
    tableData.name = name;
    tableData.url = url;
    tableData.sheetIndex = sheetIndex;

  }, [name, url, sheetIndex]);

    const handleLoad = () => {
        if (name && url && sheetIndex) {
            // Create the JSON object
            console.log(tableData);

            //requires backend to save the data for tables
            

        } else {
            alert("Please fill out all fields before submitting");
            return;
        }
        //let test = "./" + url.toString();
        //let file = require(test);

        //keys = Object.keys(test[0]);
        // alert(keys);
        setShowTable(true);
    };

    return (
        <div
            class="card"
            style={{
                margin: "10px auto",
                width: "600px",
                maxWidth: "100%",
            }}
            >
            <div class="form-group">
                <label>Name</label>
                <input
                required
                type="text"
                class="form-control"
                onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div class="form-group">
                <label>URL</label>
                <input
                required
                type="text"
                class="form-control"
                onChange={(e) => setUrl(e.target.value)}
                />
            </div>
            <div class="form-group">
                <label>Sheet Index</label>
                <input
                required
                class="form-control"
                // type="number"
                defaultvalue="1"
                onChange={(e) => setSheetIndex(e.target.value)}
                />
            </div>

            <div class="text-right">
            <button onClick={handleLoad} class="btn btn-info">
                Load
                </button>
            </div>

            <br />
            <br />
            {showTable && ( 
            <table className="table table-bordered">
            <thead>
                <tr>
                <th>Name</th>
                <th>Key</th>
                <th>Label</th>
                <th>Reference</th>
                <th>Type</th>
                </tr>
            </thead>
            <tbody>
            {keys.map((key) => (
                <tr key={key}>
                    <td>{key}</td>
                    <td>
                        <label>
                            <input type="radio" name={`radio-col1`} value={key} />
                        </label>
                    </td>
                    <td>
                        <label>
                            <input type="radio" name={`radio-col2`} value={key} />
                        </label>
                    </td>
                    <td>
                        <select name={`select-${key}`}>
                            <option></option>
                        </select>
                    </td>
                    <td>
                        <select name={`select-${key}`}>
                            <option value="int">Number</option>
                            <option value="bool">Boolean</option>
                            <option value="string">Text</option>
                            <option value="string">URL</option>
                        </select>
                    </td>
                </tr>
            ))}
            </tbody>
            </table>
            )}

        <br />
        <br />
        </div>
);
} 