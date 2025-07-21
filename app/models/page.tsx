'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { useI18n } from '@/lib/i18n/context'
import { Search, Filter, Star, Eye, TrendingUp } from 'lucide-react'

const models = [
  {
    id: 1,
    name: 'GPT-4 Turbo',
    provider: 'OpenAI',
    category: 'chat',
    descriptionKey: 'models.gpt4.description',
    rating: 4.9,
    pricing: '$0.01/1K tokens',
    features: ['128K context', 'multimodal', 'function_calling', 'json_mode'],
    status: 'available',
    image: '/api/placeholder/80/80',
  },
  {
    id: 2,
    name: 'Claude 3 Opus',
    provider: 'Anthropic',
    category: 'chat',
    descriptionKey: 'models.claude.description',
    rating: 4.8,
    pricing: '$15/$75 per MTok',
    features: ['200K context', 'high_accuracy', 'code_generation', 'math_reasoning'],
    status: 'available',
    image: '/api/placeholder/80/80',
  },
  {
    id: 3,
    name: 'DALL-E 3',
    provider: 'OpenAI',
    category: 'image',
    descriptionKey: 'models.dalle.description',
    rating: 4.7,
    pricing: '$0.04/image',
    features: ['1024x1024', 'high_resolution', 'precise_understanding', 'multiple_styles'],
    status: 'available',
    image: '/api/placeholder/80/80',
  },
  {
    id: 4,
    name: 'Whisper Large',
    provider: 'OpenAI',
    category: 'audio',
    descriptionKey: 'models.whisper.description',
    rating: 4.6,
    pricing: '$0.006/minute',
    features: ['multilingual', 'high_accuracy', 'audio_transcription', 'real_time'],
    status: 'available',
    image: '/api/placeholder/80/80',
  },
  {
    id: 5,
    name: 'CodeLlama',
    provider: 'Meta',
    category: 'code',
    descriptionKey: 'models.codellama.description',
    rating: 4.5,
    pricing: 'Free',
    features: ['code_completion', 'code_explanation', 'multiple_languages', 'debugging'],
    status: 'available',
    image: '/api/placeholder/80/80',
  },
  {
    id: 6,
    name: 'Stable Diffusion XL',
    provider: 'Stability AI',
    category: 'image',
    descriptionKey: 'models.sdxl.description',
    rating: 4.4,
    pricing: '$0.02/image',
    features: ['high_quality', 'customizable', 'fast_generation', 'style_transfer'],
    status: 'available',
    image: '/api/placeholder/80/80',
  },
]

// 添加具体的描述翻译到语言文件中
const modelDescriptions = {
  gpt4: {
    zh: '最新的GPT-4模型，具有更快的响应速度和更低的成本',
    en: 'Latest GPT-4 model with faster response speed and lower cost',
  },
  claude: {
    zh: '最强大的Claude模型，擅长复杂推理和创意写作',
    en: 'Most powerful Claude model, excellent at complex reasoning and creative writing',
  },
  dalle: {
    zh: '最新的图像生成模型，能生成高质量、高精度的图像',
    en: 'Latest image generation model that creates high-quality, high-precision images',
  },
  whisper: {
    zh: '强大的语音识别模型，支持多种语言的转录和翻译',
    en: 'Powerful speech recognition model supporting transcription and translation in multiple languages',
  },
  codellama: {
    zh: '专为代码生成和理解设计的大型语言模型',
    en: 'Large language model designed specifically for code generation and understanding',
  },
  sdxl: {
    zh: '高质量的开源图像生成模型，支持多种艺术风格',
    en: 'High-quality open-source image generation model supporting various artistic styles',
  },
}

