const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

const formatPrice = (value: number): string => priceFormatter.format(value)

export default formatPrice
