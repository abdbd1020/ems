import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
