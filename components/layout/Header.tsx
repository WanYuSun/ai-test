'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { Menu, X, User, LogOut, Settings, CreditCard, Bot, Sparkles, Key, UserCircle } from 'lucide-react'
import { useI18n } from '@/lib/i18n/context'
import { theme, cn } from '@/lib/theme/config'
import { Button, Badge, Container } from '@/components/ui'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const { data: session } = useSession()
  const pathname = usePathname()
  const { t } = useI18n()

  const navigation = [
    // { name: t('common.home'), href: '/' },
    { name: t('common.models'), href: '/models' },
    { name: t('common.chat'), href: '/chat' },
    // { name: t('common.account'), href: '/account' },
    // { name: t('common.apiManagement'), href: '/api-management' },
    { name: t('common.news'), href: '/news' },
    // { name: t('common.pricing'), href: '/pricing' },
  ]

  // 检查当前路由是否匹配导航项
  const isActivePath = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  // 检查是否在账单管理页面
  const isBillingTab = () => {
    if (typeof window !== 'undefined') {
      return pathname === '/account' && new URLSearchParams(window.location.search).get('tab') === 'billing'
    }
    return false
  }

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <Container className="py-0">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className={cn('p-2', theme.borderRadius.lg, `bg-gradient-to-r ${theme.gradients.primary}`)}>
                <Bot className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">{t('header.title')}</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => {
              const isActive = isActivePath(item.href)
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'px-3 py-2 text-sm font-medium relative',
                    theme.borderRadius.md,
                    theme.animations.transition,
                    isActive
                      ? 'text-blue-600 bg-blue-50 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  )}
                >
                  {item.name}
                  {isActive && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-blue-600 rounded-full"></div>
                  )}
                </Link>
              )
            })}
          </nav>

          {/* User Menu / Auth Buttons */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <LanguageSwitcher />

            {session ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className={cn(
                    'flex items-center space-x-2 bg-gray-100 px-3 py-2 text-sm',
                    theme.borderRadius.full,
                    theme.animations.transition,
                    'hover:bg-gray-200'
                  )}
                >
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="hidden sm:block text-gray-700">{session.user?.name || session.user?.email}</span>
                </button>

                {isUserMenuOpen && (
                  <div
                    className={cn(
                      'absolute right-0 mt-2 w-56 bg-white py-1 z-50 border border-gray-200',
                      theme.borderRadius.md,
                      theme.shadows.lg
                    )}
                  >
                    {/* <Link
                      href="/account"
                      className={cn(
                        'flex items-center px-4 py-2 text-sm',
                        theme.animations.transition,
                        isActivePath('/account') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-100'
                      )}
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <UserCircle className="w-4 h-4 mr-3" />
                      {t('header.accountManagement')}
                    </Link>
                    <Link
                      href="/api-management"
                      className={cn(
                        'flex items-center px-4 py-2 text-sm',
                        theme.animations.transition,
                        isActivePath('/api-management') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-100'
                      )}
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <Key className="w-4 h-4 mr-3" />
                      {t('common.apiManagement')}
                    </Link> */}
                    <Link
                      href="/account?tab=billing"
                      className={cn(
                        'flex items-center px-4 py-2 text-sm',
                        theme.animations.transition,
                        isBillingTab() ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-100'
                      )}
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <CreditCard className="w-4 h-4 mr-3" />
                      {t('header.subscriptionManagement')}
                    </Link>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false)
                        signOut()
                      }}
                      className={cn(
                        'flex items-center w-full px-4 py-2 text-sm text-gray-700',
                        theme.animations.transition,
                        'hover:bg-gray-100'
                      )}
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      {t('common.logout')}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/auth/login"
                  className={cn(
                    'text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium',
                    theme.borderRadius.md,
                    theme.animations.transition
                  )}
                >
                  {t('common.login')}
                </Link>
                <Link href="/auth/register">
                  <Button
                    className={cn(
                      'text-white px-4 py-2 text-sm font-medium',
                      theme.borderRadius.lg,
                      theme.animations.transition,
                      `bg-gradient-to-r ${theme.gradients.primary} `
                    )}
                  >
                    <div className="flex items-center space-x-2">
                      <Sparkles className="w-4 h-4" />
                      <span>{t('common.register')}</span>
                    </div>
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              {navigation.map((item) => {
                const isActive = isActivePath(item.href)
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'block px-3 py-2 text-base font-medium',
                      theme.borderRadius.md,
                      theme.animations.transition,
                      isActive
                        ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
              })}

              {/* Mobile User Menu */}
              {session && (
                <>
                  <div className="border-t border-gray-200 mt-3 pt-3">
                    <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('header.userMenu')}
                    </div>
                    {/* <Link
                      href="/account"
                      className={cn(
                        'block px-3 py-2 text-base font-medium',
                        theme.borderRadius.md,
                        theme.animations.transition,
                        isActivePath('/account')
                          ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      )}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t('header.accountManagement')}
                    </Link>
                    <Link
                      href="/api-management"
                      className={cn(
                        'block px-3 py-2 text-base font-medium',
                        theme.borderRadius.md,
                        theme.animations.transition,
                        isActivePath('/api-management')
                          ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      )}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t('common.apiManagement')}
                    </Link> */}
                    <Link
                      href="/account?tab=billing"
                      className={cn(
                        'text-gray-600 hover:text-gray-900 block px-3 py-2 text-base font-medium',
                        theme.borderRadius.md,
                        theme.animations.transition,
                        'hover:bg-gray-50'
                      )}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t('header.subscriptionManagement')}
                    </Link>
                    <button
                      onClick={() => {
                        setIsMenuOpen(false)
                        signOut()
                      }}
                      className={cn(
                        'text-gray-600 hover:text-gray-900 block px-3 py-2 text-base font-medium w-full text-left',
                        theme.borderRadius.md,
                        theme.animations.transition,
                        'hover:bg-gray-50'
                      )}
                    >
                      {t('common.logout')}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </Container>
    </header>
  )
}
