"use client"
import React, { useEffect, useState } from "react"
import axios from "@/utils/axiosInstance"

const Hero = () => {
  const [hero, setHero] = useState(null)

  useEffect(() => {
    axios.get("/hero").then((res) => setHero(res.data))
  }, [])

  if (!hero) return null

  return (
    <div className="text-center py-10">
      <img src={hero.image} className="w-32 h-32 mx-auto rounded-full object-cover" />
      <h1 className="text-3xl font-bold mt-4">{hero.name}</h1>
      <p className="mt-2 text-gray-600">{hero.brief}</p>
      <a
        href="/resume.pdf"
        download
        className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-md"
      >
        Hire Me
      </a>
    </div>
  )
}

export default Hero
