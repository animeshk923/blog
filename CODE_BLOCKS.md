# Code Block Syntax Highlighting

This blog platform now supports **Obsidian-style code blocks** with Prism.js syntax highlighting.

## Features

- **In-Editor Highlighting**: Code blocks are highlighted in the Lexical editor as you type.
- **Language Selection**: Choose from 20+ programming languages using the dropdown that appears when you select a code block.
- **Frontend Rendering**: Published blogs automatically apply syntax highlighting via Prism.js.

## How to Use in Admin Editor

1. **Create a Code Block**:
   - Select the "Code Block" option from the block type dropdown in the toolbar.
   - Or use the markdown shortcut: Type triple backticks (\`\`\`) and press Enter.

2. **Select Language**:
   - Click inside the code block.
   - A language selector will appear in the top-right corner of the code block.
   - Choose your language (JavaScript, Python, Bash, etc.).

3. **Write Code**:
   - Type or paste your code inside the block.
   - Syntax highlighting will apply automatically.

## Example

When you create a code block and select "JavaScript", then write:

```javascript
function fancyAlert(arg) {
  if(arg) {
    $.facebox({div:'#foo'})
  }
}
```

It will render with proper syntax highlighting on both the admin editor and the published blog page.

## Supported Languages

JavaScript, TypeScript, JSX, TSX, Python, Java, C, C++, C#, Go, Rust, PHP, Ruby, Bash, SQL, HTML, CSS, JSON, Markdown, and more.

## Technical Details

- **Admin Editor**: Uses Lexical's `CodeHighlightPlugin` with Prism tokenizer.
- **Frontend**: Uses `html-react-parser` + Prism's `highlightAll()` function.
- **Backend**: Sanitizes HTML but preserves `<pre>` and `<code>` tags with `class` attributes for language identification.

---

**Note**: The language class format is `language-{lang}`, e.g., `language-javascript` or `language-python`, which is the standard Prism.js convention.
