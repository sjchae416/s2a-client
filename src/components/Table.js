import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import role from "../testData/test-role-sheet.json";

import ConfigTable from "./ConfigTable";

export default function Table({ tablelist, setTableList }) {
  const [sheetIndex, setSheetIndex] = useState("");
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [columns, setColumns] = useState([]);
  const [tableDataArray, setTableDataArray] = useState([]);

  const tableData = {
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

  const handleAddTable = () => {
    if (name) setTableList([...tablelist, name]);
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
        <ConfigTable/>
      )}

      <br />
      <br />
    </div>
  );
}
