
import Hero from '@/components/Hero';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';

export default function HomePage() {
  return (
    <main className="max-w-7xl mx-auto px-4">
      <Hero />
      <Skills />
      {/* <Services /> */}
      <Projects />
      {/* <Experience />
      <Contact />
      <Footer /> */}
    </main>
  );
}
