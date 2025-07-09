"use client"
import { useEffect, useState } from "react"
import axios from "@/utils/axiosInstance"
import DashboardLayout from "@/components/DashboardLayout"
import RequireAuth from "@/components/RequireAuth"
import { ImageUploader } from "@/utils/imagekit"

export default function HeroAdmin() {
  const [form, setForm] = useState({ name: "", brief: "", image: "", resume: "" })
  const [msg, setMsg] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    axios
      .get("/hero")
      .then((res) => res.data && setForm(res.data))
      .finally(() => setIsLoading(false))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSaving(true)
    try {
      await axios.put("/hero", form)
      setMsg("Changes saved successfully!")
      setTimeout(() => setMsg(""), 3000)
    } catch (error) {
      setMsg("Error saving changes. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <RequireAuth>
       
          <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="animate-pulse">
                  <div className="h-8 bg-slate-200 rounded-lg w-64 mb-8"></div>
                  <div className="space-y-6">
                    <div className="h-20 bg-slate-200 rounded-lg"></div>
                    <div className="h-32 bg-slate-200 rounded-lg"></div>
                    <div className="h-40 bg-slate-200 rounded-lg"></div>
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
     
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
          <div className="max-w-7xl mx-auto">
           

            {/* Main Form Card */}
            <div className="bg-white rounded-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6">
                <h2 className="text-2xl font-semibold text-white">Edit Hero Content</h2>
                <p className="text-blue-100 mt-1">Update your personal information and media</p>
              </div>

              <form onSubmit={handleSubmit} className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="space-y-6">
                    {/* Name Field */}
                    <div className="group">
                      <label className="block text-sm font-semibold text-slate-700 mb-3">Full Name</label>
                      <div className="relative">
                        <input
                          type="text"
                          className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-slate-800 placeholder-slate-400 bg-slate-50 focus:bg-white"
                          placeholder="Enter your full name"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                        </div>
                      </div>
                    </div>

                    {/* Brief Field */}
                    <div className="group">
                      <label className="block text-sm font-semibold text-slate-700 mb-3">Brief Description</label>
                      <textarea
                        rows={4}
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-slate-800 placeholder-slate-400 bg-slate-50 focus:bg-white resize-none"
                        placeholder="Write a brief description about yourself..."
                        value={form.brief}
                        onChange={(e) => setForm({ ...form, brief: e.target.value })}
                      />
                      <div className="flex justify-between items-center mt-2">
                        <p className="text-xs text-slate-500">This will appear as your tagline</p>
                        <span className="text-xs text-slate-400">{form.brief.length}/200</span>
                      </div>
                    </div>

                    {/* Resume Field */}
                    <div className="group">
                      <label className="block text-sm font-semibold text-slate-700 mb-3">Resume Link</label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="/resume.pdf or https://..."
                          className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-slate-800 placeholder-slate-400 bg-slate-50 focus:bg-white"
                          value={form.resume}
                          onChange={(e) => setForm({ ...form, resume: e.target.value })}
                        />
                        {form.resume && (
                          <a
                            href={form.resume}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-blue-500 hover:text-blue-600"
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
                      <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                        <p className="text-xs text-amber-700 flex items-start gap-2">
                          <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>
                            Upload your PDF to <code className="bg-amber-100 px-1 rounded">/public</code> folder or use
                            an external storage URL
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Image Upload */}
                  <div className="space-y-6">
                    <div className="group">
                      <label className="block text-sm font-semibold text-slate-700 mb-3">Profile Image</label>

                      {/* Image Preview */}
                      <div className="relative mb-4">
                        {form.image ? (
                          <div className="relative group/image">
                            <img
                              src={form.image || "/placeholder.svg"}
                              alt="Profile preview"
                              className="w-full h-64 object-cover rounded-xl border-4 border-slate-200 shadow-lg"
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
                          <div className="w-full h-64 border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center bg-slate-50">
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
                              <p className="text-slate-400 text-sm">Upload an image to preview</p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Image Uploader */}
                      <div className="border-2 border-slate-200 rounded-xl p-6 bg-slate-50 hover:bg-slate-100 transition-colors">
                        <ImageUploader onSuccess={(url) => setForm({ ...form, image: url })} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-8 mt-8 border-t border-slate-200">
                  <div className="flex items-center gap-3">
                    {msg && (
                      <div
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                          msg.includes("Error")
                            ? "bg-red-100 text-red-700 border border-red-200"
                            : "bg-green-100 text-green-700 border border-green-200"
                        }`}
                      >
                        {msg.includes("Error") ? (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                        <span className="font-medium">{msg}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      className="px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 hover:border-slate-400 transition-all duration-200 font-medium"
                      onClick={() => window.location.reload()}
                    >
                      Reset
                    </button>
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold shadow-lg hover:shadow-xl flex items-center gap-2"
                    >
                      {isSaving ? (
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
                          Saving...
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

            {/* Preview Card */}
            <div className="mt-8 bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-slate-800 mb-6">Live Preview</h3>
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-8 text-white">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  {form.image && (
                    <img
                      src={form.image || "/placeholder.svg"}
                      alt="Profile"
                      className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                  )}
                  <div className="text-center md:text-left">
                    <h1 className="text-4xl font-bold mb-2">{form.name || "Your Name"}</h1>
                    <p className="text-xl text-slate-300 mb-4">
                      {form.brief || "Your brief description will appear here"}
                    </p>
                    {form.resume && (
                      <a
                        href={form.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-white text-slate-800 px-6 py-3 rounded-lg font-semibold hover:bg-slate-100 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      
    </RequireAuth>
  )
}
