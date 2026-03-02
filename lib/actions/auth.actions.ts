import { loginApi, registerApi } from "@/lib/api/auth.api"

export const loginAction = async (data: {
  email: string
  password: string
}) => {
  try {
    const res = await loginApi(data)
    return res.data
  } catch (error: any) {
    throw error.response?.data || { message: "Login failed" }
  }
}

export const registerAction = async (data: {
  name: string
  email: string
  password: string
}) => {
  try {
    const res = await registerApi(data)
    return res.data
  } catch (error: any) {
    throw error.response?.data || { message: "Registration failed" }
  }
}
