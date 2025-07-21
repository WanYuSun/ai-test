'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Zap, Users, DollarSign, Filter, Search } from 'lucide-react'

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
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('rating')
  const [searchTerm, setSearchTerm] = useState('')

  const categories = [
    { id: 'all', name: '全部' },
    { id: 'chat', name: '对话' },
    { id: 'image', name: '图像' },
    { id: 'audio', name: '音频' },
    { id: 'code', name: '代码' },
  ]

  const models: AIModel[] = [
    {
      id: '1',
      name: 'GPT-4 Turbo',
      provider: 'OpenAI',
      description: '最新一代大语言模型，支持多模态输入',
      category: 'chat',
      rating: 4.9,
      price: 0.01,
      calls: 1250000,
      features: ['多模态', '128K上下文', '实时响应'],
      logo: '/api/placeholder/40/40',
    },
    {
      id: '2',
      name: 'Claude 3 Opus',
      provider: 'Anthropic',
      description: '强大的推理能力，安全性优秀',
      category: 'chat',
      rating: 4.8,
      price: 0.015,
      calls: 980000,
      features: ['200K上下文', '高准确性', '安全对话'],
      logo: '/api/placeholder/40/40',
    },
    {
      id: '3',
      name: 'DALL-E 3',
      provider: 'OpenAI',
      description: '最先进的AI图像生成模型',
      category: 'image',
      rating: 4.7,
      price: 0.04,
      calls: 560000,
      features: ['高质量', '精确控制', '风格多样'],
      logo: '/api/placeholder/40/40',
    },
    {
      id: '4',
      name: 'Whisper Large',
      provider: 'OpenAI',
      description: '多语言语音识别模型',
      category: 'audio',
      rating: 4.6,
      price: 0.006,
      calls: 340000,
      features: ['99种语言', '高精度', '实时转换'],
      logo: '/api/placeholder/40/40',
    },
    {
      id: '5',
      name: 'CodeLlama',
      provider: 'Meta',
      description: '专业的代码生成和理解模型',
      category: 'code',
      rating: 4.5,
      price: 0.008,
      calls: 280000,
      features: ['多语言支持', '代码补全', 'bug修复'],
      logo: '/api/placeholder/40/40',
    },
    {
      id: '6',
      name: 'Gemini Pro',
      provider: 'Google',
      description: 'Google最新多模态AI模型',
      category: 'chat',
      rating: 4.7,
      price: 0.012,
      calls: 450000,
      features: ['多模态', '快速响应', '上下文理解'],
      logo: '/api/placeholder/40/40',
    },
    {
      id: '7',
      name: 'Stable Diffusion XL',
      provider: 'Stability AI',
      description: '开源图像生成模型，高质量输出',
      category: 'image',
      rating: 4.4,
      price: 0.025,
      calls: 420000,
      features: ['开源', '可定制', '高分辨率'],
      logo: '/api/placeholder/40/40',
    },
    {
      id: '8',
      name: 'Cohere Command',
      provider: 'Cohere',
      description: '企业级大语言模型，专注商业应用',
      category: 'chat',
      rating: 4.3,
      price: 0.02,
      calls: 180000,
      features: ['企业级', '多语言', 'RAG优化'],
      logo: '/api/placeholder/40/40',
    },
    {
      id: '9',
      name: 'Azure Speech',
      provider: 'Microsoft',
      description: '企业级语音合成和识别服务',
      category: 'audio',
      rating: 4.2,
      price: 0.004,
      calls: 310000,
      features: ['神经语音', '自定义声音', '实时翻译'],
      logo: '/api/placeholder/40/40',
    },
    {
      id: '10',
      name: 'GitHub Copilot',
      provider: 'GitHub',
      description: 'AI编程助手，提升开发效率',
      category: 'code',
      rating: 4.6,
      price: 0.01,
      calls: 890000,
      features: ['IDE集成', '多语言', '上下文感知'],
      logo: '/api/placeholder/40/40',
    },
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
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              15+ 主流AI模型
            </span>
            一键接入
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">从对话到图像，从音频到代码，满足您的所有AI需求</p>
        </motion.div>

        {/* 筛选和搜索栏 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* 搜索框 */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="搜索模型或服务商..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* 分类筛选 */}
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* 排序选择 */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="rating">按评分排序</option>
                <option value="price">按价格排序</option>
                <option value="calls">按调用量排序</option>
              </select>
            </div>
          </div>
        </div>

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
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
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
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200">
                  试用
                </button>
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
              <div className="text-gray-600">AI模型</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">30+</div>
              <div className="text-gray-600">服务商</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">5M+</div>
              <div className="text-gray-600">API调用</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">99.9%</div>
              <div className="text-gray-600">可用性</div>
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
            查看全部模型
          </button>
        </motion.div>
      </div>
    </section>
  )
}
