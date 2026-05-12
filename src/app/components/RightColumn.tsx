import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { useState } from "react";
import { experiences, projects, skills, aboutParagraphs } from "../data/portfolioData";

export default function RightColumn({ moreHoveredIndex, onMoreHover }: {
    moreHoveredIndex: number | null;
    onMoreHover: (i: number | null) => void;
}) {
    // for my containers
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [expHoveredIndex, setExpHoveredIndex] = useState<number | null>(null);
    const [projHoveredIndex, setProjHoveredIndex] = useState<number | null>(null);

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
                        {aboutParagraphs.map((para, i) => (
                            <p key={i} className="text-lg leading-relaxed mb-4">{para}</p>
                        ))}
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
                                                <h3 className="text-lg text-white font-medium transition-all duration-300 group-hover/proj:text-[#E8DDB5]">
                                                    {project.title}
                                                </h3>
                                                <ArrowUpRight className="w-4 h-4 opacity-50 text-white transition-all group-hover/proj:text-[#E8DDB5] flex-shrink-0 ml-2" />
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
                                                    <span className="relative z-10 transition-all duration-500 ease-out group-hover/tag:text-[#E8DDB5] text-xs font-medium">
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
                    className="group inline-flex items-center gap-2 mt-2 opacity-60 text-white hover:opacity-100 transition-opacity font-medium"
                >
                    view full project archive
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                </a>
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
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#5F72BF] to-[#2b366d] -translate-x-full group-hover/exp:translate-x-0 transition-transform duration-500 ease-out" />
                                </div>

                                <div className="relative z-10">
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="opacity-50 text-white text-sm">{exp.period}</div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-lg text-white font-medium transition-all duration-300 group-hover/exp:text-[#E8DDB5]">
                                                {exp.title} - {exp.company}
                                            </h3>
                                            <ArrowUpRight className="w-4 h-4 opacity-50 text-white transition-all group-hover/exp:text-[#E8DDB5]" />
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

                <div className="flex items-center gap-6 mt-6">
    {/* Resume 1 */}
    <a
        href="/bwu_resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-2 opacity-60 text-white hover:opacity-100 transition-opacity font-medium"
    >
        view full resume
        <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
    </a>

    {/* Subtle Leaning Divider */}
    <div className="h-4 w-[1px] bg-white/20 rotate-[15deg] mx-2" />

    {/* Resume 2 */}
    <a
        href="/bwu_design_resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-2 opacity-60 text-white hover:opacity-100 transition-opacity font-medium"
    >
        view design resume
        <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
    </a>
</div>
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
                <a
                    href="/mediums"
                    className="group inline-flex items-center gap-2 mt-6 opacity-60 text-white hover:opacity-100 transition-opacity font-medium"
                >
                    view creative mediums
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                </a>
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
                        {coolStuff.map((item, index) => {
                            const active = moreHoveredIndex === index;
                            return (
                            <a
                                key={index}
                                href={item.link}
                                rel="noopener noreferrer"
                                className="block"
                                onMouseEnter={() => onMoreHover(index)}
                                onMouseLeave={() => onMoreHover(null)}
                            >
                                <div
                                    className={`relative rounded-lg p-6 cursor-pointer overflow-hidden transition-all duration-300 ease-out
                            ${typeof moreHoveredIndex === "number" && !active ? "opacity-50" : "opacity-100"}`}
                                >
                                    <div className="absolute inset-0 bg-[#2b366d] opacity-30 transition-all duration-300">
                                        <div className={`absolute inset-0 bg-gradient-to-r from-[#5F72BF] to-[#2b366d] transition-transform duration-500 ease-out ${active ? "translate-x-0" : "-translate-x-full"}`} />
                                    </div>

                                    <div className="relative z-10">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className={`text-lg font-medium transition-all duration-300 mb-2 ${active ? "text-[#E8DDB5]" : "text-white"}`}>
                                                    {item.title}
                                                </h3>
                                                <p className={`text-white transition-opacity duration-300 ${active ? "opacity-100" : "opacity-60"}`}>
                                                    {item.description}
                                                </p>
                                            </div>
                                            <ArrowUpRight className={`w-4 h-4 flex-shrink-0 ml-3 transition-all ${active ? "text-[#E8DDB5] opacity-100" : "text-white opacity-50"}`} />
                                        </div>
                                    </div>
                                </div>
                            </a>
                            );
                        })}
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