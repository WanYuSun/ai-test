#!/bin/bash

# MetaPicker 安装脚本
echo "🚀 开始安装 MetaPicker..."

# 检查 Node.js 版本
node_version=$(node -v 2>/dev/null | cut -d'v' -f2)
if [ -z "$node_version" ]; then
    echo "❌ 请先安装 Node.js 18+ 版本"
    echo "下载地址: https://nodejs.org/"
    exit 1
fi

# 检查版本是否 >= 18
major_version=$(echo $node_version | cut -d'.' -f1)
if [ "$major_version" -lt 18 ]; then
    echo "❌ Node.js 版本过低 (当前: $node_version)，请安装 18+ 版本"
    exit 1
fi

echo "✅ Node.js 版本检查通过 (v$node_version)"

# 安装依赖
echo "📦 安装项目依赖..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ 依赖安装失败，请检查网络连接或尝试使用 yarn"
    exit 1
fi

echo "✅ 依赖安装完成"

# 检查环境变量文件
if [ ! -f ".env.local" ]; then
    echo "📋 创建环境变量文件..."
    cat > .env.local << EOF
# NextAuth.js 配置
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Google OAuth (可选)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# GitHub OAuth (可选)
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret
EOF
    echo "⚠️  请编辑 .env.local 文件并填入正确的环境变量"
    echo "   包括 NextAuth 密钥、OAuth 配置等"
fi

echo ""
echo "🎉 MetaPicker 安装完成！"
echo ""
echo "📝 下一步操作："
echo "1. 编辑 .env.local 文件，填入正确的 API 密钥"
echo "2. 运行 'npm run dev' 启动开发服务器"
echo "3. 访问 http://localhost:3000"
echo ""
echo "📚 需要帮助？"
echo "- 查看 README.md 获取详细文档"
echo "- 访问 GitHub Issues 报告问题"
echo ""
echo "🚀 现在启动开发服务器吗？(y/n)"
read -r start_server

if [ "$start_server" = "y" ] || [ "$start_server" = "Y" ]; then
    echo "🌟 启动开发服务器..."
    npm run dev
fi 