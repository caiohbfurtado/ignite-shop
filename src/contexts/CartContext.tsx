/* eslint-disable no-useless-catch */
import { createContext, useState, ReactNode, useEffect } from 'react'

import {
  storageProductSave,
  storageProductRemove,
  storageProductGetAll,
  storageProductsRemove,
} from '@/storage/storageCart'
import { StorageProductProps } from '@/types/Product.types'

export type CartContextDataProps = {
  addProductCart: (newProduct: StorageProductProps) => void
  removeProductCart: (productId: string) => void
  cart: StorageProductProps[]
  cartIsOpen: boolean
  changeCartIsOpen: () => void
  removeAllProducts: () => void
}

type CartContextProviderProps = {
  children: ReactNode
}

export const CartContext = createContext<CartContextDataProps>(
  {} as CartContextDataProps,
)

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [cart, setCart] = useState<StorageProductProps[]>([])
  const [cartIsOpen, setCartIsOpen] = useState(false)

  function changeCartIsOpen() {
    setCartIsOpen((oldValue) => !oldValue)
  }

  function removeAllProducts() {
    setCart([])
    storageProductsRemove()
  }

  function addProductCart(newProduct: StorageProductProps) {
    const productExistsInCart = cart.find(
      (product) => product.id === newProduct.id,
    )
    if (productExistsInCart) {
      return
    }

    try {
      const storageResponse = storageProductSave(newProduct)
      setCart(storageResponse)
    } catch (error) {
      throw error
    }
  }

  function removeProductCart(productId: string) {
    try {
      const response = storageProductRemove(productId)
      setCart(response)
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    const products = storageProductGetAll()
    setCart(products)
  }, [])

  return (
    <CartContext.Provider
      value={{
        cart,
        addProductCart,
        removeProductCart,
        cartIsOpen,
        changeCartIsOpen,
        removeAllProducts,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
