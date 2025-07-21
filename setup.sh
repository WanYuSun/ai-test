#!/bin/bash

# AI Platform 安装脚本
echo "🚀 开始安装 AI Platform..."

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
    if [ -f ".env.example" ]; then
        echo "📋 创建环境变量文件..."
        cp .env.example .env.local
        echo "⚠️  请编辑 .env.local 文件并填入正确的环境变量"
        echo "   包括数据库连接、API密钥等"
    else
        echo "❌ 未找到 .env.example 文件"
        exit 1
    fi
fi

# 数据库设置
echo "🗄️  设置数据库..."
npx prisma generate

if [ $? -ne 0 ]; then
    echo "❌ Prisma 客户端生成失败"
    exit 1
fi

echo "✅ 数据库客户端生成完成"

# 检查数据库连接
echo "🔍 检查数据库连接..."
npx prisma db push

if [ $? -ne 0 ]; then
    echo "❌ 数据库连接失败，请检查 DATABASE_URL 配置"
    echo "   确保 PostgreSQL 数据库正在运行并且连接信息正确"
    exit 1
fi

echo "✅ 数据库连接成功"

# 运行种子数据（可选）
echo "🌱 是否要加载示例数据？(y/n)"
read -r load_seed

if [ "$load_seed" = "y" ] || [ "$load_seed" = "Y" ]; then
    if [ -f "prisma/seed.ts" ]; then
        npx prisma db seed
        echo "✅ 示例数据加载完成"
    else
        echo "⚠️  未找到种子数据文件"
    fi
fi

echo ""
echo "🎉 AI Platform 安装完成！"
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