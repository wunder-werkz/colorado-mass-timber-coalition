"use client";

import { useState } from "react";
import MailchimpSubscribe from "react-mailchimp-subscribe";

import Button from "../Button";
import styles from "./style.module.scss";

const MAILCHIMP_URL = process.env.NEXT_PUBLIC_MAILCHIMP_URL;

const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

function GatedForm({ status, message, resource, onSubmit }) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (EMAIL_REGEX.test(email)) {
      onSubmit({ EMAIL: email });
    }
  };

  if (status === "success") {
    return (
      <div className={styles.success}>
        <h3>Thanks! Your download is ready.</h3>
        <Button
          href={resource.url ? resource.url : null}
          downloadUrl={resource.downloadUrl}
          downloadPdf={resource.downloadPdf}
          newWindow
          variant="primary"
          color="forest"
          fill
        >
          Download
        </Button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3>Fill out the form for access to the document.</h3>
      <input
        type="email"
        name="EMAIL"
        required
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button
        type="submit"
        variant="primary"
        color="forest"
        fill
        disabled={status === "sending"}
      >
        {status === "sending" ? "Submitting…" : "Submit"}
      </Button>
      {status === "error" && (
        <p
          className={styles.error}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
    </form>
  );
}

export default function GatedDownloadModal({ isOpen, onClose, resource }) {
  if (!isOpen || !resource) return null;

  return (
    <div className={styles.modalWrap} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className={styles.close}
          aria-label="Close"
          onClick={onClose}
        >
          <svg viewBox="0 0 39.5 40.7">
            <line x1="5.7" y1="34.3" x2="34" y2="6" />
            <line x1="5.5" y1="6.3" x2="33.8" y2="34.6" />
          </svg>
        </button>

        <MailchimpSubscribe
          url={MAILCHIMP_URL}
          render={({ subscribe, status, message }) => (
            <GatedForm
              status={status}
              message={message}
              resource={resource}
              onSubmit={(formData) => subscribe(formData)}
            />
          )}
        />
      </div>
    </div>
  );
}
