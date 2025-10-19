import axios from "axios";
import { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    } catch (error) {
      console.log("login error:", error);
    }
  };

  return (
    <div className="container">
      {console.log(user)}

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
