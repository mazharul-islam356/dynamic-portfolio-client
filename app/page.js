"use client";
import Projects from "@/components/Projects";
import Hero from "@/components/Hero";
import MyService from "@/components/MyService";
import { SeasonalHoverCards } from "@/src/components/lightswind/seasonal-hover-cards";
import Skills from "@/components/Skills";
import AboutMe from "@/components/AboutMe";
import Contact from "@/components/Contact";
import Plasma from "@/components/Plasma";
import FloatingLines from "@/components/FloatingLines";
import PurpleGlowBackground from "@/components/GlowingBallsBackground";
import Experience from "@/components/WorkExperience";
import Footer from "@/components/Footer";

const cardArray = [
  {
    title: "Summer Vibes",
    subtitle: "Hot deals and sunny styles",
    description:
      "Explore our vibrant summer collection with up to 50% off on selected items.",
    imageSrc: "/images/summer.jpg", // Update with your actual image path
    imageAlt: "Summer Collection",
  },
  {
    title: "Autumn Trends",
    subtitle: "Cozy fashion for chilly days",
    description:
      "Check out our new arrivals perfect for layering in fall weather.",
    imageSrc: "/user.jpg",
    imageAlt: "Autumn Collection",
  },
  {
    title: "Winter Warmers",
    subtitle: "Stay stylish and warm",
    description:
      "From jackets to boots, gear up with our latest winter essentials.",
    imageSrc: "/images/winter.jpg",
    imageAlt: "Winter Collection",
  },
];

export default function HomePage() {
  return (
    <main>
      <Hero />
      <section className="relative bg-black text-white overflow-hidden py-32">
        <PurpleGlowBackground />

        {/* Smooth fade from previous */}
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent z-10" />

        <div className="relative z-20">
          <AboutMe />
          <Skills />
          <Projects />
          <Experience />
        </div>
      </section>
      {/* <Services /> */}
      {/* <MyService></MyService> */}
      <Contact />
      {/* <SeasonalHoverCards cards={cardArray} /> */}
      {/* <WorkExperience /> */}
    </main>
  );
}
