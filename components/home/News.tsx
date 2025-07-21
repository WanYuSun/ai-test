'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, User, Tag, ArrowRight, TrendingUp, MessageSquare } from 'lucide-react'
import Link from 'next/link'
import { useI18n } from '@/lib/i18n/context'
import { theme, cn } from '@/lib/theme/config'
import { Button, Badge, Container, Section } from '@/components/ui'

interface NewsItem {
  id: string
  title: string
  summary: string
  category: string
  author: string
  publishedAt: string
  imageUrl: string
  tags: string[]
  commentCount: number
  featured: boolean
}

interface Promotion {
  id: string
  title: string
  description: string
  provider: string
  discount: string
  validTo: string
  link: string
}

export default function News() {
  const { t, locale } = useI18n()
  const [activeTab, setActiveTab] = useState<'news' | 'promotions'>('news')

  const newsItems: NewsItem[] = [
    {
      id: '1',
      title: t('news.sampleNews.gpt4Turbo.title'),
      summary: t('news.sampleNews.gpt4Turbo.summary'),
      category: t('news.categories.product'),
      author: t('news.author.editorial'),
      publishedAt: '2024-01-15',
      imageUrl: '/api/placeholder/400/240',
      tags: locale === 'zh' ? ['OpenAI', 'GPT-4', '价格优化'] : ['OpenAI', 'GPT-4', 'Price Optimization'],
      commentCount: 156,
      featured: true,
    },
    {
      id: '2',
      title: t('news.sampleNews.geminiPro.title'),
      summary: t('news.sampleNews.geminiPro.summary'),
      category: t('news.categories.tech'),
      author: t('news.author.tech'),
      publishedAt: '2024-01-14',
      imageUrl: '/api/placeholder/400/240',
      tags: locale === 'zh' ? ['Google', 'Gemini', '多模态'] : ['Google', 'Gemini', 'Multimodal'],
      commentCount: 89,
      featured: false,
    },
    {
      id: '3',
      title: t('news.sampleNews.claude3.title'),
      summary: t('news.sampleNews.claude3.summary'),
      category: t('news.categories.company'),
      author: t('news.author.editorial'),
      publishedAt: '2024-01-13',
      imageUrl: '/api/placeholder/400/240',
      tags: locale === 'zh' ? ['Anthropic', 'Claude', '安全性'] : ['Anthropic', 'Claude', 'Safety'],
      commentCount: 72,
      featured: false,
    },
    {
      id: '4',
      title: t('news.sampleNews.aiTrends.title'),
      summary: t('news.sampleNews.aiTrends.summary'),
      category: t('news.categories.industry'),
      author: t('news.author.analyst'),
      publishedAt: '2024-01-12',
      imageUrl: '/api/placeholder/400/240',
      tags: locale === 'zh' ? ['趋势预测', '多模态', '边缘计算'] : ['Trend Prediction', 'Multimodal', 'Edge Computing'],
      commentCount: 134,
      featured: true,
    },
  ]

  const promotions: Promotion[] = [
    {
      id: '1',
      title: t('news.samplePromotions.openaiOffer.title'),
      description: t('news.samplePromotions.openaiOffer.description'),
      provider: 'OpenAI',
      discount: t('news.samplePromotions.openaiOffer.discount'),
      validTo: '2024-02-29',
      link: '/promotions/openai-new-year',
    },
    {
      id: '2',
      title: t('news.samplePromotions.anthropicTrial.title'),
      description: t('news.samplePromotions.anthropicTrial.description'),
      provider: 'Anthropic',
      discount: t('news.samplePromotions.anthropicTrial.discount'),
      validTo: '2024-03-15',
      link: '/promotions/anthropic-enterprise',
    },
    {
      id: '3',
      title: t('news.samplePromotions.googleStudent.title'),
      description: t('news.samplePromotions.googleStudent.description'),
      provider: 'Google',
      discount: t('news.samplePromotions.googleStudent.discount'),
      validTo: '2024-06-30',
      link: '/promotions/google-student',
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('news.title')}{' '}
            <span className={cn('bg-clip-text text-transparent', `bg-gradient-to-r ${theme.gradients.primary}`)}>
              {t('news.highlight')}
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('news.subtitle')}</p>
        </motion.div>

        {/* 标签页切换 */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-sm border border-gray-200">
            <button
              onClick={() => setActiveTab('news')}
              className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                activeTab === 'news' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {t('news.tabs.news')}
            </button>
            <button
              onClick={() => setActiveTab('promotions')}
              className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                activeTab === 'promotions' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {t('news.tabs.promotions')}
            </button>
          </div>
        </div>

        {/* 资讯内容 */}
        {activeTab === 'news' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 特色文章 */}
            <div className="lg:col-span-2">
              {newsItems
                .filter((item) => item.featured)
                .map((item, index) => (
                  <motion.article
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 mb-6"
                  >
                    <div className="md:flex">
                      <div className="md:w-1/3">
                        <div className={cn('h-48 md:h-full relative', `bg-gradient-to-r ${theme.gradients.primary}`)}>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <TrendingUp className="w-12 h-12 text-white" />
                          </div>
                          <div className="absolute top-4 left-4">
                            <Badge variant="error" className="bg-red-500 text-white">
                              {t('common.hot')}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="md:w-2/3 p-6">
                        <div className="flex items-center space-x-2 mb-3">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">
                            {item.category}
                          </span>
                          {item.tags.map((tag) => (
                            <span key={tag} className="text-gray-500 text-sm">
                              #{tag}
                            </span>
                          ))}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{item.title}</h3>
                        <p className="text-gray-600 mb-4 line-clamp-3">{item.summary}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <User className="w-4 h-4" />
                              <span>{item.author}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{item.publishedAt}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MessageSquare className="w-4 h-4" />
                              <span>{item.commentCount}</span>
                            </div>
                          </div>
                          <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1">
                            <span>{t('common.readMore')}</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
            </div>

            {/* 普通文章 */}
            {newsItems
              .filter((item) => !item.featured)
              .map((item, index) => (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  <div className="h-48 bg-gradient-to-r from-gray-400 to-gray-500 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Tag className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-medium">
                        {item.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">{item.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{item.summary}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{item.publishedAt}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageSquare className="w-4 h-4" />
                        <span>{item.commentCount}</span>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
          </div>
        )}

        {/* 优惠活动 */}
        {activeTab === 'promotions' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {promotions.map((promotion, index) => (
              <motion.div
                key={promotion.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    {promotion.provider}
                  </span>
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm">{t('common.limitedTime')}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{promotion.title}</h3>
                <p className="text-gray-600 mb-4">{promotion.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold text-green-600">{promotion.discount}</div>
                  <div className="text-sm text-gray-500">
                    {t('common.validUntil')}: {promotion.validTo}
                  </div>
                </div>
                <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-200">
                  {t('common.participateNow')}
                </button>
              </motion.div>
            ))}
          </div>
        )}

        {/* 查看更多 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/news">
            <Button variant="primary" size="lg" className="shadow-lg">
              {t('common.viewMore')}
              {activeTab === 'news' ? t('common.news') : t('news.tabs.promotions')}
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
