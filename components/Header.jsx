"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="w-full flex justify-center text-white pt-6 px-4 relative z-50">
        <nav
          className="
            w-full max-w-5xl
            flex items-center justify-between
            rounded-full 
            border border-white/10 
            bg-white/5 
            backdrop-blur-xl
            px-4 sm:px-6 py-3
            shadow-[0_0_40px_rgba(255,255,255,0.05)]
          "
        >
          {/* Left Logo */}
          <div className="flex items-center gap-3">
            <Image
              className="w-8 sm:w-10"
              alt="logo"
              width={50}
              height={50}
              src="/logo.png"
            />
          </div>

          {/* Desktop Menu Links */}
          <div className="hidden md:flex items-center gap-8 font-poppins">
            <Link
              href="/"
              className="text-white/90 hover:text-white font-medium text-sm cursor-pointer transition-colors"
            >
              Home
            </Link>
            <Link
              href="/"
              className="text-white/90 hover:text-white font-medium text-sm cursor-pointer transition-colors"
            >
              Blogs
            </Link>
            <Link
              href="/"
              className="text-white/90 hover:text-white font-medium text-sm cursor-pointer transition-colors"
            >
              About
            </Link>
            <Link
              href="/"
              className="text-white/90 hover:text-white font-medium text-sm cursor-pointer transition-colors"
            >
              Projects
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 z-50"
            aria-label="Toggle menu"
          >
            <span
              className={`w-5 h-0.5 bg-white transition-all duration-300 ${
                isMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`w-5 h-0.5 bg-white transition-all duration-300 ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-5 h-0.5 bg-white transition-all duration-300 ${
                isMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </nav>
      </header>

      {/* Overlay */}
      <div
        className={`
          md:hidden
          fixed inset-0 bg-black/50 backdrop-blur-sm z-40
          transition-opacity duration-300
          ${isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Right Sidebar */}
      <div
        className={`
          md:hidden
          fixed top-0 right-0 h-full w-64
          border-l border-white/10 
          bg-black/80
          backdrop-blur-xl
          shadow-[0_0_40px_rgba(255,255,255,0.05)]
          z-5000
          transition-transform duration-300 ease-in-out
          ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center text-white/80 hover:text-white transition-colors"
          aria-label="Close menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Sidebar Links */}
        <div className="flex flex-col pt-20 font-poppins z-10000">
          <Link
            href="/"
            onClick={() => setIsMenuOpen(false)}
            className="text-white/90 hover:text-white hover:bg-white/10 font-medium text-base px-6 py-4 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/"
            onClick={() => setIsMenuOpen(false)}
            className="text-white/90 hover:text-white hover:bg-white/10 font-medium text-base px-6 py-4 transition-colors"
          >
            Blogs
          </Link>
          <Link
            href="/"
            onClick={() => setIsMenuOpen(false)}
            className="text-white/90 hover:text-white hover:bg-white/10 font-medium text-base px-6 py-4 transition-colors"
          >
            About
          </Link>
          <Link
            href="/"
            onClick={() => setIsMenuOpen(false)}
            className="text-white/90 hover:text-white hover:bg-white/10 font-medium text-base px-6 py-4 transition-colors"
          >
            Projects
          </Link>
        </div>
      </div>
    </>
  );
}
