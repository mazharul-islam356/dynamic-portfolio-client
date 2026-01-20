"use client";

import { useEffect, useState } from "react";
import axios from "@/utils/axiosInstance";
import Link from "next/link";
import TeamCarousel from "@/src/components/lightswind/team-carousel";

const teamMembers = [
  {
    id: "1",
    name: "GadgetCheap",
    role: "Founder",
    image: "/gadcheap.png",
    bio: "Visionary leader with 10+ years of experience.",
  },
  {
    id: "2",
    name: "MKS Outfit",
    role: "Founder",
    image: "/mks.jpg",
    bio: "Visionary leader with 10+ years of experience.",
  },
  {
    id: "3",
    name: "MaxCart",
    role: "Founder",
    image: "/maxcart.png",
    bio: "Visionary leader with 10+ years of experience.",
  },
  {
    id: "4",
    name: "Apple Newton",
    role: "Founder",
    image: "/applenewtn.png",
    bio: "Visionary leader with 10+ years of experience.",
  },
  {
    id: "5",
    name: "Cel tel",
    role: "Founder",
    image: "/celtel.png",
    bio: "Visionary leader with 10+ years of experience.",
  },
  {
    id: "6",
    name: "Taiba Mart",
    role: "Founder",
    image: "/taiba.png",
    bio: "Visionary leader with 10+ years of experience.",
  },
  {
    id: "7",
    name: "Gadget Bodda",
    role: "Founder",
    image: "/bodda.jpg",
    bio: "Visionary leader with 10+ years of experience.",
  },
];

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios
      .get("/projects")
      .then((res) => {
        setProjects(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch projects:", err);
        setError("Failed to load projects. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const contentVariants = {
    rest: { y: 0, transition: { duration: 0.2, ease: "easeOut" } },
    hover: { y: -5, transition: { duration: 0.2, ease: "easeOut" } },
  };

  return (
    <section className="bg-transparent text-white pb-20 px-4">
      {/* <h1 className="text-white text-4xl">My Showcase</h1> */}
      <TeamCarousel
        members={teamMembers}
        title="Project Showcase"
        background="black"
        // autoPlay={10000}
        onMemberChange={(member, index) => {
          console.log("Active member:", member.name);
        }}
      />
    </section>
  );
};

export default ProjectsSection;
