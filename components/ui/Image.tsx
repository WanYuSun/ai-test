import React, { useState } from 'react'
import { cn } from '@/lib/theme/config'
import { getPlaceholderImage, handleImageError } from '@/lib/utils/image'
import { useI18n } from '@/lib/i18n/context'

interface ImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'onError'> {
  src: string
  alt: string
  fallbackWidth?: number
  fallbackHeight?: number
  placeholderText?: string
  className?: string
}

export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  fallbackWidth = 400,
  fallbackHeight = 240,
  placeholderText,
  className,
  ...props
}) => {
  const { t } = useI18n()
  const [imageSrc, setImageSrc] = useState(src)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleLoad = () => {
    setIsLoading(false)
    setHasError(false)
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
    const fallbackSrc = getPlaceholderImage(
      fallbackWidth,
      fallbackHeight,
      placeholderText || t('common.imageLoadFailed')
    )
    setImageSrc(fallbackSrc)
  }

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* 加载状态 */}
      {isLoading && (
        <div
          className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center"
          style={{ aspectRatio: `${fallbackWidth}/${fallbackHeight}` }}
        >
          <div className="text-gray-400 text-sm">{t('common.loading')}</div>
        </div>
      )}

      {/* 实际图片 */}
      <img
        src={imageSrc}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          'w-full h-full object-cover transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100'
        )}
        {...props}
      />

      {/* 错误状态指示 */}
      {hasError && (
        <div className="absolute top-2 right-2 bg-red-100 text-red-600 px-2 py-1 rounded text-xs">
          {t('common.placeholder')}
        </div>
      )}
    </div>
  )
}

interface LazyImageProps extends ImageProps {
  threshold?: number
  rootMargin?: string
}

export const LazyImage: React.FC<LazyImageProps> = ({ threshold = 0.1, rootMargin = '50px', ...props }) => {
  const { t } = useI18n()
  const [shouldLoad, setShouldLoad] = useState(false)
  const [ref, setRef] = useState<HTMLDivElement | null>(null)

  React.useEffect(() => {
    if (!ref) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(ref)

    return () => observer.disconnect()
  }, [ref, threshold, rootMargin])

  return (
    <div ref={setRef} className={props.className}>
      {shouldLoad ? (
        <Image {...props} />
      ) : (
        <div
          className="bg-gray-200 animate-pulse flex items-center justify-center"
          style={{
            aspectRatio: `${props.fallbackWidth || 400}/${props.fallbackHeight || 240}`,
            minHeight: props.fallbackHeight || 240,
          }}
        >
          <div className="text-gray-400 text-sm">{t('common.waitingToLoad')}</div>
        </div>
      )}
    </div>
  )
}
