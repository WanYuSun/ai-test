import React from 'react'
import { componentStyles, cn } from '@/lib/theme/config'

interface ContainerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  children: React.ReactNode
}

export const Container: React.FC<ContainerProps> = ({ size = 'lg', className, children }) => {
  const baseStyles = componentStyles.container.base
  const sizeStyles = componentStyles.container.sizes[size]

  return <div className={cn(baseStyles, sizeStyles, className)}>{children}</div>
}

interface SectionProps {
  className?: string
  background?: 'white' | 'gray' | 'gradient'
  children: React.ReactNode
}

export const Section: React.FC<SectionProps> = ({ className, background = 'white', children }) => {
  const backgroundStyles = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    gradient: 'bg-gradient-to-br from-gray-50 via-white to-gray-50',
  }

  return <section className={cn('py-16 px-4', backgroundStyles[background], className)}>{children}</section>
}
