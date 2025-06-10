import { useMemo } from "react";
import Image from "next/image";
// import { useNextSanityImage } from "next-sanity-image";
import { client } from '../../sanity/lib/client'

const imageSizes = {
  small: 400,
  medium: 800,
  large: 1800,
};

export default function ImageRender({
  imageUrl,
  image,
  title, 
  size,
  height, 
  width, 
  priority = false,
}) {

  const imageBuilder = useMemo(
    () => (imageUrlBuilder, options) => {
      return imageUrlBuilder
        .width(options.width || imageSizes[size])
        .quality(75)
        .fit("clip");
    },
    [size],
  );
  const imageProps = {src: `${image.asset.url}?q=75&fit=clip&auto=format`, width: image.asset.metadata.dimensions.width, height: image.asset.metadata.dimensions.height};
  if (image) {
  if (!imageProps) return null;
  const blurDataUrl = image?.asset?.metadata?.lqip;
  if (blurDataUrl) {
      return (
        <Image
          {...imageProps}
          sizes={`(max-width: ${imageSizes[size]}px) 100vw, ${imageSizes[size]}px`}
          placeholder="blur"
          blurDataURL={blurDataUrl}
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          alt={title ? title : image?.alt ? image?.alt : ""}
        />
      );
    } else {
      return (
        <Image
          {...imageProps}
          sizes={`(max-width: ${imageSizes[size]}px) 100vw, ${imageSizes[size]}px`}
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          alt={title ? title : image?.alt ? image?.alt : ""}
        />
      );
    }
   
  } else if (imageUrl) {
      const imageSize = size ? size : "medium";
      return (
        <Image
          alt={title}
          src={imageUrl}
          width={size ? imageSizes[imageSize] : height ? height : 900}
          height={size ? imageSizes[imageSize] : width ? width : 900}
          loading={priority ? "eager" : "lazy"}
          priority={priority}
        />
      );

  } else return;
  
}
