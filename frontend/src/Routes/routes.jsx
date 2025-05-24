// import { Routes, Route } from "react-router-dom";
// import { LandingPage, LoginPage, Register } from "../pages";

// const MainRoutes = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<LandingPage />} />
//       <Route path="/login" element={<LoginPage />} />
//       <Route path="/register" element={<Register />} />
//       {/* Add more routes as needed */}
//     </Routes>
//   );
// };

// export default MainRoutes;

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "../pages/Authentication/AuthPage";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../pages/Dashboard";
import { LandingPage } from "../pages";
const MainRoutes = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<AuthPage />} />
    <Route path="/register" element={<AuthPage />} />
    <Route
      path="/dashboard"
      element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      }
    />
    <Route path="*" element={<Navigate to="/login" />} />
  </Routes>
);

export default MainRoutes;
