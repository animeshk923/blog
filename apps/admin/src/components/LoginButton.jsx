import React from "react";
import styles from "../styles/Logout.module.scss";
/**
 * Props:
 * - onClick: function
 * - disabled: boolean
 * - size: "small" | "medium" | "large"
 * - compact: boolean (icon-only compact)
 */
export default function LoginButton({
  onClick,
  disabled = false,
  size = "medium",
  compact = false,
}) {
  const sizeClass = styles[size] || styles.medium;
  const compactClass = compact ? styles.compact : "";
  const classes = [styles.btn, styles.danger, sizeClass, compactClass]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      className={classes}
      onClick={onClick}
      disabled={disabled}
      aria-label="Log out"
      title="Log out"
    >
      {/* simple SVG icon inline — no external assets */}
      <span className={styles.icon} aria-hidden="true">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          focusable="false"
        >
          <path
            d="M16 17l5-5-5-5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 12H9"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13 19H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h7"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>

      {/* hide label when compact */}
      {!compact && <span className={styles.label}>Log In</span>}
    </button>
  );
}
