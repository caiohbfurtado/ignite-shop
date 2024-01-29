import { useCart } from '@/hooks/useCart'
import {
  CartBackdrop,
  CartContainer,
  CartBody,
  CartFooter,
  EmptyCartContainer,
} from './styles'

import x from '@/assets/icons/x.svg'
import Image from 'next/image'
import { ProductCard } from '../ProductCard'
import { Button } from '../Button'
import { useMemo, useState } from 'react'
import axios from 'axios'

export function Cart() {
  const { changeCartIsOpen, cartIsOpen, cart } = useCart()
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)

  async function handleBuyProducts() {
    try {
      setIsCreatingCheckoutSession(true)
      const response = await axios.post('/api/checkout', {
        priceIds: cart.map((product) => product.defaultPriceId),
      })

      const { checkoutUrl } = response.data
      changeCartIsOpen()
      window.location.href = checkoutUrl
    } catch (error) {
      // Ideal é conectar com alguma ferramenta de observabilidade (DataDog, Sentry)
      changeCartIsOpen()
      setIsCreatingCheckoutSession(false)
      alert('Falha ao redirecionar ao checkout')
    }
  }

  const cartTotalPrice = useMemo(() => {
    const total = cart?.reduce(
      (previousValue, currentValue) => (previousValue += currentValue.price),
      0,
    )

    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(total)
  }, [cart])

  return (
    <>
      {cartIsOpen && <CartBackdrop onClick={changeCartIsOpen} />}
      <CartContainer isOpen={cartIsOpen}>
        <header>
          <button className="outline" onClick={changeCartIsOpen}>
            <Image src={x} alt="Fechar carrinho" width={24} height={24} />
          </button>
        </header>

        <CartBody>
          <strong>Sacola de compras</strong>

          {cart.length <= 0 ? (
            <EmptyCartContainer>
              <strong>Ainda não há nenhum produto aqui</strong>
            </EmptyCartContainer>
          ) : (
            <div className="products">
              {cart.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </CartBody>

        {cart.length > 0 && (
          <CartFooter>
            <div>
              <span>Quantidade</span>
              <span>{cart.length} itens</span>
            </div>

            <div>
              <strong>Valor total</strong>
              <strong className="price">{cartTotalPrice}</strong>
            </div>

            <Button
              onClick={handleBuyProducts}
              disabled={isCreatingCheckoutSession}
            >
              Finalizar compra
            </Button>
          </CartFooter>
        )}
      </CartContainer>
    </>
  )
}
