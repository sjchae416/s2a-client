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
const App = () => {
  return (
    <Box>
      <Router forceRefresh={true}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-table" element={<CreateTable />} />

          <Route path="/add-view" element={<AddFile />} />
          <Route path="/manage-table" element={<ManageTable />} />
          <Route path="/table-view" element={<TableView />} />
        </Routes>
      </Router>
    </Box>
  );
};

export default App;
