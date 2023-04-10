import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";
import TableList from "./TableList";
import Table from "./Table";

export default function CreateTable() {
  const [tablelist, setTableList] = useState([]);

  let navigate = useNavigate();


  return (
    <Box>
      <br />
      <br />
      <div class="container">
        <div class="card text-right card_one">
          <h3 id="create-app">S2A</h3>

          <span class=" ml-auto">
            <button class="btn btn-info"> {"<"} </button>&nbsp;
            <span class=" ml-auto" />
            <button class="btn btn-info"> {">"} </button>&nbsp;
            <span class=" ml-auto" />
            <button class="btn btn-info">Save</button>&nbsp;
            <a class="profile-letter" href="profile.html">
              P
            </a>
          </span>
        </div>

        <br />

        <div class="card p-0">
          <div class="row no-gutters mt-2">
            <div class="col-1 border-right text-center">
              <button>Table</button>
            </div>
            <div class="col-1 border-right text-center">
              <button>Add Table</button>
              <TableList tablelist={tablelist} />
            </div>
            <div class="col-auto">
              <Table tablelist={tablelist} setTableList={setTableList} />
              
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
      </div>
    </Box>
  );
}
