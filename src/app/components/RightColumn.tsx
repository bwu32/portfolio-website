import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link";
import { useState } from "react";

export default function RightColumn() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [expHoveredIndex, setExpHoveredIndex] = useState<number | null>(null);

    const experiences = [
        {
            period: "2025 — PRESENT",
            title: "Design Intern",
            company: "New Dim Sum Kingdom",
            link: "https://www.newdimsumkingdom.com/",
            description:
                "number one victory royale yeah fortnite we're bout to get down get down 10 kills on the board right now just wiped out tomato town my friend just got downed i revived him now we're heading southbound",
        },
        {
            period: "2024 — PRESENT",
            title: "Social Media Manager",
            company: "Bethel College Fellowship",
            link: "https://instagram.com/bethelcollegefellowship",
            description:
                "the snow glows white on the mountain tonight not a footprint to be seen a kingdom of isolation and it looks like im the queen the wind is howling like this swirling storm inside couldn't keep it in heaven knows i tried",
        },
        {
            period: "2023 — 2024",
            title: "Graphic Designer",
            company: "Taiwanese American Student Association",
            link: "https://umcptasa.com",
            description:
                "number one victory royale yeah fortnite we're bout to get down get down 10 kills on the board right now just wiped out tomato town my friend just got downed i revived him now we're heading southbound",
        },
        {
            period: "2020 — 2021",
            title: "Lightsaber Design Intern",
            company: "ThePachStore",
            link: "https://thepachstore.com",
            description:
                "number one victory royale yeah fortnite we're bout to get down get down 10 kills on the board right now just wiped out tomato town my friend just got downed i revived him now we're heading southbound now we're in the pleasant park streets look at the map go to the marked sheets",
        },
    ]

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
    ]

    return (
        <div 
            style={{
                width: 'var(--right-col-width)',
                marginLeft: 'var(--right-start)'
            }}
        >
            <section id="about" className="mb-6 p-12 scroll-mt-12">
                <h1 className="text-2xl inline-block text-white mb-8">WHAT'S UP GAMERS.</h1>
                <div className="flex gap-12">
                    <div className="space-y-6 flex-1">
                        <p className="text-lg leading-relaxed mb-4">
                            hello there! i'm a senior studying{" "}
                            <a
                                href="https://ece.umd.edu/undergraduate/degrees/bs-computer-engineering"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block text-white hover:opacity-80 transition-opacity"
                            >
                                computer engineering
                            </a>{" "}
                            @ university of maryland, college park. i plan to graduate Spring 2026.
                        </p>

                        <p className="text-lg leading-relaxed mb-4">
                            i'm passionate about engineering solutions that blend{" "}
                            <a
                                href="https://www.merriam-webster.com/dictionary/creativity"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block text-white hover:opacity-80 transition-opacity"
                            >
                                creativity
                            </a>{" "}
                            with{" "}
                            <a
                                href="https://www.merriam-webster.com/dictionary/functionality"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block text-white hover:opacity-80 transition-opacity"
                            >
                                functionality
                            </a>
                            —and having fun while doing so! as a designer, i'm building up expertise in product, experience, and media design.
                        </p>

                        <p className="text-lg leading-relaxed mb-4">
                            outside of design, i enjoy working on props & apparel, learning a new dance, building legos, or getting that{" "}
                            <a
                                href="https://www.youtube.com/watch?v=Z0Uh3OJCx3o"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block text-white hover:opacity-80 transition-opacity"
                            >
                                #1 victory royale
                            </a>
                            .
                        </p>
                    </div>
                    <div className="w-60 h-65 relative">
                        <Image src="/icons/headshot.jpg" alt="Profile" fill className="object-cover rounded-lg" />
                    </div>
                </div>
            </section>

            <section id="experience" className="mb-6 p-12 scroll-mt-12">
                <h2 className="text-2xl mb-8 text-white">EXPERIENCE</h2>
                <div className="space-y-4">
                    {experiences.map((exp, index) => (
                        <a
                            key={index}
                            href={exp.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block"
                            onMouseEnter={() => setExpHoveredIndex(index)}
                            onMouseLeave={() => setExpHoveredIndex(null)}
                        >
                            <div
                                className={`relative rounded-lg p-6 group/exp cursor-pointer overflow-hidden transition-all duration-300 ease-out 
                                    ${typeof expHoveredIndex === "number" && expHoveredIndex !== index ? "opacity-50" : "opacity-100"}`}
                            >
                                <div className="absolute inset-0 bg-[#2b366d] opacity-30 transition-all duration-300">
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#5F72BF] to-[#2b366d] 
              -translate-x-full group-hover/exp:translate-x-0 transition-transform duration-500 ease-out" />
                                </div>

                                <div className="relative z-10">
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="opacity-50 text-white text-sm">{exp.period}</div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-lg text-white font-medium transition-all duration-300 group-hover/exp:text-[#f0e0a1]">
                                                {exp.title} - {exp.company}
                                            </h3>
                                            <ArrowUpRight className="w-4 h-4 opacity-50 text-white transition-all group-hover/exp:text-[#f0e0a1]" />
                                        </div>
                                    </div>
                                    <p className="text-white transition-opacity duration-300 group-hover/exp:opacity-100 opacity-60">
                                        {exp.description}
                                    </p>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>

                <a
                    href="https://docs.google.com/document/d/1e6fQ6P6m8larExX2ccj7fZfvQNDNU5cgAks3SnQANV4/edit?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-6 opacity-60 text-white hover:opacity-100 transition-opacity"
                >
                    view full resume
                    <ArrowUpRight className="w-4 h-4" />
                </a>
            </section>

            <section id="portfolio" className="mb-6 p-12 scroll-mt-12">
                <h2 className="text-2xl mb-8 text-white">SOME OF MY WORKS</h2>

                <Link
                    href="/portfolio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-6 opacity-60 text-white hover:opacity-100 transition-opacity"
                >
                    view full project archive
                    <ArrowUpRight className="w-4 h-4" />
                </Link>
            </section>

            <section id="skills" className="mb-6 p-12 scroll-mt-12">
                <h2 className="text-2xl mb-8 text-white">SKILLS</h2>
                <div className="space-y-4">
                    {skills.map((skillCategory, index) => (
                        <div
                            key={index}
                            className={`relative rounded-lg p-6 bg-[#2b366d] bg-opacity-30 overflow-hidden transition-all duration-300 ease-out ${hoveredIndex !== null && hoveredIndex !== index ? "opacity-50" : "opacity-100"}`}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <h3 className="text-white text-lg mb-4 font-medium">
                                {skillCategory.category}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {skillCategory.skills.map((skill, idx) => (
                                    <div
                                        key={idx}
                                        className="relative rounded-full px-4 py-2 text-white text-opacity-60 bg-[#2b366d] overflow-hidden group cursor-default"
                                    >
                                        <span className="relative z-10 transition-all duration-500 ease-out group-hover:text-[#f0e0a1]">
                                            {skill}
                                        </span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-[#5F72BF] to-[#2b366d] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out opacity-50" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <div className="h-screen"></div>
        </div>
    )
}