import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const currentUserData = JSON.parse(localStorage.getItem("currentUserData"));
  console.log(currentUserData);

  return currentUserData ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
