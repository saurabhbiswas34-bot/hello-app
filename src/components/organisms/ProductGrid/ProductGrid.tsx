import type { Product } from '../../../types/product'
import ProductCard from '../../molecules/ProductCard/ProductCard'
import './ProductGrid.css'

interface ProductGridProps {
  products: Product[]
  formatPrice: (value: number) => string
}

function ProductGrid({ products, formatPrice }: ProductGridProps) {
  return (
    <section className="product-grid" aria-label="Product list">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          priceLabel={formatPrice(product.price)}
        />
      ))}
    </section>
  )
}

export default ProductGrid
