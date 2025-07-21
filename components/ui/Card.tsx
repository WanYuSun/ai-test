import React from 'react'
import { componentStyles, cn } from '@/lib/theme/config'

interface CardProps {
  variant?: 'default' | 'elevated' | 'flat' | 'popular'
  className?: string
  children: React.ReactNode
  onClick?: () => void
}

export const Card: React.FC<CardProps> = ({ variant = 'default', className, children, onClick }) => {
  const baseStyles = componentStyles.card.base
  const variantStyles = componentStyles.card.variants[variant]

  return (
    <div className={cn(baseStyles, variantStyles, onClick && 'cursor-pointer', className)} onClick={onClick}>
      {children}
    </div>
  )
}

interface CardHeaderProps {
  children: React.ReactNode
  className?: string
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className }) => {
  return <div className={cn('p-6 pb-4', className)}>{children}</div>
}

interface CardContentProps {
  children: React.ReactNode
  className?: string
}

export const CardContent: React.FC<CardContentProps> = ({ children, className }) => {
  return <div className={cn('px-6 pb-6', className)}>{children}</div>
}

interface CardFooterProps {
  children: React.ReactNode
  className?: string
}

export const CardFooter: React.FC<CardFooterProps> = ({ children, className }) => {
  return <div className={cn('px-6 pb-6 pt-4 border-t border-gray-200', className)}>{children}</div>
}
