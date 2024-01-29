import { styled } from '../../../stitches.config'

export const ButtonContainer = styled('button', {
  marginTop: 'auto',
  backgroundColor: '$green500',
  border: 0,
  color: '$white',
  borderRadius: 8,
  padding: '1.25rem',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '$md',
  transition: 'background-color 0.2s ease-in-out',

  '&:disabled': {
    opacity: 0.6,
    cursor: 'not-allowed',
  },

  '&:not(disabled):hover': {
    backgroundColor: '$green300',
  },
})
