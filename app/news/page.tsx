'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { useI18n } from '@/lib/i18n/context'
import { Calendar, User, Tag, ArrowRight, TrendingUp, MessageSquare, X, ExternalLink } from 'lucide-react'

interface NewsItem {
  id: string
  title: { zh: string; en: string }
  summary: { zh: string; en: string }
  content: { zh: string; en: string }
  category: string
  author: string
  publishedAt: string
  imageUrl: string
  tags: string[]
  commentCount: number
  featured: boolean
  readTime: { zh: string; en: string }
}

interface Promotion {
  id: string
  title: { zh: string; en: string }
  description: { zh: string; en: string }
  provider: string
  discount: string
  validTo: string
  link: string
}

export default function NewsPage() {
  const { t, locale } = useI18n()
  const [activeTab, setActiveTab] = useState<'news' | 'promotions'>('news')
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null)
  const [displayCount, setDisplayCount] = useState(6)
  const [isLoading, setIsLoading] = useState(false)

  const newsItems: NewsItem[] = [
    {
      id: '1',
      title: {
        zh: 'OpenAI发布GPT-4 Turbo新版本，性能提升40%',
        en: 'OpenAI Releases New GPT-4 Turbo Version with 40% Performance Improvement',
      },
      summary: {
        zh: 'OpenAI宣布推出GPT-4 Turbo的最新版本，在保持高质量输出的同时，显著提升了响应速度和成本效益。',
        en: 'OpenAI announces the latest version of GPT-4 Turbo, significantly improving response speed and cost-effectiveness while maintaining high-quality output.',
      },
      content: {
        zh: 'OpenAI今日正式发布了GPT-4 Turbo的全新版本，该版本在多个维度实现了重大突破...',
        en: 'OpenAI officially released a new version of GPT-4 Turbo today, achieving major breakthroughs in multiple dimensions...',
      },
      category: 'technology',
      author: 'AI Research Team',
      publishedAt: '2024-01-15',
      imageUrl: '/api/placeholder/400/240',
      tags: ['OpenAI', 'GPT-4', 'AI'],
      commentCount: 128,
      featured: true,
      readTime: { zh: '5分钟', en: '5 min' },
    },
    {
      id: '2',
      title: {
        zh: 'Anthropic Claude 3即将推出，或将超越GPT-4',
        en: 'Anthropic Claude 3 Coming Soon, May Surpass GPT-4',
      },
      summary: {
        zh: 'Anthropic即将发布的Claude 3模型在多项基准测试中表现出色，有望在某些任务上超越GPT-4。',
        en: "Anthropic's upcoming Claude 3 model shows excellent performance in multiple benchmarks and may surpass GPT-4 in certain tasks.",
      },
      content: {
        zh: '根据最新的内部测试结果，Anthropic的Claude 3模型在推理能力方面有了显著提升...',
        en: "According to the latest internal test results, Anthropic's Claude 3 model has significantly improved reasoning capabilities...",
      },
      category: 'product',
      author: 'Tech Analyst',
      publishedAt: '2024-01-14',
      imageUrl: '/api/placeholder/400/240',
      tags: ['Anthropic', 'Claude', 'AI Model'],
      commentCount: 95,
      featured: false,
      readTime: { zh: '4分钟', en: '4 min' },
    },
    // Add more news items...
  ]

  const promotions: Promotion[] = [
    {
      id: '1',
      title: {
        zh: 'OpenAI API限时优惠',
        en: 'OpenAI API Limited Time Offer',
      },
      description: {
        zh: '新用户注册即可享受首月50%折扣，快来体验最先进的AI技术！',
        en: 'New users get 50% off their first month. Experience the most advanced AI technology!',
      },
      provider: 'OpenAI',
      discount: '50%',
      validTo: '2024-02-15',
      link: 'https://openai.com',
    },
    // Add more promotions...
  ]

  const categories = [
    { id: 'all', name: t('news.categories.all') },
    { id: 'technology', name: t('news.categories.technology') },
    { id: 'industry', name: t('news.categories.industry') },
    { id: 'research', name: t('news.categories.research') },
    { id: 'product', name: t('news.categories.product') },
  ]

  const loadMoreArticles = () => {
    setIsLoading(true)
    setTimeout(() => {
      setDisplayCount((prev) => prev + 6)
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">{t('news.title')}</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">{t('news.subtitle')}</p>

            {/* Tab Navigation */}
            <div className="flex justify-center mb-12">
              <div className="bg-white rounded-xl p-1 shadow-lg border border-gray-200">
                <button
                  onClick={() => setActiveTab('news')}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === 'news'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {t('news.tabs.news')}
                </button>
                <button
                  onClick={() => setActiveTab('promotions')}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === 'promotions'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {t('news.tabs.promotions')}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* News Content */}
        {activeTab === 'news' && (
          <section className="pb-16 px-4">
            <div className="max-w-7xl mx-auto">
              {/* Category Filter */}
              <div className="flex flex-wrap justify-center gap-2 mb-12">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className="px-4 py-2 bg-white border border-gray-200 rounded-full hover:bg-blue-50 hover:border-blue-300 transition-colors text-sm"
                  >
                    {category.name}
                  </button>
                ))}
              </div>

              {/* Featured Article */}
              {newsItems.find((item) => item.featured) && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('news.featured')}</h2>
                  {(() => {
                    const featured = newsItems.find((item) => item.featured)!
                    return (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                      >
                        <div className="md:flex">
                          <div className="md:w-1/2">
                            <img
                              src={featured.imageUrl}
                              alt={featured.title[locale]}
                              className="w-full h-64 md:h-full object-cover"
                            />
                          </div>
                          <div className="md:w-1/2 p-8">
                            <div className="flex items-center space-x-4 mb-4">
                              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                {t(`news.categories.${featured.category}`)}
                              </span>
                              <div className="flex items-center text-gray-500 text-sm">
                                <Calendar className="w-4 h-4 mr-1" />
                                {t('news.publishedAt')} {featured.publishedAt}
                              </div>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">{featured.title[locale]}</h3>
                            <p className="text-gray-600 mb-6">{featured.summary[locale]}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <div className="flex items-center">
                                  <User className="w-4 h-4 mr-1" />
                                  {featured.author}
                                </div>
                                <div className="flex items-center">
                                  <MessageSquare className="w-4 h-4 mr-1" />
                                  {featured.commentCount} {t('news.comments')}
                                </div>
                                <span>
                                  {featured.readTime[locale]} {t('news.readTime')}
                                </span>
                              </div>
                              <button
                                onClick={() => setSelectedArticle(featured)}
                                className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
                              >
                                {t('news.readMore')}
                                <ArrowRight className="w-4 h-4 ml-1" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })()}
                </div>
              )}

              {/* Articles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {newsItems.slice(0, displayCount).map((article, index) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                  >
                    <img src={article.imageUrl} alt={article.title[locale]} className="w-full h-48 object-cover" />
                    <div className="p-6">
                      <div className="flex items-center space-x-2 mb-3">
                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                          {t(`news.categories.${article.category}`)}
                        </span>
                        <span className="text-gray-500 text-xs">{article.readTime[locale]}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">{article.title[locale]}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{article.summary[locale]}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 text-xs text-gray-500">
                          <div className="flex items-center">
                            <User className="w-3 h-3 mr-1" />
                            {article.author}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {article.publishedAt}
                          </div>
                        </div>
                        <button
                          onClick={() => setSelectedArticle(article)}
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                          {t('news.readMore')}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Load More Button */}
              {displayCount < newsItems.length && (
                <div className="text-center">
                  <button
                    onClick={loadMoreArticles}
                    disabled={isLoading}
                    className="bg-white border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
                  >
                    {isLoading ? t('common.loading') : t('common.loadMore')}
                  </button>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Promotions Content */}
        {activeTab === 'promotions' && (
          <section className="pb-16 px-4">
            <div className="max-w-4xl mx-auto">
              <div className="space-y-6">
                {promotions.map((promotion) => (
                  <div
                    key={promotion.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <h3 className="text-xl font-semibold text-gray-900">{promotion.title[locale]}</h3>
                          <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-medium">
                            {promotion.discount} OFF
                          </span>
                        </div>
                        <p className="text-gray-600 mb-4">{promotion.description[locale]}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>
                            {t('models.provider')}: {promotion.provider}
                          </span>
                          <span>Valid until: {promotion.validTo}</span>
                        </div>
                      </div>
                      <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        {locale === 'zh' ? '查看详情' : 'View Details'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />

      {/* Article Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 pr-4">{selectedArticle.title[locale]}</h2>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="prose prose-gray max-w-none">
                <p>{selectedArticle.content[locale]}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
