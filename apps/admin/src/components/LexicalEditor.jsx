import { useCallback, useEffect, useState } from "react";
import {
  $getRoot,
  $getSelection,
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  SELECTION_CHANGE_COMMAND,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  REDO_COMMAND,
  UNDO_COMMAND,
  $createParagraphNode,
  $isRangeSelection,
  $isElementNode,
} from "lexical";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListNode, ListItemNode } from "@lexical/list";
import {
  CodeNode,
  CodeHighlightNode,
  registerCodeHighlighting,
} from "@lexical/code";
import { LinkNode, AutoLinkNode } from "@lexical/link";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin";
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-json";
import "prismjs/components/prism-css";
import "prismjs/components/prism-markup";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
  $isListNode,
} from "@lexical/list";
import {
  $createHeadingNode,
  $createQuoteNode,
  $isHeadingNode,
} from "@lexical/rich-text";
import { $createCodeNode } from "@lexical/code";
import { $setBlocksType } from "@lexical/selection";
import { $getNearestNodeOfType, mergeRegister } from "@lexical/utils";
import { TRANSFORMERS } from "@lexical/markdown";
import CodeLanguageSelector from "./CodeLanguageSelector";

import styles from "../styles/LexicalEditor.module.scss";

const theme = {
  paragraph: "editor-paragraph",
  quote: "editor-quote",
  heading: {
    h1: "editor-heading-h1",
    h2: "editor-heading-h2",
    h3: "editor-heading-h3",
    h4: "editor-heading-h4",
  },
  list: {
    ol: "editor-list-ol",
    ul: "editor-list-ul",
    listitem: "editor-listitem",
  },
  code: "editor-code",
  link: "editor-link",
  text: {
    bold: "editor-text-bold",
    italic: "editor-text-italic",
    underline: "editor-text-underline",
    strikethrough: "editor-text-strikethrough",
    code: "editor-text-code",
  },
};

function buildInitialConfig(initialValue) {
  return {
    namespace: "BlogEditor",
    theme,
    nodes: [
      HeadingNode,
      QuoteNode,
      ListNode,
      ListItemNode,
      CodeNode,
      CodeHighlightNode,
      LinkNode,
      AutoLinkNode,
    ],
    onError: (error) => console.error(error),
    editorState: initialValue
      ? (editor) => {
          editor.update(() => {
            const dom = new DOMParser().parseFromString(
              initialValue,
              "text/html"
            );
            const nodes = $generateNodesFromDOM(editor, dom);
            const root = $getRoot();
            root.clear();
            nodes.forEach((node) => {
              if ($isElementNode(node)) {
                root.append(node);
              } else {
                const paragraph = $createParagraphNode();
                paragraph.append(node);
                root.append(paragraph);
              }
            });
          });
        }
      : undefined,
  };
}

function PrismCodeHighlightPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    // Register Prism-based highlighting for code blocks
    return registerCodeHighlighting(editor, Prism);
  }, [editor]);

  return null;
}

