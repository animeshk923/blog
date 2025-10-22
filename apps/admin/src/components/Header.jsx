import { Link, useNavigate } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";
import axiosInstance from "../api/axios";
import styles from "../styles/Header.module.css";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";

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
  return (
    <header className={styles.header}>
      <Link to="/">Admin Home</Link>
      <Link to="/">Public Site</Link>

      {loading ? null : isAdmin ? (
        <>
          <div className={styles.dropdown}>
            <button className={styles.select}>Menu</button>
            <div className={styles.dropdownMenu}>
              <Link to={`/blog/create`}>New Blog</Link>
              <Link to={`/blog/edit`}>Edit</Link>
              <Link to={`/blog/drafts`}>Draft</Link>
            </div>
          </div>
          <LogoutButton onClick={handleLogout} />
        </>
      ) : (
        <LoginButton onClick={handleLogin} />
      )}
    </header>
  );
}
