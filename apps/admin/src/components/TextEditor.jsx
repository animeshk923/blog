import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import styles from "../styles/TextEditor.module.scss";
import axiosInstance, { apiUrl } from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function TextEditor() {
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("Topic?");
  const [blogPublished, setBlogPublished] = useState(null);
  const { blogid } = useParams();

  useEffect(() => {
    if (!blogid) return;

    async function getBlog() {
      try {
        const res = await axiosInstance.get(`${apiUrl}/blog/${blogid}`);
        const { title, body, isPublished } = res.data;

        setTitle(title);
        setContent(body);
        setBlogPublished(isPublished);
      } catch (err) {
        console.error("Failed to fetch blog:", err);
      }
    }
    getBlog();
  }, [blogid]);

  /**
   * Function to retrieve the current user's id from database
   * @returns user id from database of current logged in account.
   */
  const getUserid = async function () {
    const token = localStorage.getItem("token");
    if (!token) return -1;
    try {
      const { data } = await axiosInstance.get(`${apiUrl}/auth/me`);
      return data.userid;
    } catch (err) {
      console.error(err);
      return -1;
    }
  };

  async function handlePublish() {
    if (!editorRef.current) return;
    const content = editorRef.current.getContent();
    const title = document.querySelector("#titleInput").value.trim();

    const userid = await getUserid();
    // console.log(userid);

    axiosInstance
      .post(
        `${apiUrl}/blog/new`,
        {
          title,
          content,
          publishStatus: true,
          userId: userid,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        console.log("published successfully:", res);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // TODO: connect this to backend
  async function handleDraft() {
    if (!editorRef.current) return;
    const content = editorRef.current.getContent();
    const title = document.querySelector("#titleInput").value.trim();

    const userid = await getUserid();
    console.log(userid);

    // TODO: if blogid exists, update the existing draft instead of creating a new one
    // TODO: if a published blog is updated and saved as draft, it should change the status of the blog to draft in the database
    axiosInstance
      .post(
        `${apiUrl}/blog/new`,
        {
          title,
          content,
          publishStatus: false,
          userId: userid,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        console.log("draft saved successfully:", res);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function handleSaveChanges() {
    if (!editorRef.current) return;
    const content = editorRef.current.getContent();
    const title = document.querySelector("#titleInput").value.trim();

    const userid = await getUserid();
    console.log(userid);

    axiosInstance
      .put(
        `${apiUrl}/blog/${blogid}`,
        {
          title,
          content,
          publishStatus: true,
          userId: userid,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        console.log("updated successfully:", res);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className={styles.textEditorContainer}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>
          {blogid ? "Edit Blog" : "Create New Blog"}
        </h1>
        <p className={styles.pageSubtitle}>
          {blogid
            ? "Edit and update your blog content"
            : "Write and publish your blog content"}
        </p>
      </div>

      <div className={styles.titleSection}>
        <label htmlFor="blogTitle" className={styles.titleLabel}>
          Blog Title
        </label>
        <input
          type="text"
          required
          placeholder="Enter your blog title here..."
          className={styles.titleInput}
          id="titleInput"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className={styles.editorSection}>
        <label className={styles.editorLabel}>Content</label>
        <div className={styles.editorWrapper}>
          <Editor
            apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
            onInit={(evt, editor) => (editorRef.current = editor)}
            // value={content}
            initialValue={content}
            init={{
              height: 500,
              menubar: false,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 16px; line-height: 1.6; color: #ffffff; }",
              skin: "oxide-dark",
              content_css: "dark",
            }}
          />
        </div>
      </div>

      <div className={styles.actionSection}>
        <div className={styles.actionButtons}>
          {/** TODO: complete both implementation */}
          <button className={styles.btnDraft} onClick={handleDraft}>
            <span className={styles.btnIcon}></span>
            Save as Draft
          </button>
          {blogPublished ? (
            <button className={styles.btnPublish} onClick={handleSaveChanges}>
              <span className={styles.btnIcon}></span>
              Save Changes
            </button>
          ) : (
            <button className={styles.btnPublish} onClick={handlePublish}>
              <span className={styles.btnIcon}></span>
              Publish Blog
            </button>
          )}
          {/* TODO: add conditional rendering to update a blog if it is already published and not to create a new one */}
        </div>
      </div>
    </div>
  );
}
