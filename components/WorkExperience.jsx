// components/Experience.tsx
"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import ShinyTitle from "./ShinyTitle";

const experienceData = [
  {
    id: 1,
    company: "Softcelify",
    position: "Frontend Developer (Part-time)",
    duration: "Jan 2026 - Present",
    location: "Remote",
    type: "Part-time",
    description:
      "Currently working remotely on POS systems using modern frontend technologies. Contributing to scalable UI development while expanding backend knowledge with enterprise-level tooling.",
    responsibilities: [
      "Developing POS system dashboards using Next.js",
      "Building reusable UI components with Shadcn UI",
      "Implementing responsive layouts using Tailwind CSS",
      "Collaborating remotely with backend developers",
      "Learning and integrating PostgreSQL databases",
      "Working with NestJS and TypeScript for backend services",
    ],
    technologies: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Shadcn UI",
      "TypeScript",
      "PostgreSQL",
      "NestJS",
      "Git",
    ],
    logo: "SC",
  },

  {
    id: 2,
    company: "Squad Innovators",
    position: "Frontend Developer",
    duration: "Oct 2024 - Dec 2025",
    location: "Aftabnagar, Dhaka",
    type: "Onsite",
    description:
      "Worked extensively on large-scale eCommerce platforms and internal business systems. Delivered production-ready solutions for multiple clients while collaborating closely with designers and backend teams.",
    responsibilities: [
      "Developed 15+ production eCommerce websites",
      "Built full-featured storefronts using Next.js",
      "Worked on HRM management systems",
      "Contributed to company POS software",
      "Integrated JWT authentication and Firebase services",
      "Used Shadcn UI for design systems",
      "Optimized SEO and performance for client projects",
      "Collaborated with cross-functional teams onsite",
    ],
    technologies: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Shadcn UI",
      "JWT",
      "Firebase",
      "REST APIs",
      "GitHub",
    ],
    logo: "SI",
  },

  {
    id: 3,
    company: "Tech Vixo Digital Agency",
    position: "Frontend Developer",
    duration: "Aug 2024 - Sep 2024",
    location: "Remote",
    type: "Contract / Remote",
    description:
      "Worked briefly with the agency focusing on company portfolio websites and client-facing projects using React-based stacks.",
    responsibilities: [
      "Developed company portfolio website",
      "Implemented UI sections with React",
      "Styled layouts using Tailwind CSS",
      "Worked on client demo projects",
      "Collaborated remotely with designers",
    ],
    technologies: ["React", "Tailwind CSS", "JavaScript", "Git"],
    logo: "TV",
  },
];

