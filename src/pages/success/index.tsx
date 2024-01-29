import { useCart } from '@/hooks/useCart'
import { stripe } from '@/lib/stripe'
import { ImageContainer, SuccessContainer } from '@/styles/pages/success'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import Stripe from 'stripe'

type ProductProps = {
  name: string
  imageUrl: string
}

interface SuccessProps {
  customerName: string
  products: ProductProps[]
  status: Stripe.Checkout.Session.PaymentStatus
}

export default function Success({
  customerName,
  products,
  status,
}: SuccessProps) {
  const { removeAllProducts } = useCart()

  useEffect(() => {
    if (status === 'paid') {
      removeAllProducts()
    }
  }, [])

  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>
        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>
        <h1>Compra efetuada!</h1>

        <div>
          {products.map((product) => (
            <ImageContainer key={product.name}>
              <Image
                src={product?.imageUrl}
                alt={product?.name}
                width={120}
                height={110}
              />
            </ImageContainer>
          ))}
        </div>

        <p>
          Uhuul <strong>{customerName}</strong>,{' '}
          {products.length === 1 ? 'sua' : 'seus produtos'}:{' '}
          <strong>{products.map((product) => product.name).join(', ')} </strong>
          já {products.length === 1 ? 'está' : 'estão'} a caminho da sua casa.
        </p>

        <Link href="/">Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const sessionId = String(query.session_id)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  })

  const customerName = session.customer_details.name
  const products = session.line_items.data.map(
    (product) => product.price.product,
  ) as Stripe.Product[]

  return {
    props: {
      customerName,
      status: session.payment_status,
      products: products.map((product) => ({
        name: product.name,
        imageUrl: product.images[0],
      })),
    },
  }
}
