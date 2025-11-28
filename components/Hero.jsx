"use client"

import { useEffect, useState } from "react"
import axios from "@/utils/axiosInstance"
import Link from "next/link"
import { Menu, X, Download } from "lucide-react"

export default function Hero() {
  const [hero, setHero] = useState(null)
  const [showNavbar, setShowNavbar] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const res = await axios.get("/hero")
        setHero(res.data)
      } catch (error) {
        console.error("Failed to fetch hero data:", error)
        setHero({
          image: "/user.png",
          name: "Jane Doe",
          brief: "Creative UI/UX Designer | Crafting intuitive and beautiful user experiences.",
          resumeUrl: "/resume.pdf",
        })
      }
    }
    fetchHeroData()
  }, [])

  useEffect(() => {
    const handleScroll = () => setShowNavbar(window.scrollY > 100)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!hero) return null

  return (
    <>
      {/* Animated Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          showNavbar
            ? "translate-y-0 opacity-100 backdrop-blur-md bg-black/50 border-b border-sky-500/20"
            : "-translate-y-full opacity-0"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="text-sky-400 font-bold text-xl">{hero.name.split(" ")[0]}</div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8 text-white">
              {["about", "projects", "contact"].map((section) => (
                <Link key={section} href={`#${section}`} className="hover:text-sky-400 transition-colors">
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </Link>
              ))}
              <Link
                href="/dashboard/hero"
                className="bg-gradient-to-r from-sky-500 to-cyan-500 text-white px-4 py-2 rounded-full hover:from-cyan-500 hover:to-sky-600 transition-all"
              >
                Hire Me
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-sky-300" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-black/90 backdrop-blur border-t border-sky-500/20">
              <div className="px-3 py-4 space-y-2 text-white">
                {["about", "projects", "contact"].map((section) => (
                  <Link key={section} href={`#${section}`} className="block hover:text-sky-400">
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </Link>
                ))}
                <Link
                  href="/dashboard/hero"
                  className="block bg-gradient-to-r from-sky-500 to-cyan-500 text-white text-center rounded-md py-2"
                >
                  Hire Me
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative w-full h-screen overflow-hidden bg-gradient-to-bl from-black via-[#0a1a2f] to-[#00111a]">
        {/* Soft Gradient Overlays */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-sky-600/10 to-cyan-400/10 animate-pulse" />
          <div
            className="absolute inset-0 bg-gradient-to-tl from-cyan-500/10 via-transparent to-sky-500/10 animate-pulse"
            style={{ animationDelay: "1.2s" }}
          />
        </div>

        {/* Animated Particles */}
        <div className="absolute inset-0 z-0">
          {[...Array(60)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        {/* Geometric Shapes */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <div
            className="absolute w-24 h-24 border border-cyan-400/30 top-1/3 left-1/3 rotate-45 animate-spin-slow"
          ></div>
          <div
            className="absolute w-16 h-16 border border-sky-400/20 bottom-1/4 right-1/4 animate-bounce"
            style={{ animationDuration: "4s" }}
          ></div>
          <div className="absolute w-20 h-20 bg-cyan-400/10 rounded-full top-1/2 right-1/2 animate-pulse" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex items-center justify-center h-full text-center px-6">
          <div className="space-y-7 max-w-4xl">
            {/* Name */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-200 to-cyan-300 hero-font">
              {hero.name}
             
            </h1>

            {/* Brief */}
            <p className="text-lg md:text-2xl font-light text-sky-100 max-w-2xl mx-auto font-desc">
              {hero.brief}
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="/dashboard/hero"
                className="px-10 py-4 rounded-full text-white font-medium bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 transition-transform hover:scale-105 shadow-xl"
              >
                Hire Me
              </Link>
              <Link
                href="/"
                download
                className="flex items-center gap-2 px-8 py-4 border border-cyan-300/50 text-cyan-200 rounded-full hover:bg-cyan-300/10 transition-all"
              >
                <Download className="w-5 h-5 group-hover:animate-bounce" />
                Download CV
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black via-black/80 to-transparent" />
      </section>
    </>
  )
}
