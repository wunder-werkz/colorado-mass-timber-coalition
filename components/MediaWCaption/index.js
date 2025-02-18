import * as styles from "./style.module.scss";

import Image from "next/image";

export const MediaWCaption = ({ url, caption }) => {
  return (
    <div className={styles.mediaWCaption}>
      <Image
        src={url}
        alt={caption || "CMTA Media"}
        className={styles.media}
        width={1500}
        height={1500}
        objectFit="cover"
        objectPosition="center"
      />
      {caption && (
        <div
          className={`${styles.caption}`}
          dangerouslySetInnerHTML={{ __html: caption }}
        />
      )}
    </div>
  );
};
