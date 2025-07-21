'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import {
  ArrowLeft,
  Coins,
  TrendingUp,
  TrendingDown,
  Calendar,
  Filter,
  Download,
  Gift,
  ShoppingCart,
  Activity,
  Users,
  Award,
  RefreshCw,
  Search,
} from 'lucide-react'

interface CreditTransaction {
  id: string
  type: 'earn' | 'spend'
  amount: number
  description: string
  date: string
  category: 'daily_checkin' | 'referral' | 'purchase' | 'api_usage' | 'bonus' | 'promotion'
  balance: number
}

export default function CreditsPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'earn' | 'spend'>('all')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d' | 'all'>('30d')

  // 模拟积分明细数据
  const transactions: CreditTransaction[] = [
    {
      id: '1',
      type: 'spend',
      amount: -50,
      description: 'GPT-4 API调用费用',
      date: '2024-01-15 14:30',
      category: 'api_usage',
      balance: 1250,
    },
    {
      id: '2',
      type: 'earn',
      amount: 10,
      description: '每日签到奖励',
      date: '2024-01-15 09:00',
      category: 'daily_checkin',
      balance: 1300,
    },
    {
      id: '3',
      type: 'spend',
      amount: -25,
      description: 'DALL-E 图像生成',
      date: '2024-01-14 16:45',
      category: 'api_usage',
      balance: 1290,
    },
    {
      id: '4',
      type: 'earn',
      amount: 100,
      description: '邀请用户奖励 - 张小明',
      date: '2024-01-14 11:20',
      category: 'referral',
      balance: 1315,
    },
    {
      id: '5',
      type: 'earn',
      amount: 500,
      description: '购买专业版套餐赠送',
      date: '2024-01-13 10:15',
      category: 'purchase',
      balance: 1215,
    },
    {
      id: '6',
      type: 'spend',
      amount: -80,
      description: 'Claude 3 对话费用',
      date: '2024-01-12 15:30',
      category: 'api_usage',
      balance: 715,
    },
    {
      id: '7',
      type: 'earn',
      amount: 200,
      description: '新年活动奖励',
      date: '2024-01-10 00:00',
      category: 'promotion',
      balance: 795,
    },
    {
      id: '8',
      type: 'earn',
      amount: 10,
      description: '每日签到奖励',
      date: '2024-01-10 08:45',
      category: 'daily_checkin',
      balance: 595,
    },
  ]

  const categories = {
    all: '全部',
    daily_checkin: '每日签到',
    referral: '邀请奖励',
    purchase: '购买赠送',
    api_usage: 'API消费',
    bonus: '系统奖励',
    promotion: '活动奖励',
  }

  // 筛选交易记录
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesTab = activeTab === 'all' || transaction.type === activeTab
    const matchesCategory = selectedCategory === 'all' || transaction.category === selectedCategory
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesTab && matchesCategory && matchesSearch
  })

  // 统计数据
  const stats = {
    totalEarned: transactions.filter((t) => t.type === 'earn').reduce((sum, t) => sum + t.amount, 0),
    totalSpent: Math.abs(transactions.filter((t) => t.type === 'spend').reduce((sum, t) => sum + t.amount, 0)),
    currentBalance: 1250,
    thisMonthEarned: 320,
    thisMonthSpent: 380,
  }

  // 获取交易图标
  const getTransactionIcon = (category: string) => {
    switch (category) {
      case 'daily_checkin':
        return <Calendar className="w-4 h-4" />
      case 'referral':
        return <Users className="w-4 h-4" />
      case 'purchase':
        return <ShoppingCart className="w-4 h-4" />
      case 'api_usage':
        return <Activity className="w-4 h-4" />
      case 'bonus':
        return <Award className="w-4 h-4" />
      case 'promotion':
        return <Gift className="w-4 h-4" />
      default:
        return <Coins className="w-4 h-4" />
    }
  }

  // 获取交易样式
  const getTransactionStyle = (type: string) => {
    return type === 'earn' ? 'text-green-600 bg-green-50 border-green-200' : 'text-red-600 bg-red-50 border-red-200'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />

      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* 页面标题和返回按钮 */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <Link
                href="/account"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>返回账户管理</span>
              </Link>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">积分使用明细</h1>
            <p className="text-gray-600">查看您的积分获取和消费记录</p>
          </motion.div>

          {/* 积分统计概览 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8"
          >
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">当前余额</p>
                  <p className="text-3xl font-bold">{stats.currentBalance.toLocaleString()}</p>
                </div>
                <Coins className="w-10 h-10 opacity-80" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">累计获得</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.totalEarned.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-3 bg-red-100 rounded-lg">
                  <TrendingDown className="w-6 h-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">累计消费</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.totalSpent.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">本月获得</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.thisMonthEarned.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <TrendingDown className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">本月消费</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.thisMonthSpent.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 筛选和搜索 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              {/* 标签页切换 */}
              <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
                {[
                  { id: 'all', name: '全部', icon: Coins },
                  { id: 'earn', name: '收入', icon: TrendingUp },
                  { id: 'spend', name: '支出', icon: TrendingDown },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeTab === tab.id ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span>{tab.name}</span>
                  </button>
                ))}
              </div>

              {/* 搜索和筛选 */}
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="搜索交易记录..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {Object.entries(categories).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>

                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value as any)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="7d">最近7天</option>
                  <option value="30d">最近30天</option>
                  <option value="90d">最近90天</option>
                  <option value="all">全部时间</option>
                </select>

                <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  <Download className="w-4 h-4" />
                  <span>导出</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* 交易记录列表 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">交易记录 ({filteredTransactions.length})</h3>
            </div>

            <div className="divide-y divide-gray-200">
              {filteredTransactions.map((transaction, index) => (
                <motion.div
                  key={transaction.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`p-2 rounded-lg border ${
                          transaction.type === 'earn' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                        }`}
                      >
                        {getTransactionIcon(transaction.category)}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{transaction.description}</h4>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-sm text-gray-500">{transaction.date}</span>
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                            {categories[transaction.category as keyof typeof categories]}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div
                        className={`text-lg font-semibold ${
                          transaction.type === 'earn' ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {transaction.type === 'earn' ? '+' : ''}
                        {transaction.amount.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500">余额: {transaction.balance.toLocaleString()}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredTransactions.length === 0 && (
              <div className="p-12 text-center">
                <Coins className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">暂无交易记录</h3>
                <p className="text-gray-500">当前筛选条件下没有找到相关的交易记录</p>
              </div>
            )}
          </motion.div>

          {/* 积分获取建议 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white"
          >
            <h3 className="text-xl font-semibold mb-4">快速获取积分</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <Calendar className="w-8 h-8 mb-2" />
                <h4 className="font-medium mb-1">每日签到</h4>
                <p className="text-sm opacity-90">每天登录即可获得5-10积分</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <Users className="w-8 h-8 mb-2" />
                <h4 className="font-medium mb-1">邀请好友</h4>
                <p className="text-sm opacity-90">成功邀请一位用户获得100积分</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <ShoppingCart className="w-8 h-8 mb-2" />
                <h4 className="font-medium mb-1">升级套餐</h4>
                <p className="text-sm opacity-90">购买付费套餐赠送相应积分</p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
