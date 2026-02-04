"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import Marquee from "react-fast-marquee";
import Aurora from "./Aurora";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios
      .get("http://localhost:5000/api/skills")
      .then((res) => {
        setSkills(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch skills:", err);
        setError("Failed to load skills. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const getImageUrl = (skill) => {
    if (!skill.icon && !skill.iconId) return null;

    if (skill.icon) {
      if (skill.icon.includes("undefined/api/images/")) {
        const iconId = skill.icon.split("/api/images/").pop();
        return `http://localhost:5000/api/images/${iconId}`;
      }
      if (skill.icon.startsWith("http")) {
        return skill.icon;
      }
      if (skill.icon.startsWith("/api/images/")) {
        return `http://localhost:5000/api/${skill.icon}`;
      }
      return `http://localhost:5000/api/images/${skill.icon}`;
    }

    if (skill.iconId) {
      return `http://localhost:5000/api/images/${skill.iconId}`;
    }
    return null;
  };

  return (
    <div className="py-10 relative bg-transparent">
      {loading && <p>Loading...</p>}

      {error && <p>{error}</p>}

      {/* ⭐ SKILLS MARQUEE */}
      <Marquee speed={50} className="py-4">
        {skills.map((skill, idx) => {
          const imgUrl = getImageUrl(skill);
          if (!imgUrl) return null;
          console.log(imgUrl);
          return (
            <div
              key={idx}
              className="relative mx-6 flex items-center justify-center
             w-24 h-24 rounded-full overflow-hidden
             bg-transparent
             backdrop-blur-xl
             border border-white/10
             shadow-[0_4px_20px_rgba(0,0,0,0.2),
                     inset_0_1px_2px_rgba(255,255,255,0.25)]"
            >
              {/* GLASS REFLECTION */}

              <span
                className="absolute border-2 border-gray-50/10 inset-0 rounded-full pointer-events-none"
                style={{
                  background:
                    "linear-gradient(145deg, rgba(255,255,255,0.25), rgba(255,255,255,0))",
                }}
              />

              {/* IMAGE */}
              <Image
                width={100}
                height={100}
                src={imgUrl}
                alt={skill.name}
                className="relative w-20 h-20 object-contain rounded-full z-10"
              />
            </div>
          );
        })}
      </Marquee>
    </div>
  );
};

export default Skills;
