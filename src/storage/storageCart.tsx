/* eslint-disable no-useless-catch */
import { StorageProductProps } from '@/types/Product.types'

const CART_STORAGE = '@IGNITESHOP_CART'

export function storageProductGetAll() {
  try {
    const storage = localStorage.getItem(CART_STORAGE)
    const products: StorageProductProps[] = storage ? JSON.parse(storage) : []

    return products
  } catch (error) {
    throw error
  }
}

export function storageProductSave(newProduct: StorageProductProps) {
  try {
    const products = storageProductGetAll()

    const productExists = products.filter(
      (product) => product.id === newProduct.id,
    )

    if (productExists.length === 0) {
      products.push(newProduct)
      const productsUpdated = JSON.stringify(products)
      localStorage.setItem(CART_STORAGE, productsUpdated)

      return products
    }
  } catch (error) {
    throw error
  }
}

export function storageProductRemove(productId: string) {
  try {
    const products = storageProductGetAll()

    const productsUpdated = products.filter(
      (product) => product.id !== productId,
    )
    localStorage.setItem(CART_STORAGE, JSON.stringify(productsUpdated))

    return productsUpdated
  } catch (error) {
    throw error
  }
}

export function storageProductsRemove() {
  try {
    localStorage.removeItem(CART_STORAGE)
  } catch (error) {
    throw error
  }
}
