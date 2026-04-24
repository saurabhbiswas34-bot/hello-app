import Image from '../../atoms/Image/Image'
import ProductCategory from '../../atoms/ProductCategory/ProductCategory'
import ProductMeta from '../ProductMeta/ProductMeta'
import type { Product } from '../../../types/product'
import './ProductCard.css'

interface ProductCardProps {
  product: Product
  priceLabel: string
}

function ProductCard({ product, priceLabel }: ProductCardProps) {
  return (
    <article className="product-card">
      <Image src={product.thumbnail} alt={product.title} variant="cover" />
      <div className="product-card__body">
        <ProductCategory category={product.category} />
        <h2 className="product-card__title">{product.title}</h2>
        <p className="product-card__description">{product.description}</p>
        <ProductMeta priceLabel={priceLabel} rating={product.rating} />
      </div>
    </article>
  )
}

export default ProductCard
