"use client";

import Link from "next/link";
import styles from "./style.module.scss";
import Arrow from "@/components/SVG/Arrow";

export default function Button({
  children,
  variant = "primary",
  color = "forest",
  fill = true,
  large,
  href,
  newWindow,
  downloadPdf,
  downloadUrl,
  onClick,
  className,
  ...props
}) {
  const buttonClasses = [
    styles.button,
    styles[variant],
    styles[color],
    styles[className],
    fill ? styles.fill : "",
    large ? styles.large : styles.small,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      <span className={styles.text}>{children}</span>
      {variant === "primary" && (
        <span className={styles.circle}>
          <Arrow />
        </span>
      )}
    </>
  );

  if (onClick) {
    return (
      <button
        className={`${buttonClasses} ${large && "large"}`}
        onClick={onClick}
        {...props}
      >
        {content}
      </button>
    );
  }

  if (downloadUrl) {
    return (
      <a
        className={`${buttonClasses} ${large && "large"}`}
        href={href}
        download
        target={newWindow ? "_blank" : ""}
        rel="noopener noreferrer"
        {...props}
      >
        {content}
      </a>
    );
  } else if (href?.startsWith("http")) {
    return (
      <a
        className={`${buttonClasses} ${large && "large"}`}
        href={href}
        target={newWindow ? "_blank" : ""}
        rel="noopener noreferrer"
        {...props}
      >
        {content}
      </a>
    );
  }

  if (href) {
    return (
      <Link
        className={`${buttonClasses} ${large && "large"}`}
        href={href}
        {...props}
      >
        {content}
      </Link>
    );
  }

  return (
    <button className={`${buttonClasses} ${large && "large"}`} {...props}>
      {content}
    </button>
  );
}
