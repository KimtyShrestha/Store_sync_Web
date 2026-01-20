import api from "@/lib/axios"

export const registerApi = (data: {
  name: string
  email: string
  password: string
}) => {
  return api.post("/auth/register", {
    username: data.email,
    email: data.email,
    password: data.password,
    firstName: data.name,
  })
}

export const loginApi = (data: {
  username: string
  password: string
}) => {
  return api.post("/auth/login", data)
}
