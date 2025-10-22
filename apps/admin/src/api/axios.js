import axios from "axios";

export const apiUrl = "http://localhost:3000";

const axiosInstance = axios.create({
  baseURL: apiUrl,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const { origin } = new URL(config.url, window.location.origin);
    const allowedOrigins = [apiUrl];
    const token = localStorage.getItem("token");

    if (allowedOrigins.includes(origin) && token) {
      config.headers.authorization = `Bearer ${token}`;
    }

    return config;
  },
  (err) => {
    Promise.reject(err);
    console.log("axios error:", err);
  }
);

export default axiosInstance;
