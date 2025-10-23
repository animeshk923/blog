import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import styles from "../styles/TextEditor.module.scss";
import axiosInstance, { apiUrl } from "../api/axios";

export default function TextEditor() {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  /**
   * Escapes the content's HTML characters for safe parsing by backend handlers
   * @param {String} str incoming html content from tinyMCE editor
   * @returns escaped sanitized html content
   */
  function escapeHTML(str) {
    return str.replace(
      /[&<>'"]/g,
      (tag) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          "'": "&#39;",
          '"': "&quot;",
        }[tag])
    );
  }

  const sample = `sample text START BLOGGING!.

# heading 1
## heading 2
- bullet 1
- bullet 2
1. ordered 1
2. ordered 2

bold

italics

bold italics

normal text`;

  async function handlePublish() {
    if (!editorRef.current) return;
    const content = editorRef.current.getContent();
    console.log("publishing", content);
    const sanitizedContent = escapeHTML(content);
    console.log("sanitized", sanitizedContent);
    // TODO: setup backend handlers before passing data from the frontend
    axiosInstance
      .post(`${apiUrl}/new/publish`, sanitizedContent, {
        headers: { "Content-Type": "text/html" },
      })
      .then((res) => {
        console.log("published successfully");
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
