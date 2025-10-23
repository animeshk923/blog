import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import styles from "../styles/TextEditor.module.scss";

export default function TextEditor() {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  async function handlePublish() {
    const content = editorRef.current.getContent();
  }

  async function handleDraft() {
    const content = editorRef.current.getContent();
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
