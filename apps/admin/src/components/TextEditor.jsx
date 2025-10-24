import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import styles from "../styles/TextEditor.module.scss";
import axiosInstance, { apiUrl } from "../api/axios";

export default function TextEditor() {
  const editorRef = useRef(null);

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

  /**
   * Escapes the content's HTML characters for safe parsing by backend handlers
   * @param {String} str incoming html content from tinyMCE editor
   * @returns escaped sanitized html content
   */
  async function handlePublish() {
    if (!editorRef.current) return;
    const content = editorRef.current.getContent();
    const title = document.querySelector("#titleInput").value.trim();
    // TODO: setup backend handlers before passing data from the frontend
    const userid = await getUserid();
    console.log(userid);

    axiosInstance
      .post(
        `${apiUrl}/blog/new/publish`,
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
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function handleDraft() {
    const content = editorRef.current.getContent();
    console.log(content);
  }

  return (
    <>
      <div>
        <label htmlFor="blogTitle" className={styles.titleLabel}>
          Title:{" "}
        </label>
        <input
          type="text"
          required
          placeholder="Blog title"
          className={styles.titleInput}
          id="titleInput"
        ></input>
      </div>
      <Editor
        apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue="<p>START BLOGGING!.</p>"
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
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
      {/** TODO: complete both implementation */}
      <span className={styles.actionSpan}>
        <button onClick={handlePublish}>Publish</button>
        <button onClick={handleDraft}>Save as draft</button>
      </span>
    </>
  );
}
