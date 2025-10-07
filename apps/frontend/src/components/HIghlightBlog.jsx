import { Link } from "react-router-dom";
import styles from "./HighlightBlog.module.css";

export default function HighlightBlog({image, blog}) {
  return (
    <>
      <Link to={`/blogs/dweller`} className={styles.highlightBlog}>
        <img
          src={image.src}
          alt={image.alt}
          className={styles.img}
        />
        <div className={styles.info}>
          <p>{blog.timeline}</p>
          <h1>{blog.heading}</h1>
          <p className={styles.p}>{blog.description}</p>
        </div>
      </Link>
    </>
  );
}
