"use client";

import { useState } from "react";
import MailchimpSubscribe from "react-mailchimp-subscribe";

import Button from "../Button";
import styles from "./style.module.scss";

const MAILCHIMP_URL_INFOGATE = process.env.NEXT_PUBLIC_MAILCHIMP_URL_INFOGATE;
const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

function GatedForm({ status, message, resource, onSubmit }) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [occupation, setOccupation] = useState(""); 
  const [newsletter, setNewsletter] = useState("");
  const [other, setOther] = useState(""); 

  const [occupationOptions] = useState([
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
  ]);

  const [newsletterOptions] = useState([
    "Yes",
    "No, but please add me",
    "No thanks",
  ]);

  const [otherOptions] = useState([
    "Other",
  ]);

  const [occupationSelected, setOccupationSelected] = useState("");
  const [newsletterSelected, setNewsletterSelected] = useState("");
  const [otherSelected, setOtherSelected] = useState(""); 

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
      <div id="mc_embed_signup_scroll">
        <h2>Subscribe</h2>
        <div className="indicates-required">
          <span className="asterisk">*</span> indicates required
        </div>
        <div className="mc-field-group">
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
        <div className="mc-field-group">
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
        <div className="mc-field-group">
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
        <div className="mc-field-group">
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
        <div className="mc-field-group">
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
        <div className="mc-field-group input-group">
          <strong>
            Which best describes your occupation (select one)? <span className="asterisk">*</span>
          </strong>
          <ul>
            <li>
              <input 
                type="radio" 
                name="MMERGE9" 
                id="mce-MMERGE90" 
                value="Architecture"
                checked={occupationSelected === "Architecture"}
                onChange={(e) => setOccupationSelected(e.target.value)}
                />
              <label for="mce-MMERGE90">Architecture</label>
            </li>
            <li>
              <input 
                type="radio" 
                name="MMERGE9" 
                id="mce-MMERGE91" 
                value="Engineering"
                checked={occupationSelected === "Engineering"}
                onChange={(e) => setOccupationSelected(e.target.value)}
                />
                <label for="mce-MMERGE91">Engineering</label>
            </li>
            <li>
              <input 
                type="radio" 
                name="MMERGE9" 
                id="mce-MMERGE92" 
                value="Construction"
                checked={occupationSelected === "Construction"}
                onChange={(e) => setOccupationSelected(e.target.value)}
                />
              <label for="mce-MMERGE92">Construction</label>
            </li>
              <li>
                <input 
                  type="radio" 
                  name="MMERGE9" 
                  id="mce-MMERGE94" 
                  value="Forestry"
                  checked={occupationSelected === "Forestry"}
                  onChange={(e) => setOccupationSelected(e.target.value)}
                  />
                <label for="mce-MMERGE94">Forestry</label>
              </li>
              <li>
                <input 
                  type="radio" 
                  name="MMERGE9" 
                  id="mce-MMERGE95" 
                  value="Forest Products"
                  checked={occupationSelected === "Forest Products"}
                  onChange={(e) => setOccupationSelected(e.target.value)}
                  />
                <label for="mce-MMERGE95">Forest Products</label>
              </li>
              <li>
                <input 
                  type="radio" 
                  name="MMERGE9" 
                  id="mce-MMERGE96" 
                  value="Mass Timber"
                  checked={occupationSelected === "Mass Timber"}
                  onChange={(e) => setOccupationSelected(e.target.value)}
                  />
                <label for="mce-MMERGE96">Mass Timber</label>
              </li>
              <li>
                <input 
                  type="radio" 
                  name="MMERGE9" 
                  id="mce-MMERGE97" 
                  value="Government"
                  checked={occupationSelected === "Government"}
                  onChange={(e) => setOccupationSelected(e.target.value)}
                  />
                <label for="mce-MMERGE97">Government</label>
              </li>
              <li>
                <input 
                  type="radio" 
                  name="MMERGE9" 
                  id="mce-MMERGE98" 
                  value="Academia"
                  checked={occupationSelected === "Academia"}
                  onChange={(e) => setOccupationSelected(e.target.value)}
                  />  
                <label for="mce-MMERGE98">Academia</label>
              </li>
              <li>
                <input 
                  type="radio" 
                  name="MMERGE9" 
                  id="mce-MMERGE99" 
                  value="Consulting"
                  checked={occupationSelected === "Consulting"}
                  onChange={(e) => setOccupationSelected(e.target.value)}
                  />
                <label for="mce-MMERGE99">Consulting</label>
              </li>
              <li>
                <input 
                  type="radio" 
                  name="MMERGE9" 
                  id="mce-MMERGE910" 
                  value="Other"
                  checked={occupationSelected === "Other"}
                  onChange={(e) => setOccupationSelected(e.target.value)}
                  />
                <label for="mce-MMERGE910">Other</label>
              </li>
          </ul>
        </div>
        <div className="mc-field-group input-group">
          <strong>
            Are you a subscriber to the CMTC Newsletter <span className="asterisk">*</span>
          </strong>
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
