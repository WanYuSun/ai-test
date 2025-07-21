'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { useI18n } from '@/lib/i18n/context'
import {
  Key,
  Plus,
  Copy,
  MoreVertical,
  TrendingUp,
  Activity,
  Shield,
  Settings,
  Calendar,
  ExternalLink,
  Eye,
  EyeOff,
  RefreshCw,
  Trash2,
  BarChart3,
  Clock,
  Zap,
  AlertCircle,
  CheckCircle,
} from 'lucide-react'

interface APIKey {
  id: string
  name: string
  key: string
  permissions: string[]
  lastUsed: string
  created: string
  status: 'active' | 'disabled'
  usage: {
    requests: number
    limit: number
  }
}

interface UsageStats {
  totalRequests: number
  successRate: number
  avgResponseTime: number
  quotaUsed: number
  quotaLimit: number
}

export default function APIManagementPage() {
  const { t, locale } = useI18n()
  const [activeTab, setActiveTab] = useState('keys')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showAPIKey, setShowAPIKey] = useState<Record<string, boolean>>({})
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])

  const apiKeys: APIKey[] = [
    {
      id: '1',
      name: 'Production API',
      key: 'sk-1234567890abcdef1234567890abcdef',
      permissions: ['read', 'write'],
      lastUsed: '2024-01-15',
      created: '2024-01-01',
      status: 'active',
      usage: {
        requests: 8500,
        limit: 10000,
      },
    },
    {
      id: '2',
      name: 'Development API',
      key: 'sk-abcdef1234567890abcdef1234567890',
      permissions: ['read'],
      lastUsed: '2024-01-14',
      created: '2024-01-05',
      status: 'active',
      usage: {
        requests: 2300,
        limit: 5000,
      },
    },
  ]

  const usageStats: UsageStats = {
    totalRequests: 15420,
    successRate: 99.2,
    avgResponseTime: 245,
    quotaUsed: 10800,
    quotaLimit: 15000,
  }

  const toggleAPIKeyVisibility = (keyId: string) => {
    setShowAPIKey((prev) => ({ ...prev, [keyId]: !prev[keyId] }))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // Show toast notification
  }

  const maskAPIKey = (key: string) => {
    if (key.length <= 8) return key
    return key.substring(0, 8) + '...' + key.substring(key.length - 8)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">{t('api.title')}</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">{t('api.subtitle')}</p>
            </div>

            {/* Tab Navigation */}
            <div className="flex justify-center mb-12">
              <div className="bg-white rounded-xl p-1 shadow-lg border border-gray-200">
                <button
                  onClick={() => setActiveTab('keys')}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === 'keys'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {t('api.keys')}
                </button>
                <button
                  onClick={() => setActiveTab('usage')}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === 'usage'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {t('api.usage')}
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === 'settings'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {t('api.settings')}
                </button>
                <button
                  onClick={() => setActiveTab('docs')}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === 'docs'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {t('api.docs')}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* API Keys Tab */}
        {activeTab === 'keys' && (
          <section className="pb-16 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('api.keyManagement')}</h2>
                    <p className="text-gray-600">{t('api.createAndManage')}</p>
                  </div>
                  <button
                    onClick={() => setShowCreateModal(true)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg flex items-center space-x-2"
                  >
                    <Plus className="w-5 h-5" />
                    <span>{t('api.createKey')}</span>
                  </button>
                </div>

                {/* API Keys List */}
                <div className="space-y-4">
                  {apiKeys.map((apiKey) => (
                    <div
                      key={apiKey.id}
                      className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <h3 className="text-lg font-semibold text-gray-900">{apiKey.name}</h3>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                apiKey.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {apiKey.status === 'active' ? 'Active' : 'Disabled'}
                            </span>
                          </div>

                          <div className="flex items-center space-x-3 mb-4">
                            <div className="flex items-center space-x-2 bg-white rounded-lg px-3 py-2 border border-gray-200">
                              <Key className="w-4 h-4 text-gray-400" />
                              <code className="text-sm font-mono text-gray-700">
                                {showAPIKey[apiKey.id] ? apiKey.key : maskAPIKey(apiKey.key)}
                              </code>
                              <button
                                onClick={() => toggleAPIKeyVisibility(apiKey.id)}
                                className="p-1 hover:bg-gray-100 rounded transition-colors"
                              >
                                {showAPIKey[apiKey.id] ? (
                                  <EyeOff className="w-4 h-4 text-gray-400" />
                                ) : (
                                  <Eye className="w-4 h-4 text-gray-400" />
                                )}
                              </button>
                              <button
                                onClick={() => copyToClipboard(apiKey.key)}
                                className="p-1 hover:bg-gray-100 rounded transition-colors"
                              >
                                <Copy className="w-4 h-4 text-gray-400" />
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600">
                            <div>
                              <span className="font-medium">{t('api.permissions')}: </span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {apiKey.permissions.map((permission) => (
                                  <span
                                    key={permission}
                                    className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs"
                                  >
                                    {permission}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <span className="font-medium">{t('api.lastUsed')}: </span>
                              {apiKey.lastUsed}
                            </div>
                            <div>
                              <span className="font-medium">{t('api.created')}: </span>
                              {apiKey.created}
                            </div>
                            <div>
                              <span className="font-medium">{t('api.usage')}: </span>
                              <div className="mt-1">
                                <div className="flex items-center space-x-2">
                                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                                    <div
                                      className="bg-blue-600 h-2 rounded-full"
                                      style={{ width: `${(apiKey.usage.requests / apiKey.usage.limit) * 100}%` }}
                                    ></div>
                                  </div>
                                  <span className="text-xs">
                                    {apiKey.usage.requests}/{apiKey.usage.limit}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                            <RefreshCw className="w-4 h-4 text-gray-600" />
                          </button>
                          <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                            <Settings className="w-4 h-4 text-gray-600" />
                          </button>
                          <button className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Usage Statistics Tab */}
        {activeTab === 'usage' && (
          <section className="pb-16 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <BarChart3 className="w-6 h-6 text-blue-600" />
                    </div>
                    <span className="text-sm text-gray-500">{t('api.requestCount')}</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {usageStats.totalRequests.toLocaleString()}
                  </div>
                  <div className="text-sm text-green-600">+12% from last month</div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <span className="text-sm text-gray-500">{t('api.successRate')}</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{usageStats.successRate}%</div>
                  <div className="text-sm text-green-600">+0.3% from last month</div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-yellow-100 rounded-lg">
                      <Clock className="w-6 h-6 text-yellow-600" />
                    </div>
                    <span className="text-sm text-gray-500">Avg Response Time</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{usageStats.avgResponseTime}ms</div>
                  <div className="text-sm text-red-600">+15ms from last month</div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <Zap className="w-6 h-6 text-purple-600" />
                    </div>
                    <span className="text-sm text-gray-500">{t('api.quotaUsed')}</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{usageStats.quotaUsed.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">of {usageStats.quotaLimit.toLocaleString()}</div>
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-purple-600 h-2 rounded-full"
                        style={{ width: `${(usageStats.quotaUsed / usageStats.quotaLimit) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Usage Chart Placeholder */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">API Usage Over Time</h3>
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                  <div className="text-gray-500">
                    <BarChart3 className="w-12 h-12 mx-auto mb-4" />
                    <p>Usage charts will be displayed here</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <section className="pb-16 px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">API {t('api.settings')}</h2>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('api.rateLimit')}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Requests per minute</label>
                        <input
                          type="number"
                          defaultValue="60"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Requests per hour</label>
                        <input
                          type="number"
                          defaultValue="1000"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-900">IP Whitelist</div>
                          <div className="text-sm text-gray-500">Only allow requests from specific IP addresses</div>
                        </div>
                        <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                          <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-900">Request Logging</div>
                          <div className="text-sm text-gray-500">Log all API requests for debugging</div>
                        </div>
                        <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                          <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200">
                  <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg">
                    {t('account.saveChanges')}
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Documentation Tab */}
        {activeTab === 'docs' && (
          <section className="pb-16 px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">{t('api.docs')}</h2>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Getting Started</h3>
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="font-medium text-gray-900 mb-2">Authentication</h4>
                      <p className="text-gray-600 mb-4">
                        Include your API key in the Authorization header of your requests:
                      </p>
                      <div className="bg-gray-900 rounded-lg p-4 text-green-400 font-mono text-sm">
                        curl -H "Authorization: Bearer sk-your-api-key" \<br />
                        &nbsp;&nbsp;https://api.aiplatform.com/v1/chat/completions
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Links</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <a
                        href="#"
                        className="flex items-center justify-between p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                      >
                        <span className="font-medium text-blue-900">API Reference</span>
                        <ExternalLink className="w-5 h-5 text-blue-600" />
                      </a>
                      <a
                        href="#"
                        className="flex items-center justify-between p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                      >
                        <span className="font-medium text-green-900">Code Examples</span>
                        <ExternalLink className="w-5 h-5 text-green-600" />
                      </a>
                      <a
                        href="#"
                        className="flex items-center justify-between p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                      >
                        <span className="font-medium text-purple-900">SDKs & Libraries</span>
                        <ExternalLink className="w-5 h-5 text-purple-600" />
                      </a>
                      <a
                        href="#"
                        className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors"
                      >
                        <span className="font-medium text-yellow-900">Tutorials</span>
                        <ExternalLink className="w-5 h-5 text-yellow-600" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
