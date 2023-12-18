type SelectedToken = 'token' | 'refreshToken'

const getTokenFromLocalStorage = (
  selectedToken: SelectedToken
): string | null => {
  const token = localStorage.getItem(selectedToken)
  return token
}

export default getTokenFromLocalStorage
