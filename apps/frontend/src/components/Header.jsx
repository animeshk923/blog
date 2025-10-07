import styles from "./Header.module.css";
import { Link } from "react-router-dom";
export default function Header() {
  return (
    <header className={styles.header}>
      <Link to="/">Animesh's Blog</Link>
      <Link to="/about">About</Link>
    </header>
  );
}
