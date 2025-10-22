import axios from "axios";
import { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
export default function Signup() {
  const [userExists, setUserExists] = useState(false);
  const [fullName, setfullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminPass, setadminPass] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/auth/signup", {
        fullName,
        email,
        password,
        adminPass,
      });
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.status === 405) {
        setUserExists(true);
      } else {
        console.log("Something went wrong:", error);
      }
    }
  };

  return (
    <div className="container">
      {userExists ? (
        <>
          <br />
          <br />
          <span>User already exists!</span>
          <br />
          <br />
          <Link to={`/login`}>Go to login</Link>
        </>
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
