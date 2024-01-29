import { GetStaticProps } from 'next'

import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import { useKeenSlider } from 'keen-slider/react'
import Stripe from 'stripe'

import bag from '@/assets/icons/bag.svg'

import { stripe } from '@/lib/stripe'
import { HomeContainer, Product, Button } from '@/styles/pages/home'

import 'keen-slider/keen-slider.min.css'
import { MouseEvent } from 'react'
import { StorageProductProps } from '@/types/Product.types'
import { useCart } from '@/hooks/useCart'

interface HomeProps {
  products: {
    id: string
    name: string
    imageUrl: string
    priceFormatted: string
    defaultPriceId: string
    price: number
  }[]
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 2,
      spacing: 48,
    },
  })
  const { addProductCart, cart } = useCart()

  function handleAddToCart(
    event: MouseEvent<HTMLButtonElement>,
    product: StorageProductProps,
  ) {
    event.stopPropagation()
    event.preventDefault()

    addProductCart(product)
  }

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map(
          ({ id, imageUrl, name, priceFormatted, price, defaultPriceId }) => (
            <Link href={`/product/${id}`} key={id} prefetch={false}>
              <Product className="keen-slider__slide">
                <Image src={imageUrl} width={520} height={480} alt="" />

                <footer>
                  <div>
                    <strong>{name}</strong>
                    <span>R$ {priceFormatted}</span>
                  </div>

                  <Button
                    onClick={(event) =>
                      handleAddToCart(event, {
                        id,
                        defaultPriceId,
                        imageUrl,
                        name,
                        priceFormatted,
                        price,
                      })
                    }
                    type="button"
                  >
                    <Image src={bag} alt="Comprar" width={32} height={32} />
                  </Button>
                </footer>
              </Product>
            </Link>
          ),
        )}
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0] ?? '',
      priceFormatted: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format((price.unit_amount ?? 0) / 100),
      price: price.unit_amount / 100,
      defaultPriceId: price.id,
    }
  })

  return {
    props: { products },
    revalidate: 60 * 60 * 2, // 2 hours
  }
}
