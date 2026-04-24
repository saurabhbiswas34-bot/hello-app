import type { ImgHTMLAttributes, Ref } from 'react'
import './Image.css'

export type ImageVariant = 'inline' | 'cover'

export type ImageProps = {
  ref?: Ref<HTMLImageElement>
  src: string
  alt: string
  /** `cover`: full width, fixed aspect, object-fit (e.g. product thumbnails). */
  variant?: ImageVariant
  className?: string
} & Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  'src' | 'alt' | 'className' | 'ref'
>

function Image({
  ref,
  src,
  alt,
  variant = 'inline',
  className,
  loading = 'lazy',
  ...rest
}: ImageProps) {
  const rootClass = [
    'image',
    ...(variant === 'cover' ? ['image--cover'] : []),
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      className={rootClass}
      loading={loading}
      {...rest}
    />
  )
}

export default Image
