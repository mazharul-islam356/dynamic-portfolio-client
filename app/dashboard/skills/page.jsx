"use client"
import { useEffect, useState } from "react"
import axios from "@/utils/axiosInstance"
import DashboardLayout from "@/components/DashboardLayout"
import RequireAuth from "@/components/RequireAuth"
import { ImageUploader } from "@/utils/imagekit"

export default function SkillsAdmin() {
  const [skills, setSkills] = useState([])
  const [form, setForm] = useState({ name: "", icon: "" })
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [msg, setMsg] = useState("")

  const fetchSkills = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get("/skills")
      setSkills(response.data)
    } catch (error) {
      console.error("Error fetching skills:", error)
      setMsg("Error loading skills. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchSkills()
  }, [])

  const addSkill = async (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.icon) {
      setMsg("Please provide both skill name and icon.")
      setTimeout(() => setMsg(""), 3000)
      return
    }

    setIsSubmitting(true)
    try {
      await axios.post("/skills", form)
      setForm({ name: "", icon: "" })
      setMsg("Skill added successfully!")
      setTimeout(() => setMsg(""), 3000)
      await fetchSkills()
    } catch (error) {
      console.error("Error adding skill:", error)
      setMsg("Error adding skill. Please try again.")
      setTimeout(() => setMsg(""), 3000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const deleteSkill = async (id) => {
    try {
      await axios.delete(`/skills/${id}`)
      setDeleteConfirm(null)
      setMsg("Skill deleted successfully!")
      setTimeout(() => setMsg(""), 3000)
      await fetchSkills()
    } catch (error) {
      console.error("Error deleting skill:", error)
      setMsg("Error deleting skill. Please try again.")
      setTimeout(() => setMsg(""), 3000)
    }
  }

  if (isLoading) {
    return (
      <RequireAuth>
       
          <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
            <div className="max-w-6xl mx-auto">
              <div className="animate-pulse">
                <div className="h-8 bg-slate-200 rounded-lg w-64 mb-8"></div>
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                  <div className="h-6 bg-slate-200 rounded w-48 mb-6"></div>
                  <div className="flex gap-4">
                    <div className="h-12 bg-slate-200 rounded-xl flex-1"></div>
                    <div className="h-12 bg-slate-200 rounded-xl w-32"></div>
                    <div className="h-12 bg-slate-200 rounded-xl w-24"></div>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <div key={i} className="bg-white rounded-2xl shadow-xl p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-200 rounded-lg"></div>
                        <div className="flex-1">
                          <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                        </div>
                        <div className="w-6 h-6 bg-slate-200 rounded"></div>
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
            

            {/* Add Skill Form */}
            <div className="bg-white rounded-lg shadow-xl overflow-hidden mb-8">
              <div className="bg-gradient-to-r from-blue-600 to-cyan-400 p-6">
                <h2 className="text-2xl font-semibold text-white">Add New Skill</h2>
                <p className="text-blue-100 mt-1">Add a new skill to your portfolio</p>
              </div>

              <form onSubmit={addSkill} className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column - Form Fields */}
                  <div className="space-y-6">
                    {/* Skill Name */}
                    <div className="group">
                      <label className="block text-sm font-semibold text-slate-700 mb-3">Skill Name</label>
                      <input
                        type="text"
                        placeholder="e.g., React, Python, Figma..."
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-slate-800 placeholder-slate-400 bg-slate-50 focus:bg-white"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      
                      className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-600 text-white rounded-xl hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
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
                          Adding Skill...
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          Add Skill
                        </>
                      )}
                    </button>
                  </div>

                  {/* Right Column - Icon Upload */}
                  <div className="space-y-6">
                    <div className="group">
                      <label className="block text-sm font-semibold text-slate-700 mb-3">Skill Icon</label>

                      {/* Icon Preview */}
                      <div className="relative mb-4">
                        {form.icon ? (
                          <div className="relative group/icon">
                            <div className="w-32 h-32 mx-auto bg-white rounded-2xl shadow-lg border-4 border-slate-200 flex items-center justify-center">
                              <img
                                src={form.icon || "/placeholder.svg"}
                                alt="Skill icon preview"
                                className="w-20 h-20 object-contain"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => setForm({ ...form, icon: "" })}
                              className="absolute -top-2 -right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-all duration-200 shadow-lg"
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
                          </div>
                        ) : (
                          <div className="w-32 h-32 mx-auto border-2 border-dashed border-slate-300 rounded-2xl flex items-center justify-center bg-slate-50">
                            <div className="text-center">
                              <svg
                                className="w-8 h-8 text-slate-400 mx-auto mb-2"
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
                              <p className="text-slate-500 text-xs font-medium">No icon</p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Image Uploader */}
                      <div className="border-2 border-slate-200 rounded-xl p-6 bg-slate-50 hover:bg-slate-100 transition-colors">
                        <ImageUploader onSuccess={(url) => setForm({ ...form, icon: url })} />
                      </div>

                      <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-xs text-blue-700 flex items-start gap-2">
                          <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>
                            Upload a square icon (PNG/SVG recommended) for best results. Icons should be clear and
                            recognizable at small sizes.
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Success/Error Message */}
                {msg && (
                  <div className="mt-6">
                    <div
                      className={`flex items-center gap-2 px-4 py-3 rounded-lg ${
                        msg.includes("Error")
                          ? "bg-red-100 text-red-700 border border-red-200"
                          : "bg-green-100 text-green-700 border border-green-200"
                      }`}
                    >
                      {msg.includes("Error") ? (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                      <span className="font-medium">{msg}</span>
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* Skills Grid */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Your Skills ({skills.length})</h2>

              {skills.length === 0 ? (
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
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                  <h3 className="text-xl font-semibold text-slate-600 mb-2">No skills added yet</h3>
                  <p className="text-slate-500">Add your first skill using the form above</p>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {skills.map((skill) => (
                    <div
                      key={skill._id}
                      className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 group border border-slate-100"
                    >
                      <div className="flex items-center gap-4">
                        {/* Skill Icon */}
                        <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-slate-100 transition-colors">
                          {skill.icon ? (
                            <img
                              src={skill.icon || "/placeholder.svg"}
                              alt={skill.name}
                              className="w-8 h-8 object-contain"
                            />
                          ) : (
                            <svg
                              className="w-6 h-6 text-slate-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                              />
                            </svg>
                          )}
                        </div>

                        {/* Skill Name */}
                        <span className="flex-1 font-semibold text-slate-800 group-hover:text-slate-900 transition-colors">
                          {skill.name}
                        </span>

                        {/* Delete Button */}
                        <button
                          onClick={() => setDeleteConfirm(skill._id)}
                          className="w-8 h-8 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 hover:text-red-600 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100"
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
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Skills Preview */}
            {skills.length > 0 && (
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-2xl font-bold text-slate-800 mb-6">Skills Preview</h3>
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-8">
                  <h4 className="text-white text-xl font-semibold mb-6">Technical Skills</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {skills.map((skill) => (
                      <div key={skill._id} className="text-center group">
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-200 shadow-lg">
                          {skill.icon ? (
                            <img
                              src={skill.icon || "/placeholder.svg"}
                              alt={skill.name}
                              className="w-10 h-10 object-contain"
                            />
                          ) : (
                            <svg
                              className="w-8 h-8 text-slate-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                              />
                            </svg>
                          )}
                        </div>
                        <p className="text-white text-sm font-medium">{skill.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
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
                <h3 className="text-xl font-bold text-slate-800 mb-2">Delete Skill</h3>
                <p className="text-slate-600 mb-6">
                  Are you sure you want to delete this skill? This action cannot be undone and may affect projects that
                  use this skill.
                </p>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => setDeleteConfirm(null)}
                    className="px-6 py-2 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => deleteSkill(deleteConfirm)}
                    className="px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium"
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
