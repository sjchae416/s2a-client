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

const App = () => {
  return (
    <Box>
      <Router>
        <AppBanner/>
        <SheetBanner/>
        <SheetScreen/>
        <Routes>
          <Route path="/dashboard" exact component={<Dashboard/>} />
        </Routes>
      </Router>
    </Box>
  );
}

export default App;
