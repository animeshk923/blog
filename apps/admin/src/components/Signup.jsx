import axios from "axios";
import React, { useState } from "react";
import styles from "../styles/Login.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { apiUrl } from "../api/axios";
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
      await axios.post(`${apiUrl}/auth/signup`, {
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
    <div className={styles.container}>
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
        <div className={styles.login}>
          <form onSubmit={handleSubmit}>
            <span className={styles.formTitle}>Sign Up</span>
            <input
              type="text"
              placeholder="Full Name"
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
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Admin Password"
              onChange={(e) => setadminPass(e.target.value)}
            />
            <button type="submit" className={styles.submitButton}>
              Sign Up
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
