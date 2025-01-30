"use client";

import Link from "next/link";
import styles from "./style.module.scss";
import Arrow from "./Arrow";

export default function Button({
  children,
  variant = "primary",
  color = "forest",
  fill = true,
  href,
  onClick,
  className,
  ...props
}) {
  const buttonClasses = [
    styles.button,
    styles[variant],
    styles[color],
    fill ? styles.fill : "",
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
      <button className={buttonClasses} onClick={onClick} {...props}>
        {content}
      </button>
    );
  }

  if (href?.startsWith("http")) {
    return (
      <a
        className={buttonClasses}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {content}
      </a>
    );
  }

  if (href) {
    return (
      <Link className={buttonClasses} href={href} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button className={buttonClasses} {...props}>
      {content}
    </button>
  );
}
