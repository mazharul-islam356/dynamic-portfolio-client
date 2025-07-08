"use client"
import React, { useEffect, useState } from "react"
import axios from "@/utils/axiosInstance"

const Skills = () => {
  const [skills, setSkills] = useState([])

  useEffect(() => {
    axios.get("/skills").then((res) => setSkills(res.data))
  }, [])

  return (
    <div className="py-10 text-center">
      <h2 className="text-2xl font-bold mb-6">My Skills</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {skills.map((skill) => (
          <div key={skill._id} className="text-center w-20">
            <img src={skill.icon} className="w-12 h-12 mx-auto mb-2" />
            <p className="text-sm">{skill.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Skills
