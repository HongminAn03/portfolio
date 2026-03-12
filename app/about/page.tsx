"use client";
import { useState } from "react";

const timeline = [
  {
    date: "v2003.03.03",
    title: "Born in Seoul, South Korea",
    description: "Date of Birth: March 3, 2003.",
  },
  {
    date: "v2004.02",
    title: "Moved to Europe",
    description:
      "2004 - 2005: Amsterdam, Netherlands.\n2005 - 2006: Paris, France.\n2006 - 2019: Düsseldorf, Germany.\nNotes: English in school, Korean at home, and German in public spaces.\nNaturally Trilingual from a young age.",
  },
  {
    date: "v2019.08",
    title: "Moved back to Korea",
    description:
      "2019 - 2021: Seoul, South Korea.\nNotes: Reconnected with Korean culture, clashing with my European upbringing.",
  },
  {
    date: "v2021.09",
    title: "Penn State",
    description:
      "2021 - 2022: College of Engineering, Computer Science major.\nNotes: First year of college, first taste of autonomy and independence.",
  },
  {
    date: "v2022.11",
    title: "Republic of Korea Army",
    description:
      "2022 - 2024: Served at the coastal frontlines as a coastal surveillance radar operator.\nNotes: Developed drone tracking software in Excel, awarded Special Warrior at discharge.",
  },
  {
    date: "v2024.09",
    title: "Back to Penn State",
    description:
      "2024 - Present: Declaration of Computer Science major.\nNotes: Keeping up with AI trends and building to solve",
  },
  {
    date: "v2025.01",
    title: "Founded the Korean Band Association",
    description:
      "2025 - Present: Founded KBA, built a community of 30+ members, performed at large stages (Krazy About Korea, Spring Festival, Spring Banquet)",
  },
  {
    date: "v2025.06",
    title: "Interned at Displicare",
    description:
      "2025: Fabless display driver IC company in Seoul.\nNotes: Solved a real flicker problem in PWM dimming, and built a hardware sensor tool from spare parts just because I was curious.",
  },
  {
    date: "v2025.09",
    title: "MyCord + Nittany AI Challenge",
    description:
      "2025: Participated in Nittany AI Challenge and HackPSU.\nNotes: Built a Discord-inspired messaging system in C, and co-created Nittany Buddy — a gamified study app powered by LLMs for the Nittany AI Challenge.",
  },
  {
    date: "Current Patch",
    title: "Loading...",
    description:
      "Building to Solve",
  },
];

export default function About() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <main className="max-w-2xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-bold tracking-tight mb-2 text-white">Character Profile</h1>
        <p className="text-blue-400 text-sm mb-1 uppercase tracking-widest">Version History & Patch Notes</p>
        <p className="text-gray-500 text-xs mb-12">Click any patch to expand.</p>

      <div className="relative">
        <div className="absolute left-2 top-0 bottom-0 w-px bg-gray-800" />

        <div className="space-y-8">
          {timeline.map((item, i) => (
            <div
              key={i}
              className="pl-10 relative cursor-pointer group"
              onClick={() => setExpanded(expanded === i ? null : i)}
            >
              <div className="absolute left-0 top-1 w-4 h-4 rounded-full border-2 border-gray-600 bg-[#0a0a0f] group-hover:border-blue-400 transition-colors" />
              <p className="text-xs text-gray-500 mb-1">{item.date}</p>
              <h3 className="font-semibold text-sm mb-1 text-gray-200">{item.title}</h3>
              {expanded === i && (
                <p className="text-sm text-gray-400 leading-relaxed whitespace-pre-line">{item.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
