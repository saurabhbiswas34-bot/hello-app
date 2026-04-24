interface ProductCategoryProps {
  category: string
}

function ProductCategory({ category }: ProductCategoryProps) {
  return <p className="product-card__category">{category}</p>
}

export default ProductCategory
