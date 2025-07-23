'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { useI18n } from '@/lib/i18n/context'
import { Container, Card, Button, Badge } from '@/components/ui'
import IconComparison from '@/components/ui/IconComparison'

// 当前已有的 Lucide React 图标
import { 
  Heart, 
  Star, 
  Download, 
  Settings, 
  Search, 
  Bell, 
  User, 
  Mail, 
  Github,
  Code,
  Palette,
  Zap,
  Shield,
  Bookmark,
  Share2
} from 'lucide-react'

export default function IconLibrariesPage() {
  const { t, locale } = useI18n()
  const [activeTab, setActiveTab] = useState('lucide')

  const iconLibraries = [
    {
      id: 'lucide',
      name: 'Lucide React',
      description: locale === 'zh' ? '当前使用的主要图标库，现代简洁的线性风格' : 'Currently used primary icon library with modern linear style',
      status: 'installed',
      features: [
        locale === 'zh' ? '1000+ 图标' : '1000+ icons',
        locale === 'zh' ? 'Tree-shaking 支持' : 'Tree-shaking support',
        locale === 'zh' ? 'TypeScript 支持' : 'TypeScript support',
        locale === 'zh' ? '现代线性设计' : 'Modern linear design'
      ],
      website: 'https://lucide.dev',
      install: 'npm install lucide-react'
    },
    {
      id: 'heroicons',
      name: 'Heroicons',
      description: locale === 'zh' ? '由Tailwind CSS团队开发，完美集成' : 'Developed by Tailwind CSS team, perfect integration',
      status: 'recommended',
      features: [
        locale === 'zh' ? '200+ 精选图标' : '200+ curated icons',
        locale === 'zh' ? 'Outline & Solid 版本' : 'Outline & Solid versions',
        locale === 'zh' ? 'Tailwind 原生支持' : 'Native Tailwind support',
        locale === 'zh' ? '手工优化 SVG' : 'Hand-optimized SVG'
      ],
      website: 'https://heroicons.com',
      install: 'npm install @heroicons/react'
    },
    {
      id: 'react-icons',
      name: 'React Icons',
      description: locale === 'zh' ? '包含多个流行图标库的综合解决方案' : 'Comprehensive solution including multiple popular icon libraries',
      status: 'optional',
      features: [
        locale === 'zh' ? '10000+ 图标' : '10000+ icons',
        locale === 'zh' ? '多种设计风格' : 'Multiple design styles',
        locale === 'zh' ? '包含品牌图标' : 'Includes brand icons',
        locale === 'zh' ? '统一 API' : 'Unified API'
      ],
      website: 'https://react-icons.github.io/react-icons',
      install: 'npm install react-icons'
    },
    {
      id: 'tabler',
      name: 'Tabler Icons',
      description: locale === 'zh' ? '专业的管理界面图标库' : 'Professional admin interface icon library',
      status: 'optional',
      features: [
        locale === 'zh' ? '4000+ 专业图标' : '4000+ professional icons',
        locale === 'zh' ? '像素完美设计' : 'Pixel perfect design',
        locale === 'zh' ? '可调节描边宽度' : 'Adjustable stroke width',
        locale === 'zh' ? 'MIT 许可证' : 'MIT license'
      ],
      website: 'https://tabler-icons.io',
      install: 'npm install @tabler/icons-react'
    }
  ]

  const getStatusBadge = (status: string) => {
    const variants = {
      'installed': { color: 'bg-green-100 text-green-800', text: locale === 'zh' ? '已安装' : 'Installed' },
      'recommended': { color: 'bg-blue-100 text-blue-800', text: locale === 'zh' ? '推荐' : 'Recommended' },
      'optional': { color: 'bg-gray-100 text-gray-800', text: locale === 'zh' ? '可选' : 'Optional' }
    }
    const variant = variants[status as keyof typeof variants]
    return <Badge className={variant.color}>{variant.text}</Badge>
  }

  // Lucide React 图标示例
  const lucideIcons = [
    { icon: Heart, name: 'Heart', color: 'text-red-500' },
    { icon: Star, name: 'Star', color: 'text-yellow-500' },
    { icon: Download, name: 'Download', color: 'text-blue-500' },
    { icon: Settings, name: 'Settings', color: 'text-gray-500' },
    { icon: Search, name: 'Search', color: 'text-purple-500' },
    { icon: Bell, name: 'Bell', color: 'text-orange-500' },
    { icon: User, name: 'User', color: 'text-green-500' },
    { icon: Mail, name: 'Mail', color: 'text-indigo-500' },
    { icon: Github, name: 'Github', color: 'text-gray-800' },
    { icon: Code, name: 'Code', color: 'text-cyan-500' },
    { icon: Palette, name: 'Palette', color: 'text-pink-500' },
    { icon: Zap, name: 'Zap', color: 'text-yellow-400' },
    { icon: Shield, name: 'Shield', color: 'text-emerald-500' },
    { icon: Bookmark, name: 'Bookmark', color: 'text-amber-500' },
    { icon: Share2, name: 'Share2', color: 'text-blue-600' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      
      <main className="py-12">
        <Container>
          {/* 页面标题 */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {locale === 'zh' ? 'SVG 图标库推荐' : 'SVG Icon Libraries Recommendations'}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {locale === 'zh' 
                ? '为 Next.js + Tailwind CSS 项目精选的免费、高质量 SVG 图标库' 
                : 'Curated free, high-quality SVG icon libraries for Next.js + Tailwind CSS projects'
              }
            </p>
          </div>

          {/* 当前使用的图标展示 */}
          <div className="mb-12">
            <Card className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {locale === 'zh' ? '当前项目中的 Lucide React 图标' : 'Lucide React Icons in Current Project'}
                </h2>
                <p className="text-gray-600">
                  {locale === 'zh' 
                    ? '这些图标已经在项目中使用，展示了 Lucide React 的设计风格' 
                    : 'These icons are already used in the project, showcasing Lucide React design style'
                  }
                </p>
              </div>

              <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-6">
                {lucideIcons.map(({ icon: IconComponent, name, color }) => (
                  <div key={name} className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors">
                    <IconComponent className={`w-8 h-8 ${color} mb-2`} />
                    <span className="text-xs text-gray-600 text-center">{name}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* 图标库对比示例 */}
          <div className="mb-12">
            <IconComparison />
          </div>

          {/* 图标库推荐列表 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {iconLibraries.map((library) => (
              <Card key={library.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{library.name}</h3>
                    {getStatusBadge(library.status)}
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{library.description}</p>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {locale === 'zh' ? '主要特点:' : 'Key Features:'}
                  </h4>
                  <ul className="space-y-1">
                    {library.features.map((feature, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-center">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <p className="text-sm font-mono text-gray-800">{library.install}</p>
                </div>

                <div className="flex space-x-3">
                  <a 
                    href={library.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    {locale === 'zh' ? '访问官网' : 'Visit Website'}
                  </a>
                </div>
              </Card>
            ))}
          </div>

          {/* 使用指南 */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {locale === 'zh' ? '使用指南' : 'Usage Guide'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {locale === 'zh' ? '📋 选择建议' : '📋 Selection Recommendations'}
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• {locale === 'zh' ? '继续使用 Lucide React 作为主要图标库' : 'Continue using Lucide React as primary icon library'}</li>
                  <li>• {locale === 'zh' ? '添加 Heroicons 作为补充' : 'Add Heroicons as supplement'}</li>
                  <li>• {locale === 'zh' ? '需要品牌图标时使用 React Icons' : 'Use React Icons for brand icons when needed'}</li>
                  <li>• {locale === 'zh' ? '管理界面可考虑 Tabler Icons' : 'Consider Tabler Icons for admin interfaces'}</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {locale === 'zh' ? '⚡ 性能优化' : '⚡ Performance Optimization'}
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• {locale === 'zh' ? '使用按需导入避免打包过多图标' : 'Use named imports to avoid bundling too many icons'}</li>
                  <li>• {locale === 'zh' ? '保持图标风格的一致性' : 'Maintain consistency in icon styles'}</li>
                  <li>• {locale === 'zh' ? '创建图标包装组件统一管理' : 'Create icon wrapper components for unified management'}</li>
                  <li>• {locale === 'zh' ? '考虑无障碍性和主题适配' : 'Consider accessibility and theme adaptation'}</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">
                💡 {locale === 'zh' ? '专业提示' : 'Pro Tip'}
              </h4>
              <p className="text-blue-800 text-sm">
                {locale === 'zh' 
                  ? '查看 docs/SVG-ICON-RECOMMENDATIONS.md 获取详细的安装和使用示例'
                  : 'Check docs/SVG-ICON-RECOMMENDATIONS.md for detailed installation and usage examples'
                }
              </p>
            </div>
          </Card>

          {/* 文档链接 */}
          <div className="mt-8 text-center">
            <Link 
              href="/docs/SVG-ICON-RECOMMENDATIONS.md"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {locale === 'zh' ? '📖 查看完整文档' : '📖 View Complete Documentation'}
            </Link>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  )
}