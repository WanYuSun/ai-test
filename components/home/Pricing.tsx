'use client'

import { motion } from 'framer-motion'
import { Check, Star, Zap, Crown, Shield } from 'lucide-react'
import Link from 'next/link'
import { useI18n } from '@/lib/i18n/context'
import { theme, cn } from '@/lib/theme/config'
import { Button, Badge, Container, Section } from '@/components/ui'

export default function Pricing() {
  const { t, tArray } = useI18n()

  const plans = [
    {
      name: t('pricing.plans.free.name'),
      price: '0',
      period: t('pricing.plans.free.period'),
      description: t('pricing.plans.free.description'),
      icon: Star,
      color: 'from-gray-500 to-gray-600',
      popular: false,
      credits: 100,
      features: tArray('pricing.plans.free.features'),
      limitations: tArray('pricing.plans.free.limitations'),
    },
    {
      name: t('pricing.plans.basic.name'),
      price: '29',
      period: t('pricing.plans.basic.period'),
      description: t('pricing.plans.basic.description'),
      icon: Zap,
      color: 'from-blue-500 to-blue-600',
      popular: true,
      credits: 1000,
      features: tArray('pricing.plans.basic.features'),
      limitations: [],
    },
    {
      name: t('pricing.plans.pro.name'),
      price: '99',
      period: t('pricing.plans.pro.period'),
      description: t('pricing.plans.pro.description'),
      icon: Crown,
      color: 'from-purple-500 to-purple-600',
      popular: false,
      credits: 5000,
      features: tArray('pricing.plans.pro.features'),
      limitations: [],
    },
    {
      name: t('pricing.plans.enterprise.name'),
      price: '299',
      period: t('pricing.plans.enterprise.period'),
      description: t('pricing.plans.enterprise.description'),
      icon: Shield,
      color: 'from-emerald-500 to-emerald-600',
      popular: false,
      credits: 20000,
      features: tArray('pricing.plans.enterprise.features'),
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
            {t('pricing.title')}{' '}
            <span className={cn('bg-clip-text text-transparent', `bg-gradient-to-r ${theme.gradients.primary}`)}>
              {t('pricing.highlight')}
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('pricing.subtitle')}</p>
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
                  <Badge variant="primary" className={cn('text-white', `bg-gradient-to-r ${theme.gradients.primary}`)}>
                    {t('pricing.popular')}
                  </Badge>
                </div>
              )}

              <div className="text-center mb-8">
                <div className={cn('inline-flex p-3 mb-4', theme.borderRadius.full, `bg-gradient-to-r ${plan.color}`)}>
                  <plan.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-gray-900">¥{plan.price}</span>
                  {plan.price !== '0' && <span className="text-gray-600">/{plan.period}</span>}
                </div>
                <p className="text-sm text-gray-500">
                  {t('pricing.includes')} {plan.credits} {t('pricing.credits')}
                </p>
              </div>

              <div className="space-y-4 mb-8">
                {Array.isArray(plan.features) &&
                  plan.features.map((feature) => (
                    <div key={feature} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                {Array.isArray(plan.limitations) &&
                  plan.limitations.map((limitation) => (
                    <div key={limitation} className="flex items-center space-x-3 opacity-50">
                      <div className="w-5 h-5 border border-gray-300 rounded flex-shrink-0" />
                      <span className="text-gray-500 line-through">{limitation}</span>
                    </div>
                  ))}
              </div>

              <Link href={plan.price === '0' ? '/auth/register' : '/auth/register'}>
                <Button
                  variant={plan.popular ? 'primary' : 'secondary'}
                  size="lg"
                  className={cn('w-full', plan.popular && 'shadow-lg')}
                >
                  {plan.price === '0' ? t('common.startNow') : t('common.selectPlan')}
                </Button>
              </Link>
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
          <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('pricing.paymentMethods')}</h3>
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
                      {t('common.comingSoon')}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center space-y-2">
            <p className="text-gray-500">{t('pricing.paymentSecurity')}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>{t('pricing.paymentFeatures.sslEncryption')}</span>
              </span>
              <span className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>{t('pricing.paymentFeatures.pciCompliant')}</span>
              </span>
              <span className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>{t('pricing.paymentFeatures.instantArrival')}</span>
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
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">{t('pricing.faq.title')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">{t('pricing.faq.whatIsCredits.title')}</h4>
              <p className="text-gray-600">{t('pricing.faq.whatIsCredits.answer')}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">{t('pricing.faq.canCancel.title')}</h4>
              <p className="text-gray-600">{t('pricing.faq.canCancel.answer')}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">{t('pricing.faq.enterpriseAdvantages.title')}</h4>
              <p className="text-gray-600">{t('pricing.faq.enterpriseAdvantages.answer')}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">{t('pricing.faq.supportInvoice.title')}</h4>
              <p className="text-gray-600">{t('pricing.faq.supportInvoice.answer')}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
