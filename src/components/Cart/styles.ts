import { styled, keyframes } from '../../../stitches.config'

const enterInScreen = keyframes({
  '0%': { opacity: 0, transform: 'translateX(100%)' },
  '100%': { opacity: 1, transform: 'translateX(0%)' },
})

const outInScreen = keyframes({
  '100%': { opacity: 1, transform: 'translateX(0%)' },
  '0%': { opacity: 0, transform: 'translateX(100%)' },
})

export const CartBackdrop = styled('div', {
  width: '100vw',
  height: '100vh',
  backgroundColor: 'transparent',
  position: 'fixed',
  zIndex: 1,
})

export const CartContainer = styled('aside', {
  variants: {
    isOpen: {
      true: {
        animation: `${enterInScreen} 0.7s ease-in-out`,
        opacity: 1,
      },
      false: {
        animation: `${outInScreen} 0.7s reverse ease-in-out`,
        opacity: 0,
        pointerEvents: 'none',
      },
    },
  },

  display: 'flex',
  flexDirection: 'column',
  position: 'fixed',
  right: 0,
  top: 0,
  height: '100vh',
  width: '100%',
  maxWidth: 480,
  backgroundColor: '$gray800',
  boxShadow: '-4px 0px 30px 0px rgba(0, 0, 0, 0.80)',
  zIndex: 2,
  padding: 24,

  '.outline': {
    backgroundColor: 'transparent',
    display: 'flex',
    alignSelf: 'flex-start',
    border: 'none',
    color: '$gray100',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',

    '&:hover': {
      filter: 'brightness(0.8)',
    },
  },

  header: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
})

export const CartBody = styled('div', {
  marginTop: 0,
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  margin: '0 1.5rem',
  overflowY: 'auto',

  strong: {
    display: 'block',
    marginBottom: 32,
    color: '$gray100',
    fontSize: '$lg',
  },

  div: {
    '&.products': {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      gap: 24,
      overflowY: 'auto',
    },
  },
})

export const CartFooter = styled('footer', {
  display: 'flex',
  flexDirection: 'column',
  margin: '1.5rem',

  div: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: '1rem',

    '& + div': {
      marginBottom: 56,
      marginTop: 4,

      strong: {
        fontWeight: 'bold',
        fontSize: '$md',
        display: 'block',

        '&.price': {
          fontSize: '$xl',
        },
      },
    },
  },
})

export const EmptyCartContainer = styled('div', {
  display: 'flex',
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
})
