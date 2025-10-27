import { Navigate, Outlet } from "react-router-dom";
import axiosInstance, { apiUrl } from "../api/axios";
import React, { useEffect, useState } from "react";

export default function ProtectedRoutes() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  async function checkToken() {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsAuthenticated(false);
      } else {
        const res = await axiosInstance.get(`${apiUrl}/auth/me`);
        console.log(res);
        console.log("adminStatus", res.data["Admin Status"]);
        setIsAuthenticated(res.data["Admin Status"]);
      }
    } catch (err) {
      console.error(err);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    checkToken();
  }, []);

  if (loading) {
    return <p>Checking admin access...</p>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
