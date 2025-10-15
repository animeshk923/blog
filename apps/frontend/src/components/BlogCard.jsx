import styles from "../styles/BlogCard.module.css";

export default function BlogCard({ name, date }) {
  return (
    <>
      <a href="">
        <div className={`${styles.card}`}>
          <img
            src="https://fastly.picsum.photos/id/402/300/200.jpg?hmac=VW9a1Qd0oG_sb8K6HTz_VkysOHUvd75vrcg-Ko38AQ4"
            alt=""
            className={styles.img}
          />
          <p>{date}</p>
          <h2>{name}</h2>
        </div>
      </a>
    </>
  );
}
