"use client"
import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowUpRight, Github, Linkedin, Mail, Instagram } from "lucide-react";
import Background from "./Background";

// --- TYPES ---
interface Experience {
    period: string;
    title: string;
    company: string;
    link: string;
    description: string;
}

interface Project {
    title: string;
    description: string;
    image: string;
    link: string;
    tech: string[];
}

interface SkillCategory {
    category: string;
    skills: string[];
}

export default function MobileView() {
    const [activeSection, setActiveSection] = useState<string>("ABOUT");
    const [fade, setFade] = useState(true);
    const activeSectionRef = typeof window !== 'undefined' ? require('react').useRef("ABOUT") : { current: "ABOUT" };
    const [showTopBtn, setShowTopBtn] = useState(false);

    // --- DATA ---
    const experiences: Experience[] = [
        {
            period: "2025 — 2026",
            title: "Design Intern",
            company: "New Dim Sum Kingdom",
            link: "https://www.newdimsumkingdom.com/",
            description: "number one victory royale yeah fortnite we're bout to get down get down 10 kills on the board right now just wiped out tomato town my friend just got downed i revived him now we're heading southbound",
        },
        {
            period: "2024 — PRESENT",
            title: "Social Media Manager",
            company: "Bethel College Fellowship",
            link: "https://instagram.com/bethelcollegefellowship",
            description: "the snow glows white on the mountain tonight not a footprint to be seen a kingdom of isolation and it looks like im the queen the wind is howling like this swirling storm inside couldn't keep it in heaven knows i tried",
        },
        {
            period: "2023 — 2024",
            title: "Graphic Designer",
            company: "Taiwanese American Student Association",
            link: "https://umcptasa.com",
            description: "number one victory royale yeah fortnite we're bout to get down get down 10 kills on the board right now just wiped out tomato town my friend just got downed i revived him now we're heading southbound",
        },
        {
            period: "2020 — 2021",
            title: "Lightsaber Design Intern",
            company: "ThePachStore",
            link: "https://thepachstore.com",
            description: "number one victory royale yeah fortnite we're bout to get down get down 10 kills on the board right now just wiped out tomato town my friend just got downed i revived him now we're heading southbound now we're in the pleasant park streets look at the map go to the marked sheets",
        },
    ];

    const projects: Project[] = [
        {
            title: "S.Q.U.I.D. Submersible Vehicle",
            description: "An automated pipeline that will detect whenever you achieve that #1 Victory Royale to generate and post celebratory/bragging LinkedIn posts.",
            image: "/icons/showcase/submarine.jpg",
            link: "https://docs.google.com/document/d/1_NqtkaeeCIUAikc76VfbriEUctMEloEBvPrhvJfcN-A/edit?usp=sharing",
            tech: ["Fusion 360", "Bambu Lab", "CNC Milling", "PCB Soldering", "Graphic Design"]
        },
        {
            title: "Fortnite LinkedIn Auto Poster",
            description: "An automated pipeline that will detect whenever you achieve that #1 Victory Royale to generate and post celebratory/bragging LinkedIn posts.",
            image: "/icons/showcase/linkedinautoposter.png",
            link: "https://github.com/bwu32/fortnitelinkedinautoposter",
            tech: ["Python", "OpenCV", "Tesseract OCR", "OpenAI API", "LinkedIn API", "Selenium"]
        },
        {
            title: "The Highborn Lightsaber",
            description: "A custom lightsaber design manufactured in collaboration with ThePachStore. Mass produced with 3000+ units sold worldwide.",
            image: "/icons/showcase/lightsaber.jpg",
            link: "https://www.thepachstore.com/products/wf-highborn-custom-saber-2021",
            tech: ["Fusion 360", "3D Printing", "CNC Milling", "PCB Soldering"]
        },
    ];

    const skills = [
        {
            category: "AI & Software Development",
            skills: [
                "AI Prompting",
                "Google Notebook LM",
                "Node.js",
                "React",
                "HTML",
                "CSS",
                "MATLAB",
                "Excel",
                "Java",
                "C",
                "Rust",
                "OCaml",
                "Google Workspace",
                "MS Teams",
                "Windows",
                "Zoom"
            ],
        },
        {
            category: "Design & Visual Media",
            skills: [
                "Figma",
                "Canva",
                "Adobe Creative Cloud",
                "Photoshop",
                "Premiere Pro",
                "After Effects",
                "Illustrator",
                "Paint.NET",
                "Audacity",
                "Blender",
                "DJI Ecosystem"
            ],
        },
        {
            category: "Digital Fabrication & Prototyping",
            skills: [
                "Fusion 360 (CAD / CAM)",
                "SolidWorks (CAD & FEA)",
                "Autodesk Inventor",
                "Onshape",
                "Meshmixer",
                "FDM & SLA 3D Printing",
                "PrusaSlicer",
                "Cura",
                "Laser Cutting",
                "CNC Milling & Turning",
                "Arduino",
                "PCB Soldering",
                "Circuitry",
                "Surface Post-Processing"
            ],
        },
        {
            category: "Creative & Practical Arts",
            skills: [
                "Sewing",
                "Embroidery",
                "Apparel Design",
                "Creative Prototyping",
                "Automotive Painting & Finishing",
                "DIY Repair",
                "Carpentry",
                "Dance"
            ],
        },
    ];

    useEffect(() => {
        const handleScroll = () => {
            // Show button after scrolling down 400px
            setShowTopBtn(window.scrollY > 400);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // --- INTERSECTION OBSERVER LOGIC ---
    useEffect(() => {
        const options = {
            // This margin ensures the label flips exactly as the section header passes the nav
            rootMargin: '-10% 0px -85% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const newSection = entry.target.id.toUpperCase();

                    // We use a functional state update to compare against the LATEST state
                    // without needing 'activeSection' in the dependency array.
                    setActiveSection((prev) => {
                        if (newSection !== prev) {
                            setFade(false);
                            setTimeout(() => {
                                setFade(true);
                                // This second update actually changes the text
                                setActiveSection(newSection);
                            }, 200);
                        }
                        return prev; // Don't change it yet, wait for the timeout
                    });
                }
            });
        }, options);

        const sections = ["about", "portfolio", "experience", "skills", "contact"];
        sections.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []); // Keep this empty [] - React is happy now.

    return (
        <div className="text-white min-h-screen px-6 py-12 font-sans">

            <div className="fixed inset-0 -z-10">
                <Background />
            </div>
            {/* HEADER - Keep the background color but it's not sticky */}
            <div className="bg-[#0f172a] -mx-6 px-6 pt-6 -mt-12">
                <header className="pb-8">
                    <h2 className="text-lg text-white/40 tracking-[0.3em] mb-2 font-bold uppercase">
                        PRODUCT DESIGNER
                    </h2>
                    <h1 className="text-7xl font-black text-[#E8DDB5] leading-none tracking-tight">
                        BRIAN WU
                    </h1>
                    <p className="mt-4 text-white/60 text-lg tracking-tight">
                        now this is awesome.
                    </p>
                </header>
            </div>

            {/* STICKY NAV - This must be a direct child of the scroll container to stick */}
            <nav className="sticky top-0 z-50 bg-[#0f172a]/80 backdrop-blur-md -mx-6 px-6 py-5 mb-12 border-b border-white/5 overflow-hidden">
                <div className={`transition-all duration-300 transform ${fade ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                    <span className="text-xl font-bold tracking-[0.2em] text-[#f0e0a1]">
                        {activeSection}
                    </span>
                </div>
            </nav>

            {/* CONTENT */}
            <main className="space-y-12">

                {/* ABOUT */}
                <section id="about" className="scroll-mt-28">
                    <div className="w-full h-80 relative rounded-2xl overflow-hidden mb-8 shadow-2xl border border-white/5">
                        <Image src="/icons/headshot.jpg" alt="Brian" fill className="object-cover" priority />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 uppercase tracking-tighter">What's up gamers.</h3>
                    <div className="space-y-4 text-[#f0e0a1] leading-relaxed text-lg">
                        <p>
                            hello there! i'm a senior studying <span className="text-white">computer engineering</span> @ university of maryland, college park.
                            i plan to graduate <span className="text-white">spring 2026</span>.
                        </p>
                        <p>
                            i'm passionate about engineering solutions that blend <span className="text-white">creativity</span> with <span className="text-white">functionality</span> — and having fun while doing so!
                        </p>
                        <p>
                            outside of design, i enjoy working on props & apparel, learning a new dance, building legos, or getting that <span className="text-white">#1 victory royale.</span>
                        </p>
                        <p className="opacity-70 italic text-sm">
                            please note that mobile view does not show complete features of my awesome website. viewing on pc is <span className="text-white">highly recommended</span>.
                        </p>
                    </div>
                    <div className="pt-12 flex justify-center">
                        <a
                            href="/bwu_resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative overflow-hidden px-8 py-4 rounded-full bg-[#2b366d]/10 border border-white/10 shadow-xl transition-all active:scale-95 active:bg-[#2b366d]/60 group"
                        >
                            {/* Subtle inner glow to give it that "bubble" depth */}
                            <span className="absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent pointer-events-none" />

                            {/* Shimmer effect stays but now matches the bubble container */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-active:animate-[shimmer_1.5s_infinite] pointer-events-none" />

                            {/* Text matches your Impact italic branding */}
                            <span className="relative z-10 font-bold tracking-[0.2em] uppercase text-md">
                                View Resume
                            </span>
                        </a>
                    </div>
                </section>

                {/* PORTFOLIO */}
                <section id="portfolio" className="scroll-mt-28">
                    <h2 className="text-2xl mb-8 text-white uppercase tracking-widest">SOME OF MY WORKS</h2>
                    <div className="space-y-10">
                        {projects.map((proj, i) => (
                            <a key={i} href={proj.link} className="block group">
                                <div className="relative w-full h-52 mb-4 rounded-xl overflow-hidden bg-[#1e293b]">
                                    <Image src={proj.image} alt={proj.title} fill className="object-cover opacity-90" />
                                </div>
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-xl font-bold group-active:text-[#f0e0a1]">{proj.title}</h3>
                                    <ArrowUpRight className="w-5 h-5 opacity-40" />
                                </div>
                                <p className="text-sm text-white/50 mb-4">{proj.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {proj.tech.map((t, idx) => (
                                        <span key={idx} className="relative overflow-hidden px-4 py-1.5 rounded-full text-[11px] font-medium opacity-60 bg-[#2b366d]/40 border border-white/10 shadow-sm transition-all active:bg-[#2b366d]/60">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </a>
                        ))}
                    </div>
                </section>

                {/* EXPERIENCE */}
                <section id="experience" className="scroll-mt-28">
                    <h2 className="text-2xl mb-8 text-white uppercase tracking-widest">Experience</h2>
                    <div className="space-y-12">
                        {experiences.map((exp, i) => (
                            <div key={i} className="border-l border-white/20 pl-6">
                                <span className="text-[10px] opacity-40 uppercase tracking-widest font-bold">{exp.period}</span>
                                <h3 className="text-lg font-bold mt-1">{exp.title}</h3>
                                <p className="text-[#f0e0a1]/80 text-sm mb-3 italic">{exp.company}</p>
                                <p className="text-sm text-white/50 leading-relaxed">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* SKILLS */}
                <section id="skills" className="scroll-mt-28">
                    <h2 className="text-2xl mb-8 text-white uppercase tracking-widest">Skills</h2>
                    <div className="space-y-8">
                        {skills.map((cat, i) => (
                            <div key={i}>
                                <h3 className="text-sm font-bold mb-4">{cat.category}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {cat.skills.map((s, idx) => (
                                        <span
                                            key={idx}
                                            className="relative overflow-hidden px-4 py-1.5 rounded-full text-[11px] font-medium opacity-60 bg-[#2b366d]/40 border border-white/10 shadow-sm transition-all active:bg-[#2b366d]/60"
                                        >
                                            {/* Subtle inner glow to give it that "bubble" depth */}
                                            <span className="absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent pointer-events-none" />

                                            <span className="relative z-10 uppercase tracking-wider">
                                                {s}
                                            </span>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section id="contact" className="scroll-mt-32 pb-24">
                    {/* Background matches the unified format: solid base + subtle top glow */}
                    <div className="relative bg-[#0f172a] p-8 rounded-3xl border border-white/10 text-center overflow-hidden">

                        {/* Subtle Background Glow bubble */}
                        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#2b366d]/30 rounded-full blur-[80px] pointer-events-none" />

                        <div className="relative z-10">
                            <h2 className="text-3xl font-black mb-2 uppercase tracking-tighter text-[#E8DDB5]">
                                Get in Touch!
                            </h2>
                            <p className="opacity-60 mb-8 text-sm italic">
                                Let's get that #1 victory royale together.
                            </p>

                            {/* Original Grid Layout */}
                            <div className="grid grid-cols-2 gap-3">
                                <SocialBtn href="mailto:bwu32@terpmail.umd.edu" icon={<Mail size={20} />} label="bwu32" />
                                <SocialBtn href="https://instagram.com/kachowoo" icon={<Instagram size={20} />} label="kachowoo" />
                                <SocialBtn href="https://linkedin.com/in/brianpwu" icon={<Linkedin size={20} />} label="brianpwu" />
                                <SocialBtn href="https://github.com/bwu32" icon={<Github size={20} />} label="bwu32" />
                            </div>

                            <p className="mt-12 text-[10px] text-white opacity-60 uppercase tracking-[0.5em] font-bold">
                                BRIAN WU © 2026
                            </p>
                        </div>
                    </div>
                </section>
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className={`fixed bottom-6 right-6 z-[60] p-2 rounded-full border border-white/20 shadow-2xl transition-all duration-500 backdrop-blur-sm group active:scale-90 ${showTopBtn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
                        }`}
                    aria-label="Scroll to top"
                >
                    {/* Inner Bubble Glow */}
                    <span className="absolute inset-0 rounded-full bg-gradient-to-b from-white/[0.1] to-transparent pointer-events-none" />

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#E8DDB5" // Using your signature cream color
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="relative z-10 transform group-active:-translate-y-1 transition-transform"
                    >
                        <path d="m17 11-5-5-5 5" />
                        <path d="m17 18l-5-5-5 5" />
                    </svg>
                </button>
            </main>
        </div>
    );
}

// Fixed SocialBtn Component
function SocialBtn({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 p-4 bg-white/[0.03] rounded-2xl border border-white/5 active:bg-[#2b366d]/60 active:scale-95 transition-all"
        // relative overflow-hidden px-4 py-1.5 rounded-full text-[11px] font-medium opacity-60 bg-[#2b366d]/40 border border-white/10 shadow-sm transition-all active:bg-[#2b366d]/60
        >
            <span className="text-white opacity-60">{icon}</span>
            <span className="text-xs font-medium uppercase tracking-wider text-white">
                {label}
            </span>
        </a>
    );
}