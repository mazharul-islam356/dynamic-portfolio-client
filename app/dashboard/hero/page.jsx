"use client"
import { useEffect, useState } from "react"
import axios from "@/utils/axiosInstance"
import RequireAuth from "@/components/RequireAuth"
import { toast } from "react-toastify"

export default function HeroAdmin() {
  const [form, setForm] = useState({ name: "", brief: "", image: "", resume: "" })
  const [msg, setMsg] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isDragOver, setIsDragOver] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    axios
      .get("/hero")
      .then((res) => res.data && setForm(res.data))
      .finally(() => setIsLoading(false))
  }, [])

  const handleImageUpload = async (file) => {
    if (!file) return

    const formData = new FormData()
    formData.append("image", file)

    try {
      const res = await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      const imageId = res.data.fileId
      const imageUrl = `https://mazhar-backend.vercel.app/api/images/${imageId}`
      setForm((prev) => ({ ...prev, image: imageUrl }))
      toast.success("Image uploaded successfully!")
    } catch (err) {
      console.error("Image upload failed:", err)
      toast.error("Image upload failed")
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) handleImageUpload(file)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith("image/")) {
      handleImageUpload(file)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSaving(true)
    try {
      await axios.put("/hero", form)
      toast.success("Changes saved successfully!")
      setTimeout(() => setMsg(""), 3000)
    } catch (error) {
      toast.error("Error saving changes. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <RequireAuth>
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-6xl mx-auto">
              {/* Header Skeleton */}
              <div className="mb-8">
                <div className="h-10 bg-gradient-to-r from-slate-200 to-slate-300 rounded-2xl w-80 mb-3 animate-pulse"></div>
                <div className="h-6 bg-slate-200 rounded-xl w-96 animate-pulse"></div>
              </div>

              {/* Main Card Skeleton */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                <div className="h-32 bg-gradient-to-r from-slate-200 to-slate-300 animate-pulse"></div>
                <div className="p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="space-y-3">
                          <div className="h-5 bg-slate-200 rounded-lg w-24 animate-pulse"></div>
                          <div className="h-14 bg-slate-100 rounded-2xl animate-pulse"></div>
                        </div>
                      ))}
                    </div>
                    <div className="h-80 bg-slate-100 rounded-2xl animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </RequireAuth>
    )
  }

  return (
    <RequireAuth>
      <div className="min-h-screen ">
        <div className="container mx-auto px-4 py-8">
          <div>
          

            {/* Main Form Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden mb-8">
              {/* Card Header */}
              <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 p-8">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative">
                  <h2 className="text-3xl font-bold text-white mb-2">Edit Profile Information</h2>
                  <p className="text-indigo-100">Update your details and media content</p>
                </div>
                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
                <div className="absolute bottom-4 right-12 w-16 h-16 bg-white/5 rounded-full blur-lg"></div>
              </div>

              <form onSubmit={handleSubmit} className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  {/* Left Column - Form Fields */}
                  <div className="space-y-8">
                    {/* Name Field */}
                    <div className="group">
                      <label className="block text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                        Full Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          className="w-full px-6 py-4 bg-slate-50/50 border-2 border-slate-200 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 focus:bg-white transition-all duration-300 text-slate-800 placeholder-slate-400 text-lg"
                          placeholder="Enter your full name"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                          <div className="w-3 h-3 bg-indigo-500 rounded-full opacity-0 group-focus-within:opacity-100 transition-all duration-300 scale-0 group-focus-within:scale-100"></div>
                        </div>
                      </div>
                    </div>

                    {/* Brief Field */}
                    <div className="group">
                      <label className="block text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        Professional Brief
                      </label>
                      <div className="relative">
                        <textarea
                          rows={5}
                          className="w-full px-6 py-4 bg-slate-50/50 border-2 border-slate-200 rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 focus:bg-white transition-all duration-300 text-slate-800 placeholder-slate-400 resize-none text-lg"
                          placeholder="Write a compelling description about yourself and your expertise..."
                          value={form.brief}
                          onChange={(e) => setForm({ ...form, brief: e.target.value })}
                          maxLength={200}
                        />
                        <div className="absolute bottom-4 right-4 flex items-center gap-3">
                          <span
                            className={`text-sm font-medium ${form.brief.length > 180 ? "text-red-500" : "text-slate-400"}`}
                          >
                            {form.brief.length}/200
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-slate-500 mt-3 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                            clipRule="evenodd"
                          />
                        </svg>
                        This will be your main tagline and introduction
                      </p>
                    </div>

                    {/* Resume Field */}
                    <div className="group">
                      <label className="block text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                        <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                        Resume Link
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="https://yoursite.com/resume.pdf or /resume.pdf"
                          className="w-full px-6 py-4 bg-slate-50/50 border-2 border-slate-200 rounded-2xl focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 focus:bg-white transition-all duration-300 text-slate-800 placeholder-slate-400 text-lg pr-12"
                          value={form.resume}
                          onChange={(e) => setForm({ ...form, resume: e.target.value })}
                        />
                        {form.resume && (
                          <a
                            href={form.resume}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute inset-y-0 right-0 flex items-center pr-4 text-cyan-500 hover:text-cyan-600 transition-colors"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                          </a>
                        )}
                      </div>
                      <div className="mt-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl">
                        <div className="flex items-start gap-3">
                          <div className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0">
                            <svg fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-amber-800 mb-1">Resume Upload Tips</p>
                            <p className="text-xs text-amber-700">
                              Upload your PDF to the{" "}
                              <code className="bg-amber-100 px-1.5 py-0.5 rounded font-mono">/public</code> folder or
                              use a cloud storage URL (Google Drive, Dropbox, etc.)
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Image Upload */}
                  <div className="space-y-6">
                    <div className="group">
                      <label className="block text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                        <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
                        Profile Image
                      </label>

                      {/* Image Preview */}
                      {form.image && (
                        <div className="relative mb-6 group/preview">
                          <div className="relative overflow-hidden rounded-3xl">
                            <img
                              src={form.image || "/placeholder.svg"}
                              alt="Profile preview"
                              className="w-full h-80 object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover/preview:opacity-100 transition-all duration-300"></div>
                            <button
                              type="button"
                              onClick={() => setForm({ ...form, image: "" })}
                              className="absolute top-4 right-4 bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition-all duration-200 opacity-0 group-hover/preview:opacity-100 transform scale-75 group-hover/preview:scale-100 shadow-lg"
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
                      )}

                      {/* Upload Area */}
                      <div
                        className={`relative border-2 border-dashed rounded-3xl p-8 transition-all duration-300 ${
                          isDragOver
                            ? "border-indigo-400 bg-indigo-50 scale-105"
                            : form.image
                              ? "border-slate-200 bg-slate-50"
                              : "border-slate-300 bg-gradient-to-br from-slate-50 to-slate-100 hover:border-indigo-300 hover:bg-indigo-50"
                        }`}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                      >
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />

                        <div className="text-center">
                          <div
                            className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                              isDragOver ? "bg-indigo-500 text-white scale-110" : "bg-slate-200 text-slate-500"
                            }`}
                          >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                              />
                            </svg>
                          </div>
                          <h3 className="text-lg font-bold text-slate-700 mb-2">
                            {isDragOver ? "Drop your image here" : "Upload Profile Image"}
                          </h3>
                          <p className="text-slate-500 mb-4">Drag and drop or click to browse</p>
                          <div className="flex items-center justify-center gap-4 text-sm text-slate-400">
                            <span className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                  fillRule="evenodd"
                                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              JPG, PNG
                            </span>
                            <span>•</span>
                            <span>Max 5MB</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-8 mt-12 border-t border-slate-200">
                  <div className="flex items-center gap-4">
                    {msg && (
                      <div
                        className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
                          msg.includes("Error")
                            ? "bg-red-100 text-red-700 border-2 border-red-200"
                            : "bg-green-100 text-green-700 border-2 border-green-200"
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
                        <span>{msg}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      className="px-8 py-4 border-2 border-slate-300 text-slate-700 rounded-2xl hover:bg-slate-50 hover:border-slate-400 transition-all duration-200 font-semibold"
                      onClick={() => window.location.reload()}
                    >
                      Reset Changes
                    </button>
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="px-10 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-bold shadow-xl hover:shadow-2xl hover:scale-105 flex items-center gap-3"
                    >
                      {isSaving ? (
                        <>
                          <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
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
                          Saving Changes...
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Save Changes
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Live Preview Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
              <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-slate-400 text-sm font-medium ml-4">Live Preview</span>
                </div>

                <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 rounded-2xl p-12 relative overflow-hidden">
                  {/* Background decoration */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 rounded-full blur-2xl"></div>

                  <div className="relative flex flex-col md:flex-row items-center gap-12">
                    {form.image && (
                      <div className="relative">
                        <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
                          <img
                            src={form.image || "/placeholder.svg"}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-slate-900"></div>
                      </div>
                    )}

                    <div className="text-center md:text-left flex-1">
                      <h1 className="text-5xl font-bold text-white mb-4 leading-tight">
                        {form.name || <span className="text-slate-400">Your Name Here</span>}
                      </h1>
                      <p className="text-xl text-slate-300 mb-8 leading-relaxed max-w-2xl">
                        {form.brief || (
                          <span className="text-slate-500">
                            Your professional brief and expertise description will appear here...
                          </span>
                        )}
                      </p>

                      {form.resume && (
                        <a
                          href={form.resume}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-3 bg-white text-slate-900 px-8 py-4 rounded-2xl font-bold hover:bg-slate-100 transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-105"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                          Download Resume
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RequireAuth>
  )
}
