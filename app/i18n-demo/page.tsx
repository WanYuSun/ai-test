'use client'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { useI18n } from '@/lib/i18n/context'
import { motion } from 'framer-motion'
import { Globe, Languages, CheckCircle, ArrowRight } from 'lucide-react'

export default function I18nDemoPage() {
  const { t, locale } = useI18n()

  const features = [
    {
      icon: <Globe className="w-8 h-8 text-blue-600" />,
      titleKey: 'demo.features.multiLanguage.title',
      descKey: 'demo.features.multiLanguage.desc',
    },
    {
      icon: <Languages className="w-8 h-8 text-green-600" />,
      titleKey: 'demo.features.easySwitch.title',
      descKey: 'demo.features.easySwitch.desc',
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-purple-600" />,
      titleKey: 'demo.features.persistent.title',
      descKey: 'demo.features.persistent.desc',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <Header />

      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Hero Section */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Globe className="w-4 h-4" />
              <span>{t('demo.badge')}</span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">{t('demo.title')}</h1>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">{t('demo.subtitle')}</p>

            <div className="flex items-center justify-center space-x-4">
              <div className="bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
                <span className="text-sm text-gray-500">{t('demo.currentLang')}: </span>
                <span className="font-semibold text-gray-900">{locale === 'zh' ? '中文' : 'English'}</span>
              </div>
            </div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{t(feature.titleKey)}</h3>
                <p className="text-gray-600">{t(feature.descKey)}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Demo Examples */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">{t('demo.examples.title')}</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Navigation Examples */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('demo.examples.navigation')}</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">{t('common.home')}</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">{t('common.chat')}</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">{t('common.models')}</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Chat Examples */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('demo.examples.chatInterface')}</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">{t('chat.newChat')}</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">{t('chat.selectModel')}</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">{t('chat.send')}</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-center mt-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('demo.cta.title')}</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">{t('demo.cta.subtitle')}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/chat"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg"
              >
                {t('demo.cta.tryChat')}
              </motion.a>
              <motion.a
                href="/models"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-gray-300 text-gray-700 px-8 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                {t('demo.cta.exploreModels')}
              </motion.a>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
