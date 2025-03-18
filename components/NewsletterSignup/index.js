import MailchimpSubscribe from "react-mailchimp-subscribe";
import { useRef, useState } from "react";
import Button from "@/components/Button";

import * as styles from "./style.module.scss";

const NewsletterSignup = () => {
  const MAILCHIMP_URL = process.env.NEXT_PUBLIC_MAILCHIMP_URL;
  const [email, setEmail] = useState("");

  return (
    <div className={`${styles.wrap}`}>
      <h3>Stay Connected</h3>
      <p>Sign up for our newsletter</p>
      <div>
        <MailchimpSubscribe
          url={MAILCHIMP_URL}
          render={({ subscribe, status, message }) => (
            <div className={`${styles.newsletter}`}>
              <div className={`${styles.form}`}>
                <label>
                  Email
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your Email Here"
                  />
                </label>
                <Button
                  onClick={() => subscribe({ EMAIL: email })}
                  variant="primary"
                  color="orange"
                  fill={false}
                >
                  Submit
                </Button>
              </div>
              {status === "sending" && <p>Sending...</p>}
              {status === "error" && (
                <p>Error: Unable to subsribe {message.error}</p>
              )}
              {status === "success" && <p>Subscribed successfully!</p>}
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default NewsletterSignup;
