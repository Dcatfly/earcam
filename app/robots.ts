import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/siteConfig'

// 标记为静态路由，支持 output: 'export' 模式
export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: siteConfig.absolutePath('/sitemap.xml'),
  }
}
