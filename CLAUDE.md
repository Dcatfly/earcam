<!-- OPENSPEC:START -->
# OpenSpec Instructions

These instructions are for AI assistants working in this project.

Always open `@/openspec/AGENTS.md` when the request:
- Mentions planning or proposals (words like proposal, spec, change, plan)
- Introduces new capabilities, breaking changes, architecture shifts, or big performance/security work
- Sounds ambiguous and you need the authoritative spec before coding

Use `@/openspec/AGENTS.md` to learn:
- How to create and apply change proposals
- Spec format and conventions
- Project structure and guidelines

Keep this managed block so 'openspec update' can refresh the instructions.

<!-- OPENSPEC:END -->

## 项目概述

**Earcam** 是一个专业的智能掏耳勺产品介绍网站，为配套的 Apple TV 应用（../bebird_-reverse）提供产品展示和下载引导。

### 主要特点
- **纯静态网站**：使用 Next.js 15 静态导出功能，无需后端服务
- **多语言支持**：内置中英文双语，基于路径的路由实现
- **响应式设计**：完美适配桌面、平板和移动设备
- **性能优化**：图片自动优化、WebP 格式支持、懒加载
- **自动部署**：通过 Vercel 自动构建并部署到自定义域名

## 常用开发命令

```bash
# 开发
pnpm run dev          # 使用 Turbopack 启动开发服务器
                      # 默认端口 3000，如被占用自动使用 3001/3002 等
                      # 访问 http://localhost:3000

# 构建
pnpm run build        # 构建静态导出版本，输出到 out/ 目录
                      # 自动优化代码，生成生产环境版本

# 图片优化
pnpm run optimize-images  # 运行图片优化脚本
                         # 将原图转换为多尺寸 WebP 格式
                         # 输出到 public/images/optimized/

# 依赖管理
pnpm install          # 安装项目依赖
pnpm add <package>    # 添加新依赖
pnpm remove <package> # 移除依赖
```

## 技术架构

### 核心技术栈
- **Next.js 15.1.7**: 使用 App Router 和静态导出模式（`output: 'export'`）
- **React 19**: 最新版 React 框架，支持 Server Components
- **Tailwind CSS v4.1.13**: 使用 @tailwindcss/postcss，支持自定义主题配置
- **TypeScript 5.7.3**: 完整类型支持，严格模式启用
- **Turbopack**: Next.js 内置的高性能打包器，用于开发环境

### 主要依赖
- **lucide-react**: 提供精美的 React 图标组件
- **sharp**: 高性能图片处理库，用于生成优化图片
- **autoprefixer**: 自动添加 CSS 浏览器前缀
- **@vercel/speed-insights**: Vercel 官方性能监控工具，收集 Web Vitals 数据

### 外部服务
- **Vercel Speed Insights**: 网站性能监控服务
  - 用途：自动收集真实用户的性能指标（Web Vitals）
  - 监控指标：
    - **LCP (Largest Contentful Paint)**：最大内容绘制时间
    - **FID (First Input Delay)**：首次输入延迟
    - **CLS (Cumulative Layout Shift)**：累积布局偏移
    - **FCP (First Contentful Paint)**：首次内容绘制
    - **TTFB (Time to First Byte)**：首字节时间
    - **INP (Interaction to Next Paint)**：交互到下次绘制
  - 特点：无需配置，部署到 Vercel 后自动工作
  - 集成位置：`app/layout.tsx`（通过 `<SpeedInsights />` 组件）
  - 数据查看：Vercel Dashboard > Analytics > Speed Insights

- **Umami Cloud**: 开源、隐私友好的网站分析服务
  - 用途：跟踪用户交互行为（按钮点击、页面访问等）
  - 特点：无需 Cookie，符合 GDPR/PECR，不收集个人身份信息
  - 集成位置：`app/layout.tsx`（通过 Next.js Script 组件）
  - 跟踪事件：
    - `app_store_click`：用户点击"了解更多"按钮跳转到 App Store（含语言和描述信息）
    - `email_click`：用户点击邮箱联系按钮（含语言信息）

