"use client"
import React, { useEffect, useState } from "react"
import axios from "@/utils/axiosInstance"
import noImg from '../public/no-img.jpg'
import Link from "next/link"

const Projects = () => {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    axios.get("/projects").then((res) => setProjects(res.data))
  }, [])

  return (
    <div className="py-10 text-center">
      <h2 className="text-2xl font-bold mb-6">Projects</h2>
      <div className="grid md:grid-cols-2 gap-6 px-6">
        {projects.map((project) => (
          <div key={project._id} className="border p-4 rounded-lg">
            <img src={project.image || noImg} className="w-full h-48 object-cover mb-4 rounded" />
            <h3 className="text-xl font-bold">{project.title}</h3>
            <p className="text-sm my-2">{project.description}</p>
            <div className="flex gap-4 mt-2 justify-center">
              <Link href={project.live} target="_blank" className="text-blue-600 underline">Live</Link>
              <Link href={project.github} target="_blank" className="text-gray-800 underline">GitHub</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Projects
