import { Metadata } from 'next';
import { siteConfig } from '@/lib/siteConfig';

export const metadata: Metadata = {
  title: 'Earcam - Bebird 可视掏耳勺电视版 | 大屏专用应用 | Note3/Note5',
  description: '将您的智能电视变成专业的耳道护理站，Bebird Note3、Bebird Note5 专用应用。在电视大屏上查看高清实时视频，让耳道清洁更安全便捷。',
  keywords: [
    // 核心关键词 - Bebird 优先
    'Bebird', 'Bebird 电视版', 'Bebird TV', 'Bebird 掏耳勺', 'Bebird 大屏',
    // 品牌型号
    'Bebird Note3', 'Bebird Note5', 'Bebird Note3 Pro', 'Bebird 电视应用',
    // 功能关键词
    '可视掏耳勺', '智能可视掏耳勺', '掏耳勺', '智能掏耳勺',
    '掏耳勺电视', '可视掏耳勺 电视', '智能掏耳勺 大屏', '电视掏耳勺',
    '无线可视掏耳勺', '掏耳勺 大屏', '可视掏耳勺电视版', '大屏掏耳勺',
    // 场景相关
    '耳道清洁', '耳道护理', '耳道检查', '耳道摄像头', '耳镜', '采耳工具',
    '电视应用', 'TV 应用', '智能电视应用', '智能家居健康', '家用护理工具'
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
  alternates: {
    canonical: '/zh',
    languages: {
      'en': '/',
      'zh': '/zh',
    },
  },
  openGraph: {
    title: 'Earcam 电视版 - Bebird 可视掏耳勺专用大屏应用',
    description: '将您的智能电视变成专业的耳道护理站，兼容 Bebird Note3、Bebird Note5 等智能可视掏耳勺设备。在电视大屏上查看高清实时视频。',
    url: '/zh',
    siteName: 'Earcam',
    locale: 'zh_CN',
    alternateLocale: ['en_US'],
    type: 'website',
    images: [
      {
        url: '/images/optimized/home-disconnected-zh-optimized.png',
        width: 1024,
        height: 576,
        alt: 'Earcam 电视版 - Bebird 可视掏耳勺专用大屏应用',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Earcam - Bebird 可视掏耳勺电视版',
    description: '将您的智能电视变成专业的耳道护理站，兼容 Bebird 等智能可视掏耳勺设备。',
    images: ['/images/optimized/home-disconnected-zh-optimized.png'],
  },
};

export default function ZhLayout({
  children
}: {
  children: React.ReactNode;
}) {
  // Structured Data (JSON-LD) for SEO - Chinese version
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': siteConfig.absolutePath('/zh#webpage'),
        url: siteConfig.absolutePath('/zh'),
        name: 'Earcam - Bebird 可视掏耳勺电视版',
        description: '将您的智能电视变成专业的耳道护理站，兼容 Bebird 等智能可视掏耳勺设备。',
        inLanguage: 'zh-CN',
        isPartOf: { '@id': siteConfig.absolutePath('/#website') },
      },
      {
        '@type': 'SoftwareApplication',
        name: 'Earcam',
        applicationCategory: '实用工具',
        operatingSystem: 'tvOS',
        offers: {
          '@type': 'Offer',
          price: '3.99',
          priceCurrency: 'USD',
        },
        description: 'Bebird 可视掏耳勺电视版应用。在大屏上查看实时视频。兼容 Bebird Note3、Note5 等智能可视掏耳勺。',
        screenshot: siteConfig.absolutePath('/images/optimized/home-disconnected-zh-optimized.png'),
        featureList: [
          '电视大屏显示',
          '自动设备连接',
          '实时高清视频传输',
          '电视遥控器控制',
          '视频旋转控制',
          '电量监控显示',
          '全屏沉浸模式',
          '中英文界面',
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div lang="zh">
        {children}
      </div>
    </>
  );
}
