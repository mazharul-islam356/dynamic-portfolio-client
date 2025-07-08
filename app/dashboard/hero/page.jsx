"use client"
import { useEffect, useState } from "react"
import axios from "@/utils/axiosInstance"
import DashboardLayout from "@/components/DashboardLayout"
import RequireAuth from "@/components/RequireAuth"
import { ImageUploader } from "@/utils/imagekit"

export default function HeroAdmin() {
  const [form, setForm] = useState({ name: "", brief: "", image: "", resume: "" })
  const [msg, setMsg] = useState("")

  useEffect(() => {
    axios.get("/hero").then((res) => res.data && setForm(res.data))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.put("/hero", form)
    setMsg("Saved!")
  }

  return (
    <RequireAuth>
      <DashboardLayout>
        <h1 className="text-2xl font-bold mb-6">Edit Hero Section</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-lg">
          <label className="flex flex-col gap-2">
            Name
            <input
              className="border p-2 rounded"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </label>

          <label className="flex flex-col gap-2">
            Brief
            <textarea
              className="border p-2 rounded"
              value={form.brief}
              onChange={(e) => setForm({ ...form, brief: e.target.value })}
            />
          </label>

          <label className="flex flex-col gap-2">
            Image
            {form.image && <img src={form.image} className="w-24 h-24 object-cover" />}
            <ImageUploader
              onSuccess={(url) => setForm({ ...form, image: url })}
            />
              
          </label>

          <label className="flex flex-col gap-2">
            Resume (PDF)
            <input
              type="text"
              placeholder="/resume.pdf"
              className="border p-2 rounded"
              value={form.resume}
              onChange={(e) => setForm({ ...form, resume: e.target.value })}
            />
            <small className="text-xs text-gray-500">
              Put your PDF in <code>/public</code> or upload to an external
              storage and paste the URL.
            </small>
          </label>

          <button className="bg-blue-600 text-white py-2 rounded mt-4">
            Save
          </button>
          {msg && <p className="text-green-600">{msg}</p>}
        </form>
      </DashboardLayout>
    </RequireAuth>
  )
}
