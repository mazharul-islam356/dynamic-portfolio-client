"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "firebase/auth"
import { auth } from "@/utils/firebase"

export default function DashboardLayout({ children }) {
  const pathname = usePathname()
  const nav = [
    { href: "/dashboard/hero", label: "Hero" },
    { href: "/dashboard/skills", label: "Skills" },
    { href: "/dashboard/projects", label: "Projects" },
  ]

  return (
    <div className="flex min-h-screen">
      <aside className="w-52 bg-gray-100 p-4">
        <h2 className="font-bold mb-6 text-lg">Admin</h2>
        {nav.map((n) => (
          <Link key={n.href} href={n.href}>
            <div
              className={`mb-3 px-3 py-1 rounded ${
                pathname.startsWith(n.href) ? "bg-blue-600 text-white" : ""
              }`}
            >
              {n.label}
            </div>
          </Link>
        ))}
        <button
          onClick={() => signOut(auth)}
          className="mt-10 text-red-500 hover:underline"
        >
          Logout
        </button>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  )
}
