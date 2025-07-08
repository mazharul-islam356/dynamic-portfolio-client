"use client"
import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { useRouter } from "next/navigation"
import { auth } from "@/utils/firebase"

export default function RequireAuth({ children }) {
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) router.push("/dashboard/login")
      else setLoading(false)
    })
    return () => unsub()
  }, [router])

  if (loading) return <p className="p-8">Loading…</p>
  return children
}
