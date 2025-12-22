"use client"

import { useEffect, useRef, useState } from "react"
import axios from "@/utils/axiosInstance"
import RequireAuth from "@/components/RequireAuth"

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState([])
  const [skills, setSkills] = useState([])
  const [form, setForm] = useState({
    title: "",
    description: "",
    github: "",
    live: "",
    order: 1,
    stack: [],
  })
  const [imagePreview, setImagePreview] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileInputRef = useRef(null)

  const fetchAll = () => {
    axios.get("/projects").then((r) => setProjects(r.data))
    axios.get("/skills").then((r) => setSkills(r.data))
  }

  useEffect(fetchAll, [])

  const addProject = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData()
      formData.append("title", form.title)
      formData.append("description", form.description)
      formData.append("github", form.github)
      formData.append("live", form.live)
      formData.append("order", form.order)
      formData.append("stack", JSON.stringify(form.stack))

      const file = fileInputRef.current.files[0]
      if (file) {
        formData.append("image", file)
      }

      await axios.post("/projects", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      setForm({ title: "", description: "", github: "", live: "", order: 1, stack: [] })
      setImagePreview(null)
      fileInputRef.current.value = null
      fetchAll()
    } catch (error) {
      console.error("Error adding project:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const deleteProject = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      await axios.delete(`/projects/${id}`)
      fetchAll()
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleSkillToggle = (skillName) => {
    setForm((prev) => ({
      ...prev,
      stack: prev.stack.includes(skillName) ? prev.stack.filter((s) => s !== skillName) : [...prev.stack, skillName],
    }))
  }

  return (
    <RequireAuth>
      <>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
          <div className="max-w-7xl mx-auto">
          
            {/* Add Project Form */}
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 mb-8">
              <h2 className="text-2xl font-semibold text-slate-800 mb-6 flex items-center">
                <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mr-3"></div>
                Add New Project
              </h2>

              <form onSubmit={addProject} className="space-y-6">
                {/* Title and Description */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Project Title</label>
                    <input
                      placeholder="Enter project title"
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50 focus:bg-white"
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Display Order</label>
                    <input
                      type="number"
                      min="1"
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50 focus:bg-white"
                      value={form.order}
                      onChange={(e) => setForm({ ...form, order: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Description</label>
                  <textarea
                    placeholder="Describe your project..."
                    rows={4}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50 focus:bg-white resize-none"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    required
                  />
                </div>

                {/* URLs */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">GitHub URL</label>
                    <input
                      placeholder="https://github.com/..."
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50 focus:bg-white"
                      value={form.github}
                      onChange={(e) => setForm({ ...form, github: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Live URL</label>
                    <input
                      placeholder="https://..."
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50 focus:bg-white"
                      value={form.live}
                      onChange={(e) => setForm({ ...form, live: e.target.value })}
                    />
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-slate-700">Tech Stack</label>
                  <div className="flex flex-wrap gap-2 p-4 bg-slate-50 rounded-xl border border-slate-200">
                    {skills.map((skill) => (
                      <button
                        key={skill._id}
                        type="button"
                        onClick={() => handleSkillToggle(skill.name)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          form.stack.includes(skill.name)
                            ? "bg-blue-500 text-white shadow-md transform scale-105"
                            : "bg-white text-slate-600 border border-slate-300 hover:border-blue-300 hover:bg-blue-50"
                        }`}
                      >
                        {skill.name}
                      </button>
                    ))}
                  </div>
                  {form.stack.length > 0 && (
                    <div className="text-sm text-slate-600">Selected: {form.stack.join(", ")}</div>
                  )}
                </div>

                {/* Image Upload */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-slate-700">Project Image</label>
                  <div className="flex items-start gap-6">
                    {imagePreview && (
                      <div className="relative">
                        <img
                          src={imagePreview || "/placeholder.svg"}
                          alt="Preview"
                          className="w-32 h-32 object-cover rounded-xl border-2 border-slate-200 shadow-md"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setImagePreview(null)
                            fileInputRef.current.value = null
                          }}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs hover:bg-red-600 transition-colors"
                        >
                          ×
                        </button>
                      </div>
                    )}

                    <label className="flex-1 cursor-pointer">
                      <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-blue-400 hover:bg-blue-50 transition-all duration-200">
                        <div className="text-slate-400 mb-2">
                          <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                          </svg>
                        </div>
                        <p className="text-sm text-slate-600">Click to upload image</p>
                        <p className="text-xs text-slate-400 mt-1">PNG, JPG up to 10MB</p>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Adding Project...
                    </div>
                  ) : (
                    "Add Project"
                  )}
                </button>
              </form>
            </div>

            {/* Projects Grid */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-slate-800 mb-6 flex items-center">
                <div className="w-2 h-8 bg-gradient-to-b from-green-500 to-teal-600 rounded-full mr-3"></div>
                Existing Projects ({projects.length})
              </h2>
            </div>

            {projects.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-12 text-center">
                <div className="text-slate-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-slate-600 mb-2">No projects yet</h3>
                <p className="text-slate-400">Add your first project using the form above</p>
              </div>
            ) : (
              <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <div
                    key={project._id}
                    className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    {/* Project Image */}
                    <div className="relative h-48 bg-gradient-to-br from-slate-100 to-slate-200">
                      <img
                        src={`https://mazhar-backend.vercel.app/api/images/${project.imageId}`}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => deleteProject(project._id)}
                        className="absolute top-3 right-3 w-8 h-8 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg flex items-center justify-center"
                        title="Delete project"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                      <div className="absolute top-3 left-3 bg-black bg-opacity-50 text-white px-2 py-1 rounded-lg text-xs font-medium">
                        #{project.order}
                      </div>
                    </div>

                    {/* Project Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-slate-800 mb-2">{project.title}</h3>
                      <p className="text-slate-600 text-sm mb-4 line-clamp-3">{project.description}</p>

                      {/* Tech Stack */}
                      {project.stack && project.stack.length > 0 && (
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-1">
                            {project.stack.map((tech) => (
                              <span
                                key={tech}
                                className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-2 py-1 rounded-lg text-xs font-medium"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Links */}
                      <div className="flex gap-3">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 bg-slate-800 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors text-center"
                          >
                            GitHub
                          </a>
                        )}
                        {project.live && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 bg-gradient-to-r from-green-500 to-teal-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:from-green-600 hover:to-teal-700 transition-all text-center"
                          >
                            Live Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </>
    </RequireAuth>
  )
}
