'use client';

import { useEffect, useState } from 'react';

export default function Hero() {
  const [hero, setHero] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4000/api/hero')
      .then(res => res.json())
      .then(data => setHero(data));
  }, []);

  if (!hero) return null;

  return (
    <section className="flex flex-col text-black lg:flex-row items-center py-20 gap-10">
      <img
        src={hero.imageUrl}
        alt="Your Portrait"
        className="w-48 h-48 object-cover rounded-full"
      />
      <div>
        <h1 className="text-4xl font-bold">{hero.name}</h1>
        <p className="mt-2 text-gray-600">{hero.tagline}</p>
        <a
          href="/resume.pdf"
          download
          className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Hire Me
        </a>
      </div>
    </section>
  );
}
