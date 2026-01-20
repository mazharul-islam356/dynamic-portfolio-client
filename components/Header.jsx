"use client";

import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full flex justify-center text-white pt-6 px-4">
      <nav
        className="
          w-full max-w-5xl
          flex items-center justify-between
          rounded-full 
          border border-white/10 
          bg-white/5 
          backdrop-blur-xl
          px-6 py-3
          shadow-[0_0_40px_rgba(255,255,255,0.05)]
        "
      >
        {/* Left Logo + Title */}
        <div className="flex items-center gap-3">
          <Image
            className="w-10"
            alt="logo"
            width={50}
            height={50}
            src="/logo.png"
          ></Image>
        </div>

        {/* Right Menu Links */}
        <div className="flex items-center gap-8 font-poppins">
          <Link
            href={"/"}
            className="text-white/90 hover:text-white font-medium text-sm cursor-pointer"
          >
            Home
          </Link>
          <Link
            href="/"
            className="text-white/90 hover:text-white font-medium text-sm cursor-pointer"
          >
            Blogs
          </Link>
          <Link
            href="/"
            className="text-white/90 hover:text-white font-medium text-sm cursor-pointer"
          >
            About
          </Link>
          <Link
            href="/"
            className="text-white/90 hover:text-white font-medium text-sm cursor-pointer"
          >
            Projects
          </Link>
        </div>
      </nav>
    </header>
  );
}
