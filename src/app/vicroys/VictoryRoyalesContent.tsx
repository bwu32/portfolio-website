"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Background from "@/app/components/Background";
import CursorGlow from "@/app/components/CursorGlow";

export default function VictoryRoyalesContent() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const [showScrollTop, setShowScrollTop] = useState(false);

    // back to top button
    useEffect(() => {
        const handleScroll = () => {
            // Appears after scrolling down one full window height
            if (window.scrollY > window.innerHeight) {
                setShowScrollTop(true);
            } else {
                setShowScrollTop(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const wins = [
        { image: "/icons/projects/vicroys/123125.png", date: "Dec 31 2025", description: "recoil ray" },
        { image: "/icons/projects/vicroys/113025.png", date: "Nov 30 2025", description: "last game ever w talha n powlectro" },
        { image: "/icons/projects/vicroys/112225.png", date: "Nov 22 2025", description: "y am i always ded" },
        { image: "/icons/projects/vicroys/83125.png", date: "Aug 31 2025", description: "soup or man" },
        { image: "/icons/projects/vicroys/81425.png", date: "Aug 14 2025", description: "cranked on em" },
        { image: "/icons/projects/vicroys/8525.png", date: "Aug 5 2025", description: "no builds no problem" },
        { image: "/icons/projects/vicroys/8525_2.png", date: "Aug 5 2025", description: "squad no deaths" },
        { image: "/icons/projects/vicroys/8525_3.png", date: "Aug 5 2025", description: "duo rebooted and won" },
        { image: "/icons/projects/vicroys/8425.png", date: "Aug 4 2025", description: "clutch" },
        { image: "/icons/projects/vicroys/73025.png", date: "Jul 30 2025", description: "clean sweep" },
        { image: "/icons/projects/vicroys/72825.png", date: "Jul 28 2025", description: "boxed like fish" },
        { image: "/icons/projects/vicroys/72325.png", date: "Jul 23 2025", description: "zero ping vibes" },
        { image: "/icons/projects/vicroys/73025_2.png", date: "Jul 30 2025", description: "duo win no heals" },
        { image: "/icons/projects/vicroys/73025_3.png", date: "Jul 30 2025", description: "squad split drop worked" },
        { image: "/icons/projects/vicroys/73025_4.png", date: "Jul 30 2025", description: "duo reboot comeback" },
        { image: "/icons/projects/vicroys/72825_2.png", date: "Jul 28 2025", description: "real game no gimmicks" },
        { image: "/icons/projects/vicroys/72825_3.png", date: "Jul 28 2025", description: "duo storm rotate perfect" },
        { image: "/icons/projects/vicroys/72325_2.png", date: "Jul 23 2025", description: "squad held zone" },
        { image: "/icons/projects/vicroys/7925_2.png", date: "Jul 9 2025", description: "duo double elim finish" },
        { image: "/icons/projects/vicroys/7925.png", date: "Jul 9 2025", description: "sniped midair" },
        { image: "/icons/projects/vicroys/7425.png", date: "Jul 4 2025", description: "storm held em" },
        { image: "/icons/projects/vicroys/61025.png", date: "Jun 10 2025", description: "full squad wipe" },
        { image: "/icons/projects/vicroys/51425.png", date: "May 14 2025", description: "one pump wonder" },
        { image: "/icons/projects/vicroys/4625.png", date: "Apr 6 2025", description: "skybase win" },
        { image: "/icons/projects/vicroys/32125.png", date: "Mar 21 2025", description: "edit course demon" },
        { image: "/icons/projects/vicroys/31925.png", date: "Mar 19 2025", description: "flawless dub" },
        { image: "/icons/projects/vicroys/31725.png", date: "Mar 17 2025", description: "third party king" },
        { image: "/icons/projects/vicroys/31025.png", date: "Mar 10 2025", description: "storm surge survivor" },
        { image: "/icons/projects/vicroys/12923.png", date: "Jan 29 2025", description: "cracked aim" },
        { image: "/icons/projects/vicroys/12525_2.png", date: "Jan 25 2025", description: "squad held high ground" },
        { image: "/icons/projects/vicroys/12525.png", date: "Jan 25 2025", description: "zone warrior" },
        { image: "/icons/projects/vicroys/12225.png", date: "Jan 22 2025", description: "high ground held" },
        { image: "/icons/projects/vicroys/12125.png", date: "Jan 21 2025", description: "spray meta abuse" },
        { image: "/icons/projects/vicroys/11625.png", date: "Jan 16 2025", description: "double edit kill" },
        { image: "/icons/projects/vicroys/1625.png", date: "Jan 6 2025", description: "first drop win" },
        { image: "/icons/projects/vicroys/1525.png", date: "Jan 5 2025", description: "landed hot won hotter" },
        { image: "/icons/projects/vicroys/1525_2.png", date: "Jan 5 2025", description: "duo clutch endgame" },
        { image: "/icons/projects/vicroys/9924.png", date: "Sep 9 2024", description: "real game only" },
        { image: "/icons/projects/vicroys/7424.png", date: "Jul 4 2024", description: "squad wiped whole lobby" },
        { image: "/icons/projects/vicroys/7124.png", date: "Jul 1 2024", description: "duo locked in" },
        { image: "/icons/projects/vicroys/112423.png", date: "Nov 24 2023", description: "full squad push worked" },
        { image: "/icons/projects/vicroys/main.png", date: "Nov 23 2023", description: "duo synergy unmatched" },
        { image: "/icons/projects/vicroys/112323.png", date: "Nov 23 2023", description: "team comms on point" },
    ];

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

            <Link
                href="/"
                className="group text-2xl text-white mb-2 opacity-50 hover:opacity-100 transition-opacity inline-flex items-center gap-2"
            >
                <span className="relative -top-[2px] text-3xl leading-none transform transition-transform duration-300 group-hover:-translate-x-2">
                    &laquo;
                </span>
                <span className="tracking-wide">BRIAN WU</span>
            </Link>

            <div>
                <a
                    href="https://www.fortnite.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors duration-300 block w-fit"
                >
                    <h1 className="text-7xl text-[#E8DDB5] hover:text-white font-['Impact']">
                        VICTORY ROYALES
                    </h1>
                </a>
                <p className="text-lg text-white mt-4 mb-12 opacity-50 max-w-[300px] leading-relaxed">now this is awesome.</p>
            </div>

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
                        <div className="absolute inset-0 bg-gradient-to-r from-[#5F72BF] to-[#2b366d] -translate-x-full hover:translate-x-0 transition-transform duration-500 ease-out opacity-50" />

                        <div className="relative w-full aspect-video">
                            <Image
                                src={win.image}
                                alt="Victory Royale screenshot"
                                fill
                                className="object-cover"
                            />
                        </div>

                        <div className="relative z-10 p-4">
                            <p className="text-sm text-white opacity-50">{win.date}</p>
                            <p className="text-white text-lg">{win.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            <AnimatePresence>
                {selectedIndex !== null && (
                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedIndex(null)}
                    >
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
                            onClick={(e) => e.stopPropagation()}
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

            <CursorGlow />
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className={`fixed bottom-8 right-8 p-2 transition-all duration-500 z-50 group text-white hover:text-[#E8DDB5] hover:scale-110 
        ${showScrollTop
                        ? "opacity-60 translate-y-0 pointer-events-auto"
                        : "opacity-0 translate-y-10 pointer-events-none"
                    } hover:opacity-100`}
                aria-label="Scroll to top"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transform group-hover:-translate-y-1 transition-transform"
                >
                    <path d="m17 11-5-5-5 5" />
                    <path d="m17 18l-5-5-5 5" />
                </svg>
            </button>
        </main>
    );
}