"use client";

import { useEffect, useState } from "react";
import MailchimpSubscribe from "react-mailchimp-subscribe";

import Button from "../Button";
import styles from "./style.module.scss";

// Keep the gate working when the env var is missing from a build, and when
// a pasted Mailchimp embed URL still has HTML-encoded ampersands.
const DEFAULT_MAILCHIMP_URL_INFOGATE =
  "https://comasstimber.us22.list-manage.com/subscribe/post?u=7c9e75d277daa78c4376311b5&id=a68199166e&f_id=00b8c2e1f0";

function mailchimpFormUrl(value) {
  const url = (value || DEFAULT_MAILCHIMP_URL_INFOGATE).replace(/&amp;/g, "&");
  return url.includes("/subscribe/post") ? url : DEFAULT_MAILCHIMP_URL_INFOGATE;
}

const MAILCHIMP_URL_INFOGATE = mailchimpFormUrl(
  process.env.NEXT_PUBLIC_MAILCHIMP_URL_INFOGATE
);
const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

function GatedForm({ status, message, resource, onSubmit }) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");

  // Values must match the Mailchimp radio field exactly. Labels that differ
  // are rejected and the subscribe call never succeeds.
  const occupationOptions = [
    "Architecture",
    "Engineering",
    "Construction",
    "Development/Owner",
    "Forestry",
    "Forest Products",
    "Mass Timber",
    "Government",
    "Academia",
    "Consulting",
    "Other",
  ];


  const [occupationSelected, setOccupationSelected] = useState("");
  const [newsletterSelected, setNewsletterSelected] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (EMAIL_REGEX.test(email)) {
      onSubmit({ 
        EMAIL: email,
        FNAME: firstName,
        LNAME: lastName,
        COMPANY: company,
        POSITION: position,
        MMERGE9: occupationSelected,
        MMERGE8: newsletterSelected,
       });
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
      <h3>Please, fill out the form to download the report.</h3>
      <div className={styles.indicatesRequired}>
          <span className="asterisk">*</span> indicates required
        </div>
      <div id="mc_embed_signup_scroll" className={styles.mcForm}> 
        <div className={styles.mcFieldGroup}>
          <label for="mce-FNAME">
            First Name <span className="asterisk">*</span>
          </label>
          <input 
            type="text" 
            name="FNAME" 
            className="required text" 
            id="mce-FNAME" 
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            />
        </div>
        <div className={styles.mcFieldGroup}>
          <label for="mce-LNAME">
            Last Name 
            <span className="asterisk">*</span>
          </label>
          <input 
            type="text" 
            name="LNAME" 
            className="required text" 
            id="mce-LNAME" 
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            />
        </div>
        <div className={styles.mcFieldGroup}>
          <label for="mce-EMAIL">
            Email Address 
            <span className="asterisk">*</span>
          </label>
          <input 
            type="email" 
            name="EMAIL" 
            required
            className="required email" 
            id="mce-EMAIL" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
        </div>
        <div className={styles.mcFieldGroup}>
          <label for="mce-COMPANY">
            Company/Organization
            <span className="asterisk">*</span>
          </label>
          <input 
            type="text" 
            name="COMPANY" 
            className="required text" 
            id="mce-COMPANY" 
            required
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            />
        </div>
        <div className={styles.mcFieldGroup}>
          <label for="mce-POSITION">
            Role/Title 
            <span className="asterisk">*</span>
          </label>
          <input type="text" name="POSITION" className="required text" id="mce-POSITION" 
            required
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            />
        </div>
        <div className={`${styles.mcFieldGroup} ${styles.mcInputGroup}`}>
          <strong>
            Which best describes your occupation (select one)? <span className="asterisk">*</span>
          </strong>
          <ul>
            {occupationOptions.map((option, index) => {
              const id = `mce-MMERGE9-${index}`;
              return (
                <li key={option}>
                  <input
                    type="radio"
                    name="MMERGE9"
                    id={id}
                    value={option}
                    required
                    checked={occupationSelected === option}
                    onChange={(e) => setOccupationSelected(e.target.value)}
                  />
                  <label htmlFor={id}>{option}</label>
                </li>
              );
            })}
          </ul>
        </div>
        <div className={`${styles.mcFieldGroup} ${styles.mcInputGroup}`}>
          <strong>
            Are you a subscriber to the CMTC Newsletter <span className="asterisk">*</span>
          </strong>
          <p>Selecting yes or add me will automatically sign you up for our email marketing. </p>
          <ul>
            <li>
              <input 
                type="radio" 
                name="MMERGE8" 
                id="mce-MMERGE80" 
                value="Yes"
                checked={newsletterSelected === "Yes"}
                onChange={(e) => setNewsletterSelected(e.target.value)}
              />
              <label for="mce-MMERGE80">Yes</label>
            </li>
            <li>
              <input 
                type="radio" 
                name="MMERGE8" 
                id="mce-MMERGE81" 
                value="No, but please add me"
                checked={newsletterSelected === "No, but please add me"}
                onChange={(e) => setNewsletterSelected(e.target.value)}
                />
                <label for="mce-MMERGE81">No, but please add me</label>
              </li>
              <li>
                <input 
                type="radio" 
                name="MMERGE8" 
                id="mce-MMERGE82" 
                value="No thanks"
                checked={newsletterSelected === "No thanks"}
                onChange={(e) => setNewsletterSelected(e.target.value)}
                />
                <label for="mce-MMERGE82">No thanks</label>
              </li>
            </ul>
          </div>
      </div>
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
  useEffect(() => {
    if (!isOpen || !resource) return;

    const html = document.documentElement;
    const body = document.body;
    const main = document.querySelector("main");
    const lenis = window.lenis;

    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    const previousBodyHeight = body.style.height;
    const previousMainOverflow = main?.style.overflow ?? "";
    const previousMainHeight = main?.style.height ?? "";

    lenis?.stop();

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.height = "100vh";

    if (main) {
      main.style.overflow = "hidden";
      main.style.height = "100%";
    }

    return () => {
      lenis?.start();

      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
      body.style.height = previousBodyHeight;

      if (main) {
        main.style.overflow = previousMainOverflow;
        main.style.height = previousMainHeight;
      }
    };
  }, [isOpen, resource]);

  if (!isOpen || !resource) return null;

  return (
    <div className={styles.modalWrap} onClick={onClose}>
      <div
        className={styles.modal}
        data-lenis-prevent
        onClick={(e) => e.stopPropagation()}
      >
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
          url={MAILCHIMP_URL_INFOGATE}
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
