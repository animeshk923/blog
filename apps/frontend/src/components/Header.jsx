import styles from "../styles/Header.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";
export default function Header() {
  const { isAdmin, loading } = useAdmin();
  const navigate = useNavigate();

  if (loading) return <h3>Checking admin status...</h3>;

  return (
    <header className={styles.header}>
      <Link to="/">Animesh's Blog</Link>
      <Link to="/about">About</Link>
      {!isAdmin && (<Link to="/login">Admin log in</Link>)}
      {isAdmin && (
        <div className={styles.admin}>
          <label htmlFor="action" className={styles.label}>
            Admin actions
          </label>
          <br />
          <select
            name="action"
            id="action"
            defaultValue=""
            onChange={(e) => {
              const route = e.target.value;
              if (!route) return;
              navigate(route);
              e.target.value = "";
            }}
            className={styles.select}
          >
            <option className={styles.option} value="">
              Select action
            </option>
            <option className={styles.option} value="/blog/create">
              Create new blog
            </option>
            <option className={styles.option} value="/blog/edit">
              Edit blog
            </option>
            <option className={styles.option} value="/blog/drafts">
              Draft blogs
            </option>
          </select>
        </div>
      )}
    </header>
  );
}
