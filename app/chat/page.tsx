'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { useI18n } from '@/lib/i18n/context'
import {
  Send,
  Plus,
  Settings,
  Download,
  Copy,
  ThumbsUp,
  ThumbsDown,
  Mic,
  Image,
  Paperclip,
  MoreHorizontal,
  Zap,
  Clock,
  Users,
  Bot,
  User,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

const conversationHistory = [
  {
    id: 1,
    title: '人工智能发展历史',
    preview: '你好，我想了解一下人工智能的发展历史',
    time: '今天 10:30',
    isActive: true,
    messages: [
      {
        id: 1,
        role: 'user',
        content: '你好，我想了解一下人工智能的发展历史',
        timestamp: '10:30',
      },
      {
        id: 2,
        role: 'assistant',
        content:
          '你好！我很乐意为你介绍人工智能的发展历史。\n\n人工智能的发展可以分为几个重要阶段：\n\n**1. 起源阶段（1940-1960年代）**\n• 1950年，艾伦·图灵提出著名的"图灵测试"\n• 1956年，达特茅斯会议正式提出"人工智能"概念\n\n**2. 第一次繁荣期（1960-1970年代）**\n• 专家系统的兴起\n• 机器学习基础理论的建立\n\n**3. 第一次低谷期（1970-1980年代）**\n• 计算能力限制\n• 理论与实际应用差距过大\n\n**4. 复兴期（1980-1990年代）**\n• 神经网络重新受到关注\n• 互联网的兴起提供了更多数据\n\n**5. 现代AI时代（2000年至今）**\n• 深度学习技术突破\n• 大数据和云计算的支持\n• GPT、BERT等大语言模型的出现\n\n你想了解哪个特定阶段的更多细节吗？',
        timestamp: '10:31',
      },
    ],
  },
  {
    id: 2,
    title: '机器学习算法对比',
    preview: '能详细比较一下监督学习和无监督学习吗？',
    time: '昨天 16:45',
    isActive: false,
    messages: [
      {
        id: 1,
        role: 'user',
        content: '能详细比较一下监督学习和无监督学习吗？',
        timestamp: '16:45',
      },
      {
        id: 2,
        role: 'assistant',
        content:
          '当然可以！监督学习和无监督学习是机器学习的两大主要分支：\n\n**监督学习 (Supervised Learning)**\n• 特点：有标注的训练数据\n• 目标：学习输入到输出的映射关系\n• 主要任务：分类、回归\n• 常见算法：决策树、支持向量机、神经网络\n• 评估方式：准确率、召回率、F1分数等\n\n**无监督学习 (Unsupervised Learning)**\n• 特点：没有标注的训练数据\n• 目标：发现数据中的隐藏模式\n• 主要任务：聚类、降维、关联规则挖掘\n• 常见算法：K-means、层次聚类、PCA\n• 评估方式：轮廓系数、簇内平方和等\n\n您想深入了解哪个方面呢？',
        timestamp: '16:46',
      },
    ],
  },
  {
    id: 3,
    title: '深度学习入门指南',
    preview: '我是初学者，应该怎么开始学习深度学习？',
    time: '昨天 14:20',
    isActive: false,
    messages: [
      {
        id: 1,
        role: 'user',
        content: '我是初学者，应该怎么开始学习深度学习？',
        timestamp: '14:20',
      },
      {
        id: 2,
        role: 'assistant',
        content:
          '很高兴看到您对深度学习感兴趣！这里是一个完整的学习路径：\n\n**📚 基础知识**\n• 数学基础：线性代数、微积分、概率统计\n• 编程语言：Python (推荐) 或 R\n• 机器学习基础概念\n\n**🛠️ 实践工具**\n• 深度学习框架：TensorFlow、PyTorch、Keras\n• 开发环境：Jupyter Notebook、Google Colab\n• 数据处理：NumPy、Pandas、Matplotlib\n\n**📖 学习资源**\n• 在线课程：Coursera、edX、Udacity\n• 经典书籍：《深度学习》(Goodfellow)、《动手学深度学习》\n• 实践项目：Kaggle竞赛、GitHub项目\n\n**🎯 学习顺序**\n1. 掌握基础数学和Python\n2. 理解神经网络原理\n3. 学习CNN、RNN等架构\n4. 完成实际项目\n\n建议从简单的项目开始，比如手写数字识别。您有特定的应用领域想要专注吗？',
        timestamp: '14:21',
      },
    ],
  },
  {
    id: 4,
    title: 'Python编程基础',
    preview: 'Python中的列表和元组有什么区别？',
    time: '前天 09:15',
    isActive: false,
    messages: [
      {
        id: 1,
        role: 'user',
        content: 'Python中的列表和元组有什么区别？',
        timestamp: '09:15',
      },
      {
        id: 2,
        role: 'assistant',
        content:
          'Python中列表(List)和元组(Tuple)是两种重要的数据结构，它们有以下主要区别：\n\n**📝 列表 (List)**\n• 可变性：可以修改、添加、删除元素\n• 语法：使用方括号 `[1, 2, 3]`\n• 方法：支持append()、remove()、pop()等\n• 性能：修改操作灵活但相对较慢\n• 用途：存储可能变化的数据集合\n\n**🔒 元组 (Tuple)**\n• 可变性：不可变，创建后无法修改\n• 语法：使用圆括号 `(1, 2, 3)`\n• 方法：只支持count()、index()等查询方法\n• 性能：访问速度更快，内存占用更少\n• 用途：存储固定的数据集合，如坐标、配置等\n\n**🎯 选择建议**\n• 需要修改数据 → 使用列表\n• 数据固定不变 → 使用元组\n• 作为字典的键 → 只能使用元组\n• 函数返回多个值 → 通常使用元组\n\n还有什么Python基础知识想了解的吗？',
        timestamp: '09:16',
      },
    ],
  },
  {
    id: 5,
    title: '数据结构与算法',
    preview: '快速排序的时间复杂度是多少？',
    time: '前天 15:30',
    isActive: false,
    messages: [
      {
        id: 1,
        role: 'user',
        content: '快速排序的时间复杂度是多少？',
        timestamp: '15:30',
      },
      {
        id: 2,
        role: 'assistant',
        content:
          '快速排序的时间复杂度分析如下：\n\n**⏱️ 时间复杂度**\n• 最佳情况：O(n log n) - 每次都能选到中位数作为基准\n• 平均情况：O(n log n) - 随机选择基准元素\n• 最坏情况：O(n²) - 每次选到最大或最小值作为基准\n\n**💾 空间复杂度**\n• 最佳/平均：O(log n) - 递归调用栈深度\n• 最坏情况：O(n) - 退化为单边递归\n\n**🎯 算法特点**\n• 原地排序：不需要额外的存储空间\n• 不稳定排序：相等元素的相对位置可能改变\n• 分治思想：将问题分解为子问题\n\n**⚡ 优化策略**\n• 随机选择基准元素避免最坏情况\n• 三数取中法选择基准\n• 小数组使用插入排序\n• 尾递归优化\n\n快速排序因其平均性能优秀而被广泛使用。您想了解具体的实现细节吗？',
        timestamp: '15:31',
      },
    ],
  },
]

const models = [
  {
    id: 'gpt4',
    name: 'GPT-4 Turbo',
    provider: 'OpenAI',
    status: 'online',
    description: '最先进的语言模型',
    speed: '快速',
    icon: '🚀',
  },
  {
    id: 'claude',
    name: 'Claude 3 Opus',
    provider: 'Anthropic',
    status: 'online',
    description: '擅长分析和推理',
    speed: '中等',
    icon: '🧠',
  },
  {
    id: 'gemini',
    name: 'Gemini Pro',
    provider: 'Google',
    status: 'online',
    description: '多模态理解能力',
    speed: '快速',
    icon: '✨',
  },
  {
    id: 'cohere',
    name: 'Command',
    provider: 'Cohere',
    status: 'maintenance',
    description: '企业级语言模型',
    speed: '快速',
    icon: '⚡',
  },
]

export default function ChatPage() {
  const { t } = useI18n()
  const [selectedModel, setSelectedModel] = useState('gpt4')
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeConversationId, setActiveConversationId] = useState(1)
  const [currentMessages, setCurrentMessages] = useState(conversationHistory[0].messages)

  // 聊天区域滚动引用
  const chatMessagesRef = useRef<HTMLDivElement>(null)

  // 自动滚动到底部的函数
  const scrollToBottom = () => {
    if (chatMessagesRef.current) {
      const scrollElement = chatMessagesRef.current
      scrollElement.scrollTo({
        top: scrollElement.scrollHeight,
        behavior: 'smooth',
      })
    }
  }

  // 监听消息变化，自动滚动到底部
  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToBottom()
    }, 100) // 小延迟确保DOM更新完成

    return () => clearTimeout(timer)
  }, [currentMessages])

  // 切换聊天记录
  const handleConversationSwitch = (conversationId: number) => {
    const conversation = conversationHistory.find((c) => c.id === conversationId)
    if (conversation) {
      setActiveConversationId(conversationId)
      setCurrentMessages(conversation.messages)

      // 更新对话历史中的激活状态
      conversationHistory.forEach((c) => {
        c.isActive = c.id === conversationId
      })

      // 延迟滚动，确保新内容已渲染
      setTimeout(() => {
        scrollToBottom()
      }, 200)
    }
  }

  // 切换模型
  const handleModelSwitch = (modelId: string) => {
    const previousModel = models.find((m) => m.id === selectedModel)?.name
    const newModel = models.find((m) => m.id === modelId)?.name

    setSelectedModel(modelId)

    // 如果有活跃对话，添加模型切换提示消息
    if (currentMessages.length > 0) {
      const switchMessage = {
        id: Date.now(),
        role: 'system' as const,
        content: t('chat.modelSwitched', { model: newModel || '' }),
        timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
      }
      setCurrentMessages((prev) => [...prev, switchMessage])

      // 延迟滚动，确保新消息已添加到DOM
      setTimeout(() => {
        scrollToBottom()
      }, 150)
    }
  }

  // 发送消息
  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const userMessage = {
        id: Date.now(),
        role: 'user' as const,
        content: inputMessage.trim(),
        timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
      }

      setCurrentMessages((prev) => [...prev, userMessage])
      setInputMessage('')
      setIsTyping(true)

      // 立即滚动到用户消息
      setTimeout(() => {
        scrollToBottom()
      }, 100)

      // 模拟AI回复
      setTimeout(() => {
        const selectedModelName = models.find((m) => m.id === selectedModel)?.name
        const aiMessage = {
          id: Date.now() + 1,
          role: 'assistant' as const,
          content: `这是来自 ${selectedModelName} 的回复：\n\n感谢您的问题："${userMessage.content}"\n\n我会根据您的需求提供详细的回答。请注意，这是一个演示响应，实际应用中会连接到真实的AI模型API。`,
          timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
        }
        setCurrentMessages((prev) => [...prev, aiMessage])
        setIsTyping(false)

        // 滚动到AI回复
        setTimeout(() => {
          scrollToBottom()
        }, 100)
      }, 2000)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <Header />

      <main className="h-[calc(100vh-68px)]">
        <div className="h-full flex relative">
          {/* Mobile Sidebar Overlay */}
          <AnimatePresence>
            {sidebarOpen && !sidebarCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                onClick={() => setSidebarOpen(false)}
              />
            )}
          </AnimatePresence>

          {/* Sidebar */}
          <motion.aside
            initial={{ x: sidebarCollapsed ? -240 : 0 }}
            animate={{
              x: sidebarOpen ? 0 : sidebarCollapsed ? -240 : -320,
              width: sidebarCollapsed ? 80 : 320,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={`bg-white/90 backdrop-blur-sm border-r border-gray-200/50 h-full flex flex-col fixed lg:relative z-50 lg:z-auto shadow-xl lg:shadow-none overflow-hidden ${
              sidebarCollapsed ? 'w-20' : 'w-80'
            }`}
          >
            {/* Sidebar Header */}
            <div className="p-6 border-b border-gray-200/50 flex-shrink-0">
              <div className="flex items-center justify-between mb-4">
                {!sidebarCollapsed && <h2 className="text-lg font-semibold text-gray-900">{t('chat.title')}</h2>}
                <div className="flex items-center space-x-2">
                  {/* Collapse/Expand Button */}
                  <button
                    onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                    className="hidden lg:flex p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    title={sidebarCollapsed ? t('chat.expandSidebar') : t('chat.collapsesidebar')}
                  >
                    {sidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {!sidebarCollapsed && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <Plus className="w-5 h-5" />
                  <span className="font-medium">{t('chat.newChat')}</span>
                </motion.button>
              )}

              {sidebarCollapsed && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl mx-auto"
                  title={t('chat.newChat')}
                >
                  <Plus className="w-5 h-5" />
                </motion.button>
              )}
            </div>

            {/* Sidebar Content with Scroll */}
            <div className="flex-1 overflow-y-auto">
              {/* Model Selection */}
              <div className="p-6 border-b border-gray-200/50">
                {!sidebarCollapsed && (
                  <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center">
                    <Bot className="w-4 h-4 mr-2" />
                    {t('chat.selectModel')}
                  </h3>
                )}

                <div className="space-y-3">
                  {models.map((model) => {
                    const isActive = selectedModel === model.id
                    return (
                      <motion.div
                        key={model.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleModelSwitch(model.id)}
                        className={`${
                          sidebarCollapsed ? 'p-2' : 'p-3'
                        } rounded-xl cursor-pointer transition-all duration-200 border ${
                          isActive
                            ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 shadow-md'
                            : 'hover:bg-gray-50 border-gray-200'
                        }`}
                        title={sidebarCollapsed ? model.name : undefined}
                      >
                        {sidebarCollapsed ? (
                          <div className="flex items-center justify-center">
                            <span className="text-lg">{model.icon}</span>
                          </div>
                        ) : (
                          <>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <span className="text-lg">{model.icon}</span>
                                <div>
                                  <div className="font-medium text-sm text-gray-900">
                                    {t(`chat.models.${model.id}.name`)}
                                  </div>
                                  <div className="text-xs text-gray-500">{t(`chat.models.${model.id}.provider`)}</div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                  {t(`chat.models.${model.id}.speed`)}
                                </span>
                                <div
                                  className={`w-2 h-2 rounded-full ${
                                    model.status === 'online' ? 'bg-green-400' : 'bg-yellow-400'
                                  }`}
                                ></div>
                              </div>
                            </div>
                            <p className="text-xs text-gray-600 mt-2">{t(`chat.models.${model.id}.description`)}</p>
                          </>
                        )}
                      </motion.div>
                    )
                  })}
                </div>
              </div>

              {/* Chat History */}
              <div className="p-6">
                {!sidebarCollapsed && (
                  <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    {t('chat.chatHistory')}
                  </h3>
                )}

                <div className="space-y-2">
                  {conversationHistory.map((chat, index) => {
                    const isActive = chat.id === activeConversationId
                    return (
                      <motion.div
                        key={chat.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => handleConversationSwitch(chat.id)}
                        className={`${
                          sidebarCollapsed ? 'p-2' : 'p-4'
                        } rounded-xl cursor-pointer transition-all duration-200 group ${
                          isActive
                            ? 'bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 shadow-sm'
                            : 'hover:bg-gray-50 border border-transparent'
                        }`}
                        title={sidebarCollapsed ? chat.title : undefined}
                      >
                        {sidebarCollapsed ? (
                          <div className="flex items-center justify-center">
                            <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-blue-600' : 'bg-gray-400'}`}></div>
                          </div>
                        ) : (
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-sm text-gray-900 truncate">{chat.title}</h4>
                              <p className="text-xs text-gray-500 mt-1 line-clamp-2">{chat.preview}</p>
                              <div className="flex items-center mt-2 text-xs text-gray-400">
                                <Clock className="w-3 h-3 mr-1" />
                                {chat.time}
                              </div>
                            </div>
                            <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-200 rounded">
                              <MoreHorizontal className="w-4 h-4 text-gray-400" />
                            </button>
                          </div>
                        )}
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </div>
          </motion.aside>

          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col min-w-0 h-full">
            {/* Chat Header - Fixed */}
            <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 p-2 lg:p-4 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Menu className="w-5 h-5" />
                  </button>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="font-semibold text-gray-900">{t(`chat.models.${selectedModel}.name`)}</h2>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <p className="text-sm text-gray-500">
                          {t('chat.online')} · {t('chat.responding')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Download className="w-5 h-5 text-gray-600" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Settings className="w-5 h-5 text-gray-600" />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Chat Messages - Scrollable */}
            <div
              ref={chatMessagesRef}
              className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-6 bg-gradient-to-b from-gray-50/50 to-white scroll-smooth"
            >
              <AnimatePresence>
                {currentMessages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-4xl ${message.role === 'user' ? 'order-2' : 'order-1'}`}>
                      <div className="flex items-start space-x-3">
                        {message.role === 'assistant' && (
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <Bot className="w-4 h-4 text-white" />
                          </div>
                        )}
                        {message.role === 'system' && (
                          <div className="w-8 h-8 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <Settings className="w-4 h-4 text-white" />
                          </div>
                        )}
                        <div className="flex-1">
                          <motion.div
                            whileHover={{ scale: 1.01 }}
                            className={`p-4 lg:p-6 rounded-2xl shadow-sm relative ${
                              message.role === 'user'
                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white ml-12'
                                : message.role === 'system'
                                ? 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border border-gray-300'
                                : 'bg-white border border-gray-200/50'
                            }`}
                          >
                            <div className="prose prose-sm max-w-none">
                              <div className="whitespace-pre-wrap leading-relaxed">{message.content}</div>
                            </div>

                            {/* Message Actions */}
                            {message.role === 'assistant' && (
                              <motion.div
                                initial={{ opacity: 0 }}
                                whileHover={{ opacity: 1 }}
                                className="absolute -bottom-2 right-4 flex space-x-1 bg-white rounded-lg shadow-lg border border-gray-200 p-1"
                              >
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                  <Copy className="w-3 h-3 text-gray-400" />
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                  <ThumbsUp className="w-3 h-3 text-gray-400" />
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                  <ThumbsDown className="w-3 h-3 text-gray-400" />
                                </motion.button>
                              </motion.div>
                            )}
                          </motion.div>

                          <div
                            className={`flex items-center mt-3 space-x-2 ${
                              message.role === 'user' ? 'justify-end' : 'justify-start'
                            }`}
                          >
                            <span className="text-xs text-gray-500">{message.timestamp}</span>
                          </div>
                        </div>

                        {message.role === 'user' && (
                          <div className="w-8 h-8 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <User className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing Indicator */}
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: '0.1s' }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: '0.2s' }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Chat Input - Fixed at Bottom */}
            <div className="bg-white/80 backdrop-blur-sm border-t border-gray-200/50 p-2 lg:p-4 flex-shrink-0">
              <div className="max-w-4xl mx-auto">
                <div className="relative">
                  {/* Main Input Area */}
                  <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
                    {/* Input Text Area */}
                    <div className="p-2 lg:p-4">
                      <textarea
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder={t('chat.inputPlaceholder')}
                        className="w-full p-4 border-0 focus:ring-0 resize-none bg-transparent placeholder-gray-400 text-gray-900 text-base leading-relaxed"
                        rows={3}
                        style={{ minHeight: '40px', maxHeight: '60px' }}
                      />
                    </div>

                    {/* Bottom Action Bar */}
                    <div className="border-t border-gray-100 px-2 lg:px-4 py-2 bg-gray-50/50">
                      <div className="flex items-center justify-between">
                        {/* Left Side - Attachment Options */}
                        <div className="flex items-center space-x-1">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-200 text-sm"
                          >
                            <Paperclip className="w-4 h-4" />
                            <span>{t('chat.attachment')}</span>
                          </motion.button>

                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-200 text-sm"
                          >
                            <Image className="w-4 h-4" />
                            <span>{t('chat.image')}</span>
                          </motion.button>

                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-200 text-sm"
                          >
                            <Mic className="w-4 h-4" />
                            <span>{t('chat.voice')}</span>
                          </motion.button>
                        </div>

                        {/* Center - Input Tips */}
                        <div className="hidden sm:flex items-center space-x-4 text-xs text-gray-500">
                          <span>{t('chat.shiftEnter')}</span>
                          <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                          <span>{t('chat.enterSend')}</span>
                        </div>

                        {/* Right Side - Send Button and Status */}
                        <div className="flex items-center space-x-3">
                          <div className="hidden sm:flex items-center space-x-2 text-xs">
                            <div className="flex items-center space-x-1 text-green-600">
                              <Zap className="w-3 h-3" />
                              <span>{t('chat.aiReady')}</span>
                            </div>
                          </div>

                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleSendMessage}
                            disabled={!inputMessage.trim()}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg flex items-center space-x-2 font-medium"
                          >
                            <Send className="w-4 h-4" />
                            <span>{t('chat.send')}</span>
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Tips */}
                  <div className="sm:hidden mt-2 text-xs text-gray-500 text-center">
                    {t('chat.shiftEnter')} • {t('chat.enterSend')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
