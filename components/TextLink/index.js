import Link from "next/link";

import styles from "./style.module.scss";
import Button from "../Button";

const TextLink = ({ linkTitle, link, linkUrl,  handleClose, button }) => {
  let href = linkUrl;
  let titleButton = linkTitle;
  let openNewWindow = false;
  let download = null;

  if (link) {
    let { linkTitle, url, newWindow, downloadUrl } = link;
    href = url;
    download = downloadUrl;
    titleButton = linkTitle;
    openNewWindow = newWindow;
  }
  if (href && titleButton) {
    return openNewWindow ? (
      <a
        href={href}
        className={`${styles.textLink} ${button && styles.noline}`}
        target="_blank"
        rel="noreferrer"
        title={titleButton}
        aria-label={titleButton}
        onClick={(e) => {
          if (handleClose) {
            handleClose(); 
          }
          e.stopPropagation()}}
      >
        {!button ? titleButton : <Button
        variant="primary"
        color="orange"
        fill={true}> {titleButton} </Button>}
      </a>
    ) : (
      <Link
        href={href}
        className={`${styles.textLink} ${button && styles.noline}`}
        title={titleButton}
        aria-label={titleButton}
        onClick={(e) => { 
          if (handleClose) {
            handleClose();
          }
          e.stopPropagation()}
        }
      >
        {!button ? titleButton : <Button
        variant="primary"
        color="orange"
        fill={true}> {titleButton} </Button>}
      </Link>
    );
  } else if ((titleButton && download) || href) {
    return (
      <a
        href={download}
        download
        className={`${styles.textLink} ${button && styles.noline}`}
        target="_blank"
        rel="noreferrer"
        title={titleButton}
        aria-label={titleButton}
        onClick={(e) => {
          if (handleClose) {
            handleClose()
          }
          e.stopPropagation()}
        }
      >
        {!button ? titleButton : <Button variant="primary"
                  color="orange"
                  fill={true}> {titleButton} </Button>}
      </a>
    );
  } else {
    return "";
  }
};

export default TextLink;
