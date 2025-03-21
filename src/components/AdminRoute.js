import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || !user.isAdmin) {
    if (!user) {
      console.log("No user found, redirecting to login...");
    } else if (!user.isAdmin) {
      console.log("User is not an admin, redirecting to login...");
    }
    return <Navigate to="/login" replace />;
  }

  console.log("User is an admin, granting access...");
  return <Outlet />;
};

export default AdminRoute;
