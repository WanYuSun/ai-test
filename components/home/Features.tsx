'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
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
import { useI18n } from '@/lib/i18n/context'
import { theme, cn } from '@/lib/theme/config'
import { Button, Container, Section } from '@/components/ui'

export default function Features() {
  const { t } = useI18n()

  const features = [
    {
      icon: Brain,
      title: t('features.multiModel.title'),
      description: t('features.multiModel.desc'),
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Zap,
      title: t('features.fastResponse.title'),
      description: t('features.fastResponse.desc'),
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Shield,
      title: t('features.secure.title'),
      description: t('features.secure.desc'),
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Code2,
      title: t('features.unifiedApi.title'),
      description: t('features.unifiedApi.desc'),
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: Palette,
      title: t('features.multiModal.title'),
      description: t('features.multiModal.desc'),
      color: 'from-indigo-500 to-purple-500',
    },
    {
      icon: MessageSquare,
      title: t('features.smartChat.title'),
      description: t('features.smartChat.desc'),
      color: 'from-teal-500 to-cyan-500',
    },
  ]

  const highlights = [
    {
      icon: Mic,
      title: t('features.highlights.voiceRecognition.title'),
      description: t('features.highlights.voiceRecognition.desc'),
    },
    {
      icon: ImageIcon,
      title: t('features.highlights.imageGeneration.title'),
      description: t('features.highlights.imageGeneration.desc'),
    },
    {
      icon: Globe,
      title: t('features.highlights.globalDeployment.title'),
      description: t('features.highlights.globalDeployment.desc'),
    },
    {
      icon: BarChart3,
      title: t('features.highlights.dataAnalysis.title'),
      description: t('features.highlights.dataAnalysis.desc'),
    },
    {
      icon: Users,
      title: t('features.highlights.teamCollaboration.title'),
      description: t('features.highlights.teamCollaboration.desc'),
    },
    {
      icon: Lock,
      title: t('features.highlights.privacyProtection.title'),
      description: t('features.highlights.privacyProtection.desc'),
    },
  ]

  return (
    <Section background="white">
      <Container size="lg">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            <span className={cn('bg-clip-text text-transparent', `bg-gradient-to-r ${theme.gradients.primary}`)}>
              {t('features.oneStopTitle')}
            </span>
            {t('features.aiCapabilities')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{t('features.description')}</p>
        </motion.div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                'p-6 bg-white border border-gray-200 hover:border-gray-300',
                theme.borderRadius.xl,
                theme.shadows.card,
                theme.animations.transition
              )}
            >
              <div
                className={cn(
                  'w-12 h-12 mb-4 flex items-center justify-center',
                  theme.borderRadius.lg,
                  `bg-gradient-to-r ${feature.color}`
                )}
              >
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Highlights Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className={cn('p-8', theme.borderRadius['2xl'], `bg-gradient-to-r ${theme.gradients.hero}`)}>
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('features.moreFeatures')}</h3>
              <p className="text-gray-600 max-w-2xl mx-auto">{t('features.moreFeaturesDescription')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={highlight.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={cn(
                    'p-6 bg-white/80 backdrop-blur-sm border border-white/20',
                    theme.borderRadius.xl,
                    theme.shadows.md
                  )}
                >
                  <highlight.icon className="w-8 h-8 text-blue-600 mb-3" />
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{highlight.title}</h4>
                  <p className="text-gray-600 text-sm">{highlight.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className={cn('p-8', theme.borderRadius['2xl'], 'bg-gradient-to-r from-blue-50 to-purple-50')}>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('features.readyToExperience')}</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">{t('features.freeTrialDescription')}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/register">
                <Button variant="primary" size="lg">
                  {t('hero.startFree')}
                </Button>
              </Link>
              <Link href="/api-management">
                <Button variant="outline" size="lg">
                  {t('features.checkApiDocs')}
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}
