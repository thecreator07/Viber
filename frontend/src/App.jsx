import React from "react";
import { BrowserRouter,Navigate,Routes,Route } from "react-router-dom";
import HomePage from "scenes/HomePage/Home";
import LoginPage from "scenes/loginPage/Login";
import NavBar from "scenes/navbar/NavBar";
import ProfilePage from "scenes/profilePage/Profile";

const App = () => {
  return <div  className="app">
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage/>}/>
      <Route path="/home" element={<HomePage/>}/>
      <Route path="/profile/:userID" element={<ProfilePage/>}/>

    </Routes>
    </BrowserRouter>
  </div>;
};

export default App;
