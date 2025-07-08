"use client"
import { useState } from "react"
import axios from "@/utils/axiosInstance"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function RegisterPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleRegister = async (e) => {
    e.preventDefault()
    if (password !== confirm) {
      setError("Passwords do not match")
      return
    }
    try {
      await axios.post("/auth/register", { email, password })
      const res = await axios.post("/auth/login", { email, password })
      localStorage.setItem("token", res.data.token)
      axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`
      router.push("/dashboard/hero")
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed")
    }
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <form onSubmit={handleRegister} className="w-80 p-6 border rounded shadow-sm space-y-4">
        <h1 className="text-xl font-bold text-center">Register</h1>
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="border p-2 w-full rounded"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button className="bg-blue-600 text-white py-2 w-full rounded">Register</button>
        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link href="/dashboard/login" className="text-blue-500 underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  )
}
