import * as styles from "./style.module.scss";
import Image from "next/image";
import useWindowSize from "@/hooks/useWindowSize";
import { memo, useState, useEffect } from "react";

export const MediaWCaption = memo(
  ({ url, caption, priority = false, imagePosition }) => {
    const { width } = useWindowSize();
    const [isLoaded, setIsLoaded] = useState(false);
    const imageUrl = typeof url === "string" ? url : url?.src;
    const isGif = imageUrl?.toLowerCase().endsWith(".gif");
    const isRemoteUrl = typeof url === "string";

    // Only GIFs need custom blurDataURL
    const blurDataURL = isGif
      ? "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8H8NQDwAFmQHc0XzqVQAAAABJRU5ErkJggg=="
      : undefined;

    // Use effect to help with initial render flickering
    useEffect(() => {
      if (priority) {
        // If priority, set loaded immediately for smooth animations
        setIsLoaded(true);
      }
    }, [priority]);

    // Determine quality based on device performance
    const imageQuality = isGif
      ? width < 768
        ? 40
        : 50
      : width < 768
        ? 85
        : 95;

    return (
      <div className={styles.mediaWCaption}>
        <div
          className={`will-change-transform ${isLoaded ? "loaded" : ""}`}
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            transition: "opacity 0.3s ease-in-out",
            opacity: isLoaded ? 1 : 0,
          }}
        >
          <Image
            src={url}
            alt={caption || "CMTA Media"}
            className={styles.media}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
            style={{
              objectFit: "cover",
              willChange: "transform",
              objectPosition: imagePosition
                ? `${imagePosition}`
                : "center center",
            }}
            loading={priority ? "eager" : "lazy"}
            quality={imageQuality}
            unoptimized={isGif}
            onLoad={() => setIsLoaded(true)}
            {...(!isRemoteUrl && { placeholder: "blur" })}
            {...(isGif && { placeholder: "blur", blurDataURL })}
          />
        </div>
        {caption && (
          <div
            className={`${styles.caption}`}
            dangerouslySetInnerHTML={{ __html: caption }}
          />
        )}
      </div>
    );
  }
);

MediaWCaption.displayName = "MediaWCaption";
