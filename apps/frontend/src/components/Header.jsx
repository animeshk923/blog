import styles from "../styles/Header.module.css";
import { Link } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";
export default function Header() {
  const { isAdmin, loading, errorMessage } = useAdmin();

  if (loading) return <h3>Checking admin status...</h3>;
  if (!isAdmin)
    return (
      <p>
        {errorMessage} <Link to={`/login`}>Log in</Link>
      </p>
    );
  return (
    <header className={styles.header}>
      <Link to="/">Animesh's Blog</Link>
      <Link to="/about">About</Link>
      {isAdmin && (
        <>
          <label for="cars">Admin actions</label>
          <select name="action" id="action">
            <option value="createBlog">
              <Link to={"/blog/create"}>Create new blog</Link>
            </option>
            <option value="editBlog">Saab</option>
            <option value="draftBlogs">Mercedes</option>
            <option value="audi">Audi</option>
          </select>

          <Link to={"/blog/create"}>Create new blog</Link>
        </>
      )}
    </header>
  );
}
