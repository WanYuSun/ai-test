// 主题配置
export const theme = {
  // 主要颜色
  colors: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    },
    secondary: {
      50: '#faf5ff',
      100: '#f3e8ff',
      200: '#e9d5ff',
      300: '#d8b4fe',
      400: '#c084fc',
      500: '#a855f7',
      600: '#9333ea',
      700: '#7c3aed',
      800: '#6b21a8',
      900: '#581c87',
    },
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
    success: {
      50: '#ecfdf5',
      500: '#10b981',
      600: '#059669',
    },
    error: {
      50: '#fef2f2',
      500: '#ef4444',
      600: '#dc2626',
    },
    warning: {
      50: '#fffbeb',
      500: '#f59e0b',
      600: '#d97706',
    },
  },

  // 渐变色
  gradients: {
    primary: 'from-blue-600 to-purple-600',
    primaryHover: 'from-blue-700 to-purple-700',
    secondary: 'from-purple-600 to-pink-600',
    success: 'from-green-500 to-emerald-500',
    warning: 'from-yellow-500 to-orange-500',
    hero: 'from-gray-50 via-white to-gray-50',
    heroSlate: 'from-slate-50 to-slate-100',
  },

  // 阴影
  shadows: {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    card: 'shadow-sm hover:shadow-md',
    cardLg: 'shadow-lg hover:shadow-xl',
    blue: 'shadow-blue-100',
  },

  // 圆角
  borderRadius: {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    full: 'rounded-full',
  },

  // 间距
  spacing: {
    xs: 'p-2',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-12',
  },

  // 动画
  animations: {
    transition: 'transition-all duration-200',
    transitionFast: 'transition-all duration-150',
    transitionSlow: 'transition-all duration-300',
    fadeIn: 'animate-in fade-in duration-200',
    slideUp: 'animate-in slide-in-from-bottom-4 duration-300',
    slideDown: 'animate-in slide-in-from-top-4 duration-300',
  },

  // 断点
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
}

// 预定义的组合样式
export const componentStyles = {
  // 按钮样式
  button: {
    base: `inline-flex items-center justify-center font-medium ${theme.borderRadius.lg} ${theme.animations.transition} focus:outline-none focus:ring-2 focus:ring-offset-2`,
    sizes: {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base',
      xl: 'px-8 py-4 text-lg',
    },
    variants: {
      primary: `bg-gradient-to-r ${theme.gradients.primary} text-white hover:from-blue-700 hover:to-purple-700 focus:ring-blue-500`,
      secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500',
      outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
      ghost: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100',
      danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
      success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
    },
  },

  // 卡片样式
  card: {
    base: `bg-white ${theme.borderRadius.xl} border border-gray-200 ${theme.animations.transition}`,
    variants: {
      default: `${theme.shadows.card}`,
      elevated: `${theme.shadows.cardLg}`,
      flat: 'shadow-none border-gray-200',
      popular: `border-2 border-blue-500 ${theme.shadows.blue}`,
    },
  },

  // 输入框样式
  input: {
    base: `w-full px-3 py-2 border border-gray-300 ${theme.borderRadius.lg} focus:ring-2 focus:ring-blue-500 focus:border-transparent ${theme.animations.transition}`,
    sizes: {
      sm: 'text-sm px-3 py-2',
      md: 'text-base px-3 py-2',
      lg: 'text-lg px-4 py-3',
    },
    states: {
      error: 'border-red-300 focus:ring-red-500',
      success: 'border-green-300 focus:ring-green-500',
    },
  },

  // 标签样式
  badge: {
    base: `inline-flex items-center px-2.5 py-0.5 ${theme.borderRadius.full} text-xs font-medium`,
    variants: {
      primary: 'bg-blue-100 text-blue-800',
      secondary: 'bg-gray-100 text-gray-800',
      success: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      error: 'bg-red-100 text-red-800',
    },
  },

  // 容器样式
  container: {
    base: 'mx-auto px-4 sm:px-6 lg:px-8',
    sizes: {
      sm: 'max-w-3xl',
      md: 'max-w-5xl',
      lg: 'max-w-7xl',
      xl: 'max-w-full',
    },
  },

  // 网格样式
  grid: {
    responsive: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
    auto: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-auto gap-6',
    cards: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6',
  },
}

// 工具函数
export const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ')
}
