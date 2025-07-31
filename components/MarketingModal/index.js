"use client";

// import MailchimpSubscribe from "react-mailchimp-subscribe";
import { PortableText } from "@portabletext/react";

import { useEffect, useState} from "react";
// import NewsletterForm from "../Footer/NewsletterForm";

import styles from "./style.module.scss";

// import SubmitButton from "~/components/Buttons/SubmitButton";
// import ImageRender from "~/components/ImageRender/ImageRender";
import Button from "../Button";



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
    setModalEnter(false);
    setTimeout(() => {
      setShowModal(false);
    }, 500);
    window.sessionStorage.setItem("viewedModal", "true");
  };

  useEffect(() => {
    const viewedModal = window.sessionStorage.getItem("viewedModal");

    if (isVisible && !viewedModal) {
      setShowModal(true);
      setTimeout(() => {
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
                x
            </div>
            
            {headline && (
                <div className={styles.headline}>
                <h2>{headline}</h2>
                </div>
            )}
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
