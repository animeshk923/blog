import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";
import styles from "../styles/BlogPage.module.css";
import axiosInstance, { apiUrl } from "../api/axios";
import { useParams } from "react-router-dom";
import htmlParser from "html-react-parser";
import hljs from "highlight.js";
import "highlight.js/styles/kimbie-dark.css";

// title, date, coverImg, <-- props that can be used in future
export default function BlogPage() {
  const [blogContent, setBlogContent] = useState(null);
  const postRef = useRef(null);
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

  useEffect(() => {
    if (!postRef.current) return;
    const blocks = postRef.current.querySelectorAll("pre code");
    blocks.forEach((block) => {
      hljs.highlightElement(block);
    });
  }, [blogContent]);
  return (
    <>
      <div className={styles.container}>
        <Header />
        <hr className={styles.hr} />
        <div className={styles.post} ref={postRef}>
          {blogContent && htmlParser(blogContent)}
        </div>
      </div>
    </>
  );
}
