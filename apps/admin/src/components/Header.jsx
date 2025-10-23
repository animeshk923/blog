import { Link, useNavigate } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";
import axiosInstance, { apiUrl } from "../api/axios";
import styles from "../styles/Header.module.scss";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";
import SignupButton from "./SignupButton";

export default function Header() {
  const { isAdmin, loading } = useAdmin();
  const navigate = useNavigate();

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
  return (
    <header className={styles.header}>
      {/* TODO: replace deployment url after pushing to prod */}
      <Link to="/">Admin Home</Link>
      {/* <Link to="https://animeshk923.vercel.app" target="_blank">Public Site</Link> */}
      <Link to={`http://localhost:5173`} target="_blank">
        Public Site
      </Link>
      {/**TODO: remove before deploying */}
      {loading ? null : isAdmin ? (
        <>
          <div className={styles.dropdown}>
            <button className={styles.select}>Menu</button>
            <div className={styles.dropdownMenu}>
              <Link to={`blog/create`}>New Blog</Link>
              {/* <Link to={`blog/edit`}>Edit</Link> */}
              <Link to={`blog/drafts`}>Your Drafts</Link>
            </div>
          </div>
          <LogoutButton onClick={handleLogout} />
        </>
      ) : (
        <>
          <SignupButton onClick={handleSignup} />
          <LoginButton onClick={handleLogin} />
        </>
      )}
    </header>
  );
}
