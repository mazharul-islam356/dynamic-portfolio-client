"use client"

import { useEffect, useState } from "react"
import axios from "@/utils/axiosInstance"
import RequireAuth from "@/components/RequireAuth"

export default function SkillsAdmin() {
  const [skills, setSkills] = useState([])
  const [form, setForm] = useState({ name: "", iconId: "" })
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [msg, setMsg] = useState("")
  const [msgType, setMsgType] = useState("") // success, error, info
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [imageUploading, setImageUploading] = useState(false)

  const fetchSkills = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get("/skills")
      console.log("Fetched skills:", response.data)
      setSkills(response.data)
    } catch (err) {
      console.error("Error fetching skills:", err)
      showMessage("Error loading skills.", "error")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchSkills()
  }, [])

  const showMessage = (message, type = "info") => {
    setMsg(message)
    setMsgType(type)
    setTimeout(() => {
      setMsg("")
      setMsgType("")
    }, 4000)
  }

  const uploadImageToMongo = async (file) => {
    const formData = new FormData()
    formData.append("image", file)
    const res = await axios.post("/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    console.log("Upload response:", res.data)
    return res.data.fileId
  }

  const handleImageChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setImageUploading(true)
    try {
      const fileId = await uploadImageToMongo(file)
      console.log("File ID:", fileId)
      setForm((prev) => ({ ...prev, iconId: fileId }))
      showMessage("Image uploaded successfully!", "success")
    } catch (error) {
      console.error("Error uploading image:", error)
      showMessage("Error uploading image.", "error")
    } finally {
      setImageUploading(false)
    }
  }

  const addSkill = async (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.iconId) {
      showMessage("Please provide both skill name and icon.", "error")
      return
    }

    setIsSubmitting(true)
    try {
      const response = await axios.post("/skills", {
        name: form.name,
        iconId: form.iconId,
      })
      console.log("Add skill response:", response.data)
      setForm({ name: "", iconId: "" })
      showMessage("Skill added successfully!", "success")
      fetchSkills()
    } catch (err) {
      console.error("Add error:", err)
      showMessage("Error adding skill.", "error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const deleteSkill = async (id) => {
    try {
      await axios.delete(`/skills/${id}`)
      setDeleteConfirm(null)
      fetchSkills()
      showMessage("Skill deleted successfully.", "success")
    } catch (err) {
      showMessage("Error deleting skill.", "error")
    }
  }

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

  const resetForm = () => {
    setForm({ name: "", iconId: "" })
  }

  return (
    <RequireAuth>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
        

          {/* Message Display */}
          {msg && (
            <div
              className={`mb-6 p-4 rounded-xl border-l-4 ${
                msgType === "success"
                  ? "bg-emerald-50 border-emerald-400 text-emerald-800"
                  : msgType === "error"
                    ? "bg-red-50 border-red-400 text-red-800"
                    : "bg-blue-50 border-blue-400 text-blue-800"
              } shadow-sm`}
            >
              <div className="flex items-center">
                <div
                  className={`w-2 h-2 rounded-full mr-3 ${
                    msgType === "success" ? "bg-emerald-400" : msgType === "error" ? "bg-red-400" : "bg-blue-400"
                  }`}
                ></div>
                <p className="font-medium">{msg}</p>
              </div>
            </div>
          )}

          {/* Add Skill Form */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 mb-8 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
              <h2 className="text-2xl font-bold text-white">Add New Skill</h2>
              <p className="text-blue-100 mt-1">Create a new skill entry with an icon</p>
            </div>

            <form onSubmit={addSkill} className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Skill Name Input */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
                    Skill Name
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-gray-900 placeholder-gray-400"
                    placeholder="e.g., React, Node.js, Python"
                    required
                  />
                </div>

                {/* Icon Upload */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
                    Skill Icon
                  </label>

                  {/* Image Preview */}
                  {form.iconId && (
                    <div className="mb-4 p-4 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-white rounded-xl shadow-sm border border-gray-200 flex items-center justify-center">
                          <img
                            src={`http://localhost:5000/api/images/${form.iconId}`}
                            alt="Preview"
                            className="w-12 h-12 object-contain"
                            onError={(e) => {
                              console.error("Image failed to load:", e.target.src)
                              e.target.style.display = "none"
                            }}
                            onLoad={() => console.log("Preview image loaded successfully")}
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Preview Ready</p>
                          <p className="text-xs text-gray-500">ID: {form.iconId}</p>
                        </div>
                        <button
                          type="button"
                          onClick={resetForm}
                          className="ml-auto text-red-500 hover:text-red-700 text-sm font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  )}

                  {/* File Input */}
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      disabled={imageUploading}
                    />
                    {imageUploading && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-8 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-medium"
                >
                  Clear Form
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || imageUploading}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Adding...</span>
                    </div>
                  ) : (
                    "Add Skill"
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Skills Grid */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-8 py-6">
              <h2 className="text-2xl font-bold text-white">Current Skills</h2>
              <p className="text-gray-300 mt-1">
                {skills.length} skill{skills.length !== 1 ? "s" : ""} in your portfolio
              </p>
            </div>

            <div className="p-8">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-gray-600 font-medium">Loading skills...</p>
                </div>
              ) : skills.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {skills.map((skill) => {
                    const imageUrl = getImageUrl(skill)
                    console.log("Skill:", skill.name, "Image URL:", imageUrl)

                    return (
                      <div
                        key={skill._id}
                        className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl hover:scale-105 transition-all duration-300"
                      >
                        {/* Skill Icon */}
                        <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl mb-4 mx-auto border-2 border-white shadow-sm">
                          {imageUrl ? (
                            <img
                              src={imageUrl || "/placeholder.svg"}
                              alt={skill.name}
                              className="w-10 h-10 object-contain"
                              onError={(e) => {
                                console.error("Skill image failed to load:", imageUrl)
                                e.target.style.display = "none"
                                e.target.nextSibling.style.display = "flex"
                              }}
                              onLoad={() => console.log("Skill image loaded:", skill.name)}
                            />
                          ) : null}
                          <div
                            className="w-10 h-10 flex items-center justify-center text-gray-400 text-xs font-medium"
                            style={{ display: imageUrl ? "none" : "flex" }}
                          >
                            No Icon
                          </div>
                        </div>

                        {/* Skill Name */}
                        <h3 className="text-lg font-bold text-gray-900 text-center mb-2">{skill.name}</h3>

                        {/* Debug Info */}
                        <div className="text-xs text-gray-400 space-y-1 mb-4">
                          {skill.icon && (
                            <div className="truncate">
                              <span className="font-medium">Icon:</span> {skill.icon}
                            </div>
                          )}
                          {skill.iconId && (
                            <div className="truncate">
                              <span className="font-medium">ID:</span> {skill.iconId}
                            </div>
                          )}
                        </div>

                        {/* Delete Button */}
                        <button
                          onClick={() => setDeleteConfirm(skill._id)}
                          className="w-full py-2 px-4 bg-red-50 text-red-600 rounded-sm cursor-pointer hover:bg-red-100 hover:text-red-700 transition-all duration-200 font-medium text-sm border border-red-200 hover:border-red-300 opacity-0 group-hover:opacity-100"
                        >
                          Delete Skill
                        </button>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No skills yet</h3>
                  <p className="text-gray-600 text-center max-w-md">
                    Start building your skills portfolio by adding your first skill above.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
              <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-4">
                <h2 className="text-xl font-bold text-white">Confirm Deletion</h2>
              </div>

              <div className="p-6">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Delete this skill?</h3>
                    <p className="text-gray-600 text-sm">This action cannot be undone.</p>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => setDeleteConfirm(null)}
                    className="flex-1 px-4 py-2 border-2 border-gray-200 text-gray-700 rounded-sm hover:bg-gray-50 cursor-pointer hover:border-gray-300 transition-all duration-200 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => deleteSkill(deleteConfirm)}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-sm hover:from-red-600 hover:to-red-700 transition-all duration-200 font-semibold shadow-lg cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </RequireAuth>
  )
}
