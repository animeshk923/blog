import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import Header from "./Header";
import styles from "./BlogPage.module.css";

// title, date, coverImg, <-- props that can be used in future
export default function BlogPage({ blogPath }) {
  const [mdContent, setMdContent] = useState("");

  useEffect(() => {
    fetch(blogPath)
      .then((res) => res.text())
      .then((text) => setMdContent(text));
  });
  return (
    <>
      <div className={styles.container}>
        <Header />
        <hr className={styles.hr}/>
        <div className={styles.post}>
          <Markdown>{mdContent}</Markdown>
        </div>
      </div>
    </>
  );
}
