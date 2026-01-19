"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Background from "@/app/components/Background";
import CursorGlow from "@/app/components/CursorGlow";

export default function LegoContent() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const legoSets = [
        { image: "/icons/legos/mclarenw1.jpg", date: "Jan 1 2026", description: "McLaren W1" },
        { image: "/icons/legos/porsche911.jpg", date: "Jun 1 2025", description: "Porsche 911 GT3 RS" },
        { image: "/icons/legos/f40.jpg", date: "Aug 1 2024", description: "Ferrari F40 Supercar" },
        { image: "/icons/legos/amg.jpg", date: "Jun 1 2024", description: "Mercedes-AMG G 63 & Mercedes-AMG SL 63" },
        { image: "/icons/legos/darkhorse.jpg", date: "Mar 1 2024", description: "Ford Mustang Dark Horse Sports Car" },
        { image: "/icons/legos/lambo.jpg", date: "Mar 1 2024", description: "Lamborghini Lambo V12 Vision GT Super Car" },
        { image: "/icons/legos/mclarenf1.jpg", date: "Mar 1 2024", description: "2023 McLaren Formula 1 Race Car" },
        { image: "/icons/legos/audietron.jpg", date: "Mar 1 2024", description: "Audi S1 e-tron quattro Race Car" },
        { image: "/icons/legos/mclarensolus.jpg", date: "Mar 1 2023", description: "McLaren Solus GT & McLaren F1 LM" },
        { image: "/icons/legos/porsche963.jpg", date: "Mar 1 2023", description: "Porsche 963" },
        { image: "/icons/legos/pagani.jpg", date: "Mar 1 2023", description: "Pagani Utopia" },
        { image: "/icons/legos/competizione.jpg", date: "Mar 1 2023", description: "Ferrari 812 Competizione" },
        { image: "/icons/legos/nissanskyline.jpg", date: "Jan 1 2023", description: "2 Fast 2 Furious Nissan Skyline GT-R (R34)" },
        { image: "/icons/legos/amg1.jpg", date: "Mar 1 2022", description: "Mercedes-AMG F1 W12 E Performance & Mercedes-AMG Project One" },
        { image: "/icons/legos/lotus.jpg", date: "Mar 1 2022", description: "Lotus Evija" },
    ];

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedIndex === null) return;

            if (e.key === "Escape") {
                setSelectedIndex(null);
            } else if (e.key === "ArrowLeft") {
                setSelectedIndex((prev) => (prev !== null ? (prev - 1 + legoSets.length) % legoSets.length : null));
            } else if (e.key === "ArrowRight") {
                setSelectedIndex((prev) => (prev !== null ? (prev + 1) % legoSets.length : null));
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedIndex, legoSets.length]);

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
                    href="https://www.lego.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors duration-300 block w-fit"
                >
                    <h1 className="text-7xl text-[#E8DDB5] hover:text-white font-['Impact']">
                        LEGO COLLECTION
                    </h1>
                </a>
                <p className="text-lg text-white mt-4 mb-12 opacity-50 max-w-[300px] leading-relaxed">now this is awesome.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {legoSets.map((win, index) => (
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
                                alt="LEGO set"
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
                                src={legoSets[selectedIndex].image}
                                alt="Fullscreen LEGO set"
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
                className="fixed bottom-8 right-8 p-2 transition-all duration-300 group text-white opacity-60 hover:opacity-100 hover:text-[#E8DDB5] hover:scale-110"
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