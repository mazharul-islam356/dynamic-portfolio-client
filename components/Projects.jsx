'use client';

import { useEffect, useState } from 'react';

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/projects')
      .then(res => res.json())
      .then(data => {
        const sorted = data.sort((a, b) => a.order - b.order);
        setProjects(sorted);
      });
  }, []);

  return (
    <section className="py-20 bg-gray-50 text-black">
      <h2 className="text-3xl font-semibold mb-6">Projects</h2>
      <div className="grid gap-10">
        {projects.map(project => (
          <div key={project._id} className="bg-white rounded-lg shadow-lg p-6">
            <img src={project.imageUrl} className="w-full rounded-md mb-4" alt={project.title} />
            <h3 className="text-2xl font-bold">{project.title}</h3>
            <p className="text-gray-600 my-2">{project.description}</p>
            <div className="flex flex-wrap gap-2 my-2">
              {project.tech.map(tech => (
                <span key={tech} className="bg-blue-100 text-blue-600 px-2 py-1 rounded">
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex gap-4 mt-4">
              <a href={project.liveUrl} className="text-blue-500" target="_blank">Live Demo</a>
              <a href={project.githubUrl} className="text-gray-700" target="_blank">GitHub</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
