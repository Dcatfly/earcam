'use client';

interface OptimizedImageProps {
  imageKey: string;
  lang: 'en' | 'zh';
  alt: string;
  className?: string;
  sizes?: string;
  loading?: 'eager' | 'lazy';
}

// Get base path from environment variable (set in next.config.ts)
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

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
  const webpSmall = `${BASE_PATH}/images/optimized/${fileName}-small.webp`;
  const webpMedium = `${BASE_PATH}/images/optimized/${fileName}-medium.webp`;
  const webpLarge = `${BASE_PATH}/images/optimized/${fileName}-large.webp`;
  const fallbackPng = `${BASE_PATH}/images/optimized/${fileName}-optimized.png`;

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