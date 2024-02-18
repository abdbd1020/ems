import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const currentUserData = JSON.parse(localStorage.getItem("currentUserData"));

  return currentUserData ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
