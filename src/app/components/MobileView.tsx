"use client"
import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowUpRight, Github, Linkedin, Mail, Instagram } from "lucide-react";
import Background from "./Background";

// --- TYPES (Keep as they were) ---
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

export default function MobileView() {
    const [showTopBtn, setShowTopBtn] = useState(false);

    // --- DATA (Keeping your existing data arrays) ---
    const experiences = [
        {
            period: "2025 — PRESENT",
            title: "Research & Design Assistant",
            company: "Professor Romel Gomez",
            link: "https://ece.umd.edu/clark/faculty/399/Romel-Gomez",
            description:
                "Collaborated with a professor on interdisciplinary research and engineering projects spanning mechanical and electromechanical systems. Designed an autonomous catch-and-release landing platform for drones using linear actuators and magnetic deployment. Developed a zero-tolerance, angle-agnostic docking system featuring a rotating core and custom magnetic drone legs to ensure reliable capture and interlock."
        },
        {
            period: "2024 — 2025",
            title: "Design Intern",
            company: "New Dim Sum Kingdom",
            link: "https://www.newdimsumkingdom.com/",
            description:
                "Created graphics and runs social media page to effectively promote and advertise the restaurant’s deals and updates as they occur. Worked directly with managers and owners to facilitate best interests of the restaurant through the social media page.",
        },
        {
            period: "2023 — 2024",
            title: "Graphic Designer",
            company: "Taiwanese American Student Association",
            link: "https://umcptasa.com",
            description:
                "Elevated the visual identity of social media platforms through collaborative design and publishing of 10+ graphics per month across cultural, social, and informational content, reaching 2,000+ students. Served on a 27-member board to plan and execute campus events promoting Taiwanese culture.",
        },
        {
            period: "2020 — 2021",
            title: "Lightsaber Designer Intern",
            company: "ThePachStore",
            link: "https://thepachstore.com",
            description:
                "Collaborated with ThePachStore’s design team, gaining hands-on insight into electronics production and the full product development pipeline. Led the design of The Highborn lightsaber model for mass production, resulting in 3,000+ units sold worldwide.",
        },
    ]

    const projects = [
        {
            title: "S.Q.U.I.D. Submersible Vehicle",
            description: "Designed structural and mechanical systems for a watertight autonomous submersible vehicle. Engineered modular electronics housing and sealing system using custom-machined components while serving as primary structural lead. ",
            image: "/icons/showcase/submarine.jpg",
            link: "https://docs.google.com/document/d/1_NqtkaeeCIUAikc76VfbriEUctMEloEBvPrhvJfcN-A/edit?usp=sharing",
            tech: [
                "Fusion 360 (CAD / CAM)",
                "CNC Milling & Turning",
                "FDM & SLA 3D Printing",
                "PCB Soldering",
                "Circuitry",
                "Arduino",
                "Mechanical Design",
                "Watertight Sealing",
                "Rapid Prototyping"
            ]
        },
        {
            title: "Fortnite LinkedIn Auto Poster",
            description: "An automated pipeline built using a hybrid computer vision and OCR pipeline to detect whenever you achieve that #1 Victory Royale to generate and post celebratory/bragging LinkedIn posts via Selenium and OpenAI API.",
            image: "/icons/showcase/linkedinautoposter.png",
            link: "https://github.com/bwu32/fortnitelinkedinautoposter",
            tech: [
                "Python",
                "Computer Vision",
                "OCR",
                "OpenAI API",
                "Selenium",
                "Web Automation",
                "AI Prompting",
                "Real-Time Detection",
                "Software Architecture"
            ]

        },
        {
            title: "CAN Bus Security Simulation",
            description: "Built a real-time CAN Bus security framework with multithreaded ECUs and layered cryptographic defenses, paired with a React/WebSocket dashboard for live attack monitoring, achieving 100% attack detection under 2ms latency.",
            image: "/icons/showcase/canbus.png",
            link: "https://www.thepachstore.com/products/wf-highborn-custom-saber-2021",
            tech: [
                "Python",
                "Multithreading",
                "Cryptography (AES, HMAC)",
                "CAN Bus Network",
                "Intrusion Detection Systems",
                "Rate Limiting",
                "React",
                "WebSockets",
                "Full-Stack",
            ]

        },
    ];

    const skills = [
        {
            category: "AI & Software Development",
            skills: ["AI Prompting", "Google Notebook LM", "Node.js", "React", "HTML", "CSS", "MATLAB", "Excel", "Java", "C", "Rust", "OCaml", "Google Workspace", "MS Teams", "Windows", "Zoom"],
        },
        {
            category: "Design & Visual Media",
            skills: ["Figma", "Canva", "Adobe Creative Cloud", "Photoshop", "Premiere Pro", "After Effects", "Illustrator", "Paint.NET", "Audacity", "Blender", "DJI Ecosystem"],
        },
        {
            category: "Digital Fabrication & Prototyping",
            skills: ["Fusion 360 (CAD / CAM)", "SolidWorks (CAD & FEA)", "Autodesk Inventor", "Onshape", "Meshmixer", "FDM & SLA 3D Printing", "PrusaSlicer", "Cura", "Laser Cutting", "CNC Milling & Turning", "Arduino", "PCB Soldering", "Circuitry", "Surface Post-Processing"],
        },
        {
            category: "Creative & Practical Arts",
            skills: ["Sewing", "Embroidery", "Apparel Design", "Creative Prototyping", "Automotive Painting & Finishing", "DIY Repair", "Carpentry", "Dance"],
        },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setShowTopBtn(window.scrollY > 400);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="text-white min-h-screen px-6 py-12 font-sans relative">
            <div className="fixed inset-0 -z-10">
                <Background />
            </div>

            {/* HEADER - Transparent background now */}
            <header className="pb-16 pt-4">
                <h2 className="text-lg text-white/40 tracking-[0.3em] mb-2 font-bold uppercase">
                    PRODUCT DESIGNER
                </h2>
                <h1 className="text-7xl font-black text-[#E8DDB5] -ml-1 tracking-tight leading-none">
                    BRIAN WU
                </h1>
                <p className="mt-4 text-white/60 text-lg tracking-tight">
                    now this is awesome.
                </p>
            </header>

            {/* CONTENT */}
            <main className="space-y-24">

                {/* ABOUT */}
                <section id="about">
                    <h2 className="text-2xl mb-8 text-white uppercase tracking-widest">ABOUT</h2>
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
                            <span className="absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent pointer-events-none" />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-active:animate-[shimmer_1.5s_infinite] pointer-events-none" />
                            <span className="relative z-10 font-bold tracking-[0.2em] uppercase text-md">
                                View Resume
                            </span>
                        </a>
                    </div>
                </section>

                {/* PORTFOLIO */}
                <section id="portfolio">
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
                    <div className="pt-12 flex justify-center">
                        <a
                            href="/portfolio"
                            rel="noopener noreferrer"
                            className="relative overflow-hidden px-8 py-4 rounded-full bg-[#2b366d]/10 border border-white/10 shadow-xl transition-all active:scale-95 active:bg-[#2b366d]/60 group"
                        >
                            <span className="absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent pointer-events-none" />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-active:animate-[shimmer_1.5s_infinite] pointer-events-none" />
                            <span className="relative z-10 font-bold tracking-[0.2em] uppercase text-md">
                                View Project Archive
                            </span>
                        </a>
                    </div>
                </section>

                {/* EXPERIENCE */}
                <section id="experience">
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
                <section id="skills">
                    <h2 className="text-2xl mb-8 text-white uppercase tracking-widest">Skills</h2>
                    <div className="space-y-8">
                        {skills.map((cat, i) => (
                            <div key={i}>
                                <h3 className="text-sm font-bold mb-4">{cat.category}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {cat.skills.map((s, idx) => (
                                        <span key={idx} className="relative overflow-hidden px-4 py-1.5 rounded-full text-[11px] font-medium opacity-60 bg-[#2b366d]/40 border border-white/10 shadow-sm transition-all active:bg-[#2b366d]/60">
                                            <span className="absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent pointer-events-none" />
                                            <span className="relative z-10 uppercase tracking-wider">{s}</span>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CONTACT */}
                <section id="contact" className="pb-24">
                    <div className="relative bg-[#0f172a] p-8 rounded-3xl border border-white/10 text-center overflow-hidden">
                        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#2b366d]/30 rounded-full blur-[80px] pointer-events-none" />
                        <div className="relative z-10">
                            <h2 className="text-3xl font-black mb-2 uppercase tracking-tighter text-[#E8DDB5]">Get in Touch!</h2>
                            <p className="opacity-60 mb-8 text-sm italic">Let's get that #1 victory royale together.</p>
                            <div className="grid grid-cols-2 gap-3">
                                <SocialBtn href="mailto:bwu32@terpmail.umd.edu" icon={<Mail size={20} />} label="bwu32" />
                                <SocialBtn href="https://instagram.com/kachowoo" icon={<Instagram size={20} />} label="kachowoo" />
                                <SocialBtn href="https://linkedin.com/in/brianpwu" icon={<Linkedin size={20} />} label="brianpwu" />
                                <SocialBtn href="https://github.com/bwu32" icon={<Github size={20} />} label="bwu32" />
                            </div>
                            <p className="mt-12 text-[10px] text-white opacity-60 uppercase tracking-[0.5em] font-bold">BRIAN WU © 2026</p>
                        </div>
                    </div>
                </section>
            </main>

            {/* Scroll to Top Button (Remains identical) */}
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className={`fixed bottom-6 right-6 z-[60] p-2 rounded-full border border-white/20 shadow-2xl transition-all duration-500 backdrop-blur-sm group active:scale-90 ${showTopBtn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
            >
                <span className="absolute inset-0 rounded-full bg-gradient-to-b from-white/[0.1] to-transparent pointer-events-none" />
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E8DDB5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 transform group-active:-translate-y-1 transition-transform">
                    <path d="m17 11-5-5-5 5" /><path d="m17 18l-5-5-5 5" />
                </svg>
            </button>
        </div>
    );
}

function SocialBtn({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 p-4 bg-white/[0.03] rounded-2xl border border-white/5 active:bg-[#2b366d]/60 active:scale-95 transition-all"
        >
            <span className="text-white opacity-60">{icon}</span>
            <span className="text-xs font-medium uppercase tracking-wider text-white">{label}</span>
        </a>
    );
}