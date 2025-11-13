'use client';

interface OptimizedImageProps {
  imageKey: string;
  lang: 'en' | 'zh';
  alt: string;
  className?: string;
  sizes?: string;
  loading?: 'eager' | 'lazy';
}

export default function OptimizedImage({
  imageKey,
  lang,
  alt,
  className,
  sizes = '100vw',
  loading = 'lazy'
}: OptimizedImageProps) {
  // Generate the full filename based on imageKey and lang
  const fileName = `${imageKey}-${lang}`;

  // Add base path to image URLs
  const webpSmall = `/images/optimized/${fileName}-small.webp`;
  const webpMedium = `/images/optimized/${fileName}-medium.webp`;
  const webpLarge = `/images/optimized/${fileName}-large.webp`;
  const fallbackPng = `/images/optimized/${fileName}-optimized.png`;

  return (
    <picture>
      {/* WebP sources for different screen sizes */}
      <source
        type="image/webp"
        srcSet={`
          ${webpSmall} 640w,
          ${webpMedium} 1024w,
          ${webpLarge} 1920w
        `}
        sizes={sizes}
      />

      {/* PNG fallback */}
      <img
        src={fallbackPng}
        alt={alt}
        className={className}
        loading={loading}
      />
    </picture>
  );
}
