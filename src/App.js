<<<<<<< Updated upstream
import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import './App.css';
import Box from "@mui/material/Box";


import {
  AppBanner, 
  SheetBanner,
  Dashboard,
  Login, 
  AddFile, 
  ManageDataSource, 
  SheetScreen
} from "./components";

=======
import React from "react";
import {
  BrowserRouter,
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
} from "react-router-dom";
import "./App.css";
import Box from "@mui/material/Box";
import { createBrowserHistory } from "history";
import {
  AppBanner,
  Dashboard,
  Login,
  AddFile,
  ManageTable,
  TableView,
} from "./components";
import CreateTable from "./components/CreateTable";

export const customHistory = createBrowserHistory();
>>>>>>> Stashed changes
const App = () => {
  return (
    <Box>
      <Router>
        <AppBanner/>
        <SheetBanner/>
        <SheetScreen/>
        <Routes>
<<<<<<< Updated upstream
          <Route path="/dashboard" exact component={<Dashboard/>} />
=======
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-table" element={<CreateTable />} />

          <Route path="/add-view" element={<AddFile />} />
          <Route path="/manage-table" element={<ManageTable />} />
          <Route path="/table-view" element={<TableView />} />
>>>>>>> Stashed changes
        </Routes>
      </Router>
    </Box>
  );
};

export default App;
