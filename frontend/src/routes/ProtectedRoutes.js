import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const userJWT = JSON.parse(localStorage.getItem("userJWT"));
  console.log(userJWT);

  return userJWT ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
