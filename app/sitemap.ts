import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/siteConfig'

// 标记为静态路由，支持 output: 'export' 模式
export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.absolutePath('/'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: {
        languages: {
          en: siteConfig.absolutePath('/'),
          zh: siteConfig.absolutePath('/zh/'),
        },
      },
    },
    {
      url: siteConfig.absolutePath('/zh/'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: {
        languages: {
          en: siteConfig.absolutePath('/'),
          zh: siteConfig.absolutePath('/zh/'),
        },
      },
    },
  ]
}
