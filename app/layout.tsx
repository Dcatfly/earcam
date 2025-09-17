import type { Metadata } from 'next';
import './globals.css';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const basePath = process.env.PAGES_BASE_PATH || '';

export const metadata: Metadata = {
  title: {
    default: 'Earcam - Smart Ear Camera TV | 智能掏耳勺电视版',
    template: '%s | Earcam'
  },
  description: 'Transform your Apple TV into a professional ear care station. Connect smart ear camera devices to view real-time HD video on the big screen. | 将您的Apple TV变成专业的耳道护理站，在大屏幕上查看高清实时视频。',
  keywords: ['ear camera', 'ear cleaning', 'ear care', 'otoscope', 'ear health', 'ear scope', 'ear wax removal', 'health tool', 'wireless', 'Apple TV', '掏耳勺', '耳道清洁', '耳道护理', '耳镜', '智能掏耳'],
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
    icon: basePath + '/favicon.png',
  },
  openGraph: {
    title: 'Earcam - Smart Ear Camera TV',
    description: 'Professional ear care on your Apple TV',
    url: baseUrl,
    siteName: 'Earcam',
    locale: 'en_US',
    alternateLocale: ['zh_CN'],
    type: 'website',
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

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body className="antialiased min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {children}
      </body>
    </html>
  );
}
