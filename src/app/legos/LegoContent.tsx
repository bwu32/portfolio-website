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
        { image: "/icons/legos/lightningmcqueen.png", date: "Jan 1 2026", description: "Lightning McQueen" },
        { image: "/icons/legos/mclarenw1.png", date: "Jan 1 2026", description: "McLaren W1" },
        { image: "/icons/legos/sonic.png", date: "Jan 1 2026", description: "Sonic’s Lightning Racer" },
        { image: "/icons/legos/porsche911.webp", date: "Jun 1 2025", description: "Porsche 911 GT3 RS" },
        { image: "/icons/legos/williams.webp", date: "Mar 1 2025", description: "Williams Racing FW46 Formula 1 Car" },
        { image: "/icons/legos/durr burger.png", date: "Oct 1 2024", description: "Fortnite Durrr Burger" },
        { image: "/icons/legos/f40.webp", date: "Aug 1 2024", description: "Ferrari F40 Supercar" },
        { image: "/icons/legos/amg.jpg", date: "Jun 1 2024", description: "Mercedes-AMG G 63 & Mercedes-AMG SL 63" },
        { image: "/icons/legos/audietron.webp", date: "Mar 1 2024", description: "Audi S1 e-tron quattro Race Car" },
        { image: "/icons/legos/captainrex.png", date: "Mar 1 2024", description: "Captain Rex Y-Wing Microfighter" },
        { image: "/icons/legos/darkhorse.webp", date: "Mar 1 2024", description: "Ford Mustang Dark Horse Sports Car" },
        { image: "/icons/legos/hpcar.png", date: "Mar 1 2024", description: "Flying Ford Anglia" },
        { image: "/icons/legos/lambo.webp", date: "Mar 1 2024", description: "Lamborghini Lambo V12 Vision GT Super Car" },
        { image: "/icons/legos/mclarenf1.png", date: "Mar 1 2024", description: "2023 McLaren Formula 1 Race Car" },
        { image: "/icons/legos/mercedestechnic.png", date: "Mar 1 2024", description: "Mercedes-AMG F1 W14 E Performance Pull-Back" },
        { image: "/icons/legos/colemech.png", date: "Jan 1 2024", description: "Cole's Elemental Earth Mech" },
        { image: "/icons/legos/jaydragon.png", date: "Jan 1 2024", description: "Jay's Battle Pack" },
        { image: "/icons/legos/kaimech.webp", date: "Jan 1 2024", description: "Kai's Elemental Fire Mech" },
        { image: "/icons/legos/lloydmech.png", date: "Jan 1 2024", description: "Lloyd's Elemental Tech Mech" },
        { image: "/icons/legos/mandofighter.png", date: "Aug 1 2023", description: "The Mandalorian N-1 Starfighter Microfighter" },
        { image: "/icons/legos/codyhelmet.png", date: "Mar 1 2023", description: "Captain Cody Helmet" },
        { image: "/icons/legos/competizione.png", date: "Mar 1 2023", description: "Ferrari 812 Competizione" },
        { image: "/icons/legos/mclarensolus.png", date: "Mar 1 2023", description: "McLaren Solus GT & McLaren F1 LM" },
        { image: "/icons/legos/pagani.png", date: "Mar 1 2023", description: "Pagani Utopia" },
        { image: "/icons/legos/porsche963.png", date: "Mar 1 2023", description: "Porsche 963" },
        { image: "/icons/legos/jaymech.png", date: "Jan 1 2023", description: "Jay’s Lightning Mech EVO" },
         { image: "/icons/legos/lightningjet.png", date: "Jan 1 2023", description: "Jay’s Lightning Jet EVO" },
        { image: "/icons/legos/lloydevomech.png", date: "Jan 1 2023", description: "Lloyd's Mech Battle EVO" },
        { image: "/icons/legos/nissanskyline.png", date: "Jan 1 2023", description: "2 Fast 2 Furious Nissan Skyline GT-R (R34)" },
        { image: "/icons/legos/astonmartin.png", date: "Aug 1 2022", description: "007 Aston Martin DB5" },
        { image: "/icons/legos/noodleshop.png", date: "Jun 1 2022", description: "Downtown Noodle Shop" },
        { image: "/icons/legos/countach.webp", date: "Mar 1 2022", description: "Lamborghini Countach" },
        { image: "/icons/legos/lotus.png", date: "Mar 1 2022", description: "Lotus Evija" },
        { image: "/icons/legos/amg1.png", date: "Mar 1 2022", description: "Mercedes-AMG F1 W12 E Performance & Mercedes-AMG Project One" },
        { image: "/icons/legos/zane.png", date: "Jan 1 2021", description: "Zane's Titan Mech" },
        { image: "/icons/legos/bonsai.webp", date: "Jan 1 2021", description: "Bonsai Tree" },
        { image: "/icons/legos/flowerbouquet.png", date: "Jan 1 2021", description: "Flower Bouquet" },
        { image: "/icons/legos/xwing.jpg", date: "Jan 1 2021", description: "Luke Skywalker's X-Wing Fighter" },
        { image: "/icons/legos/x1ninjacharger.jpg", date: "Jan 1 2021", description: "X-1 Ninja Charger" },
        { image: "/icons/legos/boulderblaster.png", date: "Jan 1 2021", description: "Legacy Boulder Blaster" },
        { image: "/icons/legos/overlord.webp", date: "Jan 1 2021", description: "Legacy Overlord Dragon" },
        { image: "/icons/legos/legacybladecycle.jpg", date: "Jan 1 2019", description: "Kai's Blade Cycle" },
        { image: "/icons/legos/stormfighter.png", date: "Jan 1 2019", description: "Jay's Storm Fighter" }
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
                        className={`group relative rounded-lg overflow-hidden bg-[#2b366d] bg-opacity-30 transition-all duration-300 cursor-pointer
              ${typeof hoveredIndex === "number" && hoveredIndex !== index ? "opacity-50" : "opacity-100"}`}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        onClick={() => setSelectedIndex(index)}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-[#5F72BF] to-[#2b366d] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out opacity-30" />

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