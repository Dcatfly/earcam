import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Earcam - 智能掏耳勺电视版',
  description: '将您的Apple TV变成专业的耳道护理站，在大屏幕上查看高清实时视频。',
  keywords: '掏耳勺, 耳道清洁, 耳道护理, 耳镜, 智能掏耳, Apple TV',
  openGraph: {
    title: 'Earcam - 智能掏耳勺电视版',
    description: '将您的Apple TV变成专业的耳道护理站',
    locale: 'zh_CN',
    alternateLocale: ['en_US'],
  },
  alternates: {
    canonical: '/zh',
    languages: {
      'en': '/',
      'zh': '/zh'
    }
  }
};

export default function ZhLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div lang="zh">
      {children}
    </div>
  );
}