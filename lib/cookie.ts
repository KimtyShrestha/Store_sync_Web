import Cookies from "js-cookie"

const TOKEN_KEY = "store_sync_token"
const USER_KEY = "store_sync_user"

export const setAuthCookies = (token: string, user: any) => {
  Cookies.set(TOKEN_KEY, token, { expires: 7 })
  Cookies.set(USER_KEY, JSON.stringify(user), { expires: 7 })
}

export const clearAuthCookies = () => {
  Cookies.remove(TOKEN_KEY)
  Cookies.remove(USER_KEY)
}

export const getToken = () => Cookies.get(TOKEN_KEY)

export const getUser = () => {
  const user = Cookies.get(USER_KEY)
  return user ? JSON.parse(user) : null
}
