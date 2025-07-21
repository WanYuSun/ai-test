// 图片工具函数

/**
 * 获取占位符图片URL
 * @param width 宽度
 * @param height 高度
 * @param text 显示文本
 * @returns 占位符图片URL
 */
export function getPlaceholderImage(width = 400, height = 240, text?: string): string {
  const baseUrl = '/api/placeholder'
  const url = `${baseUrl}/${width}/${height}`

  if (text) {
    return `${url}?text=${encodeURIComponent(text)}`
  }

  return url
}

/**
 * 获取默认图片URL，如果原图片加载失败则使用占位符
 * @param originalUrl 原始图片URL
 * @param fallbackWidth 备用图片宽度
 * @param fallbackHeight 备用图片高度
 * @returns 图片URL
 */
export function getImageWithFallback(
  originalUrl: string | null | undefined,
  fallbackWidth = 400,
  fallbackHeight = 240
): string {
  if (!originalUrl || originalUrl.includes('/api/placeholder')) {
    return getPlaceholderImage(fallbackWidth, fallbackHeight)
  }

  return originalUrl
}

/**
 * 验证图片URL是否有效
 * @param url 图片URL
 * @returns Promise<boolean>
 */
export async function isValidImageUrl(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: 'HEAD' })
    return response.ok && response.headers.get('content-type')?.startsWith('image/') === true
  } catch {
    return false
  }
}

/**
 * 创建响应式图片srcSet
 * @param baseUrl 基础图片URL
 * @param sizes 不同尺寸配置
 * @returns srcSet字符串
 */
export function createResponsiveSrcSet(baseUrl: string, sizes: { width: number; height: number }[]): string {
  return sizes
    .map(({ width, height }) => {
      if (baseUrl.includes('/api/placeholder')) {
        return `${getPlaceholderImage(width, height)} ${width}w`
      }
      return `${baseUrl}?w=${width}&h=${height} ${width}w`
    })
    .join(', ')
}

/**
 * 处理图片加载错误
 * @param event 错误事件
 * @param fallbackWidth 备用宽度
 * @param fallbackHeight 备用高度
 */
export function handleImageError(
  event: React.SyntheticEvent<HTMLImageElement>,
  fallbackWidth = 400,
  fallbackHeight = 240
): void {
  const img = event.currentTarget
  if (!img.src.includes('/api/placeholder')) {
    img.src = getPlaceholderImage(fallbackWidth, fallbackHeight, 'Image failed to load')
  }
}

/**
 * 预设图片配置
 */
export const IMAGE_CONFIGS = {
  thumbnail: { width: 150, height: 150 },
  card: { width: 400, height: 240 },
  hero: { width: 800, height: 450 },
  banner: { width: 1200, height: 400 },
  avatar: { width: 64, height: 64 },
  logo: { width: 120, height: 40 },
} as const

/**
 * 根据配置名称获取占位符图片
 * @param config 配置名称
 * @param text 显示文本
 * @returns 占位符图片URL
 */
export function getConfiguredPlaceholder(config: keyof typeof IMAGE_CONFIGS, text?: string): string {
  const { width, height } = IMAGE_CONFIGS[config]
  return getPlaceholderImage(width, height, text)
}
