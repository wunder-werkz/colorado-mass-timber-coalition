"use client";

// import MailchimpSubscribe from "react-mailchimp-subscribe";
import { PortableText } from "@portabletext/react";

import { useEffect, useState, useRef} from "react";
// import NewsletterForm from "../Footer/NewsletterForm";

import styles from "./style.module.scss";

// import SubmitButton from "~/components/Buttons/SubmitButton";
// import ImageRender from "~/components/ImageRender/ImageRender";
import Button from "../Button";
import SplitTextBg from "../SplitTextBg";


const MarketingModal = ({ modal }) => {
  const {
    emailSignup,
    eyebrowCopy,
    headline,
    image,
    imageHeight,
    imageWidth,
    imageUrl,
    isVisible,
    link,
    shortCopy,
  } = modal[0];

//   const MAILCHIMP_URL = process.env.NEXT_PUBLIC_MAILCHIMP_URL;
    const [showModal, setShowModal] = useState(false);
    const [modalEnter, setModalEnter] = useState();


  // Close Marketing Modal
  const handleClose = () => {
    const body = document.querySelector("main");

    body.style.overflow = "unset";
    body.style.height = "auto";
    setModalEnter(false);
    setTimeout(() => {
      setShowModal(false);
    }, 500);
    window.sessionStorage.setItem("viewedModal", "true");
  };

    useEffect(() => {
        const viewedModal = window.sessionStorage.getItem("viewedModal");
        const body = document.querySelector("main");

        if (isVisible && !viewedModal) {
            setShowModal(true);
            
        setTimeout(() => {
            body.style.overflow = "hidden";
            body.style.height = "100vh";
            setModalEnter(true);
        }, 3000);
        } else {
            setShowModal(false);
        }

    }, [modal]);

  return (
    <div className={`${styles.modalWrap} ${modalEnter && styles.modalEnter}`}>
        <div
            className={`${styles.marketingModal} ${modalEnter && styles.modalEnter}`}
            >
            <div className={styles.close} onClick={() => handleClose()}>
                <svg viewBox="0 0 39.5 40.7">
                    <line x1="5.7" y1="34.3" x2="34" y2="6"/>
                    <line x1="5.5" y1="6.3" x2="33.8" y2="34.6"/>
                </svg>
            </div>
            {headline && 
                <div className={styles.headline}>
                    <h1><span> {headline} </span> </h1>
                </div>
            }
            {/* {image && imageUrl && (
                <div className={styles.imageContainer}>
                <ImageRender
                    title={
                    image && image.title ? image.title : "marketing pop up image"
                    }
                    image={image.image}
                    size="small"
                    priority="lazy"
                />
                </div>
            )} */}
            <div className={styles.copyButtonContainer}>
                {shortCopy && (
                <div className={styles.textContainer}>
                    <PortableText value={shortCopy} />
                </div>
                )}
                {link &&
                !emailSignup &&
                link.map((link, i) => {
                    return (
                    <div className={styles.buttonContainer} key={`link-${i}`}>
                        <Button
                            href={link.url}
                            newWindow={link.newWindow}
                            downloadPdf={link.downloadPdf}
                            downloadUrl={link.downloadUrl}
                            variant="primary"
                            color="forest"
                            fill={false}
                        >
                            {link.linkTitle ? link.linkTitle : "Learn More"}
                        </Button>
                    </div>
                    );
                })}
            </div>
            {/* {emailSignup && (
                <div className={styles.emailSignup}>
                <MailchimpSubscribe
                    url={MAILCHIMP_URL}
                    render={(props) => {
                        const { subscribe, status, message } = props || {};
                        return (
                        <NewsletterForm
                            modal={true}
                            status={status}
                            message={message}
                            onValidated={(formData) => subscribe(formData)}
                        />
                        );
                        }}
                    />
                </div>
            )} */}
        </div>
    </div>
   
  );
};

export default MarketingModal;
