import * as styles from "./style.module.scss";

import Image from "next/image";

export const MediaWCaption = ({ url, caption }) => {
  const imageUrl = typeof url === "string" ? url : url?.src;
  const isGif = imageUrl?.toLowerCase().endsWith(".gif");
  const blurDataURL = isGif
    ? "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8H8NQDwAFmQHc0XzqVQAAAABJRU5ErkJggg=="
    : undefined;

  return (
    <div className={styles.mediaWCaption}>
      <Image
        src={url}
        alt={caption || "CMTA Media"}
        className={styles.media}
        fill
        sizes="(min-width: 808px) 100vw, 150vw"
        style={{
          objectFit: "cover",
        }}
        loading="lazy"
        placeholder={typeof url === "string" ? undefined : "blur"}
        blurDataURL={isGif ? blurDataURL : undefined}
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
