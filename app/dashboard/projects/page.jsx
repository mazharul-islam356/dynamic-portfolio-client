"use client"
import { useEffect, useState } from "react"
import axios from "@/utils/axiosInstance"
import DashboardLayout from "@/components/DashboardLayout"
import RequireAuth from "@/components/RequireAuth"
import { ImageUploader } from "@/utils/imagekit"

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState([])
  const [skills, setSkills] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    github: "",
    live: "",
    order: 1,
    stack: [],
  })
console.log(form.image);
  const fetchAll = async () => {
    setIsLoading(true)
    try {
      const [projectsRes, skillsRes] = await Promise.all([axios.get("/projects"), axios.get("/skills")])
      setProjects(projectsRes.data)
      setSkills(skillsRes.data)
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchAll()
  }, [])

  const addProject = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await axios.post("/projects", { ...form, order: Number(form.order) })
      setForm({
        title: "",
        description: "",
        image: "",
        github: "",
        live: "",
        order: 1,
        stack: [],
      })
      alert("project add")
      await fetchAll()
    } catch (error) {
      console.error("Error adding project:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const deleteProject = async (id) => {
    try {
      await axios.delete(`/projects/${id}`)
      setDeleteConfirm(null)
      await fetchAll()
    } catch (error) {
      console.error("Error deleting project:", error)
    }
  }

  const toggleSkill = (skillName) => {
    setForm((prev) => ({
      ...prev,
      stack: prev.stack.includes(skillName) ? prev.stack.filter((s) => s !== skillName) : [...prev.stack, skillName],
    }))
  }

  if (isLoading) {
    return (
      <RequireAuth>
        
          <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
            <div className="max-w-7xl mx-auto">
              <div className="animate-pulse">
                <div className="h-8 bg-slate-200 rounded-lg w-64 mb-8"></div>
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                  <div className="h-6 bg-slate-200 rounded w-48 mb-6"></div>
                  <div className="grid gap-4">
                    <div className="h-12 bg-slate-200 rounded-xl"></div>
                    <div className="h-24 bg-slate-200 rounded-xl"></div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-12 bg-slate-200 rounded-xl"></div>
                      <div className="h-12 bg-slate-200 rounded-xl"></div>
                    </div>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="bg-white rounded-2xl shadow-xl p-6">
                      <div className="h-48 bg-slate-200 rounded-xl mb-4"></div>
                      <div className="h-6 bg-slate-200 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-slate-200 rounded w-full mb-4"></div>
                      <div className="flex gap-2">
                        <div className="h-6 bg-slate-200 rounded-full w-16"></div>
                        <div className="h-6 bg-slate-200 rounded-full w-20"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
       
      </RequireAuth>
    )
  }

  return (
    <RequireAuth>
  
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
          

            {/* Add Project Form */}
            <div className="bg-white rounded-lg shadow-xl overflow-hidden mb-8">
              <div className="bg-gradient-to-r from-blue-600 to-cyan-400 p-6">
                <h2 className="text-2xl font-semibold text-white">Add New Project</h2>
                <p className="text-blue-100 mt-1">Create a new project entry for your portfolio</p>
              </div>

              <form onSubmit={addProject} className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="space-y-6">
                    {/* Title */}
                    <div className="group">
                      <label className="block text-sm font-semibold text-slate-700 mb-3">Project Title</label>
                      <input
                        type="text"
                        placeholder="Enter project title"
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-slate-800 placeholder-slate-400 bg-slate-50 focus:bg-white"
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        required
                      />
                    </div>

                    {/* Description */}
                    <div className="group">
                      <label className="block text-sm font-semibold text-slate-700 mb-3">Description</label>
                      <textarea
                        rows={4}
                        placeholder="Describe your project..."
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-slate-800 placeholder-slate-400 bg-slate-50 focus:bg-white resize-none"
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        required
                      />
                    </div>

                    {/* URLs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="group">
                        <label className="block text-sm font-semibold text-slate-700 mb-3">GitHub URL</label>
                        <input
                          type="url"
                          placeholder="https://github.com/..."
                          className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-slate-800 placeholder-slate-400 bg-slate-50 focus:bg-white"
                          value={form.github}
                          onChange={(e) => setForm({ ...form, github: e.target.value })}
                        />
                      </div>
                      <div className="group">
                        <label className="block text-sm font-semibold text-slate-700 mb-3">Live URL</label>
                        <input
                          type="url"
                          placeholder="https://..."
                          className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-slate-800 placeholder-slate-400 bg-slate-50 focus:bg-white"
                          value={form.live}
                          onChange={(e) => setForm({ ...form, live: e.target.value })}
                        />
                      </div>
                    </div>

                    {/* Order */}
                    <div className="group">
                      <label className="block text-sm font-semibold text-slate-700 mb-3">Display Order</label>
                      <input
                        type="number"
                        min="1"
                        className="w-32 px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-slate-800 bg-slate-50 focus:bg-white"
                        value={form.order}
                        onChange={(e) => setForm({ ...form, order: e.target.value })}
                        required
                      />
                      <p className="text-xs text-slate-500 mt-2">Lower numbers appear first</p>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    {/* Image Upload */}
                    <div className="group">
                      <label className="block text-sm font-semibold text-slate-700 mb-3">Project Image</label>

                      {/* Image Preview */}
                      <div className="relative mb-4">
                        {form.image ? (
                          <div className="relative group/image">
                            <img
                              src={form.image || "/placeholder.svg"}
                              alt="Project preview"
                              className="w-full h-48 object-cover rounded-xl border-4 border-slate-200 shadow-lg"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover/image:bg-opacity-30 transition-all duration-200 rounded-xl flex items-center justify-center">
                              <button
                                type="button"
                                onClick={() => setForm({ ...form, image: "" })}
                                className="opacity-0 group-hover/image:opacity-100 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-all duration-200"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H8a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="w-full h-48 border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center bg-slate-50">
                            <div className="text-center">
                              <svg
                                className="w-12 h-12 text-slate-400 mx-auto mb-3"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                              <p className="text-slate-500 font-medium">No image selected</p>
                              <p className="text-slate-400 text-sm">Upload a project screenshot</p>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="border-2 border-slate-200 rounded-xl p-6 bg-slate-50 hover:bg-slate-100 transition-colors">
                        <ImageUploader
  folder="projects"
  onSuccess={(url) => setForm({ ...form, image: url })}
/>

                      </div>
                    </div>

                    {/* Tech Stack */}
                    <div className="group">
                      <label className="block text-sm font-semibold text-slate-700 mb-3">
                        Tech Stack ({form.stack.length} selected)
                      </label>
                      <div className="border-2 border-slate-200 rounded-xl p-4 bg-slate-50 max-h-48 overflow-y-auto">
                        <div className="grid grid-cols-2 gap-2">
                          {skills.map((skill) => (
                            <label
                              key={skill._id}
                              className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-all duration-200 ${
                                form.stack.includes(skill.name)
                                  ? "bg-blue-100 text-blue-800 border-2 border-blue-300"
                                  : "bg-white hover:bg-slate-100 border-2 border-transparent"
                              }`}
                            >
                              <input
                                type="checkbox"
                                className="hidden"
                                checked={form.stack.includes(skill.name)}
                                onChange={() => toggleSkill(skill.name)}
                              />
                              <div
                                className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                                  form.stack.includes(skill.name)
                                    ? "bg-blue-500 border-blue-500"
                                    : "border-slate-300"
                                }`}
                              >
                                {form.stack.includes(skill.name) && (
                                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                )}
                              </div>
                              <span className="text-sm font-medium">{skill.name}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end pt-8 mt-8 border-t border-slate-200">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-xl hover:from-blue-700 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold shadow-lg hover:shadow-xl flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Adding Project...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add Project
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Projects Grid */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Existing Projects ({projects.length})</h2>

              {projects.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                  <svg
                    className="w-16 h-16 text-slate-400 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                  <h3 className="text-xl font-semibold text-slate-600 mb-2">No projects yet</h3>
                  <p className="text-slate-500">Add your first project using the form above</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.map((project) => (
                    <div
                      key={project._id}
                      className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group"
                    >
                      {/* Project Image */}
                      <div className="relative h-48 bg-slate-100">
                        {project.image ? (
                          <img
                            src={project.image || "/placeholder.svg"}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <svg
                              className="w-12 h-12 text-slate-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                        )}

                        {/* Delete Button */}
                        <button
                          onClick={() => setDeleteConfirm(project._id)}
                          className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer hover:bg-red-600 transition-all duration-200 shadow-lg"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H8a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>

                        {/* Order Badge */}
                        <div className="absolute top-3 left-3 bg-slate-800 text-white px-2 py-1 rounded-full text-xs font-semibold">
                          #{project.order}
                        </div>
                      </div>

                      {/* Project Content */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-slate-800 mb-2 line-clamp-1">{project.title}</h3>
                        <p className="text-slate-600 text-sm mb-4 line-clamp-2">{project.description}</p>

                        {/* Tech Stack */}
                        {project.stack && project.stack.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.stack.map((tech) => (
                              <span
                                key={tech}
                                className="bg-slate-100 text-slate-700 px-2 py-1 rounded-full text-xs font-medium"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Links */}
                        <div className="flex gap-3">
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-slate-600 hover:text-slate-800 text-sm font-medium transition-colors"
                            >
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                              </svg>
                              GitHub
                            </a>
                          )}
                          {project.live && (
                            <a
                              href={project.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                />
                              </svg>
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
        </div>

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 backdrop-blur-xl flex items-center justify-center z-50 p-4 transition duration-500">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H8a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Delete Project</h3>
                <p className="text-slate-600 mb-6">
                  Are you sure you want to delete this project? This action cannot be undone.
                </p>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => setDeleteConfirm(null)}
                    className="px-6 py-2 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors font-medium cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => deleteProject(deleteConfirm)}
                    className="px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
   
    </RequireAuth>
  )
}
