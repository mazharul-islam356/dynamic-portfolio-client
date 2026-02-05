import Image from "next/image";

import Marquee from "react-fast-marquee";

const skills = [
  {
    _id: "692db432e3e604c6f9503306",
    name: "TypeScript",
    icon: "https://www.outletexpense.xyz/uploads/260-Biplob-Hossen/1770289951_69847b1f2d65a.png",
  },
  {
    _id: "692dbc5ae3e604c6f9503309",
    name: "React Js",
    icon: "https://www.outletexpense.xyz/uploads/260-Biplob-Hossen/1770289906_69847af2b7aa7.png",
  },
  {
    _id: "692dbdd5e3e604c6f950330c",
    name: "Node js",
    icon: "https://www.outletexpense.xyz/uploads/260-Biplob-Hossen/1770289892_69847ae480af6.png",
  },
  {
    _id: "692dbe3ce3e604c6f9503312",
    name: "Figma",
    icon: "https://www.outletexpense.xyz/uploads/260-Biplob-Hossen/1770289875_69847ad3a33e9.png",
  },
  {
    _id: "692dbe85e3e604c6f9503315",
    name: "JWT",
    icon: "https://www.outletexpense.xyz/uploads/260-Biplob-Hossen/1770289854_69847abec90d2.png",
  },
  {
    _id: "692dbef5e3e604c6f9503318",
    name: "Tailwind Css",
    icon: "https://www.outletexpense.xyz/uploads/260-Biplob-Hossen/1770289838_69847aaeddfd5.png",
  },
  {
    _id: "692dc14ae3e604c6f9503321",
    name: "Next js",
    icon: "https://www.outletexpense.xyz/uploads/260-Biplob-Hossen/1770289822_69847a9e17542.png",
  },
  {
    _id: "692dc36be3e604c6f9503324",
    name: "Firebase",
    icon: "https://www.outletexpense.xyz/uploads/260-Biplob-Hossen/1770289807_69847a8f8aa77.png",
  },
  {
    _id: "692dc51ae3e604c6f950332b",
    name: "GitHub",
    icon: "https://www.outletexpense.xyz/uploads/260-Biplob-Hossen/1770289792_69847a8043d98.png",
  },
  {
    _id: "692dc5b3e3e604c6f950332e",
    name: "MongoDB",
    icon: "https://www.outletexpense.xyz/uploads/260-Biplob-Hossen/1770289776_69847a70f35de.png",
  },
  {
    _id: "6932eb2604e40bff9e5a5283",
    name: "JavaScript",
    icon: "https://www.outletexpense.xyz/uploads/260-Biplob-Hossen/1770289750_69847a56da460.png",
  },
];

const Skills = () => {
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   setLoading(true);
  //   setError(null);
  //   axios
  //     .get("http://localhost:5000/api/skills")
  //     .then((res) => {
  //       setSkills(res.data);
  //     })
  //     .catch((err) => {
  //       console.error("Failed to fetch skills:", err);
  //       setError("Failed to load skills. Please try again later.");
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, []);

  return (
    <div className="md:py-10 pt-10 relative bg-transparent">
      {/* ⭐ SKILLS MARQUEE */}
      <Marquee speed={50} className="py-4">
        {skills.map((skill, idx) => {
          console.log(skill.icon);
          return (
            <div
              key={idx}
              className="relative mx-6 flex items-center justify-center
             md:w-24 md:h-24 h-16 w-16 rounded-full overflow-hidden
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
                src={skill?.icon}
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