function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const [blockType, setBlockType] = useState("paragraph");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isCode, setIsCode] = useState(false);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if (!$isRangeSelection(selection)) return;

    // Update text format states
    setIsBold(selection.hasFormat("bold"));
    setIsItalic(selection.hasFormat("italic"));
    setIsUnderline(selection.hasFormat("underline"));
    setIsStrikethrough(selection.hasFormat("strikethrough"));
    setIsCode(selection.hasFormat("code"));

    // Update block type
    const anchorNode = selection.anchor.getNode();
    const element =
      anchorNode.getKey() === "root"
        ? anchorNode
        : anchorNode.getTopLevelElementOrThrow();

    if ($isListNode(element)) {
      const type = element.getListType();
      setBlockType(type === "number" ? "ol" : "ul");
    } else {
      setBlockType(
        $isHeadingNode(element) ? element.getTag() : element.getType()
      );
    }
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateToolbar();
          return false;
        },
        1
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        1
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        1
      )
    );
  }, [editor, updateToolbar]);

  const formatBlock = (type) => {
    editor.update(() => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return;

      if (type === "paragraph") {
        $setBlocksType(selection, () => $createParagraphNode());
      } else if (type === "quote") {
        $setBlocksType(selection, () => $createQuoteNode());
      } else if (type === "code") {
        $setBlocksType(selection, () => $createCodeNode());
      } else if (["h1", "h2", "h3", "h4"].includes(type)) {
        $setBlocksType(selection, () => $createHeadingNode(type));
      }
    });
  };

  const toggleList = (listType) => {
    const isActive = blockType === listType;
    const command =
      listType === "ul"
        ? INSERT_UNORDERED_LIST_COMMAND
        : INSERT_ORDERED_LIST_COMMAND;
    editor.dispatchCommand(isActive ? REMOVE_LIST_COMMAND : command, undefined);
  };

  return (
    <div className={styles.toolbar}>
      {/* Undo/Redo */}
      <div className={styles.toolbarGroup}>
        <button
          className={styles.toolbarButton}
          disabled={!canUndo}
          onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
          title="Undo (Ctrl+Z)"
        >
          ↶
        </button>
        <button
          className={styles.toolbarButton}
          disabled={!canRedo}
          onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
          title="Redo (Ctrl+Y)"
        >
          ↷
        </button>
      </div>

      <div className={styles.divider} />

      {/* Block Type Selector */}
      <div className={styles.toolbarGroup}>
        <select
          className={styles.toolbarSelect}
          value={blockType}
          onChange={(e) => formatBlock(e.target.value)}
        >
          <option value="paragraph">Normal</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
          <option value="h4">Heading 4</option>
          <option value="quote">Quote</option>
          <option value="code">Code Block</option>
        </select>
      </div>

      <div className={styles.divider} />

      {/* Text Formatting */}
      <div className={styles.toolbarGroup}>
        {[
          { format: "bold", label: "B", state: isBold, title: "Bold (Ctrl+B)" },
          {
            format: "italic",
            label: <em>I</em>,
            state: isItalic,
            title: "Italic (Ctrl+I)",
          },
          {
            format: "underline",
            label: <u>U</u>,
            state: isUnderline,
            title: "Underline (Ctrl+U)",
          },
          {
            format: "strikethrough",
            label: <s>S</s>,
            state: isStrikethrough,
            title: "Strikethrough",
          },
          { format: "code", label: "</>", state: isCode, title: "Inline Code" },
        ].map(({ format, label, state, title }) => (
          <button
            key={format}
            className={`${styles.toolbarButton} ${state ? styles.active : ""}`}
            onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, format)}
            title={title}
          >
            {typeof label === "string" ? <strong>{label}</strong> : label}
          </button>
        ))}
      </div>

      <div className={styles.divider} />

      {/* Lists */}
      <div className={styles.toolbarGroup}>
        <button
          className={`${styles.toolbarButton} ${
            blockType === "ul" ? styles.active : ""
          }`}
          onClick={() => toggleList("ul")}
          title="Bullet List"
        >
          ☰
        </button>
        <button
          className={`${styles.toolbarButton} ${
            blockType === "ol" ? styles.active : ""
          }`}
          onClick={() => toggleList("ol")}
          title="Numbered List"
        >
          ≡
        </button>
      </div>

      <div className={styles.divider} />

      {/* Text Alignment */}
      <div className={styles.toolbarGroup}>
        {["left", "center", "right", "justify"].map((align) => (
          <button
            key={align}
            className={styles.toolbarButton}
            onClick={() =>
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, align)
            }
            title={`Align ${align.charAt(0).toUpperCase() + align.slice(1)}`}
          >
            {align === "left"
              ? "⇤"
              : align === "center"
              ? "⊟"
              : align === "right"
              ? "⇥"
              : "≣"}
          </button>
        ))}
      </div>
    </div>
  );
}

function Placeholder() {
  return (
    <div className={styles.editorPlaceholder}>
      Start writing your blog post...
    </div>
  );
}

export default function LexicalEditor({ onChange, initialValue }) {
  const handleChange = (editorState, editor) => {
    onChange?.(editor.update(() => $generateHtmlFromNodes(editor)));
  };

  return (
    <div className={styles.lexicalEditorContainer}>
      <LexicalComposer initialConfig={buildInitialConfig(initialValue)}>
        <ToolbarPlugin />
        <div
          className={styles.editorContainer}
          style={{ position: "relative" }}
        >
          <CodeLanguageSelector />
          <RichTextPlugin
            contentEditable={<ContentEditable className={styles.editorInput} />}
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <AutoFocusPlugin />
          <ListPlugin />
          <LinkPlugin />
          <TabIndentationPlugin />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
          <PrismCodeHighlightPlugin />
          <OnChangePlugin onChange={handleChange} />
        </div>
      </LexicalComposer>
    </div>
  );
}
