# AI 工具聚合平台

## 项目简介

AI Platform 是一个集成 15+主流 AI 模型的一站式平台，为开发者和企业提供强大的 AI 能力，让创新触手可及。

### 主要功能

- 🤖 **多模型集成**: 支持 GPT-4、Claude、Gemini 等 15+主流 AI 模型
- 💬 **智能对话**: 多轮对话、上下文管理、多模态支持
- 🔑 **API 管理**: 统一 API 接口，简化开发流程
- 💳 **灵活计费**: 积分制收费，支持多种支付方式
- 🔒 **安全可靠**: 企业级安全防护，数据加密传输
- 📊 **使用统计**: 详细的数据分析和成本控制
- 🌐 **多语言**: 支持 100+种语言翻译和对话
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
- **Midjourney**: V6 (通过 API)

#### 语音处理

- **OpenAI**: Whisper Large, TTS
- **Google**: Speech-to-Text, Text-to-Speech
- **Azure**: Cognitive Services Speech

#### 其他功能

- **嵌入模型**: OpenAI Embeddings, Cohere Embeddings
- **代码生成**: GitHub Copilot, CodeT5
- **图像分析**: GPT-4V, Google Vision API

## 技术栈

### 前端

- **框架**: Next.js 14 (App Router)
- **样式**: Tailwind CSS
- **组件**: 自定义组件库
- **动画**: Framer Motion
- **状态管理**: React Context
- **类型检查**: TypeScript

### 后端

- **API**: Next.js API Routes
- **认证**: NextAuth.js
- **数据库**: PostgreSQL
- **ORM**: Prisma
- **缓存**: Redis (可选)

### 支付与部署

- **支付**: Stripe, USDT
- **部署**: Vercel, Docker
- **监控**: 自定义监控面板

## 快速开始

### 环境要求

- Node.js 18.0 或更高版本
- PostgreSQL 12 或更高版本
- npm 或 yarn 或 pnpm

### 安装步骤

1. **克隆项目**

```bash
git clone https://github.com/your-username/ai-platform.git
cd ai-platform
```

2. **安装依赖**

```bash
npm install
```

3. **环境配置**

```bash
cp .env.example .env.local
```

编辑 `.env.local` 文件，填入必要的环境变量：

```env
# 数据库
DATABASE_URL="postgresql://username:password@localhost:5432/ai_platform"

# NextAuth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# AI Service APIs
OPENAI_API_KEY="your-openai-api-key"
ANTHROPIC_API_KEY="your-anthropic-api-key"
GOOGLE_API_KEY="your-google-api-key"

# 支付
STRIPE_SECRET_KEY="your-stripe-secret-key"
STRIPE_PUBLISHABLE_KEY="your-stripe-publishable-key"
```

4. **数据库设置**

```bash
npx prisma generate
npx prisma db push
npx prisma db seed
```

5. **启动开发服务器**

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## 项目结构

```
ai-platform/
├── app/                    # Next.js App Router
│   ├── api/               # API 路由
│   ├── auth/              # 认证页面
│   ├── chat/              # 对话界面
│   ├── dashboard/         # 用户面板
│   └── globals.css        # 全局样式
├── components/            # React 组件
│   ├── auth/              # 认证组件
│   ├── chat/              # 聊天组件
│   ├── home/              # 首页组件
│   ├── layout/            # 布局组件
│   └── ui/                # UI 组件
├── lib/                   # 工具库
│   ├── ai/                # AI 模型集成
│   ├── auth.ts            # 认证配置
│   ├── prisma.ts          # 数据库客户端
│   └── utils.ts           # 工具函数
├── prisma/                # 数据库模式
│   ├── schema.prisma      # 数据模型
│   └── seed.ts            # 种子数据
├── public/                # 静态资源
└── styles/                # 样式文件
```

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

#### 用户登录

```http
POST /api/auth/signin
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### AI 模型 API

#### 对话完成

```http
POST /api/ai/chat
Authorization: Bearer <token>
Content-Type: application/json

{
  "model": "gpt-4",
  "messages": [
    {
      "role": "user",
      "content": "你好，世界！"
    }
  ],
  "temperature": 0.7
}
```

#### 图像生成

```http
POST /api/ai/image/generate
Authorization: Bearer <token>
Content-Type: application/json

{
  "prompt": "一只可爱的猫咪在花园里玩耍",
  "model": "dall-e-3",
  "size": "1024x1024"
}
```

## 部署指南

### Vercel 部署

1. **连接 GitHub**

   - 将代码推送到 GitHub
   - 在 Vercel 中导入项目

2. **环境变量**

   - 在 Vercel Dashboard 中设置所有环境变量

3. **数据库**
   - 使用 Vercel Postgres 或外部 PostgreSQL

### Docker 部署

1. **构建镜像**

```bash
docker build -t ai-platform .
```

2. **运行容器**

```bash
docker run -p 3000:3000 --env-file .env ai-platform
```

## 开发指南

### 添加新的 AI 模型

1. **创建模型适配器**

```typescript
// lib/ai/providers/new-provider.ts
export class NewProviderAdapter implements AIModelAdapter {
  async chat(messages: Message[]): Promise<ChatResponse> {
    // 实现聊天逻辑
  }
}
```

2. **注册模型**

```typescript
// lib/ai/registry.ts
import { NewProviderAdapter } from './providers/new-provider'

registerModel('new-model', new NewProviderAdapter())
```

3. **更新数据库**

```sql
INSERT INTO ai_models (name, provider, category, ...) VALUES (...);
```

### 代码规范

- 使用 TypeScript 进行类型检查
- 遵循 ESLint 规则
- 使用 Prettier 格式化代码
- 编写单元测试

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
- 💬 微信群: 扫描二维码加入
- 🐛 问题反馈: [GitHub Issues](https://github.com/your-username/ai-platform/issues)
- 📖 文档: [官方文档](https://docs.aiplatform.com)

## 更新日志

### v1.0.0 (2024-01-15)

- 🎉 初始版本发布
- ✨ 支持 15+AI 模型
- 🔐 用户认证系统
- 💳 积分支付系统
- 📱 响应式界面

### 即将推出

- 🔄 模型切换优化
- 📊 高级数据分析
- 🔌 Webhook 支持
- �� 国际化支持
- 📱 移动端 APP
