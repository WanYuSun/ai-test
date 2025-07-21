import React from 'react'
import { componentStyles, cn } from '@/lib/theme/config'

interface BadgeProps {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error'
  className?: string
  children: React.ReactNode
}

export const Badge: React.FC<BadgeProps> = ({ variant = 'primary', className, children }) => {
  const baseStyles = componentStyles.badge.base
  const variantStyles = componentStyles.badge.variants[variant]

  return <span className={cn(baseStyles, variantStyles, className)}>{children}</span>
}
