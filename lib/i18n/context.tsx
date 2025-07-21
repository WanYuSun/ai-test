'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import zhMessages from '@/messages/zh.json'
import enMessages from '@/messages/en.json'

type Locale = 'zh' | 'en'

interface I18nContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string, params?: Record<string, string>) => string
  tArray: (key: string) => string[]
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

const messages = {
  zh: zhMessages,
  en: enMessages,
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>('zh')

  // 从localStorage加载语言设置
  useEffect(() => {
    const savedLocale = localStorage.getItem('locale') as Locale
    if (savedLocale && (savedLocale === 'zh' || savedLocale === 'en')) {
      setLocale(savedLocale)
    }
  }, [])

  // 保存语言设置到localStorage
  const handleSetLocale = (newLocale: Locale) => {
    setLocale(newLocale)
    localStorage.setItem('locale', newLocale)
  }

  // 翻译函数
  const t = (key: string, params?: Record<string, string>): string => {
    const keys = key.split('.')
    let value: any = messages[locale]

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        // 如果找不到翻译，返回key本身
        return key
      }
    }

    if (typeof value !== 'string') {
      return key
    }

    // 处理参数替换
    if (params) {
      return value.replace(/{(\w+)}/g, (match, paramKey) => {
        return params[paramKey] || match
      })
    }

    return value
  }

  // 数组翻译函数
  const tArray = (key: string): string[] => {
    const keys = key.split('.')
    let value: any = messages[locale]

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        // 如果找不到翻译，返回空数组
        return []
      }
    }

    if (Array.isArray(value)) {
      return value
    }

    // 如果不是数组，返回空数组
    return []
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale: handleSetLocale, t, tArray }}>{children}</I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}
