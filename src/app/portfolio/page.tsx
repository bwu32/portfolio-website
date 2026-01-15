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
      year: 2025,
      title: "The Highborn",
      category: ["Product Design", "Commission"],
      image: "/icons/projects/lightsaber.jpg",
      description: "A custom lightsaber design that was designed and manufactured in collaboration with ThePachStore. Mass produced with 3000+ units sold worldwide.",
      builtWith: ["Fusion 360 (CAD / CAM)", "CNC Milling & Turning", "PCB Soldering"],
      link: "https://www.thepachstore.com/products/wf-highborn-custom-saber-2021",
      fullDescription: `This project involved extensive CAD work and manufacturing coordination. The design needed to balance aesthetic appeal with functional ergonomics for lightsaber combat enthusiasts.
      
      The manufacturing process required precision CNC machining and careful attention to detail in post-processing. Each unit was individually tested for quality assurance.`
    },
    {
      year: 2024,
      title: "Collegiate Wushu Tournament Medal",
      category: ["Product Design", "Personal"],
      image: "/icons/projects/medal.jpg",
      description: "Custom medal design for annual collegiate wushu tournament.",
      builtWith: ["Fusion 360 (CAD / CAM)", "3D Printing", "Metalworking"],
      link: "http://collegiatewushu.org/home.php",
      fullDescription: `Designed commemorative medals for the annual collegiate wushu championship tournament.`
    },
    {
      year: 2024,
      title: "Portfolio Website",
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
        <h1 className="text-7xl text-[#E8DDB5] font-['Impact']">ALL PROJCTS</h1>
        <p className="text-lg text-white mt-4 mb-12 opacity-50 max-w-[300px] leading-relaxed">now this is awesome.</p>
      </div>

      {/* Filter/Search Bar - Placeholder for now */}
      <div className="mb-8 p-6 rounded-lg bg-[#2b366d] bg-opacity-30">
        <p className="text-white opacity-50 text-sm">Filters coming soon...</p>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {projects.map((project, index) => (
          <div
            key={index}
            className={`relative rounded-lg p-6 cursor-pointer overflow-hidden transition-all duration-300 ease-out 
              ${typeof hoveredIndex === "number" && hoveredIndex !== index ? "opacity-50" : "opacity-100"}`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => setSelectedProject(index)}
          >
            <div className="absolute inset-0 bg-[#2b366d] opacity-30 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-[#5F72BF] to-[#2b366d] -translate-x-full hover:translate-x-0 transition-transform duration-500 ease-out" />
            </div>

            <div className="relative z-10 flex gap-6">
              {/* Year Column */}
              <div className="w-20 flex-shrink-0">
                <p className="text-white opacity-50 text-sm">{project.year}</p>
              </div>

              {/* Image */}
              <div className="w-48 h-32 relative flex-shrink-0 rounded-lg overflow-hidden bg-[#2b366d] bg-opacity-50">
                <Image
                  src={project.image}
                  alt={`${project.title} preview`}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    if (e.currentTarget.parentElement) {
                      e.currentTarget.parentElement.style.backgroundColor = '#2b366d';
                    }
                  }}
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  {/* Title and Categories */}
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl text-white font-medium transition-all duration-300 group-hover:text-[#f0e0a1] mb-2">
                        {project.title}
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.category.map((cat, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-3 py-1 rounded-full bg-[#2b366d] text-white opacity-60"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <p className="text-white opacity-60 text-sm leading-relaxed mb-3">
                    {project.description}
                  </p>
                </div>

                {/* Built With Tags */}
                <div>
                  <p className="text-white opacity-40 text-xs mb-2">Built with:</p>
                  <div className="flex flex-wrap gap-2">
                    {project.builtWith.map((tech, idx) => (
                      <div
                        key={idx}
                        className="relative rounded-full px-3 py-1 text-white text-opacity-60 bg-[#2b366d] overflow-hidden group/tag"
                      >
                        <span className="relative z-10 transition-all duration-500 ease-out group-hover/tag:text-[#f0e0a1] text-xs">
                          {tech}
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-[#5F72BF] to-[#2b366d] -translate-x-full group-hover/tag:translate-x-0 transition-transform duration-500 ease-out opacity-50" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Link Icon */}
              <div className="flex-shrink-0">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-white opacity-50 hover:opacity-100 transition-opacity"
                >
                  <ArrowUpRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Detail Modal - Coming next */}
      {selectedProject !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-8"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-[#1a1f3a] rounded-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-white text-2xl opacity-60 hover:opacity-100"
              onClick={() => setSelectedProject(null)}
            >
              ✕
            </button>
            
            <h2 className="text-4xl text-[#E8DDB5] mb-4 font-['Impact']">
              {projects[selectedProject].title}
            </h2>
            
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