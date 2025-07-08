'use client';

import { useEffect, useState } from 'react';

export default function Skills() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/skills')
      .then(res => res.json())
      .then(data => setSkills(data));
  }, []);

  return (
    <section className="py-16 text-black">
      <h2 className="text-3xl font-semibold mb-6">Skills</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {skills.map(skill => (
          <div key={skill._id} className="flex flex-col items-center gap-2">
            <img src={skill.iconUrl} alt={skill.name} className="w-12 h-12" />
            <p>{skill.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
