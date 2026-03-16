import Image from 'next/image';

interface CoverImageProps {
  src: string;
  alt: string;
  sizes?: string;
}

/**
 * Renders a cover image that fills its parent container.
 * External URLs (http/https) are rendered as a plain <img> to avoid
 * Next.js trying to proxy them — Amazon / Goodreads CDN blocks that with 403.
 * Local paths (/images/...) use Next.js <Image> for optimisation.
 */
export default function CoverImage({ src, alt, sizes }: CoverImageProps) {
  const isExternal = src.startsWith('http');

  if (isExternal) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      style={{ objectFit: 'cover' }}
      sizes={sizes}
    />
  );
}
