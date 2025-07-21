'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, User, Tag, ArrowRight, TrendingUp, MessageSquare } from 'lucide-react'
import Link from 'next/link'

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
  const [activeTab, setActiveTab] = useState<'news' | 'promotions'>('news')

  const newsItems: NewsItem[] = [
    {
      id: '1',
      title: 'OpenAI发布GPT-4 Turbo，性能提升50%，价格降低3倍',
      summary: 'OpenAI在最新的开发者大会上宣布GPT-4 Turbo正式发布，新模型在保持高质量输出的同时大幅降低了使用成本...',
      category: '产品更新',
      author: 'AI Platform 编辑部',
      publishedAt: '2024-01-15',
      imageUrl: '/api/placeholder/400/240',
      tags: ['OpenAI', 'GPT-4', '价格优化'],
      commentCount: 156,
      featured: true,
    },
    {
      id: '2',
      title: 'Google Gemini Pro在多模态理解上超越GPT-4V',
      summary: '最新的评测显示，Google的Gemini Pro在图像理解、文档分析等多模态任务上表现出色...',
      category: '技术评测',
      author: '技术团队',
      publishedAt: '2024-01-14',
      imageUrl: '/api/placeholder/400/240',
      tags: ['Google', 'Gemini', '多模态'],
      commentCount: 89,
      featured: false,
    },
    {
      id: '3',
      title: 'Anthropic Claude 3系列模型全面上线，安全性再升级',
      summary: 'Anthropic正式发布Claude 3系列，包括Haiku、Sonnet和Opus三个版本，在安全性和有用性上都有显著提升...',
      category: '新品发布',
      author: 'AI Platform 编辑部',
      publishedAt: '2024-01-13',
      imageUrl: '/api/placeholder/400/240',
      tags: ['Anthropic', 'Claude', '安全性'],
      commentCount: 72,
      featured: false,
    },
    {
      id: '4',
      title: '2024年AI行业趋势预测：多模态、边缘计算成为重点',
      summary: '业内专家预测，2024年AI行业将更加注重多模态融合和边缘计算部署，成本效率将成为关键因素...',
      category: '行业分析',
      author: '行业分析师',
      publishedAt: '2024-01-12',
      imageUrl: '/api/placeholder/400/240',
      tags: ['趋势预测', '多模态', '边缘计算'],
      commentCount: 134,
      featured: true,
    },
  ]

  const promotions: Promotion[] = [
    {
      id: '1',
      title: 'OpenAI新年特惠',
      description: 'GPT-4 Turbo限时8折优惠，额外赠送1000积分',
      provider: 'OpenAI',
      discount: '8折 + 1000积分',
      validTo: '2024-02-29',
      link: '/promotions/openai-new-year',
    },
    {
      id: '2',
      title: 'Anthropic企业版免费试用',
      description: 'Claude 3企业版免费试用30天，包含所有高级功能',
      provider: 'Anthropic',
      discount: '30天免费',
      validTo: '2024-03-15',
      link: '/promotions/anthropic-enterprise',
    },
    {
      id: '3',
      title: 'Google Cloud AI学生优惠',
      description: '学生用户享受Gemini Pro 5折优惠，需提供学生证明',
      provider: 'Google',
      discount: '5折优惠',
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
            AI行业{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">最新资讯</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">第一时间了解AI技术动态、产品更新和行业趋势</p>
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
              行业资讯
            </button>
            <button
              onClick={() => setActiveTab('promotions')}
              className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                activeTab === 'promotions' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              优惠活动
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
                        <div className="h-48 md:h-full bg-gradient-to-r from-blue-500 to-purple-500 relative">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <TrendingUp className="w-12 h-12 text-white" />
                          </div>
                          <div className="absolute top-4 left-4">
                            <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">热门</span>
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
                            <span>阅读更多</span>
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
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm">限时优惠</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{promotion.title}</h3>
                <p className="text-gray-600 mb-4">{promotion.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold text-green-600">{promotion.discount}</div>
                  <div className="text-sm text-gray-500">截止: {promotion.validTo}</div>
                </div>
                <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-200">
                  立即参与
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
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg">
              查看更多{activeTab === 'news' ? '资讯' : '活动'}
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
