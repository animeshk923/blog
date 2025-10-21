import axios from "axios";
import axiosInstance from "../api/axios";
import { useEffect, useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3000/auth/login`, {
        email,
        password,
      });

      const token = response?.data?.token;
      const user = response?.data?.user;

      if (token) {
        localStorage.setItem("token", response.data.token);
      }

      if (user) setUser(response.data);
      navigate("/");
      window.location.reload();
    } catch (err) {
      setLoginError(err.response.data.msg);
      console.log("login error:", err);
    }
  };

  async function fetchCurrentUser() {
    try {
      // use GET if you change backend to GET; otherwise use POST
      const res = await axiosInstance.get("/auth/me");

      return res.data || null;
    } catch (err) {
      console.log(err);
      console.log(err.response.data.msg);
      setLoginError(err.response.data.msg);
      // token invalid/expired -> treat as not logged in
      return null;
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
    }

    fetchCurrentUser().then((u) => {
      if (u) setUser(u);
      else {
        localStorage.removeItem("token");
        delete axiosInstance.defaults.headers.common["Authorization"];
      }
    });
  }, []);

  return (
    <div className="container">
      {/* {console.log(user)} */}

      {user ? (
        <>
          <br />
          <br />
          <span>Already Logged in </span>
          <br />
          <br />
          <Link to={`/`}>Go to blogs</Link>
        </>
      ) : (
        <>
          {/* add error message display properly, not rendering as of now */}
          <h3>{loginError}</h3>
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
        </>
      )}
    </div>
  );
}
