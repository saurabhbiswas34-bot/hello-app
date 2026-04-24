import SectionTitle from '../../components/atoms/SectionTitle/SectionTitle'
import useProductsData from './hooks/useProductsData'
import ProductGrid from '../../components/organisms/ProductGrid/ProductGrid'
import formatPrice from './utils/formatPrice'
import './Products.css'

function Products() {
  const { products, isLoading, error } = useProductsData()

  return (
    <div className="products-page">
      <SectionTitle>Products</SectionTitle>
      <p className="products-page__description">
        Product cards are loaded from DummyJSON and grouped in a responsive
        grid.
      </p>
      {isLoading ? (
        <p className="products-page__status">Loading products...</p>
      ) : null}
      {error ? (
        <p className="products-page__status">Failed to load products.</p>
      ) : null}
      {!isLoading && !error && products.length === 0 ? (
        <p className="products-page__status">No products to show.</p>
      ) : null}
      {!isLoading && !error && products.length > 0 ? (
        <ProductGrid products={products} formatPrice={formatPrice} />
      ) : null}
    </div>
  )
}

export default Products
