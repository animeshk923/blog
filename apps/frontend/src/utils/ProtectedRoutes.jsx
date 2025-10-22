import { Navigate, Outlet } from "react-router-dom";
import axiosInstance, { apiUrl } from "../api/axios";
import { useEffect, useState } from "react";

export default function ProtectedRoutes() {
  // let isAuthenticated = null;
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  async function checkToken() {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuthenticated(false);
    } else {
      const res = await axiosInstance.get(`${apiUrl}/auth/me`);
      setIsAuthenticated(res.data["Admin Status"]);
    }
  }

  useEffect(() => {
    checkToken();
  }, []);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
