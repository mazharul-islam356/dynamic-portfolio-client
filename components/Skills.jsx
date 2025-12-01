"use client"

import { useEffect, useState } from "react"
import axios from "@/utils/axiosInstance" // Our mocked axios instance
import noImg from '../public/no-img.jpg'
import SkillsGallery from "./SkillsGalary"

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
    <div>
       <div style={{ height: '100vh' }}>
      <SkillsGallery />
    </div>
    </div>
  )
}

export default SkillsSection
