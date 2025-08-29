import { Routes, Route } from "react-router-dom";
import { AppBar, Toolbar, Typography } from "@mui/material";

import Home from "./pages/Home/Home";

import "./App.scss";

function App() {
  return (
    <div className="app">
      {/* Header */}
      <AppBar position="fixed" className="app-header">
        <Toolbar>
          <Typography variant="h6" className="logo">
            COVID DASHBOARD APP
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Page Content */}
      <div className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;