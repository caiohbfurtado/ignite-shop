import { styled } from '../../../stitches.config'

export const ButtonContainer = styled('button', {
  backgroundColor: '$gray800',
  padding: 12,
  borderRadius: 6,
  outline: 0,
  border: 'none',
  transition: 'background-color 0.2s ease-in-out',
  cursor: 'pointer',
  position: 'relative',

  span: {
    position: 'absolute',
    backgroundColor: '$green500',
    color: '$white',
    fontWeight: 'bold',
    fontSize: '$sm',
    borderRadius: 999,
    top: -7,
    right: -7,
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '3px solid $gray900',
  },

  '&:disabled': {
    cursor: 'not-allowed',
    filter: 'brightness(0.4)',

    '&:hover': {
      filter: 'brightness(0.4)',
    },
  },

  '&:hover': {
    filter: 'brightness(0.8)',
  },
})
