import Image from 'next/image'
import { AppProps } from 'next/app'

import logoImg from '../assets/logo.svg'
import { Container, Header } from '../styles/pages/app'
import { globalStyles } from '../styles/global'

import { CartButton } from '@/components/CartButton'
import { CartContextProvider } from '@/contexts/CartContext'
import { Cart } from '@/components/Cart'
import Link from 'next/link'

globalStyles()

function App({ Component, pageProps }: AppProps) {
  return (
    <CartContextProvider>
      <Container>
        <Header>
          <Link href="/">
            <Image src={logoImg} alt="Ignite Shop" />
          </Link>
          <CartButton />
        </Header>

        <Cart />

        <Component {...pageProps} />
      </Container>
    </CartContextProvider>
  )
}

export default App
