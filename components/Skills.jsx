"use client"

import { useEffect, useState } from "react"
import axios from "@/utils/axiosInstance" // Our mocked axios instance
import noImg from '../public/no-img.jpg'

const SkillsSection = () => {
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
console.log(skills);
  useEffect(() => {
    setLoading(true)
    setError(null)
    axios
      .get("/skills")
      .then((res) => {
        setSkills(res.data)
      })
      .catch((err) => {
        console.error("Failed to fetch skills:", err)
        setError("Failed to load skills. Please try again later.")
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])


  const getImageUrl = (skill) => {
    if (!skill.icon && !skill.iconId) return null

    if (skill.icon) {
      if (skill.icon.includes("undefined/api/images/")) {
        const iconId = skill.icon.split("/api/images/").pop()
        return `http://localhost:5000/api/images/${iconId}`
      }
      if (skill.icon.startsWith("http")) {
        return skill.icon
      }
      if (skill.icon.startsWith("/api/images/")) {
        return `http://localhost:5000${skill.icon}`
      }
      return `http://localhost:5000/api/images/${skill.icon}`
    }

    if (skill.iconId) {
      return `http://localhost:5000/api/images/${skill.iconId}`
    }
    return null
  }

  return (
    <section className="bg-gray-950 text-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
          My Frontend Grid
        </h2>
        <p className="text-xl text-gray-400 mb-16 max-w-3xl mx-auto">
          The technologies powering my web development projects, arranged for optimal performance.
        </p>

        {loading && <p className="text-gray-500">Generating the skill grid...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && skills.length === 0 && (
          <p className="text-gray-500">No skills to display in the grid.</p>
        )}

        {!loading && !error && skills.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {skills.map((skill) => {
               const imageUrl = getImageUrl(skill)
           
            return (
              <div
                key={skill._id}
                className="relative flex flex-col items-center justify-center p-6 rounded-lg overflow-hidden
                           bg-gray-800 border border-gray-700 shadow-xl
                           hover:shadow-blue-500/40 hover:border-blue-500
                           transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                {/* Subtle gradient overlay for solar panel effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-700/20 to-gray-900/20 opacity-70"></div>
                <div className="relative z-10 flex flex-col items-center">
                  <img
                    src={imageUrl || noImg}
                    alt={skill.name}
                    className="w-16 h-16 object-contain mb-4 filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                  <p className="text-lg font-semibold text-gray-100">{skill.name}</p>
                </div>
              </div>
            )
             }
            )}
          </div>
        )}
      </div>
    </section>
  )
}

export default SkillsSection
