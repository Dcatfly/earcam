import { MetadataRoute } from 'next'

// 标记为静态路由，支持 output: 'export' 模式
export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  // 复用与 layout.tsx 相同的 URL 生成逻辑
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${baseUrl}${basePath}/sitemap.xml`,
  }
}
