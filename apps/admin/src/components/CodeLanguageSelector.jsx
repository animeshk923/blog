import { useCallback, useEffect, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isRangeSelection } from "lexical";
import { $isCodeNode, getCodeLanguages } from "@lexical/code";

// Prism-supported languages
const CODE_LANGUAGES = [
  { label: "Plain Text", value: "" },
  { label: "JavaScript", value: "javascript" },
  { label: "TypeScript", value: "typescript" },
  { label: "JSX", value: "jsx" },
  { label: "TSX", value: "tsx" },
  { label: "Python", value: "python" },
  { label: "Java", value: "java" },
  { label: "C", value: "c" },
  { label: "C++", value: "cpp" },
  { label: "C#", value: "csharp" },
  { label: "Go", value: "go" },
  { label: "Rust", value: "rust" },
  { label: "PHP", value: "php" },
  { label: "Ruby", value: "ruby" },
  { label: "Bash", value: "bash" },
  { label: "SQL", value: "sql" },
  { label: "HTML", value: "markup" },
  { label: "CSS", value: "css" },
  { label: "JSON", value: "json" },
  { label: "Markdown", value: "markdown" },
];

export default function CodeLanguageSelector() {
  const [editor] = useLexicalComposerContext();
  const [codeLanguage, setCodeLanguage] = useState("");
  const [isCodeBlock, setIsCodeBlock] = useState(false);

  const updateCodeLanguage = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      let element = anchorNode;
      if (anchorNode.getKey() === "root") {
        element = anchorNode;
      } else {
        element = anchorNode.getTopLevelElementOrThrow();
      }

      if ($isCodeNode(element)) {
        const language = element.getLanguage() || "";
        setCodeLanguage(language);
        setIsCodeBlock(true);
      } else {
        setIsCodeBlock(false);
      }
    }
  }, []);

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        updateCodeLanguage();
      });
    });
  }, [editor, updateCodeLanguage]);

  const onCodeLanguageSelect = (e) => {
    const language = e.target.value;
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const anchorNode = selection.anchor.getNode();
        let element = anchorNode;
        if (anchorNode.getKey() !== "root") {
          element = anchorNode.getTopLevelElementOrThrow();
        }

        if ($isCodeNode(element)) {
          element.setLanguage(language);
        }
      }
    });
  };

  if (!isCodeBlock) {
    return null;
  }

  return (
    <select
      value={codeLanguage}
      onChange={onCodeLanguageSelect}
      style={{
        position: "absolute",
        top: "8px",
        right: "8px",
        zIndex: 10,
        padding: "4px 8px",
        fontSize: "12px",
        borderRadius: "4px",
        border: "1px solid #ccc",
        background: "#1e1e1e",
        color: "#fff",
      }}
    >
      {CODE_LANGUAGES.map((lang) => (
        <option key={lang.value} value={lang.value}>
          {lang.label}
        </option>
      ))}
    </select>
  );
}
