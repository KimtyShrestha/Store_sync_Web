import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:5050/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // future-proof for cookies
})

export default api