### 项目结构
```
earcam/
├── app/                      # Next.js App Router 页面
│   ├── page.tsx             # 英文版主页（默认）
│   ├── layout.tsx           # 根布局，设置元数据和全局样式
│   ├── globals.css          # 全局样式和 Tailwind 主题配置
│   └── zh/                  # 中文版页面
│       ├── page.tsx         # 中文版主页
│       └── layout.tsx       # 中文版布局，含中文 meta 信息
├── components/               # React 组件
│   ├── HomePage.tsx         # 主页组件（支持多语言）
│   └── OptimizedImage.tsx   # 优化图片组件（WebP + 响应式）
├── lib/                      # 工具库
│   └── i18n.ts             # 国际化配置和翻译
├── scripts/                  # 自定义脚本
│   └── optimize-images.js   # 图片优化脚本（生成多尺寸 WebP 格式）
├── public/                   # 静态资源
│   ├── favicon.svg          # 网站图标
│   └── images/
│       └── optimized/       # 优化后的图片（WebP、多尺寸）
└── out/                      # 构建输出目录（静态导出）
```

### 环境变量配置

| 变量名 | 用途 | 来源 |
|--------|------|------|
| `NEXT_PUBLIC_SITE_URL` | （可选）显式指定站点绝对 URL | 手动设置 |
| `VERCEL_URL` | Vercel 临时部署 URL | Vercel 自动注入 |
| `VERCEL_PROJECT_PRODUCTION_URL` | Vercel 生产域（无协议） | Vercel 自动注入 |
| `NEXT_PUBLIC_UMAMI_WEBSITE_ID` | Umami 网站分析 ID | 手动设置 |
| `NEXT_PUBLIC_UMAMI_URL` | Umami 跟踪脚本 URL | 手动设置 |

### metadataBase 工作原理

在 `app/layout.tsx` 中统一引用 `siteConfig`，所有相对路径会自动转换为基于主域名的绝对 URL：

```typescript
import { siteConfig } from '@/lib/siteConfig'

metadataBase: new URL(siteConfig.baseUrl)
```

- 子路由自动继承父级配置
- 适用于所有 SEO meta 标签（OG、Twitter Card、canonical 等）
- `siteConfig` 会优先使用 `NEXT_PUBLIC_SITE_URL`，否则自动回退到 Vercel 提供的生产域，确保始终输出 `https://earcam.dcatfly.com`

### 关键配置
- **静态导出**: `next.config.ts` 中配置 `output: 'export'`
- **主域名**: 通过 `NEXT_PUBLIC_SITE_URL`（或 Vercel 生产域）固定为 `https://earcam.dcatfly.com`
- **图片优化**: 禁用 Next.js 内置图片优化以支持静态导出
- **路径别名**: 使用 `@/*` 映射到项目根目录

## 多环境部署

当前仅保留 Vercel 作为生产环境，GitHub Pages 已关闭。



### 环境变量优先级

```typescript
NEXT_PUBLIC_SITE_URL → VERCEL_PROJECT_PRODUCTION_URL → VERCEL_URL → http://localhost:3000
```

### Vercel 部署

- **URL**: `https://earcam.dcatfly.com/`
- **配置**: `vercel.json`
- **环境变量**: 自动检测 `VERCEL_URL`（无需手动配置）
- **特点**: 自动 Preview 部署、CDN 加速、零配置

### Vercel 环境变量说明

| 变量名 | 用途 | Preview 环境 | Production 环境 |
|--------|------|-------------|----------------|
| `VERCEL_URL` | 当前部署 URL（✅ 当前使用） | 独立 URL | 自定义域名 |
| `VERCEL_PROJECT_PRODUCTION_URL` | 始终指向生产 | 生产 URL | 生产 URL |

**注意**: `VERCEL_URL` 不包含 `https://` 前缀，代码中需手动拼接。

### 验证部署

