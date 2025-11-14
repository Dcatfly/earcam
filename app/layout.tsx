import type { Metadata } from 'next';
import Script from 'next/script';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import { siteConfig } from '@/lib/siteConfig';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.baseUrl),
  title: {
    default: 'Earcam - Smart TV App for Bebird Ear Camera | Bebird 可视掏耳勺电视版 | Big Screen Viewing',
    template: '%s | Earcam'
  },
  description: 'Transform your TV into a professional ear care station for Bebird devices. Compatible with Bebird Note3, Bebird Note5 and other smart ear camera devices. View real-time HD video on big screen. | 将您的智能电视变成专业的耳道护理站，兼容 Bebird Note3、Bebird Note5 等智能可视掏耳勺设备，在电视大屏上查看高清实时视频。',
  keywords: [
    // English keywords - Bebird focused
    'Bebird', 'Bebird TV', 'Bebird TV app', 'Bebird Note3', 'Bebird Note5', 'Bebird Note3 Pro',
    'ear camera', 'ear cleaning', 'ear care', 'otoscope', 'ear health', 'ear scope', 'ear wax removal',
    'TV app', 'Smart TV', 'big screen', 'ear camera TV', 'smart ear camera', 'wireless ear camera',
    'TV ear camera app', 'big screen ear cleaning', 'ear camera big screen', 'Bebird compatible',
    // Chinese keywords - Bebird focused
    'Bebird', 'Bebird 电视版', 'Bebird TV', 'Bebird 掏耳勺', 'Bebird Note3', 'Bebird Note5',
    '可视掏耳勺', '智能可视掏耳勺', '掏耳勺', '智能掏耳勺', '掏耳勺电视', '可视掏耳勺 电视',
    '智能掏耳勺 大屏', '电视掏耳勺', '无线可视掏耳勺', '大屏掏耳勺', 'Bebird 大屏',
    '耳道清洁', '耳道护理', '耳镜', '耳道摄像头', '采耳工具', '智能电视应用'
  ],
  authors: [{ name: 'Earcam Team' }],
  publisher: 'Earcam',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.png',
  },
  alternates: {
    canonical: '/',
    languages: {
      'en': '/',
      'zh': '/zh',
    },
  },
  openGraph: {
    title: 'Earcam TV App - Bebird Compatible Smart Ear Camera for Big Screen',
    description: 'Transform your TV into a professional ear care station. Works with Bebird Note3, Note5 and other smart ear camera devices. View real-time HD video on big screen.',
    url: '/',
    siteName: 'Earcam',
    locale: 'en_US',
    alternateLocale: ['zh_CN'],
    type: 'website',
    images: [
      {
        url: '/images/optimized/home-disconnected-en-optimized.png',
        width: 1024,
        height: 576,
        alt: 'Earcam TV App - Bebird Compatible Smart Ear Camera for Big Screen',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Earcam TV App - Bebird Compatible',
    description: 'Transform your TV into a professional ear care station. Compatible with Bebird and other smart ear cameras.',
    images: ['/images/optimized/home-disconnected-en-optimized.png'],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#5B8FF9',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // Structured Data (JSON-LD) for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': siteConfig.absolutePath('/#webpage'),
        url: siteConfig.baseUrl,
        name: 'Earcam - Smart TV App for Bebird Ear Camera',
        description: 'Transform your TV into a professional ear care station. Compatible with Bebird and other smart ear camera devices.',
        inLanguage: 'en-US',
        isPartOf: { '@id': siteConfig.absolutePath('/#website') },
      },
      {
        '@type': 'WebSite',
        '@id': siteConfig.absolutePath('/#website'),
        url: siteConfig.baseUrl,
        name: 'Earcam',
        description: 'Professional ear care TV app for Bebird devices',
        publisher: { '@id': siteConfig.absolutePath('/#organization') },
        inLanguage: 'en-US',
      },
      {
        '@type': 'Organization',
        '@id': siteConfig.absolutePath('/#organization'),
        name: 'Earcam',
        url: siteConfig.baseUrl,
        logo: {
          '@type': 'ImageObject',
          url: siteConfig.absolutePath('/favicon.png'),
        },
        contactPoint: {
          '@type': 'ContactPoint',
          email: 'support@dcatfly.com',
          contactType: 'Customer Support',
        },
      },
      {
        '@type': 'SoftwareApplication',
        name: 'Earcam',
        applicationCategory: 'Utility',
        operatingSystem: 'tvOS',
        offers: {
          '@type': 'Offer',
          price: '3.99',
          priceCurrency: 'USD',
        },
        description: 'Bebird compatible ear camera TV app. View real-time video on big screen. Works with Bebird Note3, Note5 and other smart ear cameras.',
        screenshot: siteConfig.absolutePath('/images/optimized/home-disconnected-en-optimized.png'),
        featureList: [
          'Big screen viewing on TV',
          'Automatic device connection',
          'Real-time HD video streaming',
          'TV remote control support',
          'Video rotation control',
          'Battery level monitoring',
          'Fullscreen mode',
          'Multi-language support',
        ],
      },
    ],
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="antialiased min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {children}
        <SpeedInsights />
        {process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && process.env.NEXT_PUBLIC_UMAMI_URL && (
          <Script
            src={process.env.NEXT_PUBLIC_UMAMI_URL}
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
