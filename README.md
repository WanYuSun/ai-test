# AI 工具聚合平台

## 项目简介

MetaPicker 是一个集成多种主流 AI 模型的一站式平台，为开发者和企业提供强大的 AI 能力，让创新触手可及。

### 主要功能

- 🤖 **多模型集成**: 支持 GPT-4、Claude、Gemini 等主流 AI 模型
- 💬 **智能对话**: 多轮对话、上下文管理、多模态支持
- 🔑 **API 管理**: 统一 API 接口，简化开发流程
- 💳 **灵活计费**: 积分制收费，支持多种支付方式
- 🔒 **安全可靠**: 企业级安全防护，数据加密传输
- 📊 **使用统计**: 详细的数据分析和成本控制
- 🌐 **多语言**: 支持中英文界面切换
- 👥 **团队协作**: 多用户管理，权限控制

### 支持的 AI 模型

#### 语言模型

- **OpenAI**: GPT-4 Turbo, GPT-3.5 Turbo
- **Anthropic**: Claude 3 (Opus, Sonnet, Haiku)
- **Google**: Gemini Pro, Gemini Pro Vision
- **Meta**: Llama 2, Code Llama
- **Cohere**: Command, Command Light

#### 图像生成

- **OpenAI**: DALL-E 3, DALL-E 2
- **Stability AI**: Stable Diffusion XL

#### 语音处理

- **OpenAI**: Whisper Large, TTS
- **Google**: Speech-to-Text, Text-to-Speech

#### 其他功能

- **嵌入模型**: OpenAI Embeddings, Cohere Embeddings
- **代码生成**: GitHub Copilot, CodeT5
- **图像分析**: GPT-4V, Google Vision API

## 技术栈

### 前端

- **框架**: Next.js 15 (App Router)
- **样式**: Tailwind CSS
- **组件**: 自定义组件库
- **动画**: Framer Motion
- **状态管理**: React Context
- **类型检查**: TypeScript
- **国际化**: 自定义 i18n 系统

### 后端

- **API**: Next.js API Routes
- **认证**: NextAuth.js
- **存储**: 内存存储（演示版）

### 部署

- **部署**: Vercel, Docker
- **监控**: 自定义监控面板

## 快速开始

### 环境要求

- Node.js 18.0 或更高版本
- npm 或 yarn 或 pnpm

### 安装步骤

1. **克隆项目**

```bash
git clone https://github.com/your-username/MetaPicker.git
cd MetaPicker
```

2. **自动安装（推荐）**

```bash
chmod +x setup.sh
./setup.sh
```

或者手动安装：

3. **手动安装依赖**

```bash
npm install
```

4. **环境配置**

```bash
cp .env.example .env.local
```

编辑 `.env.local` 文件，填入必要的环境变量：

```env
# NextAuth 配置
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# OAuth 配置 (可选)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GITHUB_ID="your-github-client-id"
GITHUB_SECRET="your-github-client-secret"

# AI Service APIs
OPENAI_API_KEY="your-openai-api-key"
ANTHROPIC_API_KEY="your-anthropic-api-key"
GOOGLE_API_KEY="your-google-api-key"
```

5. **启动开发服务器**

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## 项目结构

```
MetaPicker/
├── app/                    # Next.js App Router
│   ├── api/               # API 路由
│   ├── auth/              # 认证页面
│   ├── chat/              # 对话界面
│   ├── account/           # 用户账户
│   ├── models/            # AI 模型展示
│   ├── pricing/           # 定价页面
│   ├── news/              # 资讯页面
│   └── globals.css        # 全局样式
├── components/            # React 组件
│   ├── layout/            # 布局组件
│   ├── providers/         # Context 提供者
│   └── ui/                # UI 组件
├── lib/                   # 工具库
│   ├── i18n/              # 国际化配置
│   └── utils.ts           # 工具函数
├── messages/              # 国际化语言包
│   ├── zh.json            # 中文翻译
│   └── en.json            # 英文翻译
└── public/                # 静态资源
```

## 功能特性

### 🌐 国际化支持

- 完整的中英文界面
- 实时语言切换
- 本地化存储设置
- 参数化翻译支持

### 🔐 用户认证

- 邮箱密码登录
- Google OAuth
- GitHub OAuth
- NextAuth.js 集成

### 💬 AI 对话

- 多模型支持
- 实时对话
- 对话历史
- 模型切换

### 📊 用户管理

- 个人信息管理
- 积分系统
- 订阅管理
- API 密钥管理

## API 文档

### 认证 API

#### 注册用户

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "用户名",
  "email": "user@example.com",
  "password": "password123"
}
```

### 演示账户

为了快速体验，您可以使用以下演示账户：

- **邮箱**: demo@example.com
- **密码**: demo123

## 部署指南

### Vercel 部署

1. **连接 GitHub**

   - 将代码推送到 GitHub
   - 在 Vercel 中导入项目

2. **环境变量**

   - 在 Vercel Dashboard 中设置所有环境变量

### Docker 部署

1. **构建镜像**

```bash
docker build -t MetaPicker .
```

2. **运行容器**

```bash
docker run -p 3000:3000 --env-file .env MetaPicker
```

## 开发指南

### 代码规范

- 使用 TypeScript 进行类型检查
- 遵循 ESLint 规则
- 使用 Prettier 格式化代码
- 组件优先原则

### 国际化

添加新的翻译：

1. 在 `messages/zh.json` 和 `messages/en.json` 中添加键值对
2. 在组件中使用 `t()` 函数调用翻译

```typescript
const { t } = useI18n()
const title = t('page.title')
```

## 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 支持

- 📧 邮箱: support@aiplatform.com
- 🐛 问题反馈: [GitHub Issues](https://github.com/your-username/MetaPicker/issues)
- 📖 文档: [官方文档](https://docs.aiplatform.com)

## 更新日志

### v1.0.0 (2024-01-15)

- 🎉 初始版本发布
- ✨ 支持多种 AI 模型演示
- 🔐 用户认证系统
- 💳 积分支付系统演示
- 📱 响应式界面
- 🌐 完整国际化支持

### 即将推出

- 🔄 实际 AI 模型集成
- 📊 高级数据分析
- 🔌 Webhook 支持
- 📱 移动端 APP
