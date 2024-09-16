import React from 'react'

interface ProductPageProps {
    product_id: number
}

const ProductPage:React.FC<ProductPageProps> = ({product_id}) => {
  return (
    <div>{product_id}</div>
  )
}

export default ProductPage