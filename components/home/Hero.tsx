'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Sparkles, Zap, Globe, Users, ArrowRight, Play, CheckCircle } from 'lucide-react'
import { useI18n } from '@/lib/i18n/context'
import { theme, cn } from '@/lib/theme/config'
import { Button, Badge, Container } from '@/components/ui'

export default function Hero() {
  const { t } = useI18n()
  const [typedText, setTypedText] = useState('')
  const fullText = t('hero.title')

  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1))
        i++
      } else {
        clearInterval(timer)
      }
    }, 100)

    return () => clearInterval(timer)
  }, [fullText])

  const features = [
    t('hero.features.multiModel'),
    t('hero.features.serviceProviders'),
    t('hero.features.multiModal'),
    t('hero.features.realTimeChat'),
  ]

  const stats = [
    { label: t('hero.stats.activeUsers'), value: '10,000+', icon: Users },
    { label: t('hero.stats.apiCalls'), value: '1M+', icon: Zap },
    { label: t('hero.stats.supportedModels'), value: '15+', icon: Globe },
  ]

  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      {/* Background Elements */}
      <div className={cn('absolute inset-0', `bg-gradient-to-br ${theme.gradients.hero}`)} />
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-full max-w-6xl">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000" />
      </div>

      <Container size="lg" className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center mb-6"
            >
              <Badge variant="primary" className="text-sm font-medium">
                <Sparkles className="w-4 h-4 mr-2" />
                {t('hero.badge')}
              </Badge>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              <span className={cn('bg-clip-text text-transparent', `bg-gradient-to-r ${theme.gradients.primary}`)}>
                {typedText}
              </span>
              <span className="animate-pulse">|</span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">{t('hero.subtitle')}</p>

            {/* Features List */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center space-x-2"
                >
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link href="/auth/register">
                <Button
                  variant="primary"
                  size="xl"
                  rightIcon={<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                  className="group shadow-lg hover:shadow-xl"
                >
                  {t('hero.startFree')}
                </Button>
              </Link>

              <Link href="/demo">
                <Button
                  variant="outline"
                  size="xl"
                  leftIcon={<Play className="w-5 h-5 group-hover:scale-110 transition-transform" />}
                  className="group"
                >
                  {t('hero.watchDemo')}
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Content - Stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative z-10"
          >
            <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">{t('hero.platformData')}</h3>
              <div className="space-y-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-white/50 rounded-xl"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={cn('p-2', theme.borderRadius.lg, `bg-gradient-to-r ${theme.gradients.primary}`)}>
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-gray-700 font-medium">{stat.label}</span>
                    </div>
                    <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-100 rounded-full opacity-60 animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-purple-100 rounded-full opacity-60 animate-pulse delay-1000"></div>
          </motion.div>
        </div>
      </Container>

      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-200 rounded-full opacity-10 blur-3xl"></div>
    </section>
  )
}
