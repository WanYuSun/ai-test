import React from 'react'
import { componentStyles, cn } from '@/lib/theme/config'

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  inputSize?: 'sm' | 'md' | 'lg'
  state?: 'default' | 'error' | 'success'
  label?: string
  error?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const Input: React.FC<InputProps> = ({
  inputSize = 'md',
  state = 'default',
  label,
  error,
  leftIcon,
  rightIcon,
  className,
  ...props
}) => {
  const baseStyles = componentStyles.input.base
  const sizeStyles = componentStyles.input.sizes[inputSize]
  const stateStyles = state !== 'default' ? componentStyles.input.states[state] : ''

  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-400 sm:text-sm">{leftIcon}</span>
          </div>
        )}
        <input
          className={cn(
            baseStyles,
            sizeStyles,
            stateStyles,
            leftIcon ? 'pl-10' : '',
            rightIcon ? 'pr-10' : '',
            className
          )}
          {...props}
        />
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-400 sm:text-sm">{rightIcon}</span>
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  )
}
