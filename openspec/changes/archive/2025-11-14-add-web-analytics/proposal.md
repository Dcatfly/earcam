# Change: 添加 Umami 网站分析跟踪

## Why

当前网站缺乏用户行为分析能力，无法了解用户的关键交互行为（如"了解更多"按钮跳转 App Store、邮箱联系按钮点击等）。这些数据对于优化产品推广策略和理解用户需求至关重要。

通过集成 Umami Cloud 分析服务，我们可以在保持隐私优先原则的前提下，收集必要的用户交互数据，帮助改进产品推广效果。Umami 是一个开源、隐私友好的分析工具，完美契合本项目的隐私优先理念。

## What Changes

- 在根布局中集成 Umami 跟踪脚本（使用 Next.js Script 组件）
- 实现自定义事件跟踪功能，用于监测关键按钮点击
- 跟踪"了解更多"按钮点击事件（跳转到 App Store，包含语言标识）
- 跟踪邮箱联系按钮的点击事件（包含语言标识）
- 配置 Umami Cloud 网站（已在官方托管，使用免费额度）
- 确保分析功能与静态导出模式兼容
- 保持项目的隐私优先原则（Umami 无需 Cookie，符合 GDPR/PECR）

## Impact

### 受影响的规范
- **web-analytics**（新增）：定义 Web 分析跟踪的需求和行为

### 受影响的代码
- `app/layout.tsx`：添加 Umami 跟踪脚本（使用 next/script）
- `app/zh/layout.tsx`：继承父级配置，无需修改
- `components/HomePage.tsx`：在关键按钮的 onClick 事件中添加跟踪调用

### Umami Cloud 配置
- 需要在 Umami Cloud 控制台创建网站配置
- 获取网站 ID 和跟踪脚本 URL
- 配置为环境变量 `NEXT_PUBLIC_UMAMI_WEBSITE_ID` 和 `NEXT_PUBLIC_UMAMI_URL`

### 技术约束验证
- ✅ 兼容静态导出模式：Umami 完全支持静态 HTML 页面
- ✅ 符合隐私要求：无需 Cookie，符合 GDPR/PECR，不收集 PII
- ✅ 性能影响最小：轻量级脚本（<2KB gzipped），异步加载
- ✅ 无需后端支持：纯客户端实现，数据发送到 Umami Cloud
- ✅ 开源透明：完全开源，代码可审计

### 预期收益
- 了解哪个语言版本的转化率更高
- 识别用户最常点击的 CTA 按钮（"了解更多"、邮箱联系）
- 追踪 App Store 页面的跳转效果
- 为后续营销策略提供数据支持
- 优化用户体验和产品推广流程
