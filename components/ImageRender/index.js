import { useMemo } from "react";
import Image from "next/image";
import { useNextSanityImage } from "next-sanity-image";

import styles from "./style.module.scss";

import { getClient } from "~/lib/sanity.client";
const imageSizes = {
  small: 400,
  medium: 800,
  large: 1800,
};

export default function ImageRender({
  image,
  size = "medium",
  priority = false,
  position = "relative",
}) {
  const client = getClient();
  const imageBuilder = useMemo(
    () => (imageUrlBuilder, options) => {
      return imageUrlBuilder
        .width(options.width || imageSizes[size])
        .quality(75)
        .fit("clip");
    },
    [size],
  );

  const imageProps = useNextSanityImage(client, image);
  if (!imageProps) return null;

  return (
    <Image
      {...imageProps}
      className={position == "absolute" ? styles.absolute : styles.relative}
      sizes={`(max-width: ${imageSizes[size]}px) 100vw, ${imageSizes[size]}px`}
      placeholder="blur"
      blurDataURL={image?.asset?.metadata?.lqip}
      priority={priority}
      loading={priority ? "eager" : "lazy"}
      alt={image?.alt || ""}
    />
  );
}
