import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import AuthProtected from "./Utils/AuthProtected";
import UnauthProtected from "./Utils/UnauthProtected";
import Register from "./pages/Register/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <UnauthProtected>
              <Login />
            </UnauthProtected>
          }
          path="/"
        />
        <Route
          path="/home"
          element={
            <AuthProtected>
              <Home />
            </AuthProtected>
          }
        />
        <Route
          path="/register"
          element={
            <UnauthProtected>
              <Register />
            </UnauthProtected>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
