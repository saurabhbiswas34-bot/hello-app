interface ProductImageProps {
  src: string
  alt: string
}

function ProductImage({ src, alt }: ProductImageProps) {
  return (
    <img src={src} alt={alt} className="product-card__image" loading="lazy" />
  )
}

export default ProductImage
