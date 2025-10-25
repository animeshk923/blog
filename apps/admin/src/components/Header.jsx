import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAdmin } from "../context/AdminContext";
import axiosInstance from "../api/axios";
import styles from "../styles/Header.module.scss";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";
import SignupButton from "./SignupButton";

export default function Header() {
  const { isAdmin, loading } = useAdmin();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    delete axiosInstance.defaults.headers.common["Authorization"];
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.homeLink}>
        Home
      </Link>

      {/* Desktop Navigation */}
      <nav className={styles.desktopNav}>
        <Link
          to={`http://localhost:5173`}
          target="_blank"
          className={styles.navLink}
        >
          Public Site
        </Link>
        {loading ? null : isAdmin ? (
          <>
            <Link to={`blog/drafts`} className={styles.navLink}>
              Your Drafts
            </Link>
            <LogoutButton onClick={handleLogout} />
          </>
        ) : (
          <>
            <SignupButton onClick={handleSignup} />
            <LoginButton onClick={handleLogin} />
          </>
        )}
      </nav>

      {/* Mobile Menu Button */}
      <button
        className={styles.mobileMenuButton}
        onClick={toggleMobileMenu}
        aria-label="Toggle mobile menu"
      >
        <span className={styles.hamburger}></span>
        <span className={styles.hamburger}></span>
        <span className={styles.hamburger}></span>
      </button>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <Link
            to={`http://localhost:5173`}
            // to={`https://animeshk923.vercel.app`}
            target="_blank"
            className={styles.mobileLink}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Public Site
          </Link>
          {loading ? null : isAdmin ? (
            <>
              <Link
                to={`blog/drafts`}
                className={styles.mobileLink}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Your Drafts
              </Link>
              <button
                className={styles.mobileLogoutButton}
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                className={styles.mobileAuthButton}
                onClick={() => {
                  handleSignup();
                  setIsMobileMenuOpen(false);
                }}
              >
                Sign Up
              </button>
              <button
                className={styles.mobileAuthButton}
                onClick={() => {
                  handleLogin();
                  setIsMobileMenuOpen(false);
                }}
              >
                Login
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
}
