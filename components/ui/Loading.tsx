import React from 'react'
import { cn } from '@/lib/theme/config'

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'spinner' | 'dots' | 'pulse'
  className?: string
  text?: string
}

export const Loading: React.FC<LoadingProps> = ({ size = 'md', variant = 'spinner', className, text }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  }

  const renderSpinner = () => (
    <svg
      className={cn('animate-spin text-blue-600', sizeClasses[size], className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  )

  const renderDots = () => (
    <div className={cn('flex space-x-1', className)}>
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          className={cn(
            'bg-blue-600 rounded-full animate-pulse',
            size === 'sm' && 'w-1 h-1',
            size === 'md' && 'w-2 h-2',
            size === 'lg' && 'w-3 h-3'
          )}
          style={{
            animationDelay: `${index * 0.2}s`,
            animationDuration: '1s',
          }}
        />
      ))}
    </div>
  )

  const renderPulse = () => (
    <div className={cn('bg-blue-600 rounded-full animate-pulse', sizeClasses[size], className)} />
  )

  const renderLoader = () => {
    switch (variant) {
      case 'dots':
        return renderDots()
      case 'pulse':
        return renderPulse()
      default:
        return renderSpinner()
    }
  }

  if (text) {
    return (
      <div className="flex items-center space-x-2">
        {renderLoader()}
        <span className="text-gray-600">{text}</span>
      </div>
    )
  }

  return renderLoader()
}

// 全屏加载组件
interface FullScreenLoadingProps {
  text?: string
}

export const FullScreenLoading: React.FC<FullScreenLoadingProps> = ({ text }) => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
      <div className="text-center">
        <Loading size="lg" />
        {text && <p className="mt-4 text-gray-600">{text}</p>}
      </div>
    </div>
  )
}
