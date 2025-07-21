// 格式化工具函数
export const formatters = {
  // 格式化数字（添加千分位分隔符）
  number: (num: number): string => {
    return num.toLocaleString()
  },

  // 格式化货币
  currency: (amount: number, currency = 'CNY'): string => {
    if (currency === 'CNY') {
      return `¥${amount.toLocaleString()}`
    }
    return `$${amount.toLocaleString()}`
  },

  // 格式化日期
  date: (date: string | Date, format = 'YYYY-MM-DD'): string => {
    const d = new Date(date)
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')

    switch (format) {
      case 'YYYY-MM-DD':
        return `${year}-${month}-${day}`
      case 'MM/DD/YYYY':
        return `${month}/${day}/${year}`
      case 'DD/MM/YYYY':
        return `${day}/${month}/${year}`
      default:
        return `${year}-${month}-${day}`
    }
  },

  // 格式化文件大小
  fileSize: (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  },

  // 格式化相对时间
  relativeTime: (date: string | Date, locale = 'zh'): string => {
    const now = new Date()
    const targetDate = new Date(date)
    const diffInSeconds = Math.floor((now.getTime() - targetDate.getTime()) / 1000)

    const timeUnits = {
      zh: {
        second: '秒前',
        minute: '分钟前',
        hour: '小时前',
        day: '天前',
        month: '个月前',
        year: '年前',
      },
      en: {
        second: 's ago',
        minute: 'm ago',
        hour: 'h ago',
        day: 'd ago',
        month: 'mo ago',
        year: 'y ago',
      },
    }

    const units = timeUnits[locale as keyof typeof timeUnits]

    if (diffInSeconds < 60) return `${diffInSeconds}${units.second}`
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}${units.minute}`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}${units.hour}`
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}${units.day}`
    if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)}${units.month}`
    return `${Math.floor(diffInSeconds / 31536000)}${units.year}`
  },
}

// 验证工具函数
export const validators = {
  // 邮箱验证
  email: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  },

  // 密码强度验证
  password: (password: string): { isValid: boolean; errors: string[] } => {
    const errors: string[] = []

    if (password.length < 8) {
      errors.push('密码至少需要8个字符')
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('密码需要包含至少一个大写字母')
    }
    if (!/[a-z]/.test(password)) {
      errors.push('密码需要包含至少一个小写字母')
    }
    if (!/\d/.test(password)) {
      errors.push('密码需要包含至少一个数字')
    }

    return {
      isValid: errors.length === 0,
      errors,
    }
  },

  // 手机号验证（中国）
  phone: (phone: string): boolean => {
    const phoneRegex = /^1[3-9]\d{9}$/
    return phoneRegex.test(phone)
  },

  // URL验证
  url: (url: string): boolean => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  },
}

// 存储工具函数
export const storage = {
  // 本地存储
  local: {
    get: <T>(key: string): T | null => {
      if (typeof window === 'undefined') return null
      try {
        const item = localStorage.getItem(key)
        return item ? JSON.parse(item) : null
      } catch {
        return null
      }
    },

    set: <T>(key: string, value: T): void => {
      if (typeof window === 'undefined') return
      try {
        localStorage.setItem(key, JSON.stringify(value))
      } catch (error) {
        console.error('Local storage error:', error)
      }
    },

    remove: (key: string): void => {
      if (typeof window === 'undefined') return
      localStorage.removeItem(key)
    },

    clear: (): void => {
      if (typeof window === 'undefined') return
      localStorage.clear()
    },
  },

  // 会话存储
  session: {
    get: <T>(key: string): T | null => {
      if (typeof window === 'undefined') return null
      try {
        const item = sessionStorage.getItem(key)
        return item ? JSON.parse(item) : null
      } catch {
        return null
      }
    },

    set: <T>(key: string, value: T): void => {
      if (typeof window === 'undefined') return
      try {
        sessionStorage.setItem(key, JSON.stringify(value))
      } catch (error) {
        console.error('Session storage error:', error)
      }
    },

    remove: (key: string): void => {
      if (typeof window === 'undefined') return
      sessionStorage.removeItem(key)
    },

    clear: (): void => {
      if (typeof window === 'undefined') return
      sessionStorage.clear()
    },
  },
}

// DOM 工具函数
export const dom = {
  // 复制到剪贴板
  copyToClipboard: async (text: string): Promise<boolean> => {
    if (typeof window === 'undefined') return false

    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch {
      // 回退方案
      try {
        const textArea = document.createElement('textarea')
        textArea.value = text
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        const successful = document.execCommand('copy')
        document.body.removeChild(textArea)
        return successful
      } catch {
        return false
      }
    }
  },

  // 平滑滚动到元素
  scrollToElement: (elementId: string, offset = 0): void => {
    const element = document.getElementById(elementId)
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      })
    }
  },

  // 检查元素是否在视口中
  isInViewport: (element: HTMLElement): boolean => {
    const rect = element.getBoundingClientRect()
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  },
}
