'use client'
import Projects from "@/components/Projects"
import Hero from "@/components/Hero"
import MyService from "@/components/MyService"
import { SeasonalHoverCards } from "@/src/components/lightswind/seasonal-hover-cards"
import Skills from "@/components/Skills";
import AboutMe from "@/components/AboutMe";
import Contact from "@/components/Contact";
import Plasma from "@/components/Plasma"
import FloatingLines from "@/components/FloatingLines"


const cardArray = [
  {
    title: "Summer Vibes",
    subtitle: "Hot deals and sunny styles",
    description: "Explore our vibrant summer collection with up to 50% off on selected items.",
    imageSrc: "/images/summer.jpg", // Update with your actual image path
    imageAlt: "Summer Collection"
  },
  {
    title: "Autumn Trends",
    subtitle: "Cozy fashion for chilly days",
    description: "Check out our new arrivals perfect for layering in fall weather.",
    imageSrc: "/user.jpg",
    imageAlt: "Autumn Collection"
  },
  {
    title: "Winter Warmers",
    subtitle: "Stay stylish and warm",
    description: "From jackets to boots, gear up with our latest winter essentials.",
    imageSrc: "/images/winter.jpg",
    imageAlt: "Winter Collection"
  }
];



export default function HomePage() {
  return (
    <main>
      <Hero />

      <AboutMe></AboutMe>
      <div className="relative">

      <Skills />
  <Projects />
<div className="absolute inset-0 z-0">
  {/* <LightPillar
    topColor="#5227FF"
    bottomColor="#FF9FFC"
    intensity={0.5}
    rotationSpeed={0.5}
    glowAmount={0.002}
    pillarWidth={3.4}
    pillarHeight={0.3}
    noiseIntensity={0.5}
    pillarRotation={91}
    interactive={false}
    mixBlendMode="screen"
  /> */}
  <FloatingLines 
    enabledWaves={['top', 'middle']}
    // Array - specify line count per wave; Number - same count for all waves
    lineCount={3}
    // Array - specify line distance per wave; Number - same distance for all waves
    lineDistance={4}
    bendRadius={5}
    bendStrength={-0.5}
    interactive={true}
    parallax={true}
  />
  {/* <Plasma 
    color="#ff6b35"
    speed={0.6}
    direction="forward"
    scale={1.1}
    opacity={0.8}
    mouseInteractive={true}
  /> */}
</div>
      </div>
      {/* <Services /> */}
      {/* <MyService></MyService> */}
      <Contact />
      {/* <SeasonalHoverCards cards={cardArray} /> */}

      {/* <WorkExperience /> */}
      {/* <Footer /> */}
    </main>
  )
}
