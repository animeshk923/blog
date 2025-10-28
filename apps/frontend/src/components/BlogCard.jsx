import { Link } from "react-router-dom";
import styles from "../styles/BlogCard.module.css";

export default function BlogCard({ image, blog, blogid }) {
  return (
    <>
      <Link to={`blog/${blogid}`} className={styles.BlogCard}>
        <img src={image.src} alt={image.alt} className={styles.img} />
        <div className={styles.info}>
          <p>{blog.timeline}</p>
          <h1 className={styles.h1}>{blog.heading}</h1>
        </div>
      </Link>
    </>
  );
}
