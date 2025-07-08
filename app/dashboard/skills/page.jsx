"use client"
import { useEffect, useState } from "react"
import axios from "@/utils/axiosInstance"
import DashboardLayout from "@/components/DashboardLayout"
import RequireAuth from "@/components/RequireAuth"
import { ImageUploader } from "@/utils/imagekit"

export default function SkillsAdmin() {
  const [skills, setSkills] = useState([])
  const [form, setForm] = useState({ name: "", icon: "" })

  const fetchSkills = () =>
    axios.get("/skills").then((res) => setSkills(res.data))

  useEffect(fetchSkills, [])

  const addSkill = async (e) => {
    e.preventDefault()
    if (!form.name || !form.icon) return
    await axios.post("/skills", form)
    setForm({ name: "", icon: "" })
    fetchSkills()
  }

  const deleteSkill = async (id) => {
    await axios.delete(`/skills/${id}`)
    fetchSkills()
  }

  return (
    <RequireAuth>
      <DashboardLayout>
        <h1 className="text-2xl font-bold mb-6">Skills</h1>

        <form onSubmit={addSkill} className="flex gap-4 mb-8">
          <input
            placeholder="Skill name"
            className="border p-2 rounded flex-1"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <ImageUploader onSuccess={(url) => setForm({ ...form, icon: url })}>
            <span className="px-3 py-2 bg-gray-200 rounded cursor-pointer">
              Upload Icon
            </span>
          </ImageUploader>
          <button className="bg-blue-600 text-white px-4 rounded">Add</button>
        </form>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {skills.map((s) => (
            <div
              key={s._id}
              className="border p-4 rounded flex items-center gap-4"
            >
              <img src={s.icon} className="w-12 h-12 object-cover" />
              <span className="flex-1">{s.name}</span>
              <button
                onClick={() => deleteSkill(s._id)}
                className="text-red-600"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </DashboardLayout>
    </RequireAuth>
  )
}
