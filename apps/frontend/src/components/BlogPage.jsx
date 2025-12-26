import React, { useEffect, useState } from "react";
import Header from "./Header";
import styles from "../styles/BlogPage.module.css";
import axiosInstance, { apiUrl } from "../api/axios";
import { useParams } from "react-router-dom";
import htmlParser from "html-react-parser";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
// Load common languages; add more as needed
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-json";
import "prismjs/components/prism-css";
import "prismjs/components/prism-markup";

// title, date, coverImg, <-- props that can be used in future
export default function BlogPage() {
  const [blogContent, setBlogContent] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axiosInstance
      .get(`${apiUrl}/blog/${id}`)
      .then((res) => {
        setBlogContent(res.data.body);
      })
      .catch((err) => {
        console.log("Failed to fetch blog content:", err);
      });
  }, []);

  // Highlight code blocks once content is loaded/updated
  useEffect(() => {
    if (blogContent) {
      Prism.highlightAll();
    }
  }, [blogContent]);
  return (
    <>
      <div className={styles.container}>
        <Header />
        <hr className={styles.hr} />
        <div className={styles.post}>
          {blogContent && htmlParser(blogContent)}
        </div>
      </div>
    </>
  );
}
