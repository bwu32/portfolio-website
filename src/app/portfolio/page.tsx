"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Background from "@/app/components/Background";

export default function Portfolio() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  // Sample project data - replace with your actual projects
  const projects = [
    {
      year: "2025",
      title: "The Highborn",
      madeAt: "ThePachStore",
      category: ["Product Design", "Commission"],
      image: "/icons/projects/lightsaber.jpg",
      description: "A custom lightsaber design that was designed and manufactured in collaboration with ThePachStore. Mass produced with 3000+ units sold worldwide.",
      builtWith: ["Fusion 360", "CNC Milling", "PCB Soldering"],
      link: "https://www.thepachstore.com/products/wf-highborn-custom-saber-2021",
      fullDescription: `This project involved extensive CAD work and manufacturing coordination. The design needed to balance aesthetic appeal with functional ergonomics for lightsaber combat enthusiasts.
      
      The manufacturing process required precision CNC machining and careful attention to detail in post-processing. Each unit was individually tested for quality assurance.`
    },
    {
      year: "2024",
      title: "Collegiate Wushu Tournament Medal",
      madeAt: "UMD Wushu Club",
      category: ["Product Design", "Personal"],
      image: "/icons/projects/medal.jpg",
      description: "Custom medal design for annual collegiate wushu tournament.",
      builtWith: ["Fusion 360", "3D Printing", "Metalworking", "Fortnite", "Awesome"],
      link: "http://collegiatewushu.org/home.php",
      fullDescription: `Designed commemorative medals for the annual collegiate wushu championship tournament.`
    },
    {
      year: "2024",
      title: "Portfolio Website",
      madeAt: "",
      category: ["Digital", "Personal"],
      image: "/icons/projects/portfolio.jpg",
      description: "Personal portfolio website showcasing design and engineering work.",
      builtWith: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
      link: "/",
      fullDescription: `Built a modern, responsive portfolio website using Next.js and Tailwind CSS.`
    },
  ];

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
      
      {/* Header */}
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
        <h1 className="text-7xl text-[#E8DDB5] font-['Impact']">ALL PROJECTS</h1>
        <p className="text-lg text-white mt-4 mb-12 opacity-50 max-w-[300px] leading-relaxed">now this is awesome.</p>
      </div>

      {/* Sticky Column Headers */}
      <div className="sticky top-0 z-20 py-4 grid grid-cols-12 gap-4 text-white text-sm font-medium opacity-100 border-b border-white border-opacity-20">
        <div className="col-span-1">Year</div>
        <div className="col-span-3">Project</div>
        <div className="col-span-2">Made at</div>
        <div className="col-span-3">Built with</div>
        <div className="col-span-3">Link</div>
      </div>

      {/* Projects List */}
      <div>
        {projects.map((project, index) => (
          <div
            key={index}
            className={`relative cursor-pointer transition-all duration-300 ease-out grid grid-cols-12 gap-4 py-6 border-b border-white border-opacity-20 group
              ${typeof hoveredIndex === "number" && hoveredIndex !== index ? "opacity-50" : "opacity-100"}`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => setSelectedProject(index)}
          >
            {/* Hover background effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#5F72BF] to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-300 -mx-6" />

            {/* Year */}
            <div className="relative z-10 col-span-1 flex items-start">
              <p className="text-white opacity-60 text-sm leading-tight">{project.year}</p>
            </div>

            {/* Project */}
            <div className="relative z-10 col-span-3 flex items-start">
              <h3 className="text-white text-base leading-tight transition-all duration-300 group-hover:text-[#f0e0a1]">
                {project.title}
              </h3>
            </div>

            {/* Made at */}
            <div className="relative z-10 col-span-2 flex items-start">
              <p className="text-white opacity-60 text-sm leading-tight break-words">{project.madeAt}</p>
            </div>

            {/* Built With */}
            <div className="relative z-10 col-span-3 flex items-start">
              <div className="flex flex-wrap gap-2">
                {project.builtWith.map((tech, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-3 py-1 rounded-full bg-[#2b366d] text-white text-opacity-60 transition-all duration-300 group-hover:text-opacity-80 leading-tight"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Link */}
            <div className="relative z-10 col-span-3 flex items-start">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-white opacity-50 hover:opacity-100 transition-opacity text-sm flex items-start gap-1 leading-tight"
              >
                <span className="leading-tight">{project.link.includes('http') ? new URL(project.link).hostname.replace('www.', '') : project.link}</span>
                <ArrowUpRight className="w-3 h-3 flex-shrink-0 mt-0.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Project Detail Modal */}
      {selectedProject !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-8"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-[#1a1f3a] rounded-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-6 right-6 text-white text-3xl opacity-60 hover:opacity-100 transition-opacity"
              onClick={() => setSelectedProject(null)}
            >
              ✕
            </button>
            
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-4xl text-[#E8DDB5] font-['Impact']">
                {projects[selectedProject].title}
              </h2>
              <a
                href={projects[selectedProject].link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#E8DDB5] opacity-60 hover:opacity-100 transition-opacity"
              >
                <ArrowUpRight className="w-6 h-6" />
              </a>
            </div>

            {/* Project Image */}
            <div className="relative w-full h-64 mb-6 rounded-lg overflow-hidden">
              <Image
                src={projects[selectedProject].image}
                alt={projects[selectedProject].title}
                fill
                className="object-cover"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-4">
              {projects[selectedProject].category.map((cat, idx) => (
                <span
                  key={idx}
                  className="text-xs px-3 py-1 rounded-full bg-[#2b366d] text-white opacity-60"
                >
                  {cat}
                </span>
              ))}
            </div>
            
            <div className="text-white opacity-80 space-y-4">
              <p>{projects[selectedProject].fullDescription}</p>
              {/* Add more detailed content here */}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}