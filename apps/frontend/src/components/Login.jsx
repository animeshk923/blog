import axios from "axios";
import { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

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

export default function Login() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fetchError, setFetchError] = useState(null);

  const getJwt = async () => {
    const { data } = await axios.post(`${apiUrl}/auth/login`);
    console.log(data);
    localStorage.setItem("token", data.token);
    // setJwt(data.token);
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, {
        email,
        password,
      });
      setUser(response.data);
      getJwt(); // get and store jwt in localstorage
      navigate("/");
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
            <span className="formTitle">Login</span>
            <input
              type="email"
              placeholder="abc@example.com"
              onChange={(e) => setEmail(e.target.value)}
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
