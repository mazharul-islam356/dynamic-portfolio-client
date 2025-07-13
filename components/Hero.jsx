"use client"

import { useEffect, useState } from "react"
import axios from "@/utils/axiosInstance" // Re-importing your axios instance
import Link from "next/link"

export default function Hero() {
  const [hero, setHero] = useState(null)

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const res = await axios.get("/hero")
        setHero(res.data)
      } catch (error) {
        console.error("Failed to fetch hero data:", error)
        // Fallback to mock data if API call fails for demonstration
        setHero({
          image: "/user.png",
          name: "Jane Doe",
          brief: "Creative UI/UX Designer | Crafting intuitive and beautiful user experiences.",
          resumeUrl: "/resume.pdf",
        })
      }
    }
    fetchHeroData()
  }, [])

  if (!hero) return null

  return (
    <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      <div className="container px-4 md:px-6 flex flex-col items-center text-center space-y-8">
        {/* Avatar Image */}
        <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl transition-transform duration-300 hover:scale-105">
          <img
            src={hero?.image || "/placeholder.svg"}
            alt={hero.name || "User Avatar"}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Name and Brief */}
        <div className="space-y-4">
          <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 dark:text-gray-50 sm:text-6xl md:text-7xl lg:text-8xl leading-tight">
            {hero.name}
          </h1>
          <p className="max-w-4xl text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed">{hero.brief}</p>
        </div>

        {/* Hire Me Button */}
        <Link
        href='/dashboard/hero'
          // href={hero.resumeUrl || "/resume.pdf"}
          download
          className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-lg font-semibold ring-offset-background transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-14 px-10 py-3 bg-blue-600 text-white shadow-lg hover:bg-blue-700 hover:shadow-xl dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          Hire Me
        </Link>
      </div>
    </section>
  )
}
