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
