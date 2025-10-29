import React, { useEffect, useState } from "react";
import Header from "./Header";
import styles from "../styles/BlogPage.module.css";
import axiosInstance, { apiUrl } from "../api/axios";
import { useParams } from "react-router-dom";
import htmlParser from "html-react-parser";

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
  return (
    <>
      <div className={styles.container}>
        <Header />
        <hr className={styles.hr} />
        <div className={styles.post} />
        {blogContent && htmlParser(blogContent)}
      </div>
    </>
  );
}
