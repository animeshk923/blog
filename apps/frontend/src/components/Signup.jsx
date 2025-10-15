import axios from "axios";
import { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
export default function Signup() {
  const [user, setUser] = useState(null);
  const [fullName, setfullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminPass, setadminPass] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/auth/signup", {
        fullName,
        email,
        password,
        adminPass,
      });
      if (response.status === 200) {
        setUser(response.data);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      {user ? (
        <span>User already exists!</span>
      ) : (
        <div className="login">
          <form onSubmit={handleSubmit}>
            <span className="formTitle">Sign Up</span>
            <input
              type="text"
              placeholder="fullName"
              onChange={(e) => setfullName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="abc@example.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Admin Password"
              onChange={(e) => setadminPass(e.target.value)}
            />
            <button type="submit" className="submitButton">
              Sign Up
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
