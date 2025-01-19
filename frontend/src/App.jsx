import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import DriverLoginPage from "./pages/DriverLoginPage";
import DriverSignUpPage from "./pages/DriverSignUpPage";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/driverLogin" element={<DriverLoginPage />} />
        <Route path="/driverSignUp" element={<DriverSignUpPage />} />
      </Routes>
    </div>
  );
};

export default App;
