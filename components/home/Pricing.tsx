'use client'

import { motion } from 'framer-motion'
import { Check, Star, Zap, Crown, Shield } from 'lucide-react'

export default function Pricing() {
  const plans = [
    {
      name: '免费版',
      price: '0',
      period: '永久免费',
      description: '适合个人开发者体验',
      icon: Star,
      color: 'from-gray-500 to-gray-600',
      popular: false,
      credits: 100,
      features: ['100 积分/月', '基础AI模型访问', '社区支持', '标准API限制', '基础使用统计'],
      limitations: ['不支持高级模型', '响应速度较慢', '无优先支持'],
    },
    {
      name: '基础版',
      price: '29',
      period: '月',
      description: '适合小团队和初创公司',
      icon: Zap,
      color: 'from-blue-500 to-blue-600',
      popular: true,
      credits: 1000,
      features: [
        '1,000 积分/月',
        '所有AI模型访问',
        '优先响应速度',
        '邮件支持',
        '详细使用统计',
        'API密钥管理',
        '基础集成文档',
      ],
      limitations: [],
    },
    {
      name: '专业版',
      price: '99',
      period: '月',
      description: '适合成长中的企业',
      icon: Crown,
      color: 'from-purple-500 to-purple-600',
      popular: false,
      credits: 5000,
      features: [
        '5,000 积分/月',
        '所有AI模型访问',
        '最高优先级响应',
        '24/7 技术支持',
        '高级数据分析',
        '团队协作功能',
        '自定义集成',
        '白标解决方案',
      ],
      limitations: [],
    },
    {
      name: '企业版',
      price: '299',
      period: '月',
      description: '适合大型企业和机构',
      icon: Shield,
      color: 'from-emerald-500 to-emerald-600',
      popular: false,
      credits: 20000,
      features: [
        '20,000 积分/月',
        '所有AI模型访问',
        '专属服务器',
        '专属客户经理',
        '企业级安全',
        'SLA保障',
        'SSO单点登录',
        '私有部署选项',
        '定制开发服务',
      ],
      limitations: [],
    },
  ]

  const paymentMethods = [
    {
      name: 'Visa',
      icon: '/api/placeholder/32/24',
      supported: true,
    },
    {
      name: 'MasterCard',
      icon: '/api/placeholder/32/24',
      supported: true,
    },
    {
      name: 'USDT',
      icon: '/api/placeholder/32/24',
      supported: true,
    },
    {
      name: 'PayPal',
      icon: '/api/placeholder/32/24',
      supported: false,
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
            选择适合您的{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">定价方案</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            灵活的积分制收费，按需使用，无隐藏费用。支持多种支付方式，随时升级或降级。
          </p>
        </motion.div>

        {/* 定价卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative bg-white rounded-2xl border-2 p-8 ${
                plan.popular ? 'border-blue-500 shadow-xl scale-105' : 'border-gray-200 hover:border-gray-300'
              } transition-all duration-300`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    最受欢迎
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <div className={`inline-flex p-3 rounded-full bg-gradient-to-r ${plan.color} mb-4`}>
                  <plan.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-gray-900">¥{plan.price}</span>
                  <span className="text-gray-500 ml-1">/{plan.period}</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">{plan.credits} 积分</p>
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
                {plan.limitations.map((limitation) => (
                  <div key={limitation} className="flex items-center space-x-3 opacity-50">
                    <div className="w-5 h-5 border border-gray-300 rounded flex-shrink-0" />
                    <span className="text-gray-500 line-through">{limitation}</span>
                  </div>
                ))}
              </div>

              <button
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {plan.price === '0' ? '立即开始' : '选择方案'}
              </button>
            </motion.div>
          ))}
        </div>

        {/* 支付方式 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6">支持的支付方式</h3>
          <div className="flex flex-wrap justify-center items-center gap-4 mb-6">
            {paymentMethods.map((method) => (
              <div
                key={method.name}
                className={`relative flex items-center justify-center p-4 rounded-xl border-2 transition-all duration-300 ${
                  method.supported
                    ? 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'
                    : 'border-gray-100 bg-gray-50 opacity-40'
                }`}
              >
                <div className="flex flex-col items-center space-y-2">
                  <div
                    className={`w-12 h-8 rounded-md flex items-center justify-center font-bold text-sm ${
                      method.name === 'Visa'
                        ? 'bg-blue-600 text-white'
                        : method.name === 'MasterCard'
                        ? 'bg-red-500 text-white'
                        : method.name === 'USDT'
                        ? 'bg-green-500 text-white'
                        : 'bg-blue-800 text-white'
                    }`}
                  >
                    {method.name === 'Visa'
                      ? 'VISA'
                      : method.name === 'MasterCard'
                      ? 'MC'
                      : method.name === 'USDT'
                      ? 'USDT'
                      : 'PP'}
                  </div>
                  <span className="text-xs font-medium text-gray-700">{method.name}</span>
                </div>
                {method.supported && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
                {!method.supported && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-medium text-gray-400 bg-white px-2 py-1 rounded-full border">
                      即将上线
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center space-y-2">
            <p className="text-gray-500">安全可靠的支付保障</p>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>SSL加密</span>
              </span>
              <span className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>PCI DSS认证</span>
              </span>
              <span className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>即时到账</span>
              </span>
            </div>
          </div>
        </motion.div>

        {/* FAQ 简单版本 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 bg-gray-50 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">常见问题</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">什么是积分制？</h4>
              <p className="text-gray-600">积分是我们的计费单位，不同AI模型消耗不同积分。您可以随时查看消费明细。</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">可以随时取消吗？</h4>
              <p className="text-gray-600">是的，您可以随时取消订阅，未使用的积分会保留到下个周期。</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">企业版有什么优势？</h4>
              <p className="text-gray-600">企业版提供专属服务器、SLA保障、私有部署等企业级功能。</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">支持发票吗？</h4>
              <p className="text-gray-600">支持，我们可以为企业用户提供正规发票和合同签署。</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
