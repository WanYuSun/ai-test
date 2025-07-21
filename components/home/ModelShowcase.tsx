'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Zap, Users, DollarSign, Filter, Search } from 'lucide-react'
import Link from 'next/link'
import { useI18n } from '@/lib/i18n/context'
import { theme, cn } from '@/lib/theme/config'
import { Button, Badge, Container, Section } from '@/components/ui'

interface AIModel {
  id: string
  name: string
  provider: string
  description: string
  category: string
  rating: number
  price: number
  calls: number
  features: string[]
  logo: string
}

export default function ModelShowcase() {
  const { t, locale } = useI18n()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('rating')
  const [searchTerm, setSearchTerm] = useState('')

  const categories = [
    { id: 'all', name: t('models.categories.all') },
    { id: 'chat', name: t('models.categories.chat') },
    { id: 'image', name: t('models.categories.image') },
    { id: 'audio', name: t('models.categories.audio') },
    { id: 'code', name: t('models.categories.code') },
  ]

  const models: AIModel[] = [
    {
      id: '1',
      name: 'GPT-4 Turbo',
      provider: 'OpenAI',
      description: t('models.sampleModels.gpt4Turbo.description'),
      category: 'chat',
      rating: 4.9,
      price: 0.01,
      calls: 1250000,
      features:
        locale === 'zh' ? ['多模态', '128K上下文', '实时响应'] : ['Multimodal', '128K Context', 'Real-time Response'],
      logo: '/api/placeholder/40/40',
    },
    {
      id: '2',
      name: 'Claude 3 Opus',
      provider: 'Anthropic',
      description: t('models.sampleModels.claude3.description'),
      category: 'chat',
      rating: 4.8,
      price: 0.015,
      calls: 980000,
      features:
        locale === 'zh'
          ? ['200K上下文', '高准确性', '安全对话']
          : ['200K Context', 'High Accuracy', 'Safe Conversation'],
      logo: '/api/placeholder/40/40',
    },
    {
      id: '3',
      name: 'DALL-E 3',
      provider: 'OpenAI',
      description: t('models.sampleModels.dalle3.description'),
      category: 'image',
      rating: 4.7,
      price: 0.04,
      calls: 560000,
      features:
        locale === 'zh' ? ['高质量', '精确控制', '风格多样'] : ['High Quality', 'Precise Control', 'Diverse Styles'],
      logo: '/api/placeholder/40/40',
    },
    {
      id: '4',
      name: 'Whisper Large',
      provider: 'OpenAI',
      description: t('models.sampleModels.whisper.description'),
      category: 'audio',
      rating: 4.6,
      price: 0.006,
      calls: 340000,
      features:
        locale === 'zh'
          ? ['99种语言', '高精度', '实时转换']
          : ['99 Languages', 'High Precision', 'Real-time Conversion'],
      logo: '/api/placeholder/40/40',
    },
    {
      id: '5',
      name: 'CodeLlama',
      provider: 'Meta',
      description: t('models.sampleModels.codellama.description'),
      category: 'code',
      rating: 4.5,
      price: 0.008,
      calls: 280000,
      features:
        locale === 'zh'
          ? ['多语言支持', '代码补全', 'bug修复']
          : ['Multi-language Support', 'Code Completion', 'Bug Fix'],
      logo: '/api/placeholder/40/40',
    },
    {
      id: '6',
      name: 'Gemini Pro',
      provider: 'Google',
      description: t('models.sampleModels.geminiPro.description'),
      category: 'chat',
      rating: 4.7,
      price: 0.012,
      calls: 450000,
      features:
        locale === 'zh'
          ? ['多模态', '快速响应', '上下文理解']
          : ['Multimodal', 'Fast Response', 'Context Understanding'],
      logo: '/api/placeholder/40/40',
    },
    // {
    //   id: '7',
    //   name: 'Stable Diffusion XL',
    //   provider: 'Stability AI',
    //   description: t('models.sampleModels.stableDiffusion.description'),
    //   category: 'image',
    //   rating: 4.4,
    //   price: 0.025,
    //   calls: 420000,
    //   features: locale === 'zh' ? ['开源', '可定制', '高分辨率'] : ['Open Source', 'Customizable', 'High Resolution'],
    //   logo: '/api/placeholder/40/40',
    // },
    // {
    //   id: '8',
    //   name: 'Cohere Command',
    //   provider: 'Cohere',
    //   description: t('models.sampleModels.cohereCommand.description'),
    //   category: 'chat',
    //   rating: 4.3,
    //   price: 0.02,
    //   calls: 180000,
    //   features:
    //     locale === 'zh' ? ['企业级', '多语言', 'RAG优化'] : ['Enterprise-grade', 'Multilingual', 'RAG Optimized'],
    //   logo: '/api/placeholder/40/40',
    // },
    // {
    //   id: '9',
    //   name: 'Azure Speech',
    //   provider: 'Microsoft',
    //   description: t('models.sampleModels.azureSpeech.description'),
    //   category: 'audio',
    //   rating: 4.2,
    //   price: 0.004,
    //   calls: 310000,
    //   features:
    //     locale === 'zh'
    //       ? ['神经语音', '自定义声音', '实时翻译']
    //       : ['Neural Voice', 'Custom Voice', 'Real-time Translation'],
    //   logo: '/api/placeholder/40/40',
    // },
    // {
    //   id: '10',
    //   name: 'GitHub Copilot',
    //   provider: 'GitHub',
    //   description: t('models.sampleModels.githubCopilot.description'),
    //   category: 'code',
    //   rating: 4.6,
    //   price: 0.01,
    //   calls: 890000,
    //   features:
    //     locale === 'zh' ? ['IDE集成', '多语言', '上下文感知'] : ['IDE Integration', 'Multi-language', 'Context Aware'],
    //   logo: '/api/placeholder/40/40',
    // },
  ]

  const filteredModels = models
    .filter(
      (model) =>
        (selectedCategory === 'all' || model.category === selectedCategory) &&
        (model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          model.provider.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating
        case 'price':
          return a.price - b.price
        case 'calls':
          return b.calls - a.calls
        default:
          return 0
      }
    })

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            <span className={cn('bg-clip-text text-transparent', `bg-gradient-to-r ${theme.gradients.primary}`)}>
              {t('models.title')}
            </span>
            {t('models.subtitle')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('models.description')}</p>
        </motion.div>

        {/* 模型列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModels.map((model, index) => (
            <motion.div
              key={model.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div
                    className={cn(
                      'w-12 h-12 flex items-center justify-center text-white font-bold text-lg',
                      theme.borderRadius.lg,
                      `bg-gradient-to-r ${theme.gradients.primary}`
                    )}
                  >
                    {model.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{model.name}</h3>
                    <p className="text-sm text-gray-500">{model.provider}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600">{model.rating}</span>
                </div>
              </div>

              <p className="text-gray-600 mb-4 line-clamp-2">{model.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {model.features.map((feature) => (
                  <span key={feature} className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full">
                    {feature}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <DollarSign className="w-4 h-4" />
                    <span>${model.price}/1K</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Zap className="w-4 h-4" />
                    <span>{(model.calls / 1000).toFixed(0)}K</span>
                  </div>
                </div>
                <Button variant="primary" size="sm">
                  {t('common.tryNow')}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 模型统计 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-12 bg-white rounded-xl p-8 border border-gray-200"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">15+</div>
              <div className="text-gray-600">{t('models.stats.models')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">30+</div>
              <div className="text-gray-600">{t('models.stats.providers')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">5M+</div>
              <div className="text-gray-600">{t('models.stats.apiCalls')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">99.9%</div>
              <div className="text-gray-600">{t('models.stats.availability')}</div>
            </div>
          </div>
        </motion.div>

        {/* 查看全部 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button className="bg-white border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-200">
            {t('models.viewAllModels')}
          </button>
        </motion.div>
      </div>
    </section>
  )
}
