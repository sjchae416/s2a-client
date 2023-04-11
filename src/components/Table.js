import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import role from "../testData/test-role-sheet.json";

import ConfigTable from "./ConfigTable";
import {
  actionAddTable,
  actionDeleteTable,
  actionUpdateTable,
} from "../redux/action";
import { useDispatch, useSelector } from "react-redux";

export default function Table() {
  const { selectedTable, isTableSelected } = useSelector((state) => state.app);
  const [sheetIndex, setSheetIndex] = useState("");
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [columns, setColumns] = useState([]);
  const [tableDataArray, setTableDataArray] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setName(selectedTable.name);
    setUrl(selectedTable.url);
    setSheetIndex(selectedTable.sheetIndex);
  }, [selectedTable]);

  const tableData = {
    id: new Date().getTime(),
    name: name,
    url: url,
    sheetIndex: sheetIndex,
  };

  useEffect(() => {
    tableData.name = name;
    tableData.url = url;
    tableData.sheetIndex = sheetIndex;
  }, [name, url, sheetIndex]);

  const handleLoad = async () => {
    if (tableData.name && tableData.url && tableData.sheetIndex) {
      // Create the JSON object
      // console.log(tableData);

      try {
        const response = await fetch("http://localhost:3333/tables/loadtable", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(tableData),
        });
        const responseBody = await response.text(); // Read the response body as text
        // console.log(responseBody ? responseBody : "no response");
        const parsedData = JSON.parse(responseBody);
        console.log(parsedData);
        setTableDataArray(parsedData);
      } catch (error) {
        console.error(error);
      }
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
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div class="form-group">
        <label>URL</label>
        <input
          required
          type="text"
          class="form-control"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <div class="form-group">
        <label>Sheet Index</label>
        <input
          required
          class="form-control"
          type="number"
          defaultvalue="1"
          value={sheetIndex}
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
        <>
          <ConfigTable />
          {!isTableSelected ? (
            <div className="text-right">
              <button
                onClick={() => {
                  setName("");
                  setUrl("");
                  setSheetIndex("");
                }}
                className="btn btn-danger can_btn"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  dispatch(actionAddTable(tableData));
                  setName("");
                  setUrl("");
                  setSheetIndex("");
                }}
                className="btn btn-info"
              >
                Add
              </button>
            </div>
          ) : (
            <div className="text-right">
              <button
                onClick={() => {
                  dispatch(actionUpdateTable(selectedTable.id, tableData));
                  setName("");
                  setUrl("");
                  setSheetIndex("");
                }}
                className="btn btn-danger can_btn"
              >
                Save
              </button>
              <button
                onClick={() => {
                  dispatch(actionDeleteTable(selectedTable.id));
                  setName("");
                  setUrl("");
                  setSheetIndex("");
                }}
                className="btn btn-info"
              >
                Delete
              </button>
            </div>
          )}
        </>
      )}

      <br />
      <br />
    </div>
  );
}
