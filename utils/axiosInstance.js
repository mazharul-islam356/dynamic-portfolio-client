// utils/axiosInstance.js
import axios from "axios"

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "https://mazhar-backend.vercel.app/api",
})

// Attach token to every request
if (typeof window !== "undefined") {
  const token = localStorage.getItem("token")
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`
  }
}

export default axiosInstance
