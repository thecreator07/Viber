import React, { useMemo } from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "./scenes/homePage/Home";
import LoginPage from "./scenes/loginPage/Login";
import ProfilePage from "./scenes/profilePage/Profile";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/system";
import { themeSettings } from "Theme";

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile/:userID" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
