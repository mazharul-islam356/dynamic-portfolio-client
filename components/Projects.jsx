"use client"

import { useEffect, useState } from "react"
import axios from "@/utils/axiosInstance"
import Link from "next/link"
import { Github, Globe } from "lucide-react"
import { motion } from "framer-motion"

const ProjectsSection = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    axios
      .get("/projects")
      .then((res) => {
        setProjects(res.data)
      })
      .catch((err) => {
        console.error("Failed to fetch projects:", err)
        setError("Failed to load projects. Please try again later.")
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  }

  const contentVariants = {
    rest: { y: 0, transition: { duration: 0.2, ease: "easeOut" } },
    hover: { y: -5, transition: { duration: 0.2, ease: "easeOut" } },
  }
  

  return (
    <section className="bg-gray-950 text-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          My Portfolio
        </h2>
        <p className="text-xl text-gray-400 mb-16 max-w-3xl mx-auto">
          A curated collection of my frontend development projects, showcasing my skills and passion.
        </p>

        {loading && <p className="text-gray-500">Loading projects...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && projects.length === 0 && <p className="text-gray-500">No projects to display.</p>}

        {!loading && !error && projects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.map((project) => (
              <motion.div
                key={project._id}
                className="relative bg-gray-900 rounded-xl shadow-2xl overflow-hidden border border-gray-800 hover:border-purple-600 cursor-pointer"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={cardVariants}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 0 30px rgba(168, 85, 247, 0.6)",
                  borderColor: "#A855F7",
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative w-full h-56 overflow-hidden">
                  <motion.img
                    src={`http://localhost:5000/api/images/${project.imageId}`}
                    alt={`Screenshot of ${project.title}`}
                    className="w-full h-full object-cover"
                    variants={{
                      rest: { scale: 1, brightness: 1 },
                      hover: { scale: 1.05, brightness: 1.1 },
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"
                    variants={{
                      rest: { opacity: 1 },
                      hover: { opacity: 0.5 },
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </div>

                <div className="h-1 bg-gradient-to-r from-purple-600 to-pink-600 opacity-70"></div>

                <motion.div
                  className="p-6 text-left"
                  initial="rest"
                  whileHover="hover"
                  variants={contentVariants}
                >
                  <h3 className="text-2xl font-bold text-gray-100 mb-2">{project.title}</h3>
                  <p className="text-gray-300 text-base mb-4 line-clamp-3">{project.description}</p>
                  <div className="flex flex-wrap gap-4 mt-4">
                    <Link
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-5 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
                    >
                      <Globe className="mr-2 h-5 w-5" /> Live Demo
                    </Link>
                    <Link
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-5 py-2 border border-gray-700 text-base font-medium rounded-md text-gray-300 bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 transition-colors duration-200"
                    >
                      <Github className="mr-2 h-5 w-5" /> GitHub
                    </Link>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default ProjectsSection
