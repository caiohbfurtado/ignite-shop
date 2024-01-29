import { useCart } from '@/hooks/useCart'
import { ButtonContainer } from './styles'
import bag from '@/assets/icons/bag.svg'

import Image from 'next/image'

export function CartButton() {
  const { cart, changeCartIsOpen } = useCart()

  function handleClick() {
    changeCartIsOpen()
  }

  return (
    <ButtonContainer
      disabled={cart.length <= 0}
      type="button"
      onClick={handleClick}
    >
      {cart?.length > 0 && <span>{cart.length}</span>}
      <Image src={bag} alt="Carrinho" width={24} height={24} />
    </ButtonContainer>
  )
}
