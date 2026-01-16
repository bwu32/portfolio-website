"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Background from "@/app/components/Background";
import CursorGlow from "@/app/components/CursorGlow";

export default function VictoryRoyales() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const wins = [
    { image: "/icons/vicroys/83125.png", date: "Aug 31 2025", description: "soup or man" },
    { image: "/icons/vicroys/81425.png", date: "Aug 14 2025", description: "cranked on em" },
    { image: "/icons/vicroys/8525.png", date: "Aug 5 2025", description: "no builds no problem" },
    { image: "/icons/vicroys/8525_2.png", date: "Aug 5 2025", description: "squad no deaths" },
    { image: "/icons/vicroys/8525_3.png", date: "Aug 5 2025", description: "duo rebooted and won" },
    { image: "/icons/vicroys/8425.png", date: "Aug 4 2025", description: "clutch" },
    { image: "/icons/vicroys/73025.png", date: "Jul 30 2025", description: "clean sweep" },
    { image: "/icons/vicroys/72825.png", date: "Jul 28 2025", description: "boxed like fish" },
    { image: "/icons/vicroys/72325.png", date: "Jul 23 2025", description: "zero ping vibes" },
    { image: "/icons/vicroys/73025_2.png", date: "Jul 30 2025", description: "duo win no heals" },
    { image: "/icons/vicroys/73025_3.png", date: "Jul 30 2025", description: "squad split drop worked" },
    { image: "/icons/vicroys/73025_4.png", date: "Jul 30 2025", description: "duo reboot comeback" },
    { image: "/icons/vicroys/72825_2.png", date: "Jul 28 2025", description: "real game no gimmicks" },
    { image: "/icons/vicroys/72825_3.png", date: "Jul 28 2025", description: "duo storm rotate perfect" },
    { image: "/icons/vicroys/72325_2.png", date: "Jul 23 2025", description: "squad held zone" },
    { image: "/icons/vicroys/7925_2.png", date: "Jul 9 2025", description: "duo double elim finish" },
    { image: "/icons/vicroys/7925.png", date: "Jul 9 2025", description: "sniped midair" },
    { image: "/icons/vicroys/7425.png", date: "Jul 4 2025", description: "storm held em" },
    { image: "/icons/vicroys/61025.png", date: "Jun 10 2025", description: "full squad wipe" },
    { image: "/icons/vicroys/51425.png", date: "May 14 2025", description: "one pump wonder" },
    { image: "/icons/vicroys/4625.png", date: "Apr 6 2025", description: "skybase win" },
    { image: "/icons/vicroys/32125.png", date: "Mar 21 2025", description: "edit course demon" },
    { image: "/icons/vicroys/31925.png", date: "Mar 19 2025", description: "flawless dub" },
    { image: "/icons/vicroys/31725.png", date: "Mar 17 2025", description: "third party king" },
    { image: "/icons/vicroys/31025.png", date: "Mar 10 2025", description: "storm surge survivor" },
    { image: "/icons/vicroys/12923.png", date: "Jan 29 2025", description: "cracked aim" },
    { image: "/icons/vicroys/12525_2.png", date: "Jan 25 2025", description: "squad held high ground" },
    { image: "/icons/vicroys/12525.png", date: "Jan 25 2025", description: "zone warrior" },
    { image: "/icons/vicroys/12225.png", date: "Jan 22 2025", description: "high ground held" },
    { image: "/icons/vicroys/12125.png", date: "Jan 21 2025", description: "spray meta abuse" },
    { image: "/icons/vicroys/11625.png", date: "Jan 16 2025", description: "double edit kill" },
    { image: "/icons/vicroys/1625.png", date: "Jan 6 2025", description: "first drop win" },
    { image: "/icons/vicroys/1525.png", date: "Jan 5 2025", description: "landed hot won hotter" },
    { image: "/icons/vicroys/1525_2.png", date: "Jan 5 2025", description: "duo clutch endgame" },
    { image: "/icons/vicroys/9924.png", date: "Sep 9 2024", description: "real game only" },
    { image: "/icons/vicroys/7424.png", date: "Jul 4 2024", description: "squad wiped whole lobby" },
    { image: "/icons/vicroys/7124.png", date: "Jul 1 2024", description: "duo locked in" },
    { image: "/icons/vicroys/112423.png", date: "Nov 24 2023", description: "full squad push worked" },
    { image: "/icons/vicroys/112323_2.png", date: "Nov 23 2023", description: "duo synergy unmatched" },
    { image: "/icons/vicroys/112323.png", date: "Nov 23 2023", description: "team comms on point" },
  ];

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;

      if (e.key === "Escape") {
        setSelectedIndex(null);
      } else if (e.key === "ArrowLeft") {
        setSelectedIndex((prev) => (prev !== null ? (prev - 1 + wins.length) % wins.length : null));
      } else if (e.key === "ArrowRight") {
        setSelectedIndex((prev) => (prev !== null ? (prev + 1) % wins.length : null));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, wins.length]);

  return (
    <main
      className="min-h-screen py-12"
      style={{
        paddingLeft: '240px',
        paddingRight: '240px'
      } as React.CSSProperties}
    >
      <div className="fixed inset-0 -z-10">
        <Background />
      </div>
      {/* Subheading with link back home */}
      <Link
        href="/"
        className="group text-2xl text-white mb-2 opacity-50 hover:opacity-100 transition-opacity inline-flex items-center gap-2"
      >
        <span
          className="relative -top-[2px] text-3xl leading-none transform transition-transform duration-300 group-hover:-translate-x-2"
        >
          &laquo;
        </span>
        <span className="tracking-wide">BRIAN WU</span>
      </Link>

      {/* Main Title */}
      <div>
        <h1 className="text-7xl text-[#E8DDB5] font-['Impact']">VICTORY ROYALES</h1>
        <p className="text-lg text-white mt-4 mb-12 opacity-50 max-w-[300px] leading-relaxed">now this is awesome.</p>
      </div>

      {/* Grid of Wins */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {wins.map((win, index) => (
          <div
            key={index}
            className={`relative rounded-lg overflow-hidden bg-[#2b366d] bg-opacity-30 transition-all duration-300 cursor-pointer 
              ${typeof hoveredIndex === "number" && hoveredIndex !== index ? "opacity-50" : "opacity-100"}`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => setSelectedIndex(index)}
          >
            {/* Gradient Hover Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#5F72BF] to-[#2b366d] -translate-x-full hover:translate-x-0 transition-transform duration-500 ease-out opacity-50" />

            {/* Screenshot */}
            <div className="relative w-full aspect-video">
              <Image
                src={win.image}
                alt="Victory Royale screenshot"
                fill
                className="object-cover"
              />
            </div>

            {/* Info */}
            <div className="relative z-10 p-4">
              <p className="text-sm text-white opacity-50">{win.date}</p>
              <p className="text-white text-lg">{win.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal (Fullscreen image with animation + keyboard nav) */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
          >
            {/* Close Button (viewport corner) */}
            <button
              className="absolute top-6 right-6 text-white text-4xl font-bold z-50 hover:scale-110 transition-transform"
              onClick={() => setSelectedIndex(null)}
            >
              ✕
            </button>

            <motion.div
              className="relative max-w-5xl w-full p-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
            >
              <Image
                src={wins[selectedIndex].image}
                alt="Fullscreen Victory Royale"
                width={1920}
                height={1080}
                className="object-contain w-full h-auto rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <CursorGlow/>
    </main>
  );
}