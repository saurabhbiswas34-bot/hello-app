interface ProductMetaProps {
  priceLabel: string
  rating: number
}

function ProductMeta({ priceLabel, rating }: ProductMetaProps) {
  return (
    <div className="product-card__meta">
      <span className="product-card__price">{priceLabel}</span>
      <span className="product-card__rating">Rating: {rating.toFixed(1)}</span>
    </div>
  )
}

export default ProductMeta
