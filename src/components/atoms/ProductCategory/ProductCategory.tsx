import './ProductCategory.css'

interface ProductCategoryProps {
  category: string
}

function ProductCategory({ category }: ProductCategoryProps) {
  return <span className="product-category">{category}</span>
}

export default ProductCategory
