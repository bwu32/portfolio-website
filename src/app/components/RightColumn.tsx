import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link";
import { useState } from "react";

export default function RightColumn() {

    // for my containers
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [expHoveredIndex, setExpHoveredIndex] = useState<number | null>(null);
    const [projHoveredIndex, setProjHoveredIndex] = useState<number | null>(null);
    const [moreHoveredIndex, setMoreHoveredIndex] = useState<number | null>(null);

    const experiences = [
        {
            period: "2025 — 2026",
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

    const projects = [
        {
            title: "S.Q.U.I.D. Submersible Vehicle",
            description: "An automated pipeline that will detect whenever you achieve that #1 Victory Royale to generate and post celebratory/bragging LinkedIn posts.",
            image: "/icons/showcase/submarine.jpg",
            link: "https://docs.google.com/document/d/1_NqtkaeeCIUAikc76VfbriEUctMEloEBvPrhvJfcN-A/edit?usp=sharing",
            tech: ["Fusion 360 (CAD / CAM)", "Bambu Lab Slicer", "CNC Milling & Turning", "PCB Soldering", "Graphic Design"]
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
            description: "A custom lightsaber design that was designed and manufactured in collaboration with ThePachStore. Mass produced with 3000+ units sold worldwide.",
            image: "/icons/showcase/lightsaber.jpg",
            link: "https://www.thepachstore.com/products/wf-highborn-custom-saber-2021",
            tech: ["Fusion 360 (CAD / CAM)", "3D Printing", "CNC Milling & Turning", "PCB Soldering"]
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

    const coolStuff = [
        {
            title: "Guestbook",
            description: "stole ts from andrew cupps",
            link: "/guestbook"
        },
        {
            title: "Victory Royales",
            description: "just wiped out tomato town",
            link: "/vicroys"
        },
        {
            title: "Lego Collection",
            description: "needed a third thing so my 'more' tab would light up",
            link: "/legos"
        }
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
                            @ university of maryland, college park. i plan to graduate spring 2026.
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

            <section id="portfolio" className="mb-6 p-12 scroll-mt-12">
                <h2 className="text-2xl mb-8 text-white uppercase tracking-widest">SOME OF MY WORKS</h2>

                <div className="space-y-4 mb-6">
                    {projects.map((project, index) => (
                        <a
                            key={index}
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block"
                            onMouseEnter={() => setProjHoveredIndex(index)}
                            onMouseLeave={() => setProjHoveredIndex(null)}
                        >
                            <div
                                className={`relative rounded-lg p-6 group/proj cursor-pointer overflow-hidden transition-all duration-300 ease-out 
          ${typeof projHoveredIndex === "number" && projHoveredIndex !== index ? "opacity-50" : "opacity-100"}`}
                            >
                                {/* Animated Background Gradient */}
                                <div className="absolute inset-0 bg-[#2b366d] opacity-30 transition-all duration-300">
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#5F72BF] to-[#2b366d] 
              -translate-x-full group-hover/proj:translate-x-0 transition-transform duration-500 ease-out" />
                                </div>

                                {/* Main Content Container - min-h instead of fixed h */}
                                <div className="relative z-10 flex flex-col md:flex-row gap-6 min-h-[8rem]">

                                    {/* Project Screenshot - flex-shrink-0 prevents image squashing */}
                                    <div className="w-48 h-32 relative flex-shrink-0 rounded-lg overflow-hidden bg-[#2b366d] bg-opacity-50">
                                        <Image
                                            src={project.image}
                                            alt={`${project.title} screenshot`}
                                            fill
                                            className="object-cover transition-transform duration-300 group-hover/proj:scale-105"
                                            onError={(e) => {
                                                e.currentTarget.style.display = 'none';
                                                if (e.currentTarget.parentElement) {
                                                    e.currentTarget.parentElement.style.backgroundColor = '#2b366d';
                                                }
                                            }}
                                        />
                                    </div>

                                    {/* Project Text & Tags - flex-1 allows this to take remaining space */}
                                    <div className="flex-1 min-w-0 flex flex-col">

                                        {/* Title and Description - mb-auto pushes tags to the bottom if block is tall */}
                                        <div className="mb-4">
                                            <div className="flex items-start justify-between mb-2">
                                                <h3 className="text-lg text-white font-medium transition-all duration-300 group-hover/proj:text-[#f0e0a1]">
                                                    {project.title}
                                                </h3>
                                                <ArrowUpRight className="w-4 h-4 opacity-50 text-white transition-all group-hover/proj:text-[#f0e0a1] flex-shrink-0 ml-2" />
                                            </div>

                                            <p className="text-white transition-opacity duration-300 group-hover/proj:opacity-100 opacity-60 text-sm leading-relaxed">
                                                {project.description}
                                            </p>
                                        </div>

                                        {/* Tech Stack Tags - flex-wrap allows them to flow into new lines */}
                                        <div className="flex flex-wrap gap-2 mt-auto">
                                            {project.tech.map((tech, idx) => (
                                                <div
                                                    key={idx}
                                                    className="relative rounded-full px-4 py-1.5 text-white text-opacity-60 bg-[#2b366d] overflow-hidden group/tag"
                                                >
                                                    <span className="relative z-10 transition-all duration-500 ease-out group-hover/tag:text-[#f0e0a1] text-xs font-medium">
                                                        {tech}
                                                    </span>
                                                    <div className="absolute inset-0 bg-gradient-to-r from-[#5F72BF] to-[#2b366d] -translate-x-full group-hover/tag:translate-x-0 transition-transform duration-500 ease-out opacity-50" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>

                <a
                    href="/portfolio"
                    className="inline-flex items-center gap-2 mt-6 opacity-60 text-white hover:opacity-100 transition-opacity font-medium"
                >
                    view full project archive
                    <ArrowUpRight className="w-4 h-4" />
                </a>
            </section>

            <section id="experience" className="mb-6 p-12 scroll-mt-12">
                <h2 className="text-2xl mb-8 text-white">EXPERIENCE (wip)</h2>
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
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#5F72BF] to-[#2b366d] -translate-x-full group-hover/exp:translate-x-0 transition-transform duration-500 ease-out" />
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
                    href="/bwu_resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-6 opacity-60 text-white hover:opacity-100 transition-opacity"
                >
                    view full resume
                    <ArrowUpRight className="w-4 h-4" />
                </a>
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

            <section id="more" className="mb-6 p-12 scroll-mt-12">
                <h2 className="text-2xl mb-8 text-white">COOL STUFF</h2>
                <div className="space-y-6 flex-1">
                    <p className="text-lg leading-relaxed mb-4">
                        thank you for visiting my website! if you'd like to contact me, please see my socials on the bottom left. also please be sure to check out the fun{" "}
                        <a
                            href="https://www.youtube.com/@bwu32"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block text-white hover:opacity-80 transition-opacity"
                        >
                            extras
                        </a>{" "}
                        i included!
                    </p>

                    {/* Cool Stuff Boxes */}
                    <div className="space-y-4 mb-8">
                        {coolStuff.map((item, index) => (
                            <a
                                key={index}
                                href={item.link}
                                rel="noopener noreferrer"
                                className="block"
                                onMouseEnter={() => setMoreHoveredIndex(index)}
                                onMouseLeave={() => setMoreHoveredIndex(null)}
                            >
                                <div
                                    className={`relative rounded-lg p-6 group/more cursor-pointer overflow-hidden transition-all duration-300 ease-out 
                            ${typeof moreHoveredIndex === "number" && moreHoveredIndex !== index ? "opacity-50" : "opacity-100"}`}
                                >
                                    <div className="absolute inset-0 bg-[#2b366d] opacity-30 transition-all duration-300">
                                        <div className="absolute inset-0 bg-gradient-to-r from-[#5F72BF] to-[#2b366d] 
                                -translate-x-full group-hover/more:translate-x-0 transition-transform duration-500 ease-out" />
                                    </div>

                                    <div className="relative z-10">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="text-lg text-white font-medium transition-all duration-300 group-hover/more:text-[#f0e0a1] mb-2">
                                                    {item.title}
                                                </h3>
                                                <p className="text-white transition-opacity duration-300 group-hover/more:opacity-100 opacity-60">
                                                    {item.description}
                                                </p>
                                            </div>
                                            <ArrowUpRight className="w-4 h-4 opacity-50 text-white transition-all group-hover/more:text-[#f0e0a1] flex-shrink-0 ml-3" />
                                        </div>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>

                    {/* Credits positioned to align with left sidebar icons */}
                    <div className="absolute bottom-12 left-0 text-md leading-relaxed opacity-70" style={{ marginLeft: 'var(--right-start)', paddingLeft: '3rem' }}>
                        <p>
                            designed in{" "}
                            <a
                                href="https://www.canva.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block text-white hover:opacity-80 transition-opacity"
                            >
                                canva
                            </a>{" "}
                            and vibe-coded in{" "}
                            <a
                                href="https://code.visualstudio.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block text-white hover:opacity-80 transition-opacity"
                            >
                                visual studio code
                            </a>
                            . built using{" "}
                            <a
                                href="https://nextjs.org"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block text-white hover:opacity-80 transition-opacity"
                            >
                                next.js
                            </a>{" "}
                            and{" "}
                            <a
                                href="https://tailwindcss.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block text-white hover:opacity-80 transition-opacity"
                            >
                                tailwind css
                            </a>
                            .<br /> set in the{" "}
                            <a
                                href="https://rsms.me/inter/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block text-white hover:opacity-80 transition-opacity"
                            >
                                inter
                            </a>{" "}
                            typeface. i may or may not be using{" "}
                            <a
                                href="https://playvalorant.com/en-us/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block text-white hover:opacity-80 transition-opacity"
                            >
                                valorant
                            </a>{" "}
                            typography.
                        </p>
                    </div>

                    {/* Spacer to ensure proper scroll stopping */}
                    <div className="h-[18.74rem]"></div>
                </div>
            </section>

        </div>
    )
}