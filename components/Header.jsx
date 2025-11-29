"use client";

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
         

          <p className="text-white font-semibold text-lg">Mazhar</p>
        </div>

        {/* Right Menu Links */}
        <div className="flex items-center gap-8">
          <a className="text-white/90 hover:text-white font-semibold cursor-pointer">
            Home
          </a>
          <a className="text-white/90 hover:text-white font-semibold cursor-pointer">
            Docs
          </a>
        </div>
      </nav>
    </header>
  );
}
