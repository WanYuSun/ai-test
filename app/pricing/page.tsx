'use client'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { useI18n } from '@/lib/i18n/context'
import { Check, X, Star, Crown, Zap, ChevronDown } from 'lucide-react'
import { useState } from 'react'

export default function PricingPage() {
  const { t, locale } = useI18n()
  const [isAnnual, setIsAnnual] = useState(false)
  const [openFaqId, setOpenFaqId] = useState<number | null>(null)

  const planFeatures = {
    free: [
      locale === 'zh' ? '每日20次GPT-3.5对话' : '20 daily GPT-3.5 conversations',
      locale === 'zh' ? '每日5次图像生成' : '5 daily image generations',
      locale === 'zh' ? '基础模型访问' : 'Basic model access',
      locale === 'zh' ? '社区支持' : 'Community support',
      locale === 'zh' ? '标准响应速度' : 'Standard response speed',
    ],
    pro: [
      locale === 'zh' ? '无限制GPT-4 Turbo对话' : 'Unlimited GPT-4 Turbo conversations',
      locale === 'zh' ? '无限制Claude 3访问' : 'Unlimited Claude 3 access',
      locale === 'zh' ? '每日100次图像生成' : '100 daily image generations',
      locale === 'zh' ? '所有模型访问权限' : 'All model access',
      locale === 'zh' ? '优先响应速度' : 'Priority response speed',
      locale === 'zh' ? '邮件支持' : 'Email support',
      locale === 'zh' ? 'API访问权限' : 'API access',
      locale === 'zh' ? '数据导出功能' : 'Data export',
    ],
    team: [
      locale === 'zh' ? '专业版所有功能' : 'All Pro features',
      locale === 'zh' ? '支持10个团队成员' : 'Support for 10 team members',
      locale === 'zh' ? '团队工作空间' : 'Team workspace',
      locale === 'zh' ? '共享对话历史' : 'Shared conversation history',
      locale === 'zh' ? '团队使用统计' : 'Team usage analytics',
      locale === 'zh' ? '优先技术支持' : 'Priority technical support',
      locale === 'zh' ? '自定义集成' : 'Custom integrations',
      locale === 'zh' ? '高级分析报告' : 'Advanced analytics',
    ],
    enterprise: [
      locale === 'zh' ? '团队版所有功能' : 'All Team features',
      locale === 'zh' ? '无限团队成员' : 'Unlimited team members',
      locale === 'zh' ? '专属客户经理' : 'Dedicated account manager',
      locale === 'zh' ? 'SLA保障' : 'SLA guarantee',
      locale === 'zh' ? '私有部署选项' : 'Private deployment options',
      locale === 'zh' ? '高级安全控制' : 'Advanced security controls',
      locale === 'zh' ? '定制化开发' : 'Custom development',
      locale === 'zh' ? '24/7技术支持' : '24/7 technical support',
    ],
  }

  const planLimitations = {
    free: [
      locale === 'zh' ? '不支持GPT-4' : 'No GPT-4 access',
      locale === 'zh' ? '不支持Claude 3' : 'No Claude 3 access',
      locale === 'zh' ? '无优先支持' : 'No priority support',
      locale === 'zh' ? '有使用限制' : 'Usage limitations',
    ],
  }

  const faqItems = [
    {
      question: locale === 'zh' ? '可以随时取消订阅吗？' : 'Can I cancel my subscription anytime?',
      answer:
        locale === 'zh'
          ? '是的，您可以随时取消订阅。取消后您仍可使用服务直到当前计费周期结束。'
          : "Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your current billing period.",
    },
    {
      question: locale === 'zh' ? '是否支持按年付费？' : 'Do you offer annual billing?',
      answer:
        locale === 'zh'
          ? '支持。按年付费可享受相当于2个月免费的优惠。'
          : 'Yes, annual billing is available with equivalent to 2 months free discount.',
    },
    {
      question: locale === 'zh' ? '如何升级或降级套餐？' : 'How do I upgrade or downgrade my plan?',
      answer:
        locale === 'zh'
          ? '您可以在账户设置中随时更改套餐。升级立即生效，降级在下个计费周期生效。'
          : 'You can change your plan anytime in account settings. Upgrades take effect immediately, downgrades take effect at next billing cycle.',
    },
  ]

  const plans = [
    {
      id: 'free',
      popular: false,
      icon: <Star className="w-6 h-6" />,
    },
    {
      id: 'pro',
      popular: true,
      icon: <Crown className="w-6 h-6" />,
    },
    {
      id: 'team',
      popular: false,
      icon: <Zap className="w-6 h-6" />,
    },
    {
      id: 'enterprise',
      popular: false,
      icon: <Crown className="w-6 h-6" />,
    },
  ]

  const toggleFaq = (id: number) => {
    setOpenFaqId(openFaqId === id ? null : id)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">{t('pricing.title')}</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">{t('pricing.subtitle')}</p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center space-x-4 mb-12">
              <span className={`text-sm font-medium ${!isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
                {t('pricing.monthly')}
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <span
                  className={`${
                    isAnnual ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                />
              </button>
              <span className={`text-sm font-medium ${isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
                {t('pricing.annually')}
              </span>
              {isAnnual && (
                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {t('pricing.savePercent', { percent: '17' })}
                </span>
              )}
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="pb-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative bg-white rounded-2xl shadow-sm border-2 p-8 ${
                    plan.popular ? 'border-blue-500 shadow-blue-100' : 'border-gray-200 hover:border-gray-300'
                  } transition-all duration-200`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                        {t('pricing.popular')}
                      </span>
                    </div>
                  )}

                  <div className="text-center">
                    <div className="flex justify-center mb-4">
                      <div
                        className={`p-3 rounded-full ${
                          plan.popular ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {plan.icon}
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{t(`pricing.plans.${plan.id}.name`)}</h3>

                    <div className="mb-4">
                      <span className="text-4xl font-bold text-gray-900">
                        {plan.id === 'enterprise'
                          ? t(`pricing.plans.${plan.id}.price`)
                          : `$${t(`pricing.plans.${plan.id}.price`)}`}
                      </span>
                      <span className="text-gray-500 ml-1">
                        {plan.id === 'enterprise'
                          ? ''
                          : isAnnual
                          ? '/year'
                          : `/${t(`pricing.plans.${plan.id}.period`)}`}
                      </span>
                    </div>

                    <p className="text-gray-600 text-sm mb-6">{t(`pricing.plans.${plan.id}.description`)}</p>

                    <button
                      className={`w-full py-3 px-6 rounded-xl font-medium transition-colors ${
                        plan.popular
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                          : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                      }`}
                    >
                      {plan.id === 'enterprise' ? t('pricing.contactUs') : t('pricing.getStarted')}
                    </button>
                  </div>

                  <div className="mt-8">
                    <h4 className="text-sm font-semibold text-gray-900 mb-4">{t('models.features')}</h4>
                    <ul className="space-y-3">
                      {planFeatures[plan.id as keyof typeof planFeatures]?.map((feature: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {plan.id === 'free' && (
                      <div className="mt-6">
                        <h5 className="text-sm font-semibold text-gray-900 mb-3">
                          {locale === 'zh' ? '限制' : 'Limitations'}
                        </h5>
                        <ul className="space-y-2">
                          {planLimitations.free?.map((limitation: string, index: number) => (
                            <li key={index} className="flex items-start">
                              <X className="w-4 h-4 text-red-400 mr-3 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-500">{limitation}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('pricing.faq.title')}</h2>
            </div>

            <div className="space-y-4">
              {faqItems?.map((item: any, index: number) => (
                <div key={index} className="bg-white rounded-lg border border-gray-200">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-gray-900">{item.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-500 transition-transform ${
                        openFaqId === index ? 'transform rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openFaqId === index && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-600">{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {locale === 'zh' ? '开始您的AI之旅' : 'Start Your AI Journey'}
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              {locale === 'zh'
                ? '立即注册免费账户，体验强大的AI服务'
                : 'Register for a free account now and experience powerful AI services'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg">
                {locale === 'zh' ? '免费开始' : 'Get Started Free'}
              </button>
              <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                {locale === 'zh' ? '联系销售' : 'Contact Sales'}
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
