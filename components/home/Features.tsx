'use client'

import { motion } from 'framer-motion'
import {
  Brain,
  Zap,
  Shield,
  Code2,
  Palette,
  MessageSquare,
  Mic,
  Image as ImageIcon,
  Globe,
  BarChart3,
  Users,
  Lock,
} from 'lucide-react'

export default function Features() {
  const features = [
    {
      icon: Brain,
      title: '多种AI模型',
      description: '集成GPT-4、Claude、Gemini等15+主流AI模型，满足不同场景需求',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Zap,
      title: '极速响应',
      description: '优化的API路由和智能负载均衡，确保毫秒级响应速度',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: Shield,
      title: '安全可靠',
      description: '企业级安全防护，数据加密传输，隐私保护全面覆盖',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Code2,
      title: '开发友好',
      description: '简洁的API接口，详细的文档说明，支持多种编程语言SDK',
      color: 'from-purple-500 to-violet-500',
    },
    {
      icon: Palette,
      title: '图像生成',
      description: '支持DALL-E、Midjourney、Stable Diffusion等图像生成模型',
      color: 'from-pink-500 to-rose-500',
    },
    {
      icon: MessageSquare,
      title: '智能对话',
      description: '多轮对话管理，上下文理解，支持角色扮演和专业场景',
      color: 'from-indigo-500 to-blue-500',
    },
    {
      icon: Mic,
      title: '语音识别',
      description: '集成Whisper等语音模型，支持多语言语音转文字功能',
      color: 'from-teal-500 to-cyan-500',
    },
    {
      icon: ImageIcon,
      title: '图像分析',
      description: '图像识别、OCR文字提取、物体检测等多种视觉AI能力',
      color: 'from-red-500 to-pink-500',
    },
    {
      icon: Globe,
      title: '多语言支持',
      description: '支持100+种语言翻译，文本生成和对话交互',
      color: 'from-amber-500 to-orange-500',
    },
    {
      icon: BarChart3,
      title: '使用统计',
      description: '详细的使用数据分析，成本控制和性能监控',
      color: 'from-slate-500 to-gray-500',
    },
    {
      icon: Users,
      title: '团队协作',
      description: '多用户管理，权限控制，团队共享工作空间',
      color: 'from-lime-500 to-green-500',
    },
    {
      icon: Lock,
      title: 'API密钥管理',
      description: '安全的API密钥管理，细粒度权限控制和使用限制',
      color: 'from-emerald-500 to-teal-500',
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            强大的AI能力{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">一站集成</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            无需多平台切换，一个接口访问所有主流AI模型，让您专注于创新而非集成
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 group"
            >
              <div
                className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${feature.color} mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">准备好体验AI的强大能力了吗？</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">立即注册获得100积分免费体验，无需信用卡，无隐藏费用</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200">
                免费开始使用
              </button>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-200">
                查看API文档
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
