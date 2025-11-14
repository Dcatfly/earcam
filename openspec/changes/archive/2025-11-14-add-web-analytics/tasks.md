# Implementation Tasks

## 1. Umami Cloud 配置
- [x] 1.1 登录 Umami Cloud 控制台（https://cloud.umami.is）
- [x] 1.2 创建新网站配置
- [x] 1.3 获取网站 ID 和跟踪脚本 URL

## 2. 环境变量配置
- [x] 2.1 在 Vercel 项目设置中添加环境变量
  - `NEXT_PUBLIC_UMAMI_WEBSITE_ID`
  - `NEXT_PUBLIC_UMAMI_URL`
- [x] 2.2 在本地创建 `.env.local` 文件并添加相同环境变量
- [x] 2.3 验证环境变量配置正确

## 3. Umami 脚本集成
- [x] 3.1 在 app/layout.tsx 中导入 Next.js Script 组件
- [x] 3.2 在根布局的 body 标签内添加 Umami 跟踪脚本
  - 使用 Script 组件的 strategy="afterInteractive"
  - 设置 data-website-id 为环境变量
  - 设置 src 为 Umami 脚本 URL
- [x] 3.3 验证脚本在开发环境正常加载

## 4. TypeScript 类型声明
- [x] 4.1 创建类型声明文件 umami.d.ts
- [x] 4.2 为 window.umami 添加类型定义
  - track(eventName: string, eventData?: Record<string, any>): void

## 5. 自定义事件跟踪实现
- [x] 5.1 在 components/HomePage.tsx 的"了解更多"按钮添加 onClick 事件
  - 按钮位置：HomePage.tsx:70-79（主按钮，跳转 App Store）
  - 事件名称：`app_store_click`
  - 事件数据：`{ language: lang, description: 'apple' }`
  - 调用方式：`window.umami?.track('app_store_click', { language: lang, description: 'apple' })`
- [x] 5.2 在邮箱联系按钮添加 onClick 事件
  - 按钮位置：HomePage.tsx:331-341
  - 事件名称：`email_click`
  - 事件数据：`{ language: lang }`
  - 调用方式：`window.umami?.track('email_click', { language: lang })`
- [x] 5.3 确保事件调用不影响原有的跳转/链接行为

## 6. 测试验证
- [x] 6.1 在本地开发环境测试脚本加载
  - 打开浏览器开发工具 Network 面板
  - 确认 Umami 脚本成功加载
  - 检查 window.umami 对象存在
- [x] 6.2 测试"了解更多"按钮点击事件
  - 点击英文版按钮，检查 Umami 控制台（如有）
  - 点击中文版按钮，检查事件发送
  - 确认跳转到 App Store 正常工作
- [x] 6.3 测试邮箱按钮点击事件
  - 点击英文版邮箱按钮
  - 点击中文版邮箱按钮
  - 确认邮件客户端正常打开
- [x] 6.4 构建静态导出版本：`pnpm run build`
- [x] 6.5 验证构建成功，确认环境变量正确替换
- [ ] 6.6 部署到 Vercel 预览环境

## 7. Umami 仪表板验证
- [x] 7.1 访问部署后的网站，触发页面访问
- [x] 7.2 在 Umami Cloud 仪表板查看实时访客数据
- [x] 7.3 点击"了解更多"和邮箱按钮
- [x] 7.4 在 Umami 仪表板的 Events 页面查看自定义事件
- [x] 7.5 验证事件属性（language）正确记录
- [x] 7.6 确认中英文版本的事件都能正确区分

## 8. 文档更新
- [x] 8.1 在 CLAUDE.md 中添加 Umami Analytics 相关说明
  - 外部依赖部分添加 Umami Cloud 服务
  - 环境变量部分添加 UMAMI 相关变量说明
  - 隐私约束部分说明 Umami 的隐私友好特性
- [x] 8.2 在 openspec/project.md 更新外部依赖章节
- [x] 8.3 更新 README（如果需要）

## 9. 验收检查
- [x] 9.1 确认"了解更多"按钮点击能正确发送事件
- [x] 9.2 确认邮箱按钮点击能正确发送事件
- [x] 9.3 确认事件包含正确的语言标识（en/zh）
- [x] 9.4 确认中英文版本都能正常跟踪
- [x] 9.5 确认静态导出构建无错误
- [x] 9.6 确认跳转和链接功能不受影响
- [x] 9.7 在 Umami Cloud 仪表板查看完整数据
- [x] 9.8 验证页面性能未受影响（Lighthouse 评分）
