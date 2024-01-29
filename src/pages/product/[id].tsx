import { useCart } from '@/hooks/useCart'
import { stripe } from '@/lib/stripe'
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from '@/styles/pages/product'
import { ProductProps } from '@/types/Product.types'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Stripe from 'stripe'

export default function Product({ product }: { product: ProductProps }) {
  const { addProductCart, changeCartIsOpen } = useCart()

  function handleAddProduct() {
    addProductCart({
      defaultPriceId: product.defaultPriceId,
      id: product.id,
      imageUrl: product.imageUrl,
      name: product.name,
      price: product.price,
      priceFormatted: product.priceFormatted,
    })
    changeCartIsOpen()
  }

  return (
    <>
      <Head>
        <title>{product?.name} | Ignite Shop</title>
      </Head>
      <ProductContainer>
        <ImageContainer>
          <Image src={product?.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>

        <ProductDetails>
          <h1>{product?.name}</h1>
          <span>{product?.priceFormatted}</span>

          <p>{product?.description}</p>

          <button type="button" onClick={handleAddProduct}>
            Adicionar ao carrinho
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: 'prod_PO2Q6fSyIe0att' } }],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params.id

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  const price = product?.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0] ?? '',
        priceFormatted: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format((price.unit_amount ?? 0) / 100),
        price: price.unit_amount / 100,
        description: product.description,
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hour
  }
}
