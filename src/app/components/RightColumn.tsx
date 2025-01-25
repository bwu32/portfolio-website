import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

export default function RightColumn() {
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
                "number one victory royale yeah fortnite we're bout to get down get down 10 kills on the board right now just wiped out tomato town my friend just got downed i revived him now we're heading southbound",
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
                "number one victory royale yeah fortnite we're bout to get down get down 10 kills on the board right now just wiped out tomato town my friend just got downed i revived him now we're heading southbound",
        },
    ]

    return (
        <div className="w-2/3 ml-[33.333333%]">
            <section id="about" className="mb-6 p-12">
                <h1 className="text-2xl text-white mb-8">WHAT'S UP GAMERS.</h1>
                <div className="flex gap-12">
                    <div className="space-y-6 flex-1">
                        <p className="text-lg opacity-100">
                            hello there! i'm a junior studying{" "}
                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white hover:opacity-80"
                            >
                                computer engineering
                            </a>{" "}
                            @ university of maryland, college park. i plan to graduate in 2026.
                        </p>
                        <p className="text-lg opacity-100">
                            i'm passionate about engineering solutions that blend{" "}
                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white hover:opacity-80"
                            >
                                creativity
                            </a>{" "}
                            with{" "}
                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white hover:opacity-80"
                            >
                                functionality
                            </a>
                            —and having fun while doing so! as a designer, i'm building up expertise in graphic, product, and media design.
                        </p>
                        <p className="text-lg opacity-100">
                            outside of design, i enjoy working on cosplay props, learning a new kpop dance, building legos, or getting that{" "}
                            <a
                                href="https://www.youtube.com/watch?v=Z0Uh3OJCx3o"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white hover:opacity-80"
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
            <section id="experience" className="mb-6 p-12">
                <h2 className="text-2xl mb-8 text-white">EXPERIENCE</h2>
                <div className="space-y-4">
                    {experiences.map((exp, index) => (
                        <a
                            key={index}
                            href={exp.link} // Replace with the specific URL for each experience
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block"
                        >
                            <div
                                className="relative rounded-lg p-6 group cursor-pointer overflow-hidden"
                            >
                                {/* Background rectangle with 15% opacity */}
                                <div className="absolute inset-0 bg-[#2b366d] opacity-20 group-hover:bg-gradient-to-r group-hover:opacity-40 group-hover:from-[#5666b6] group-hover:to-[#2b366d] transition-all duration-300" />

                                {/* Foreground content */}
                                <div className="relative z-10">
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="opacity-50 text-white text-sm">{exp.period}</div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-lg text-white font-medium group-hover:text-[#f0e0a1]">
                                                {exp.title} - {exp.company}
                                            </h3>
                                            <ArrowUpRight className="w-4 h-4 opacity-50 text-white" />
                                        </div>
                                    </div>
                                    <p className="opacity-60 text-white">{exp.description}</p>
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

            <section id="portfolio" className="mb-6 p-12">
                <h2 className="text-2xl mb-8 text-white">PORTFOLIO</h2>
                {/* Content will be added later */}
            </section>

            <section id="skills" className="mb-6 p-12">
                <h2 className="text-2xl text-white mb-8">SKILLS</h2>
                {/* Content will be added later */}
            </section>

            <section id="more" className="mb-6 p-12">
                <h2 className="text-2xl text-white mb-8">MORE</h2>
                {/* Content will be added later */}
            </section>

            {/* Add full page space after last section */}
            <div className="h-screen"></div>
        </div>
    )
}

