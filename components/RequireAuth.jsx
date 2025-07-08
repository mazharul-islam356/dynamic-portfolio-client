"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { jwtDecode } from "jwt-decode"

export default function RequireAuth({ children }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/dashboard/login")
    } else {
      try {
        const decoded = jwtDecode(token)
        if (decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem("token")
          router.push("/dashboard/login")
        } else {
          setLoading(false)
        }
      } catch {
        localStorage.removeItem("token")
        router.push("/dashboard/login")
      }
    }
  }, [router])

  // if (loading) return <p className="p-8">Authenticating...</p>
  return children
}
