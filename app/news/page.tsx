'use client'

import { Suspense, useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, User, Clock, ArrowRight, TrendingUp, MessageSquare, Search, Filter } from 'lucide-react'
import { useI18n } from '@/lib/i18n/context'
import { theme, cn } from '@/lib/theme/config'
import { Button, Badge, Container, Section, Image } from '@/components/ui'
import { getPlaceholderImage } from '@/lib/utils/image'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

interface NewsItem {
  id: string
  title: { [key: string]: string }
  summary: { [key: string]: string }
  content: { [key: string]: string }
  category: string
  author: string
  publishedAt: string
  imageUrl: string
  tags: string[]
  commentCount: number
  viewCount: number
  featured: boolean
}

export default function NewsPage() {
  const { t, locale } = useI18n()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const categories = [
    { id: 'all', name: t('news.categories.all') },
    { id: 'product', name: t('news.categories.product') },
    { id: 'tech', name: t('news.categories.tech') },
    { id: 'industry', name: t('news.categories.industry') },
    { id: 'company', name: t('news.categories.company') },
  ]

  const featuredNews: NewsItem[] = [
    {
      id: '1',
      title: {
        zh: 'OpenAI发布GPT-4 Turbo，性能提升50%，价格降低3倍',
        en: 'OpenAI Releases GPT-4 Turbo: 50% Performance Boost, 3x Price Reduction',
      },
      summary: {
        zh: 'OpenAI在最新的开发者大会上宣布GPT-4 Turbo正式发布，新模型在保持高质量输出的同时大幅降低了使用成本，这对整个AI行业都将产生深远影响。',
        en: 'OpenAI announces GPT-4 Turbo at their latest developer conference, featuring significant cost reductions while maintaining high-quality output.',
      },
      content: {
        zh: '详细内容...',
        en: 'Detailed content...',
      },
      category: 'product',
      author: t('news.author.editorial'),
      publishedAt: '2024-01-15',
      imageUrl: getPlaceholderImage(600, 400, 'OpenAI GPT-4 Turbo'),
      tags: ['OpenAI', 'GPT-4', '价格优化'],
      commentCount: 156,
      viewCount: 12450,
      featured: true,
    },
    {
      id: '2',
      title: {
        zh: 'Google Gemini Pro在多模态理解上超越GPT-4V',
        en: 'Google Gemini Pro Surpasses GPT-4V in Multimodal Understanding',
      },
      summary: {
        zh: '最新的评测显示，Google的Gemini Pro在图像理解、文档分析等多模态任务上表现出色，标志着多模态AI进入新的竞争阶段。',
        en: 'Latest benchmarks show Google Gemini Pro excelling in image understanding and document analysis tasks.',
      },
      content: {
        zh: '详细内容...',
        en: 'Detailed content...',
      },
      category: 'tech',
      author: t('news.author.tech'),
      publishedAt: '2024-01-14',
      imageUrl: getPlaceholderImage(600, 400, 'Google Gemini Pro'),
      tags: ['Google', 'Gemini', '多模态'],
      commentCount: 89,
      viewCount: 8900,
      featured: true,
    },
  ]

  const regularNews: NewsItem[] = [
    {
      id: '3',
      title: {
        zh: 'Anthropic Claude 3系列模型全面上线',
        en: 'Anthropic Claude 3 Series Models Now Fully Available',
      },
      summary: {
        zh: 'Anthropic正式发布Claude 3系列，包括Haiku、Sonnet和Opus三个版本。',
        en: 'Anthropic officially releases Claude 3 series including Haiku, Sonnet, and Opus.',
      },
      content: {
        zh: '详细内容...',
        en: 'Detailed content...',
      },
      category: 'product',
      author: t('news.author.editorial'),
      publishedAt: '2024-01-13',
      imageUrl: getPlaceholderImage(400, 240, 'Anthropic Claude 3'),
      tags: ['Anthropic', 'Claude', '安全性'],
      commentCount: 72,
      viewCount: 5600,
      featured: false,
    },
    {
      id: '4',
      title: {
        zh: '2024年AI行业趋势预测：多模态、边缘计算成为重点',
        en: '2024 AI Industry Trends: Focus on Multimodal and Edge Computing',
      },
      summary: {
        zh: '业内专家预测，2024年AI行业将更加注重多模态融合和边缘计算部署。',
        en: 'Industry experts predict 2024 AI focus on multimodal integration and edge deployment.',
      },
      content: {
        zh: '详细内容...',
        en: 'Detailed content...',
      },
      category: 'industry',
      author: t('news.author.analyst'),
      publishedAt: '2024-01-12',
      imageUrl: getPlaceholderImage(400, 240, '2024 AI 趋势'),
      tags: ['趋势预测', '多模态', '边缘计算'],
      commentCount: 134,
      viewCount: 9800,
      featured: false,
    },
    {
      id: '5',
      title: {
        zh: 'Meta发布新一代Llama模型，开源社区再迎重大更新',
        en: 'Meta Releases Next-Generation Llama Model, Major Open Source Update',
      },
      summary: {
        zh: 'Meta发布了新版本的Llama模型，性能大幅提升，继续推动开源AI发展。',
        en: 'Meta releases new Llama model version with significant performance improvements.',
      },
      content: {
        zh: '详细内容...',
        en: 'Detailed content...',
      },
      category: 'product',
      author: t('news.author.tech'),
      publishedAt: '2024-01-11',
      imageUrl: getPlaceholderImage(400, 240, 'Meta Llama'),
      tags: ['Meta', 'Llama', '开源'],
      commentCount: 98,
      viewCount: 7200,
      featured: false,
    },
    {
      id: '6',
      title: {
        zh: 'AI安全新标准发布，行业监管进入新阶段',
        en: 'New AI Safety Standards Released, Industry Regulation Enters New Phase',
      },
      summary: {
        zh: '国际组织发布了新的AI安全标准，将对整个行业的发展产生重要影响。',
        en: 'International organizations release new AI safety standards affecting industry development.',
      },
      content: {
        zh: '详细内容...',
        en: 'Detailed content...',
      },
      category: 'industry',
      author: t('news.author.editorial'),
      publishedAt: '2024-01-10',
      imageUrl: getPlaceholderImage(400, 240, 'AI 安全标准'),
      tags: ['安全', '标准', '监管'],
      commentCount: 67,
      viewCount: 4500,
      featured: false,
    },
  ]

  const filteredNews = regularNews.filter((article) => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory
    const matchesSearch =
      searchTerm === '' ||
      article.title[locale].toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.summary[locale].toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    return matchesCategory && matchesSearch
  })

  return (
    <div>
      <Header />
      <Section background="white">
        <Container size="lg" className="mt-12">
          {/* Header */}

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t('news.title')}{' '}
              <span className={cn('bg-clip-text text-transparent', `bg-gradient-to-r ${theme.gradients.primary}`)}>
                {t('news.highlight')}
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('news.subtitle')}</p>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8"
          >
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={t('news.searchPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={cn(
                      'px-4 py-2 font-medium transition-colors',
                      theme.borderRadius.lg,
                      selectedCategory === category.id
                        ? `bg-gradient-to-r ${theme.gradients.primary} text-white`
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    )}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Featured News */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('news.featured')}</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredNews.map((featured, index) => (
                <motion.article
                  key={featured.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="md:flex h-full">
                    <div className="md:w-1/2">
                      <Image
                        src={featured.imageUrl}
                        alt={featured.title[locale]}
                        className="w-full h-64 md:h-full"
                        fallbackWidth={600}
                        fallbackHeight={400}
                        placeholderText={featured.title[locale]}
                      />
                    </div>
                    <div className="md:w-1/2">
                      <div className="p-6 h-full">
                        <div className="flex items-center space-x-2 mb-3">
                          <Badge variant="primary" className="text-xs">
                            {t(`news.categories.${featured.category}`)}
                          </Badge>
                          <Badge variant="error" className="text-xs bg-red-500 text-white">
                            {t('news.featured')}
                          </Badge>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{featured.title[locale]}</h3>
                        <p className="text-gray-600 mb-4 line-clamp-3">{featured.summary[locale]}</p>
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <User className="w-4 h-4" />
                              <span>{featured.author}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{featured.publishedAt}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <MessageSquare className="w-4 h-4" />
                              <span>{featured.commentCount}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <TrendingUp className="w-4 h-4" />
                              <span>{featured.viewCount.toLocaleString()}</span>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                            {t('news.readMore')}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>

          {/* Regular News */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('news.latest')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNews.map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  <Image
                    src={article.imageUrl}
                    alt={article.title[locale]}
                    className="w-full h-48"
                    fallbackWidth={400}
                    fallbackHeight={240}
                    placeholderText={article.title[locale]}
                  />
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <Badge variant="secondary" className="text-xs">
                        {t(`news.categories.${article.category}`)}
                      </Badge>
                      {article.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-gray-500 text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">{article.title[locale]}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{article.summary[locale]}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{article.publishedAt}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <MessageSquare className="w-4 h-4" />
                          <span>{article.commentCount}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <TrendingUp className="w-4 h-4" />
                          <span>{(article.viewCount / 1000).toFixed(1)}k</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            {filteredNews.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-lg mb-2">{t('news.noResults')}</div>
                <p className="text-gray-500">{t('news.tryDifferentSearch')}</p>
              </div>
            )}
          </motion.div>

          {/* Load More */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center mt-12"
          >
            <Button variant="outline" size="lg">
              {t('news.loadMore')}
            </Button>
          </motion.div>
        </Container>
      </Section>
      <Footer />
    </div>
  )
}
