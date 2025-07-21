'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { useI18n } from '@/lib/i18n/context'
import {
  User,
  Mail,
  Phone,
  Shield,
  Key,
  CreditCard,
  Bell,
  Settings,
  Edit3,
  Save,
  X,
  Check,
  AlertTriangle,
  Crown,
  Calendar,
  Activity,
  Coins,
  TrendingUp,
  Eye,
  Receipt,
} from 'lucide-react'
import Link from 'next/link'

interface UserProfile {
  id: string
  name: string
  email: string
  phone: string
  avatar: string
  joinDate: string
  plan: 'free' | 'pro' | 'team' | 'enterprise'
  usage: {
    tokens: number
    maxTokens: number
    apiCalls: number
    maxApiCalls: number
  }
  credits: {
    balance: number
    totalEarned: number
    totalSpent: number
    monthlyUsage: number
  }
}

interface SecuritySettings {
  twoFactorEnabled: boolean
  lastPasswordChange: string
  loginNotifications: boolean
  apiKeyCount: number
}

export default function AccountSearchComponent() {
  const { t, locale } = useI18n()
  const searchParams = useSearchParams()
  const tabParam = searchParams.get('tab')

  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'billing' | 'notifications'>('profile')
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // 根据URL参数设置初始标签页
  useEffect(() => {
    if (tabParam && ['profile', 'security', 'billing', 'notifications'].includes(tabParam)) {
      setActiveTab(tabParam as 'profile' | 'security' | 'billing' | 'notifications')
    }
  }, [tabParam])

  // 模拟用户数据
  const [userProfile, setUserProfile] = useState<UserProfile>({
    id: '1',
    name: locale === 'zh' ? '张三' : 'John Doe',
    email: 'user@example.com',
    phone: '+86 138 0013 8000',
    avatar: '/api/placeholder/100/100',
    joinDate: '2023-06-15',
    plan: 'pro',
    usage: {
      tokens: 75000,
      maxTokens: 100000,
      apiCalls: 1250,
      maxApiCalls: 2000,
    },
    credits: {
      balance: 1250,
      totalEarned: 5000,
      totalSpent: 3750,
      monthlyUsage: 380,
    },
  })

  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    twoFactorEnabled: false,
    lastPasswordChange: '2024-01-01',
    loginNotifications: true,
    apiKeyCount: 3,
  })

  const [editForm, setEditForm] = useState({
    name: userProfile.name,
    email: userProfile.email,
    phone: userProfile.phone,
  })

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    securityAlerts: true,
    productUpdates: true,
    usageAlerts: true,
  })

  // 处理保存用户信息
  const handleSaveProfile = async () => {
    setIsSaving(true)
    // 模拟API调用
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setUserProfile((prev) => ({
      ...prev,
      name: editForm.name,
      email: editForm.email,
      phone: editForm.phone,
    }))

    setIsSaving(false)
    setIsEditing(false)
  }

  // 处理取消编辑
  const handleCancelEdit = () => {
    setEditForm({
      name: userProfile.name,
      email: userProfile.email,
      phone: userProfile.phone,
    })
    setIsEditing(false)
  }

  // 获取套餐信息
  const getPlanInfo = (plan: string) => {
    const plans = {
      free: { name: t('pricing.plans.free.name'), color: 'text-gray-600', bgColor: 'bg-gray-100' },
      pro: { name: t('pricing.plans.pro.name'), color: 'text-blue-600', bgColor: 'bg-blue-100' },
      team: { name: t('pricing.plans.team.name'), color: 'text-purple-600', bgColor: 'bg-purple-100' },
      enterprise: { name: t('pricing.plans.enterprise.name'), color: 'text-green-600', bgColor: 'bg-green-100' },
    }
    return plans[plan as keyof typeof plans] || plans.free
  }

  const tabs = [
    { id: 'profile', name: t('account.profile'), icon: User },
    { id: 'security', name: t('account.security'), icon: Shield },
    { id: 'billing', name: t('account.billing'), icon: CreditCard },
    { id: 'notifications', name: t('account.notifications'), icon: Bell },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />

      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* 页面标题 */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('account.title')}</h1>
            <p className="text-gray-600">{t('account.subtitle')}</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* 侧边导航 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-1"
            >
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {/* 用户头像区域 */}
                <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                      <User className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{userProfile.name}</h3>
                      <div
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          getPlanInfo(userProfile.plan).bgColor
                        } ${getPlanInfo(userProfile.plan).color}`}
                      >
                        {getPlanInfo(userProfile.plan).name}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 导航菜单 */}
                <nav className="p-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <tab.icon className="w-5 h-5" />
                      <span className="font-medium">{tab.name}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </motion.div>

            {/* 主要内容区域 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-3"
            >
              {/* 个人信息标签页 */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  {/* 基本信息 */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold text-gray-900">{t('account.basicInfo')}</h2>
                      {!isEditing ? (
                        <button
                          onClick={() => setIsEditing(true)}
                          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
                        >
                          <Edit3 className="w-4 h-4" />
                          <span>{t('common.edit')}</span>
                        </button>
                      ) : (
                        <div className="flex space-x-2">
                          <button
                            onClick={handleSaveProfile}
                            disabled={isSaving}
                            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                          >
                            <Save className="w-4 h-4" />
                            <span>{isSaving ? t('common.saving') : t('common.save')}</span>
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="flex items-center space-x-2 text-gray-600 hover:text-gray-700 transition-colors"
                          >
                            <X className="w-4 h-4" />
                            <span>{t('common.cancel')}</span>
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('account.name')}</label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={editForm.name}
                            onChange={(e) => setEditForm((prev) => ({ ...prev, name: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        ) : (
                          <p className="text-gray-900">{userProfile.name}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('account.email')}</label>
                        {isEditing ? (
                          <input
                            type="email"
                            value={editForm.email}
                            onChange={(e) => setEditForm((prev) => ({ ...prev, email: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        ) : (
                          <p className="text-gray-900">{userProfile.email}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('account.phone')}</label>
                        {isEditing ? (
                          <input
                            type="tel"
                            value={editForm.phone}
                            onChange={(e) => setEditForm((prev) => ({ ...prev, phone: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        ) : (
                          <p className="text-gray-900">{userProfile.phone}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('account.joinDate')}</label>
                        <p className="text-gray-900">{userProfile.joinDate}</p>
                      </div>
                    </div>
                  </div>

                  {/* 积分信息 */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold text-gray-900">{t('account.credits.title')}</h2>
                      <Link
                        href="/credits"
                        className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        <span>{t('account.credits.viewDetails')}</span>
                      </Link>
                    </div>

                    {/* 积分概览 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                      <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl p-4 text-white">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm opacity-90">{t('account.credits.current')}</p>
                            <p className="text-2xl font-bold">{userProfile.credits.balance.toLocaleString()}</p>
                          </div>
                          <Coins className="w-8 h-8 opacity-80" />
                        </div>
                      </div>

                      <div className="text-center p-4 bg-gray-50 rounded-xl">
                        <Coins className="w-8 h-8 text-green-600 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">{t('account.credits.totalEarned')}</p>
                        <p className="font-semibold text-gray-900">
                          {userProfile.credits.totalEarned.toLocaleString()}
                        </p>
                      </div>

                      <div className="text-center p-4 bg-gray-50 rounded-xl">
                        <TrendingUp className="w-8 h-8 text-red-600 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">{t('account.credits.totalSpent')}</p>
                        <p className="font-semibold text-gray-900">{userProfile.credits.totalSpent.toLocaleString()}</p>
                      </div>

                      <div className="text-center p-4 bg-gray-50 rounded-xl">
                        <Activity className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">{t('account.credits.monthlyUsage')}</p>
                        <p className="font-semibold text-gray-900">
                          {userProfile.credits.monthlyUsage.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {/* 积分获取方式 */}
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-3">{t('account.credits.howToEarn')}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-sm text-gray-700">{t('account.credits.dailyCheckin')}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-sm text-gray-700">{t('account.credits.referral')}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-sm text-gray-700">{t('account.credits.purchase')}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-sm text-gray-700">{t('account.credits.activity')}</span>
                        </div>
                      </div>
                    </div>

                    {/* 积分使用说明 */}
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">
                        {locale === 'zh' ? '积分使用说明' : 'Credit Usage Rules'}
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• {t('account.credits.usage.rule1')}</li>
                        <li>• {t('account.credits.usage.rule2')}</li>
                        <li>• {t('account.credits.usage.rule3')}</li>
                        <li>• {t('account.credits.usage.rule4')}</li>
                      </ul>
                    </div>
                  </div>

                  {/* 使用情况 */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">{t('account.usage')}</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">{t('account.tokens')}</span>
                          <span className="text-sm text-gray-500">
                            {userProfile.usage.tokens.toLocaleString()} / {userProfile.usage.maxTokens.toLocaleString()}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${(userProfile.usage.tokens / userProfile.usage.maxTokens) * 100}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">{t('account.apiCalls')}</span>
                          <span className="text-sm text-gray-500">
                            {userProfile.usage.apiCalls} / {userProfile.usage.maxApiCalls}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: `${(userProfile.usage.apiCalls / userProfile.usage.maxApiCalls) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 安全设置标签页 */}
              {activeTab === 'security' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">{t('account.security')}</h2>

                    <div className="space-y-6">
                      {/* 密码设置 */}
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Key className="w-5 h-5 text-gray-600" />
                          <div>
                            <h3 className="font-medium text-gray-900">{locale === 'zh' ? '密码' : 'Password'}</h3>
                            <p className="text-sm text-gray-500">
                              {locale === 'zh' ? '上次修改' : 'Last modified'}: {securitySettings.lastPasswordChange}
                            </p>
                          </div>
                        </div>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                          {t('account.changePassword')}
                        </button>
                      </div>

                      {/* 双重认证 */}
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Shield className="w-5 h-5 text-gray-600" />
                          <div>
                            <h3 className="font-medium text-gray-900">{t('account.twoFactorAuth')}</h3>
                            <p className="text-sm text-gray-500">
                              {securitySettings.twoFactorEnabled
                                ? locale === 'zh'
                                  ? '已启用'
                                  : 'Enabled'
                                : locale === 'zh'
                                ? '未启用'
                                : 'Disabled'}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() =>
                            setSecuritySettings((prev) => ({
                              ...prev,
                              twoFactorEnabled: !prev.twoFactorEnabled,
                            }))
                          }
                          className={`px-4 py-2 rounded-lg transition-colors ${
                            securitySettings.twoFactorEnabled
                              ? 'bg-red-600 text-white hover:bg-red-700'
                              : 'bg-green-600 text-white hover:bg-green-700'
                          }`}
                        >
                          {securitySettings.twoFactorEnabled
                            ? locale === 'zh'
                              ? '禁用'
                              : 'Disable'
                            : locale === 'zh'
                            ? '启用'
                            : 'Enable'}
                        </button>
                      </div>

                      {/* 登录通知 */}
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Bell className="w-5 h-5 text-gray-600" />
                          <div>
                            <h3 className="font-medium text-gray-900">
                              {locale === 'zh' ? '登录通知' : 'Login Notifications'}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {locale === 'zh'
                                ? '新设备登录时发送邮件通知'
                                : 'Send email notifications when logging in from new devices'}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() =>
                            setSecuritySettings((prev) => ({
                              ...prev,
                              loginNotifications: !prev.loginNotifications,
                            }))
                          }
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            securitySettings.loginNotifications ? 'bg-blue-600' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              securitySettings.loginNotifications ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>

                      {/* API密钥数量 */}
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Settings className="w-5 h-5 text-gray-600" />
                          <div>
                            <h3 className="font-medium text-gray-900">{t('account.apiKeys')}</h3>
                            <p className="text-sm text-gray-500">
                              {locale === 'zh' ? '当前有' : 'Currently'} {securitySettings.apiKeyCount}{' '}
                              {locale === 'zh' ? '个活跃密钥' : 'active keys'}
                            </p>
                          </div>
                        </div>
                        <button className="text-blue-600 hover:text-blue-700 transition-colors">
                          {locale === 'zh' ? '管理密钥' : 'Manage Keys'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 订阅管理标签页 */}
              {activeTab === 'billing' && (
                <div className="space-y-6">
                  {/* 当前套餐 */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">{t('account.currentPlan')}</h2>

                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white mb-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <Crown className="w-6 h-6" />
                            <h3 className="text-2xl font-bold">{getPlanInfo(userProfile.plan).name}</h3>
                          </div>
                          <p className="text-blue-100">{locale === 'zh' ? '每月 ¥29' : '$29 per month'}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-blue-100">{locale === 'zh' ? '下次续费' : 'Next billing'}</p>
                          <p className="font-semibold">2024-02-15</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <Activity className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Token{locale === 'zh' ? '配额' : ' Quota'}</p>
                        <p className="font-semibold text-gray-900">100,000 / {locale === 'zh' ? '月' : 'month'}</p>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <Settings className="w-8 h-8 text-green-600 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">API{locale === 'zh' ? '调用' : ' Calls'}</p>
                        <p className="font-semibold text-gray-900">2,000 / {locale === 'zh' ? '月' : 'month'}</p>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <Crown className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">{locale === 'zh' ? '优先支持' : 'Priority Support'}</p>
                        <p className="font-semibold text-gray-900">{locale === 'zh' ? '邮件支持' : 'Email Support'}</p>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                        {t('pricing.upgrade')}
                      </button>
                      <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                        {t('account.cancelSubscription')}
                      </button>
                    </div>
                  </div>

                  {/* 账单历史 */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">
                      {locale === 'zh' ? '账单历史' : 'Billing History'}
                    </h2>

                    <div className="space-y-4">
                      {[
                        {
                          date: '2024-01-15',
                          amount: '¥29.00',
                          status: locale === 'zh' ? '已支付' : 'Paid',
                          invoice: 'INV-2024-001',
                        },
                        {
                          date: '2023-12-15',
                          amount: '¥29.00',
                          status: locale === 'zh' ? '已支付' : 'Paid',
                          invoice: 'INV-2023-012',
                        },
                        {
                          date: '2023-11-15',
                          amount: '¥29.00',
                          status: locale === 'zh' ? '已支付' : 'Paid',
                          invoice: 'INV-2023-011',
                        },
                      ].map((bill, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                        >
                          <div className="flex items-center space-x-4">
                            <Calendar className="w-5 h-5 text-gray-400" />
                            <div>
                              <p className="font-medium text-gray-900">{bill.date}</p>
                              <p className="text-sm text-gray-500">{bill.invoice}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <p className="font-medium text-gray-900">{bill.amount}</p>
                              <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                {bill.status}
                              </span>
                            </div>
                            <button className="text-blue-600 hover:text-blue-700 transition-colors">
                              {t('account.downloadInvoice')}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 通知设置标签页 */}
              {activeTab === 'notifications' && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">{t('account.notifications')}</h2>

                  <div className="space-y-6">
                    {Object.entries({
                      emailNotifications: locale === 'zh' ? '邮件通知' : 'Email Notifications',
                      smsNotifications: locale === 'zh' ? '短信通知' : 'SMS Notifications',
                      securityAlerts: locale === 'zh' ? '安全警报' : 'Security Alerts',
                      productUpdates: locale === 'zh' ? '产品更新' : 'Product Updates',
                      usageAlerts: locale === 'zh' ? '使用量警报' : 'Usage Alerts',
                    }).map(([key, label]) => (
                      <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h3 className="font-medium text-gray-900">{label}</h3>
                          <p className="text-sm text-gray-500">
                            {key === 'emailNotifications' &&
                              (locale === 'zh' ? '接收重要通知和更新' : 'Receive important notifications and updates')}
                            {key === 'smsNotifications' &&
                              (locale === 'zh' ? '接收紧急安全通知' : 'Receive urgent security notifications')}
                            {key === 'securityAlerts' &&
                              (locale === 'zh' ? '账户安全相关通知' : 'Account security related notifications')}
                            {key === 'productUpdates' &&
                              (locale === 'zh' ? '新功能和产品更新' : 'New features and product updates')}
                            {key === 'usageAlerts' &&
                              (locale === 'zh' ? '配额即将用完时提醒' : 'Reminders when quota is about to run out')}
                          </p>
                        </div>
                        <button
                          onClick={() =>
                            setNotifications((prev) => ({
                              ...prev,
                              [key]: !prev[key as keyof typeof prev],
                            }))
                          }
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            notifications[key as keyof typeof notifications] ? 'bg-blue-600' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              notifications[key as keyof typeof notifications] ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
