import { useContext } from "react";
import styles from "../styles/Header.module.css";
import { Link } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";
export default function Header() {
  const { isAdmin, loading } = useContext(AdminContext);

  if (loading) return null;

  return (
    <header className={styles.header}>
      <Link to="/">Animesh's Blog</Link>
      <Link to="/about">About</Link>
      {isAdmin && (
        <>
          <Link to={"/blog/create"}>Create new blog</Link>
          <Link to={"/blog/create"}>Create new blog</Link>
        </>
      )}
    </header>
  );
}
