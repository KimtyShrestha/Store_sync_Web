import axios from "axios"

const api = axios.create({
  baseURL: "http://192.168.1.68:5050/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // future-proof for cookies
})

export default api
