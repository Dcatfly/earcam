# web-analytics Specification

## Purpose
TBD - created by archiving change add-web-analytics. Update Purpose after archive.
## Requirements
### Requirement: Umami 跟踪脚本集成
系统 SHALL 集成 Umami 跟踪脚本，以收集网站基本访问数据（页面浏览、访客统计、性能指标等）。

#### Scenario: 脚本在页面加载后注入
- **WHEN** 用户访问网站任意页面
- **THEN** Umami 跟踪脚本应在页面交互后异步加载（afterInteractive）
- **AND** 脚本加载不应阻塞页面渲染
- **AND** 脚本 URL 和 Website ID 应从环境变量读取

#### Scenario: 开发环境脚本正常工作
- **WHEN** 在开发环境（`pnpm run dev`）访问页面
- **THEN** Umami 脚本应成功加载
- **AND** window.umami 对象应可访问
- **AND** 页面访问应发送到 Umami Cloud

#### Scenario: 生产环境脚本正常工作
- **WHEN** 在生产环境访问部署后的页面
- **THEN** Umami 脚本应从环境变量正确注入
- **AND** 数据应发送到 Umami Cloud 服务器
- **AND** 静态导出的页面应正常跟踪

### Requirement: "了解更多"按钮点击跟踪
系统 SHALL 跟踪"了解更多"按钮的点击事件，该按钮跳转到 App Store，并记录用户使用的语言版本。

#### Scenario: 英文版按钮点击
- **WHEN** 用户在英文版页面（`/`）点击"Learn More"按钮
- **THEN** 应调用 `window.umami.track('app_store_click', { language: 'en', description: 'apple' })`
- **AND** 用户应正常跳转到 App Store 页面（https://apps.apple.com/app/id6752022264）
- **AND** 事件跟踪不应延迟或阻止跳转

#### Scenario: 中文版按钮点击
- **WHEN** 用户在中文版页面（`/zh`）点击"了解更多"按钮
- **THEN** 应调用 `window.umami.track('app_store_click', { language: 'zh', description: 'apple' })`
- **AND** 用户应正常跳转到 App Store 页面
- **AND** 事件跟踪不应延迟或阻止跳转

#### Scenario: Umami 脚本未加载时的容错
- **WHEN** 用户点击按钮但 Umami 脚本尚未加载完成
- **THEN** 应使用可选链调用 `window.umami?.track()`
- **AND** 不应抛出 JavaScript 错误
- **AND** 用户跳转功能不应受影响

### Requirement: 邮箱联系按钮点击跟踪
系统 SHALL 跟踪邮箱联系按钮的点击事件，并记录用户使用的语言版本。

#### Scenario: 英文版邮箱点击
- **WHEN** 用户在英文版页面点击邮箱联系按钮
- **THEN** 应调用 `window.umami.track('email_click', { language: 'en' })`
- **AND** 用户应正常打开邮件客户端（mailto: 链接）
- **AND** 事件跟踪不应阻止邮件客户端打开

#### Scenario: 中文版邮箱点击
- **WHEN** 用户在中文版页面点击邮箱联系按钮
- **THEN** 应调用 `window.umami.track('email_click', { language: 'zh' })`
- **AND** 用户应正常打开邮件客户端
- **AND** 事件跟踪不应阻止邮件客户端打开

### Requirement: 静态导出兼容性
系统的分析功能 MUST 与 Next.js 静态导出模式完全兼容，不依赖服务端功能。

#### Scenario: 静态构建成功
- **WHEN** 执行 `pnpm run build` 构建命令
- **THEN** 构建过程应成功完成
- **AND** 生成的静态 HTML 文件中应包含 Umami 脚本标签
- **AND** 环境变量应正确替换为实际值
- **AND** 不应出现任何关于动态功能的错误

#### Scenario: 静态页面分析正常
- **WHEN** 用户访问静态导出的 HTML 页面
- **THEN** Umami 脚本应正常加载并执行
- **AND** 页面访问事件应成功发送到 Umami Cloud
- **AND** 自定义事件应成功发送到 Umami Cloud
- **AND** 无需服务端支持即可完成数据收集

### Requirement: 环境变量配置
系统 MUST 使用环境变量管理 Umami 配置信息，确保安全性和灵活性。

#### Scenario: 环境变量正确配置
- **WHEN** 在 Vercel 项目设置或本地 .env.local 配置环境变量
- **THEN** 应包含 `NEXT_PUBLIC_UMAMI_WEBSITE_ID` 变量（Website ID）
- **AND** 应包含 `NEXT_PUBLIC_UMAMI_URL` 变量（脚本 URL）
- **AND** 变量应以 `NEXT_PUBLIC_` 前缀确保客户端可访问

#### Scenario: 环境变量缺失时的容错
- **WHEN** 环境变量未配置或为空
- **THEN** 应用不应崩溃
- **AND** Umami 脚本不应注入到页面
- **AND** 应在开发环境控制台显示警告信息（可选）

### Requirement: 隐私合规
系统的分析功能 MUST 符合隐私保护原则，不侵犯用户隐私。

#### Scenario: 无需 Cookie 同意
- **WHEN** 用户首次访问网站
- **THEN** Umami 应在无需 Cookie 同意的情况下工作
- **AND** 不应显示 Cookie 同意横幅
- **AND** 符合 GDPR 和 PECR 隐私法规要求
- **AND** 不收集任何个人身份信息（PII）

#### Scenario: 数据隐私保护
- **WHEN** Umami 收集访问和事件数据
- **THEN** 所有数据应直接发送到 Umami Cloud 服务器
- **AND** 不应在本地存储任何敏感用户信息
- **AND** 不应使用第三方追踪服务
- **AND** 不应设置持久化 Cookie

### Requirement: TypeScript 类型安全
系统 SHALL 为 Umami API 提供 TypeScript 类型定义，确保类型安全。

#### Scenario: window.umami 类型定义
- **WHEN** 在 TypeScript 代码中使用 window.umami
- **THEN** 应提供类型声明文件或全局类型扩展
- **AND** track 方法应有正确的类型签名
- **AND** IDE 应提供自动完成和类型检查

#### Scenario: 编译时类型检查
- **WHEN** 执行 TypeScript 编译或类型检查
- **THEN** 不应出现关于 window.umami 的类型错误
- **AND** 事件数据对象应有类型约束
- **AND** 可选链调用应正确处理 undefined 情况

### Requirement: 性能优化
系统 MUST 确保 Umami 集成不影响网站性能和用户体验。

#### Scenario: 脚本异步加载
- **WHEN** 页面加载时注入 Umami 脚本
- **THEN** 脚本应使用 afterInteractive 策略
- **AND** 不应阻塞首屏内容渲染
- **AND** 不应阻塞用户交互

#### Scenario: 轻量级脚本
- **WHEN** 用户加载页面
- **THEN** Umami 脚本大小应小于 3KB（gzipped）
- **AND** 加载时间应最小化
- **AND** Lighthouse 性能评分不应显著下降

#### Scenario: 事件发送不阻塞用户操作
- **WHEN** 用户点击跟踪的按钮
- **THEN** 事件发送应异步进行
- **AND** 不应延迟按钮的原有功能（跳转、打开邮件等）
- **AND** 即使事件发送失败，用户操作也应正常完成

