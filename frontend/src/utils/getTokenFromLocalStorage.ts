type SelectedToken = 'token' | 'refreshToken'

export const getTokenFromLocalStorage = (
  selectedToken: SelectedToken
): string | null => {
  const token = localStorage.getItem(selectedToken)
  return token
}
