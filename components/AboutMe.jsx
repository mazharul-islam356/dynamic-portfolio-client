"use client"
import Image from "next/image"
import ParticleCard, { MagicBento } from "./MagicBento"

export default function AboutMe() {
  return (
    <div className="min-h-screen bg-black text-white p-6 relative">
      <div className="max-w-7xl mx-auto">
          {/* Animated background orbs */}
 <div className="absolute top-0 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-[100px] animate-pulse" />
   <div className="absolute bottom-0 right-20 w-96 h-96 bg-purple-500/15 rounded-full blur-[120px] animate-pulse delay-1000" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px]" />
        {/* Glowing Cards Grid */}
        <MagicBento
          enableSpotlight={true}
          enableBorderGlow={true}
          particleCount={12}
          glowColor="132, 0, 255"
          enableTilt={false}
          clickEffect={true}
          enableMagnetism={false}
        >
          {/* Profile Card - Large */}
          <ParticleCard className="card col-span-2 md:col-span-1 row-span-2" glowColor="132, 0, 255">
            <div className="card-content flex flex-col items-center justify-center h-full">
              <div className="w-48 h-48 rounded-lg overflow-hidden mb-6 border-2 border-purple-500/50">
                <Image
                  width={192}
                  height={192}
                  src="/myImg.jpg"
                  alt="Profile"
                  className="object-cover w-full h-full"
                />
              </div>
              <h2 className="text-2xl font-bold mb-1">Mazharul Islam</h2>
              <p className="text-purple-400 text-sm mb-4">mazharulislam3569@gmail.com</p>
              <button className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition">Download CV</button>
            </div>
          </ParticleCard>

          {/* About Me Card */}
          <ParticleCard className="card col-span-2 md:col-span-1" glowColor="132, 0, 255">
            <div className="card-content">
              <h3 className="text-xl font-semibold mb-4">About Me</h3>
              <p className="text-purple-400 font-medium mb-3 animate-pulse">● Open to work</p>
              <p className="text-gray-300 leading-relaxed text-sm">
                Visual Designer with 7+ years of experience. I'm all about crafting user-friendly interfaces that are
                functional and visually compelling.
              </p>
              <p className="text-gray-300 leading-relaxed text-sm mt-3">
                Born and raised in the beautiful Costa Rica. When I'm not busy designing, you'll likely find me playing
                board games, exploring Animal Crossing, or cooking mouthwatering Arepas.
              </p>
            </div>
          </ParticleCard>

          {/* Latest Roles Card */}
          <ParticleCard className="card col-span-2 md:col-span-1" glowColor="132, 0, 255">
            <div className="card-content">
              <h3 className="text-xl font-semibold mb-6">Latest Roles</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-linear-to-br from-red-500 to-red-600 rounded-lg shrink-0"></div>
                  <div>
                    <p className="font-semibold">UI Designer</p>
                    <p className="text-gray-400 text-sm">Specialized Bicycle</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-linear-to-br from-purple-500 to-blue-600 rounded-lg shrink-0"></div>
                  <div>
                    <p className="font-semibold">Interaction Designer</p>
                    <p className="text-gray-400 text-sm">Critical Mass / Apple</p>
                  </div>
                </div>
              </div>
            </div>
          </ParticleCard>

        
        </MagicBento>
      </div>
    </div>
  )
}
