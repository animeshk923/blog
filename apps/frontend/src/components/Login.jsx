import axios from "axios";
import { useState } from "react";
import "./Login.css";
export default function Login() {
  const apiUrl = "http://localhost:3000";
  axios.interceptors.request.use(
    (config) => {
      const { origin } = new URL(config.url);
      const allowedOrigins = [apiUrl];
      const token = localStorage.getItem("token");
      if (allowedOrigins.includes(origin)) {
        config.headers.authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        username,
        password,
      });
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      {user ? (
        <span>User has been loggedIn </span>
      ) : (
        <div className="login">
          <form onSubmit={handleSubmit}>
            <span className="formTitle">Lama Login</span>
            <input
              type="text"
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="submitButton">
              Login
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