const Experience = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [hoveredTech, setHoveredTech] = useState(null);
  const titleSizeClasses = {
    sm: "text-2xl",
    md: "text-3xl",
    lg: "text-4xl",
    xl: "text-5xl",
    "2xl": "text-5xl",
  };
  return (
    <section className="min-h-screen bg-black px-4 sm:px-6 lg:px-8">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center md:mb-16 mb-10">
          <h2
            className={cn(
              "font-black hero-font uppercase tracking-tight text-center  whitespace-nowrap z-10 md: text-4xl lg:text-4xl xl:text-5xl",
            )}
            style={{
              top: "4rem",
              color: "white",
            }}
          >
            <ShinyTitle
              text="Work Experience"
              disabled={false}
              speed={3}
              className="custom-class"
            />
          </h2>
        </div>

        {/* Experience Timeline */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Company Tabs - Left Side */}
          <div className="lg:col-span-4">
            <div className="sticky top-8 space-y-4">
              {experienceData.map((exp, index) => (
                <button
                  key={exp.id}
                  onClick={() => setActiveTab(index)}
                  className={`w-full text-left p-6 rounded-md transition-all duration-300 group
                    ${
                      activeTab === index
                        ? "bg-purple-500/20 border-2 border-purple-500/50 shadow-lg shadow-purple-500/20"
                        : "bg-gray-800/50 border-2 border-transparent hover:border-purple-500/30 hover:bg-gray-800"
                    }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Company Logo */}
                    <div
                      className={`w-14 h-14 rounded-md flex items-center justify-center text-lg font-bold transition-all duration-300
                      ${
                        activeTab === index
                          ? "bg-gradient-to-br from-purple-400 to-purple-600 text-white"
                          : "bg-gray-700 text-purple-400 group-hover:bg-purple-500/20"
                      }`}
                    >
                      {exp.logo}
                    </div>
                    <div className="flex-1">
                      <h3
                        className={`font-semibold text-lg transition-colors duration-300
                        ${activeTab === index ? "text-purple-400" : "text-white group-hover:text-purple-300"}`}
                      >
                        {exp.company}
                      </h3>
                      <p className="text-gray-400 text-sm">{exp.duration}</p>
                    </div>
                    {/* Active Indicator */}
                    <div
                      className={`w-2 h-2 rounded-full transition-all duration-300
                      ${activeTab === index ? "bg-purple-400 shadow-lg shadow-purple-400" : "bg-gray-600"}`}
                    />
                  </div>
                </button>
              ))}

              {/* Download Resume Button */}
              <button className="w-full mt-6 p-4 rounded-md bg-gradient-to-r from-purple-500/20 to-purple-600/20 border border-purple-500/30 text-purple-400 font-medium hover:from-purple-500/30 hover:to-purple-600/30 transition-all duration-300 flex items-center justify-center gap-2 group">
                <svg
                  className="w-5 h-5 group-hover:animate-bounce"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Download Resume
              </button>
            </div>
          </div>

          {/* Experience Details - Right Side */}
          <div className="lg:col-span-8">
            {experienceData.map((exp, index) => (
              <div
                key={exp.id}
                className={`transition-all duration-500 ${
                  activeTab === index
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4 hidden"
                }`}
              >
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-md p-8 border border-gray-700/50 shadow-xl">
                  {/* Header */}
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                        {exp.position}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 text-gray-400">
                        <span className="flex items-center gap-1">
                          <svg
                            className="w-4 h-4 text-purple-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                            />
                          </svg>
                          {exp.company}
                        </span>
                        <span className="text-purple-400">•</span>
                        <span className="flex items-center gap-1">
                          <svg
                            className="w-4 h-4 text-purple-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          {exp.location}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <span className="px-4 py-2 rounded-full bg-purple-500/20 text-purple-400 text-sm font-medium border border-purple-500/30">
                        {exp.type}
                      </span>
                      <span className="px-4 py-2 rounded-full bg-gray-700/50 text-gray-300 text-sm font-medium">
                        {exp.duration}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 mb-8 leading-relaxed text-lg">
                    {exp.description}
                  </p>

                  {/* Responsibilities */}
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-purple-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                        />
                      </svg>
                      Key Responsibilities
                    </h4>
                    <ul className="space-y-3">
                      {exp.responsibilities.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-gray-300"
                        >
                          <span className="mt-2 w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-purple-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                        />
                      </svg>
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {exp.technologies.map((tech, i) => (
                        <span
                          key={i}
                          onMouseEnter={() => setHoveredTech(tech)}
                          onMouseLeave={() => setHoveredTech(null)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 cursor-default
                            ${
                              hoveredTech === tech
                                ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/30 scale-105"
                                : "bg-gray-700/50 text-gray-300 hover:bg-gray-700"
                            }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Timeline connector for visual appeal */}
                <div className="hidden lg:flex justify-center my-8">
                  <div className="w-px h-16 bg-gradient-to-b from-purple-500/50 to-transparent" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-7 md:mt-0 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { number: "2+", label: "Years Experience" },
            { number: "35+", label: "Projects Completed" },
            { number: "2", label: "Companies Worked" },
            { number: "15+", label: "Technologies" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm rounded-md p-6 text-center border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300 group hover:shadow-lg hover:shadow-purple-500/10"
            >
              <h3 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                {stat.number}
              </h3>
              <p className="text-gray-400 text-sm sm:text-base">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