测试工具：[Facebook Debugger](https://developers.facebook.com/tools/debug/) / [Twitter Card Validator](https://cards-dev.twitter.com/validator)

## 页面功能特性

### 核心功能
- **智能多语言**：基于路径的中英文切换（`/` 英文，`/zh` 中文）
- **响应式布局**：自适应各种屏幕尺寸，优化移动端体验
- **动画效果**：
  - 悬浮动画背景元素
  - 淡入淡出过渡效果
  - 按钮悬停交互反馈
  - 平滑滚动体验

### 产品展示
- **大屏幕观看**：在电视上查看耳道实时画面
- **自动连接**：智能设备自动发现和配对
- **实时高清视频**：低延迟、高清晰度的视频传输
- **电视遥控器控制**：使用 Apple TV 遥控器操作
- **清洁模式**：专业的耳道清洁引导
- **旋转控制**：360度全方位查看

### 安全隐私
- **本地连接**：所有数据仅在本地网络传输
- **无云端存储**：不上传任何个人数据
- **端到端加密**：确保传输安全

## 图片优化策略

### 自动优化流程
1. **原始图片**：放置在 `public/images/` 目录
2. **运行优化脚本**：`pnpm run optimize-images`
3. **生成多格式**：
   - WebP 格式（3种尺寸：small、medium、large）
   - PNG 备用格式（优化版本）
4. **智能加载**：`OptimizedImage` 组件自动选择最佳格式

### 优化效果
- 图片体积减少 60-80%
- 支持现代浏览器的 WebP 格式
- 自动回退到 PNG 格式
- 响应式图片加载

## 多语言实现

### 路由结构
```
/ (英文版)
├── 默认语言，无需前缀
└── 使用 HomePage 组件，传入 lang="en"

/zh (中文版)
├── 中文路径前缀
└── 使用相同 HomePage 组件，传入 lang="zh"
```

### 实现方式
- **i18n.ts**：集中管理所有翻译文本
- **路径路由**：基于 URL 路径切换语言
- **SEO 优化**：每种语言独立的 meta 标签
- **组件复用**：同一组件支持多语言渲染

## 性能优化

### 构建时优化
- **静态导出**：预渲染所有页面为静态 HTML
- **代码分割**：自动按路由分割代码
- **Tree Shaking**：移除未使用的代码
- **CSS 优化**：Tailwind CSS 仅包含使用的样式

### 运行时优化
- **图片懒加载**：仅加载可视区域图片
- **WebP 格式**：优先使用现代图片格式
- **响应式图片**：根据屏幕尺寸加载合适大小
- **缓存策略**：利用浏览器缓存机制

## 开发指南

### 添加新页面
1. 在 `app/` 目录创建新文件夹
2. 添加 `page.tsx` 文件
3. 如需多语言，在 `app/zh/` 创建对应页面
4. 更新 `lib/i18n.ts` 添加翻译

### 更新图片
1. 将新图片放入 `public/images/`
2. 运行 `pnpm run optimize-images`
3. 使用 `OptimizedImage` 组件引用

### 修改样式
1. 全局样式：编辑 `app/globals.css`
2. 组件样式：使用 Tailwind CSS 类名
3. 主题配置：修改 CSS 变量

## 故障排除

### 常见问题

**开发服务器端口被占用**
- 服务器会自动尝试 3001、3002 等端口
- 或手动指定：`pnpm run dev -- -p 3003`

**构建失败：Middleware 错误**
- 确保未使用 middleware.ts 文件
- 静态导出不支持中间件功能

**图片加载失败**
- 检查图片路径是否正确
- 运行图片优化脚本生成所需格式
- 确认 `public/images/optimized/` 目录存在

**多语言切换不生效**
- 检查路由配置是否正确
- 确认 `i18n.ts` 包含所需翻译
- 验证组件正确传递 `lang` 属性

## 相关项目

- **../bebird_-reverse**: 配套的 Apple TV 应用程序，使用 React Native TV 构建
- 本项目作为产品介绍页面，引导用户了解和使用 Apple TV 应用

## 注意事项

- **中文回复**：所有 AI 助手回复使用中文
- **代码规范**：遵循 Next.js 和 React 最佳实践
- **简洁原则**：保持代码简洁，避免过度工程化
- **静态限制**：确保所有功能兼容静态导出模式
- **性能优先**：优化加载速度和用户体验
- **图片管理**：定期运行优化脚本处理新图片
