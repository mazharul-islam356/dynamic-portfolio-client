"use client"
import { useEffect, useState } from "react"
import axios from "@/utils/axiosInstance"
import DashboardLayout from "@/components/DashboardLayout"
import RequireAuth from "@/components/RequireAuth"
import { ImageUploader } from "@/utils/imagekit"

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState([])
  const [skills, setSkills] = useState([])
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    github: "",
    live: "",
    order: 1,
    stack: [],
  })

  const fetchAll = () => {
    axios.get("/projects").then((r) => setProjects(r.data))
    axios.get("/skills").then((r) => setSkills(r.data))
  }

  useEffect(fetchAll, [])

  const addProject = async (e) => {
    e.preventDefault()
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
    fetchAll()
  }

  const deleteProject = async (id) => {
    await axios.delete(`/projects/${id}`)
    fetchAll()
  }

  return (
    <RequireAuth>
      <DashboardLayout>
        <h1 className="text-2xl font-bold mb-6">Projects</h1>

        <form onSubmit={addProject} className="grid gap-4 mb-10 max-w-xl">
          <input
            placeholder="Title"
            className="border p-2 rounded"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <textarea
            placeholder="Description"
            className="border p-2 rounded"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />
          <div className="flex gap-4">
            <input
              placeholder="GitHub URL"
              className="border p-2 rounded flex-1"
              value={form.github}
              onChange={(e) => setForm({ ...form, github: e.target.value })}
            />
            <input
              placeholder="Live URL"
              className="border p-2 rounded flex-1"
              value={form.live}
              onChange={(e) => setForm({ ...form, live: e.target.value })}
            />
          </div>

          <div className="flex gap-4 items-center">
            <label className="flex items-center gap-2">
              Order
              <input
                type="number"
                min="1"
                className="border p-1 w-20 rounded"
                value={form.order}
                onChange={(e) => setForm({ ...form, order: e.target.value })}
                required
              />
            </label>

            <select
              multiple
              className="border p-2 rounded flex-1"
              value={form.stack}
              onChange={(e) =>
                setForm({
                  ...form,
                  stack: Array.from(e.target.selectedOptions, (o) => o.value),
                })
              }
            >
              {skills.map((s) => (
                <option key={s._id} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-4">
            {form.image && (
              <img src={form.image} alt="Project" className="w-24 h-24 object-cover" />
            )}
            <ImageUploader
              folder="projects"
              onSuccess={(url) => setForm({ ...form, image: url })}
            />
          </div>

          <button type="submit" className="bg-blue-600 text-white py-2 rounded">
            Add Project
          </button>
        </form>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p) => (
            <div key={p._id} className="border p-4 rounded relative">
              <button
                className="absolute top-2 right-2 text-red-600"
                onClick={() => deleteProject(p._id)}
              >
                ✕
              </button>
              {p.image && (
                <img src={p.image} alt={p.title} className="w-full h-40 object-cover rounded" />
              )}
              <h3 className="text-lg font-bold mt-2">{p.title}</h3>
              <p className="text-sm mb-2">{p.description}</p>
              <div className="flex flex-wrap gap-2 text-xs">
                {p.stack?.map((t) => (
                  <span key={t} className="bg-gray-200 px-2 py-1 rounded-full">
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-2 flex gap-4 text-sm">
                <a href={p.github} target="_blank" rel="noreferrer" className="underline">
                  GitHub
                </a>
                <a href={p.live} target="_blank" rel="noreferrer" className="underline">
                  Live
                </a>
              </div>
            </div>
          ))}
        </div>
      </DashboardLayout>
    </RequireAuth>
  )
}
