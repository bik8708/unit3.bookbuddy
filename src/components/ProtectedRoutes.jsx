import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoutes() {
  const getToken = () => localStorage.getItem("token");
  return <>{getToken() ? <Outlet /> : <Navigate to="account" />}</>;
}

export default ProtectedRoutes;
