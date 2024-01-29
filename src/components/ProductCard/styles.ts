import { styled } from '../../../stitches.config'

export const ProductCardContainer = styled('div', {
  display: 'flex',
  gap: 20,
})

export const ImageContainer = styled('div', {
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  cursor: 'pointer',
  overflow: 'hidden',

  img: {
    objectFit: 'cover',
  },
})

export const ProductInfo = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  justifyContent: 'space-between',

  div: {
    lineHeight: 1.6,
    display: 'flex',
    flexDirection: 'column',

    strong: {
      color: '$gray100',
      marginBottom: 0,
    },

    span: {
      color: '$gray100',
      fontSize: '$md',
    },
  },

  '.outline': {
    color: '$green500',
    fontWeight: 'bold',
    fontSize: '1rem',
  },
})
