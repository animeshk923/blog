import React, { createContext, useState, useEffect, useContext } from "react";
import axiosInstance, { apiUrl } from "../api/axios";
axiosInstance;

export const AdminContext = createContext(null);

export const AdminProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await axiosInstance.get(`${apiUrl}/auth/me`);

        // console.log(res);

        if (res.data["Admin Status"]) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (err) {
        console.log(err);
        console.log(err.response.data.msg);
        setErrorMessage(err.response.data.msg);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };
    checkAdmin();
  }, []);

  return (
    <AdminContext.Provider value={{ isAdmin, loading, errorMessage }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  return useContext(AdminContext);
};
