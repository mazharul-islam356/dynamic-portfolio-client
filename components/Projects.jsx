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
    image: "/gadcheap-p.jpg",
    bio: "Visionary leader with 10+ years of experience.",
    liveUrl: "https://gad-style-website-five.vercel.app",
  },
  {
    id: "2",
    name: "MKS Outfit",
    role: "Founder",
    image: "/mks.jpg",
    bio: "Visionary leader with 10+ years of experience.",
    liveUrl: "https://mksoutfit.vercel.app",
  },
  {
    id: "3",
    name: "MaxCart",
    role: "Founder",
    image: "/maxcart.png",
    bio: "Visionary leader with 10+ years of experience.",
    liveUrl: "https://example.com",
  },
  {
    id: "4",
    name: "Taiba Mart",
    role: "Founder",
    image: "/taiba-p.jpg",
    bio: "Visionary leader with 10+ years of experience.",
    liveUrl: "https://www.taibamart.com",
  },
  {
    id: "5",
    name: "Zunayed Saki (Portfolio)",
    role: "Founder",
    image: "/zunayeksaki-p.jpg",
    bio: "Visionary leader with 10+ years of experience.",
    liveUrl: "https://zunayedsaki.vercel.app",
  },
  {
    id: "6",
    name: "Voter Kotha",
    role: "Founder",
    image: "/voter-kotha-p.jpg",
    bio: "Visionary leader with 10+ years of experience.",
    liveUrl: "https://voterkotha.online",
  },
  {
    id: "7",
    name: "Gadget Bodda",
    role: "Founder",
    image: "/gadgetboadda-p.jpg",
    bio: "Visionary leader with 10+ years of experience.",
    liveUrl: "https://www.gadgetboddaa.com",
  },
];

const ProjectsSection = () => {
  // const cardVariants = {
  //   hidden: { opacity: 0, y: 50 },
  //   visible: {
  //     opacity: 1,
  //     y: 0,
  //     transition: { duration: 0.6, ease: "easeOut" },
  //   },
  // };

  // const contentVariants = {
  //   rest: { y: 0, transition: { duration: 0.2, ease: "easeOut" } },
  //   hover: { y: -5, transition: { duration: 0.2, ease: "easeOut" } },
  // };

  return (
    <section className="bg-transparent text-white md:pb-20 pb-5 px-4">
      {/* <h1 className="text-white text-4xl">My Showcase</h1> */}
      <TeamCarousel
        members={teamMembers}
        title="Project Showcase"
        background="black"
        autoPlay={10000}
        onMemberChange={(member, index) => {
          console.log("Active member:", member.name);
        }}
      />
    </section>
  );
};

export default ProjectsSection;
