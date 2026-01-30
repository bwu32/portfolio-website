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
            image: "/icons/mediums/cr10.png",
            title: "CR-10 v3",
            description: "I was excited to use this new 3d printer because it had a much bigger build volume than all of my previous printers, but was sorely disappointed by its uneven heat bed temps and the fact that everything in the hot end was proprietary. Made disassembling / relearning it a total hassle. I don't use it much anymore.",
            category: "3D Printer",
            dateInUse: "Sep 2021"
        },
        {
            image: "/icons/mediums/singer.png",
            title: "Singer Heavy Duty 34S",
            description: "Inspired to make a spiderman suit, I first taught myself how to sew in my freshman year of college on the makerspace sewing machine. I got my own one year for Christmas. I have since switched over to other forms of apparel i.e dresses, bags, tops, jeans. I love sewing and enjoy learning how to make new things!",
            category: "Sewing Machine",
            dateInUse: "Dec 2024"
        },
        {
            image: "/icons/mediums/cricut.png",
            title: "Cricut Maker 3",
            description: "I was graciously given this machine from a friend for now, and I have been using it to cut out stickers, heat transfer vinyl designs for apparel, and more. It is very easy to use and super convenient now that I have one at my disposal.",
            category: "Cutting Machine",
            dateInUse: "Jun 2025"
        },
        {
            image: "/icons/mediums/airbrush.webp",
            title: "Airbrush",
            description: "I am still not very well-versed with airbrushes, but I recently obtained a set of airbrush paints. This is a safer and healthier alternative to aerosol spray cans which is what I've been primarily using for my props. Looking forward to learning more precision painting skills!",
            category: "Airbrush Kit",
            dateInUse: "Jun 2024"
        },
        {
            image: "/icons/mediums/fusion360.png",
            title: "Autodesk Fusion 360",
            description: "I first learned about autodesk programs back in 2018 with Inventor. However, when COVID hit I resorted to Fusion due to its cloud-based aspect. I was able to design a bunch of different things out of boredom in quarantine, and I built up my skills in both parametric CAD and organic modeling.",
            category: "CAD Modeling Program",
            dateInUse: "Mar 2020"
        },
        {
            image: "/icons/mediums/canva.png",
            title: "Canva",
            description: "I was first introduced to this program in college when I needed to do collaborative design work. It's now one of my primary graphic design mediums due to how simple and easy it is to access and design with. Everything is cloud based which is nice.",
            category: "Graphic Design Program",
            dateInUse: "Sep 2022"
        },
        {
            image: "/icons/mediums/paintnet.png",
            title: "Paint.NET",
            description: "I've been using this program ever since I was a kid, designing minecraft skins / pixel art. I still use this as my primary visual medium when I don't need to collaborate with anyone since it's fast, efficient, and local. It's quite an old program though, so I only use it for rastor images.",
            category: "Graphic Design Program",
            dateInUse: "Jul 2017"
        },
        {
            image: "/icons/mediums/premiere.png",
            title: "Premiere Pro",
            description: "I first began editing vlog style videos, and have since moved on to short films. I have been able to make pretty snazzy edits without any external software, and really enjoy video editing in my spare time. Check out my short films in my portfolio!",
            category: "Video Editing Program",
            dateInUse: "Jun 2023"
        },
        {
            image: "/icons/mediums/adobe.png",
            title: "Adobe Creative Cloud",
            description: "Since my school has adobe creative cloud for free, I've had the opportunity to take advantage of all adobe products. I've learned specifics such as Illustrator and Photoshop. I want to learn After Effects!",
            category: "Design Program",
            dateInUse: "Sep 2022"
        },
        {
            image: "/icons/mediums/wpm.png",
            title: "124+ WPM",
            description: "Fun fact: I failed type to learn 4. I only use five fingers when typing! I just got used to this interesting way of typing, but since I work on computers most of the time, I was able to get pretty fast.",
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
                    #creativeswissarmyknife. come see what mediums i use when i create!
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
                                style={{
                                        // The first shadow is for depth, the second is the white glow
                                        filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.5))',
                                        // boxShadow: '0 0 40px 5px rgba(255, 255, 255, 0.1)'
                                    }}
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
                            <div className="w-full md:w-3/5 bg-black/20 flex justify-center items-center p-12">
                                <img
                                    src={items[selectedIndex].image}
                                    alt={items[selectedIndex].title}
                                    className="max-h-[75vh] w-auto rounded-md object-contain transition-all duration-700"
                                    style={{
                                        // The first shadow is for depth, the second is the white glow
                                        filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.5))',
                                        // boxShadow: '0 0 40px 5px rgba(255, 255, 255, 0.1)'
                                    }}
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