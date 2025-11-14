# Project Context

## Purpose

**Earcam** 是一个专业的智能掏耳勺产品介绍网站，主要目标是：
- 为配套的 Apple TV 应用（../bebird_-reverse）提供产品展示和功能介绍
- 引导用户了解产品特性并下载 Apple TV 应用
- 展示产品的核心功能：大屏观看、自动连接、实时高清视频、电视遥控器控制等
- 强调隐私安全：本地连接、无云端存储、端到端加密

## Tech Stack

### 核心框架
- **Next.js 15.1.7**: 使用 App Router 和静态导出模式（`output: 'export'`）
- **React 19**: 最新版 React 框架，支持 Server Components
- **TypeScript 5.7.3**: 完整类型支持，严格模式启用
- **Turbopack**: Next.js 内置的高性能打包器，用于开发环境

### 样式和 UI
- **Tailwind CSS v4.1.13**: 使用 @tailwindcss/postcss，支持自定义主题配置
- **lucide-react**: 提供精美的 React 图标组件
- **autoprefixer**: 自动添加 CSS 浏览器前缀

### 构建工具和优化
- **sharp**: 高性能图片处理库，用于生成优化图片（WebP、多尺寸）
- **pnpm**: 包管理器
- **PostCSS**: CSS 处理工具链

### 部署平台
- **Vercel**: 自动构建和部署到自定义域名 `https://earcam.dcatfly.com`

## Project Conventions

### Code Style
- **语言**: 使用 TypeScript，启用严格模式
- **组件**: 优先使用 React 函数组件和 Hooks
- **命名约定**:
  - 组件文件使用 PascalCase（如 `HomePage.tsx`）
  - 工具函数文件使用 camelCase（如 `i18n.ts`）
  - 常量使用 UPPER_SNAKE_CASE
- **导入路径**: 使用 `@/*` 别名映射到项目根目录
- **代码规范**: 遵循 Next.js 和 React 最佳实践
- **简洁原则**: 保持代码简洁，避免过度工程化
- **AI 回复**: 所有 AI 助手回复使用中文

### Architecture Patterns

#### 静态导出模式
- 项目配置为纯静态网站，使用 `output: 'export'` 模式
- 所有页面在构建时预渲染为静态 HTML
- 禁用 Next.js 内置图片优化以支持静态导出
- 不使用 middleware.ts（静态导出不支持中间件）

#### 多语言架构
- 基于路径的路由实现：`/` 为英文，`/zh` 为中文
- 集中式翻译管理：`lib/i18n.ts` 统一管理所有翻译文本
- 组件复用：同一组件通过 `lang` 属性支持多语言渲染
- SEO 优化：每种语言独立的 meta 标签和 `metadataBase` 配置

#### 项目结构
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
├── lib/                      # 工具库
├── scripts/                  # 自定义脚本
├── public/                   # 静态资源
└── out/                      # 构建输出目录（静态导出）
```

#### 图片优化策略
- 使用自定义脚本 `scripts/optimize-images.js` 生成 WebP 格式和多尺寸版本
- `OptimizedImage` 组件自动选择最佳格式，支持 WebP 回退到 PNG
- 图片懒加载，仅加载可视区域图片
- 优化效果：图片体积减少 60-80%

### Testing Strategy
- 当前项目暂无自动化测试配置
- 主要通过手动测试和部署验证
- 使用外部工具验证 SEO 和社交媒体预览：
  - [Facebook Debugger](https://developers.facebook.com/tools/debug/)
  - [Twitter Card Validator](https://cards-dev.twitter.com/validator)

### Git Workflow
- **主分支**: `main`
- **分支策略**: 基于功能分支的开发流程
- **提交规范**: 使用常规提交格式（Conventional Commits），如：
  - `feat:` 新功能
  - `fix:` 错误修复
  - `docs:` 文档更新
  - `style:` 代码格式调整
  - `refactor:` 代码重构
  - `perf:` 性能优化
  - `chore:` 构建/工具链更新

## Domain Context

### 智能掏耳勺产品
Earcam 是一款配备摄像头的智能掏耳勺设备，核心特性包括：
- 高清摄像头捕捉耳道实时画面
- 通过 WiFi 连接到智能设备
- 配套 Apple TV 应用实现大屏幕观看体验
- 支持电视遥控器控制和 360 度旋转查看

### Apple TV 应用集成
- 配套项目：`../bebird_-reverse`（React Native TV 构建）
- 本网站作为产品介绍和下载引导入口
- 展示应用核心功能和使用场景

### 用户群体
- 注重健康护理的家庭用户
- 需要可视化耳道清洁的个人
- 关注隐私安全的用户群体

## Important Constraints

### 技术约束
1. **纯静态网站**：必须使用 Next.js 静态导出模式，不能使用服务端功能
2. **不支持的 Next.js 特性**：
   - 中间件（middleware）
   - 服务端渲染（SSR）
   - 增量静态再生（ISR）
   - API 路由
   - Next.js 内置图片优化
3. **图片处理限制**：需要使用自定义脚本预处理图片
4. **路由限制**：所有路由必须在构建时确定

### 性能约束
- 首屏加载时间应保持在 3 秒以内
- 图片必须优化为 WebP 格式
- 页面大小应尽可能小

### SEO 约束
- 必须正确配置 `metadataBase` 以支持绝对 URL
- 每种语言需要独立的 meta 标签和 canonical URL
- 社交媒体预览卡片必须正确显示

### 隐私约束
- 不收集个人身份信息（PII）
- 使用隐私友好的分析服务（Umami），符合 GDPR/PECR 规范
- 强调产品本地连接和端到端加密

## External Dependencies

### 部署平台
- **Vercel**:
  - 自动部署：Git push 触发构建
  - 自定义域名：`earcam.dcatfly.com`
  - 环境变量：`VERCEL_URL`、`VERCEL_PROJECT_PRODUCTION_URL`
  - CDN 加速和自动 HTTPS

### 环境变量
- `NEXT_PUBLIC_SITE_URL`（可选）：显式指定站点 URL
- `VERCEL_URL`：Vercel 自动注入的部署 URL
- `VERCEL_PROJECT_PRODUCTION_URL`：Vercel 生产域名
- `NEXT_PUBLIC_UMAMI_WEBSITE_ID`：Umami 网站分析 ID
- `NEXT_PUBLIC_UMAMI_URL`：Umami 跟踪脚本 URL

### 配置优先级
```typescript
NEXT_PUBLIC_SITE_URL → VERCEL_PROJECT_PRODUCTION_URL → VERCEL_URL → http://localhost:3000
```

### 网站分析服务
- **Umami Cloud**:
  - 用途：跟踪用户交互行为（按钮点击、页面访问等）
  - 特点：开源、隐私友好、无需 Cookie、符合 GDPR/PECR
  - 集成位置：`app/layout.tsx`（通过 Next.js Script 组件）
  - 跟踪事件：
    - `app_store_click`：用户点击"了解更多"按钮跳转到 App Store（含语言和描述信息）
    - `email_click`：用户点击邮箱联系按钮（含语言信息）
  - 不收集个人身份信息（PII）

### 无外部 API 依赖
- 网站完全独立运行，无需调用外部 API
- 所有内容在构建时生成
- 静态资源通过 CDN 分发
