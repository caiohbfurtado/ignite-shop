import Image from 'next/image'
import { ImageContainer, ProductCardContainer, ProductInfo } from './styles'

import { StorageProductProps } from '@/types/Product.types'
import { useCart } from '@/hooks/useCart'

type ProductCardProps = {
  product: StorageProductProps
}

export function ProductCard({ product }: ProductCardProps) {
  const { removeProductCart } = useCart()

  function handleRemoveProduct() {
    removeProductCart(product.id)
  }

  return (
    <ProductCardContainer>
      <ImageContainer>
        <Image
          src={product?.imageUrl}
          width={102}
          height={102}
          alt="Imagem da camiseta"
        />
      </ImageContainer>

      <ProductInfo>
        <div>
          <span>{product?.name}</span>
          <strong>{product?.priceFormatted}</strong>
        </div>

        <button type="button" className="outline" onClick={handleRemoveProduct}>
          Remover
        </button>
      </ProductInfo>
    </ProductCardContainer>
  )
}
