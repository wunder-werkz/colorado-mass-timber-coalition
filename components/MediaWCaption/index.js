import * as styles from "./style.module.scss";

import Image from "next/image";

export const MediaWCaption = ({ url, caption, priority = false }) => {
  const imageUrl = typeof url === "string" ? url : url?.src;
  const isGif = imageUrl?.toLowerCase().endsWith(".gif");
  const isRemoteUrl = typeof url === "string";

  // Only GIFs need custom blurDataURL
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
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        style={{
          objectFit: "cover",
        }}
        loading={priority ? "eager" : "lazy"}
        quality={75}
        {...(!isRemoteUrl && { placeholder: "blur" })}
        {...(isGif && { placeholder: "blur", blurDataURL })}
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
