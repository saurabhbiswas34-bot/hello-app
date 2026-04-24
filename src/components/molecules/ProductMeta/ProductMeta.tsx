interface ProductMetaProps {
  priceLabel: string
  rating: number
}

function ProductMeta({ priceLabel, rating }: ProductMetaProps) {
  const ratingLabel = rating.toFixed(1)

  return (
    <div className="product-card__meta">
      <span className="product-card__price">{priceLabel}</span>
      <span
        className="product-card__rating"
        aria-label={`Rating ${ratingLabel}`}
      >
        {ratingLabel}
      </span>
    </div>
  )
}

export default ProductMeta
