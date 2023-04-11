import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";
import TableList from "./TableList";
import Table from "./Table";

import NavigationBar from "./NavigationBar"

export default function CreateTable() {
  const [tablelist, setTableList] = useState([]);

  let navigate = useNavigate();


  return (
    <Box>
      <br />
      <br />
      <div class="container">
        <NavigationBar/>
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