const featureTranslations = {
  zh: {
    '128K context': '128K上下文',
    multimodal: '多模态',
    function_calling: '函数调用',
    json_mode: 'JSON模式',
    '200K context': '200K上下文',
    high_accuracy: '高准确性',
    code_generation: '代码生成',
    math_reasoning: '数学推理',
    '1024x1024': '1024x1024分辨率',
    high_resolution: '高分辨率',
    precise_understanding: '精确理解',
    multiple_styles: '多样风格',
    multilingual: '多语言',
    audio_transcription: '音频转录',
    real_time: '实时处理',
    code_completion: '代码补全',
    code_explanation: '代码解释',
    multiple_languages: '多种语言',
    debugging: '调试',
    high_quality: '高质量',
    customizable: '可定制',
    fast_generation: '快速生成',
    style_transfer: '风格转换',
  },
  en: {
    '128K context': '128K context',
    multimodal: 'Multimodal',
    function_calling: 'Function calling',
    json_mode: 'JSON mode',
    '200K context': '200K context',
    high_accuracy: 'High accuracy',
    code_generation: 'Code generation',
    math_reasoning: 'Math reasoning',
    '1024x1024': '1024x1024 resolution',
    high_resolution: 'High resolution',
    precise_understanding: 'Precise understanding',
    multiple_styles: 'Multiple styles',
    multilingual: 'Multilingual',
    audio_transcription: 'Audio transcription',
    real_time: 'Real-time processing',
    code_completion: 'Code completion',
    code_explanation: 'Code explanation',
    multiple_languages: 'Multiple languages',
    debugging: 'Debugging',
    high_quality: 'High quality',
    customizable: 'Customizable',
    fast_generation: 'Fast generation',
    style_transfer: 'Style transfer',
  },
}

export default function ModelsPage() {
  const { t, locale } = useI18n()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('rating')

  const categories = [
    { id: 'all', name: t('models.category.all') },
    { id: 'chat', name: t('models.category.chat') },
    { id: 'image', name: t('models.category.image') },
    { id: 'audio', name: t('models.category.audio') },
    { id: 'code', name: t('models.category.code') },
  ]

  const sortOptions = [
    { id: 'rating', name: t('models.sort.rating') },
    { id: 'price', name: t('models.sort.price') },
    { id: 'calls', name: t('models.sort.calls') },
    { id: 'name', name: t('models.sort.name') },
  ]

  const filteredModels = models
    .filter((model) => {
      const matchesSearch =
        model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        model.provider.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || model.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating
        case 'name':
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

  const getModelDescription = (modelId: string) => {
    const descriptions = modelDescriptions[modelId as keyof typeof modelDescriptions]
    return descriptions ? descriptions[locale] : ''
  }

  const getFeatureTranslation = (feature: string) => {
    const translations = featureTranslations[locale]
    return translations[feature as keyof typeof translations] || feature
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('models.title')}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('models.subtitle')}</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={t('models.search')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="text-gray-400 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="flex items-center space-x-2">
              <TrendingUp className="text-gray-400 w-5 h-5" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {sortOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Models Grid */}
        {filteredModels.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <p className="text-xl text-gray-600">{t('models.noResults')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredModels.map((model) => (
              <div
                key={model.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-shadow duration-200 overflow-hidden"
              >
                {/* Model Header */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <img src={model.image} alt={model.name} className="w-12 h-12 rounded-lg object-cover" />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{model.name}</h3>
                        <p className="text-sm text-gray-500">{model.provider}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-700">{model.rating}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {getModelDescription(
                      model.name.toLowerCase().replace(/\s+/g, '').replace('3', '').replace('-', '')
                    )}
                  </p>

                  {/* Features */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">{t('models.features')}</h4>
                    <div className="flex flex-wrap gap-2">
                      {model.features.slice(0, 3).map((feature, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {getFeatureTranslation(feature)}
                        </span>
                      ))}
                      {model.features.length > 3 && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          +{model.features.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Pricing and Status */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-500">{t('models.pricing')}</p>
                      <p className="text-lg font-semibold text-gray-900">{model.pricing}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          model.status === 'available' ? 'bg-green-400' : 'bg-yellow-400'
                        }`}
                      ></div>
                      <span className="text-sm text-gray-600">{t(`models.status.${model.status}`)}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-3">
                    <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                      {t('models.tryModel')}
                    </button>
                    <button className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                      {t('models.viewDocs')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
