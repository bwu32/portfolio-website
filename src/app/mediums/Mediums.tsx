"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Background from "@/app/components/Background";
import CursorGlow from "@/app/components/CursorGlow";
import { X } from "lucide-react";

export default function Mediums() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [showScrollTop, setShowScrollTop] = useState(false);

    // Hardcoded items - Add your creative mediums here
    const items = [
        {
            image: "/icons/mediums/bambulab.png",
            title: "Bambu Lab X1 Carbon",
            description: "I earned this 3d printer by getting a 3.83 gpa lol. This is a huge step up from all of my previous 3d printers with its AMS-1 system, allowing for seamless cloud-based printing!",
            category: "3D Printer",
            dateInUse: "Aug 2025"
        },
        {
            image: "/icons/mediums/ender3s1.png",
            title: "Ender 3 S1",
            description: "I got these (2x) on a giant discount and they are a slight upgrade in speed and quality from my Ender 3 Pros.",
            category: "3D Printer",
            dateInUse: "Jan 2024"
        },
        {
            image: "/icons/mediums/ender3.png",
            title: "Ender 3 Pro",
            description: "I first got this printer (4x) in 2020 when I was first getting into the hobby! I've used these printers for building so much random stuff over the years and I learned how to properly 3d print with this printer.",
            category: "3D Printer",
            dateInUse: "Jan 2020"
        },
        {
            image: "/icons/mediums/singer.png",
            title: "Singer Heavy Duty 34S",
            description: "hi",
            category: "Sewing Machine",
            dateInUse: "Dec 2024"
        },
        {
            image: "/icons/mediums/cricut.png",
            title: "Cricut Maker 3",
            description: "hi",
            category: "Cutting Machine",
            dateInUse: "Jun 2025"
        },
        {
            image: "/icons/mediums/fusion360.png",
            title: "Fusion 360",
            description: "hi",
            category: "Modeling Software",
            dateInUse: "Mar 2020"
        },
        {
            image: "/icons/mediums/canva.png",
            title: "Canva",
            description: "hi",
            category: "Graphic Design",
            dateInUse: "Sep 2022"
        },
        {
            image: "/icons/mediums/paintnet.png",
            title: "Paint.NET",
            description: "hi",
            category: "Graphic Design",
            dateInUse: "Jul 2017"
        },
        {
            image: "/icons/mediums/wpm.png",
            title: "124+ WPM",
            description: "hi",
            category: "Typing Speed",
            dateInUse: "birth"
        },
        // Add more items here following the same structure
    ];

    // Scroll to top button logic
    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > window.innerHeight);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Keyboard navigation for modal
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedIndex === null) return;
            if (e.key === "Escape") setSelectedIndex(null);
            else if (e.key === "ArrowLeft") {
                setSelectedIndex((prev) => (prev !== null ? (prev - 1 + items.length) % items.length : null));
            } else if (e.key === "ArrowRight") {
                setSelectedIndex((prev) => (prev !== null ? (prev + 1) % items.length : null));
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedIndex, items.length]);

    return (
        <main className="min-h-screen py-12 px-6 md:px-[240px]">
            <div className="fixed inset-0 -z-10"><Background /></div>
            <CursorGlow />

            {/* Navigation Header */}
            <Link href="/" className="group text-2xl text-white mb-2 opacity-50 hover:opacity-100 transition-opacity inline-flex items-center gap-2">
                <span className="relative -top-[2px] text-3xl leading-none transform transition-transform duration-300 group-hover:-translate-x-2">&laquo;</span>
                <span className="tracking-wide">BRIAN WU</span>
            </Link>

            <div>
                <h1 className="text-7xl text-[#E8DDB5] font-['Impact'] uppercase">MEDIUMS</h1>
                <p className="text-lg text-white mt-4 mb-12 opacity-50 max-w-[800px] leading-relaxed">
                    now this is awesome. come see what mediums i use when i create!
                </p>
            </div>

            {/* Pinterest Masonry Layout */}
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                {items.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        className={`break-inside-avoid relative group cursor-pointer transition-opacity duration-300
                            ${hoveredIndex !== null && hoveredIndex !== index ? "opacity-50" : "opacity-100"}`}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        onClick={() => setSelectedIndex(index)}
                    >
                        {/* Image Container */}
                        <div className="relative overflow-hidden rounded-lg bg-[#2b366d]/30 border border-white/5 group-hover:border-[#5F72BF]/40 transition-all duration-500">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#2b366d]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>

                        {/* Caption underneath image in the same block */}
                        <div className="mt-3 px-1">
                            <p className="text-[#E8DDB5] font-['Impact'] text-xl uppercase tracking-wider leading-tight">
                                {item.title}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Modal Pop-up */}
            <AnimatePresence>
                {selectedIndex !== null && (
                    <motion.div
                        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedIndex(null)}
                    >

                        <div className="absolute inset-0 flex items-center justify-between px-4 md:px-12 pointer-events-none">
                            <button
                                className="p-4 text-white/30 hover:text-[#E8DDB5] transition-colors pointer-events-auto"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedIndex((prev) => (prev !== null ? (prev - 1 + items.length) % items.length : null));
                                }}
                            >
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="m15 18-6-6 6-6" />
                                </svg>
                            </button>
                            <button
                                className="p-4 text-white/30 hover:text-[#E8DDB5] transition-colors pointer-events-auto"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedIndex((prev) => (prev !== null ? (prev + 1) % items.length : null));
                                }}
                            >
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="m9 18 6-6-6-6" />
                                </svg>
                            </button>
                        </div>

                        {/* Close Button */}
                        <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-[60]">
                            <X size={40} strokeWidth={1.5} />
                        </button>

                        <motion.div
                            // ADDED: bg-[#1a1f3a] and the shadow/border styling from your portfolio
                            className="relative max-w-6xl w-full bg-[#1a1f3a]/70 border border-white/10 rounded-xl shadow-2xl flex flex-col md:flex-row overflow-hidden"
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Image Section: Left Side */}
                            <div className="w-full md:w-3/5 bg-black/20 flex justify-center items-center p-6">
                                <img
                                    src={items[selectedIndex].image}
                                    alt={items[selectedIndex].title}
                                    className="max-h-[75vh] w-auto rounded-md object-contain shadow-lg"
                                />
                            </div>

                            {/* Content Section: Right Side */}
                            <div className="w-full md:w-2/5 p-10 flex flex-col justify-center border-l border-white/5">
                                <h2 className="text-[#E8DDB5] font-['Impact'] text-4xl md:text-[2.75rem] uppercase tracking-tight mb-2 leading-none">
                                    {items[selectedIndex].title}
                                </h2>

                                <span className="text-[12px] text-[#5F72BF] uppercase tracking-[0.4em] font-bold mb-2 block">
                                    {items[selectedIndex].category}
                                </span>

                                <div className="h-[2px] w-14 bg-[#5F72BF] mb-4" /> {/* Accent Bar */}

                                <p className="text-white/80 text-lg leading-relaxed font-light">
                                    {items[selectedIndex].description}
                                </p>

                                <div className="mt-auto pt-8 border-t border-white/30">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[10px] text-white/60 uppercase tracking-[0.3em]">
                                            In use since <span className="text-[#E8DDB5]">{items[selectedIndex].dateInUse}</span>!
                                        </span>
                                        {/* <span className="text-[10px] text-white/10 uppercase tracking-[0.3em]">
                                            Item {selectedIndex + 1} of {items.length}
                                        </span> */}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Back to Top */}
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className={`fixed bottom-8 right-8 p-2 transition-all duration-500 z-50 group text-white hover:text-[#E8DDB5] 
                    ${showScrollTop ? "opacity-60 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}`}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:-translate-y-1 transition-transform">
                    <path d="m17 11-5-5-5 5" /><path d="m17 18l-5-5-5 5" />
                </svg>
            </button>
        </main>
    );
}