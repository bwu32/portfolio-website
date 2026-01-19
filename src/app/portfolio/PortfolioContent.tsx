"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useMemo, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import CursorGlow from "@/app/components/CursorGlow";
import Background from "@/app/components/Background";

// This will be your project type based on markdown frontmatter
interface Project {
  date: string;
  title: string;
  subtitle?: string; // Optional subtitle for sections
  madeAt: string;
  category: string[];
  image: string;
  builtWith: string[];
  link: string;
  slug: string;
  content?: string;
}

export default function PortfolioContent() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);

  // Load markdown files on component mount
  useEffect(() => {
    async function loadProjects() {
      try {
        // This will load all your markdown files
        const projectFiles = [
          'highborn-lightsaber',
          'wushu-medal',
          'portfolio-website'
        ];

        const loadedProjects = await Promise.all(
          projectFiles.map(async (slug) => {
            try {
              const response = await fetch(`/icons/projects/${slug}.md`);
              const text = await response.text();

              // Parse frontmatter and content
              const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
              const match = text.match(frontmatterRegex);

              if (match) {
                const frontmatter = match[1];
                const content = match[2];

                // Parse frontmatter fields
                const metadata: any = {};
                frontmatter.split('\n').forEach(line => {
                  const colonIndex = line.indexOf(':');
                  if (colonIndex > -1) {
                    const key = line.substring(0, colonIndex).trim();
                    let value: any = line.substring(colonIndex + 1).trim();

                    // Remove quotes
                    value = value.replace(/^["']|["']$/g, '');

                    // Parse arrays
                    if (value.startsWith('[') && value.endsWith(']')) {
                      value = value.slice(1, -1).split(',').map((v: string) =>
                        v.trim().replace(/^["']|["']$/g, '')
                      );
                    }

                    metadata[key] = value;
                  }
                });

                return {
                  ...metadata,
                  slug,
                  content,
                  category: Array.isArray(metadata.category) ? metadata.category : [],
                  builtWith: Array.isArray(metadata.builtWith) ? metadata.builtWith : [],
                } as Project;
              }
            } catch (error) {
              console.error(`Error loading ${slug}:`, error);
            }
            return null;
          })
        );

        setProjects(loadedProjects.filter(Boolean) as Project[]);
      } catch (error) {
        console.error('Error loading projects:', error);
        // Fallback to sample data if loading fails
        setProjects(sampleProjects);
      }
    }

    loadProjects();
  }, []);

  // Fallback sample data
  const sampleProjects: Project[] = [
    {
      date: "01/15/2025",
      title: "The Highborn",
      madeAt: "ThePachStore",
      category: ["Product Design", "Commission"],
      image: "/icons/projects/lightsaber.jpg",
      builtWith: ["Fusion 360", "CNC Milling", "PCB Soldering"],
      link: "https://www.thepachstore.com/products/wf-highborn-custom-saber-2021",
      slug: "highborn-lightsaber",
      content: "# The Highborn\n\nA custom lightsaber design..."
    }
  ];

  // Sort projects by date (most recent first) and memoize the result
  const sortedProjects = useMemo(() => {
    return [...projects].sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [projects]);

  // Helper function to get year from date
  const getYear = (dateString: string) => {
    return new Date(dateString).getFullYear().toString();
  };

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
      <div className="sticky top-0 z-20 py-4 grid grid-cols-12 gap-4 text-white text-sm font-medium opacity-100 border-b border-white border-opacity-20 -mx-2 px-2">
        <div className="col-span-1">Year</div>
        <div className="col-span-3">Project</div>
        <div className="col-span-2">Made at</div>
        <div className="col-span-3">Built with</div>
        <div className="col-span-3">Link</div>
      </div>

      {/* Projects List */}
      <div>
        {sortedProjects.map((project, index) => (
          <div
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => setSelectedProject(index)}
            className={`
        relative cursor-pointer transition-all duration-300 ease-out grid grid-cols-12 gap-4 py-6 border-b border-white border-opacity-20 group -mx-2 px-2
        ${typeof hoveredIndex === "number" && hoveredIndex !== index ? "opacity-50" : "opacity-100"}`}
          >
            {/* Hover background effect - Adjusted to fill the extended width */}
            <div className="absolute inset-y-0 -left-0 right-0 bg-gradient-to-r from-[#5F72BF] to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />

            {/* Year */}
            <div className="relative z-10 col-span-1 flex items-start">
              <p className="text-white opacity-60 text-sm leading-tight">{getYear(project.date)}</p>
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
                    className="text-xs px-3 py-1 rounded-full bg-[#2b366d] text-white text-opacity-60 
                   transition-all duration-300 
                   group-hover:text-[#E8DDB5] group-hover:text-opacity-100 
                   leading-tight"
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
            className="bg-[#1a1f3a] rounded-lg max-w-6xl w-full max-h-[85vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              className="absolute top-6 right-6 text-white text-3xl opacity-60 hover:opacity-100 transition-opacity z-50"
              onClick={() => setSelectedProject(null)}
            >
              ✕
            </button>

            <div className="flex gap-8 p-8">
              {/* Left Side - Images */}
              <div className="w-2/5 flex-shrink-0 space-y-6">
                {/* Clickable Title with Link */}
                <a
                  href={sortedProjects[selectedProject].link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group/title w-fit"
                >
                  <h2 className="text-4xl text-[#E8DDB5] font-['Impact'] group-hover/title:text-white transition-colors duration-300">
                    {sortedProjects[selectedProject].title}
                  </h2>
                  <ArrowUpRight className="w-6 h-6 text-[#E8DDB5] group-hover/title:text-white transition-colors duration-300" />
                </a>

                {/* Main Project Image */}
                <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                  <Image
                    src={sortedProjects[selectedProject].image}
                    alt={sortedProjects[selectedProject].title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Categories */}
                <div className="flex flex-wrap gap-2">
                  {sortedProjects[selectedProject].category.map((cat, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-3 py-1 rounded-full bg-[#2b366d] text-white opacity-60"
                    >
                      {cat}
                    </span>
                  ))}
                </div>

                {/* Additional images can go here */}
                {/* You can add more images in your markdown and display them here */}
              </div>

              {/* Right Side - Text Content */}
              <div className="flex-1 text-white space-y-6 overflow-y-auto pr-4">
                {/* Render markdown content with custom styling */}
                <ReactMarkdown
                  components={{
                    h1: ({ children, ...props }) => <h1 className="text-3xl font-['Impact'] text-[#E8DDB5] mb-4" {...props}>{children}</h1>,
                    h2: ({ children, ...props }) => <h2 className="text-2xl font-['Impact'] text-[#E8DDB5] mt-8 mb-3" {...props}>{children}</h2>,
                    h3: ({ children, ...props }) => <h3 className="text-xl font-medium text-white opacity-80 mt-6 mb-2" {...props}>{children}</h3>,
                    h4: ({ children, ...props }) => <h4 className="text-sm font-medium text-white opacity-60 uppercase tracking-wide mt-6 mb-3" {...props}>{children}</h4>,
                    p: ({ children, ...props }) => <p className="text-white opacity-80 leading-relaxed mb-4" {...props}>{children}</p>,
                    ul: ({ children, ...props }) => <ul className="list-disc list-inside space-y-2 mb-4 opacity-80" {...props}>{children}</ul>,
                    ol: ({ children, ...props }) => <ol className="list-decimal list-inside space-y-2 mb-4 opacity-80" {...props}>{children}</ol>,
                    li: ({ children, ...props }) => <li className="text-white opacity-80" {...props}>{children}</li>,
                    strong: ({ children, ...props }) => <strong className="text-[#E8DDB5] font-medium" {...props}>{children}</strong>,
                    em: ({ children, ...props }) => <em className="text-white opacity-90 italic" {...props}>{children}</em>,
                    code: ({ children, ...props }) => <code className="bg-[#2b366d] px-2 py-1 rounded text-sm font-mono" {...props}>{children}</code>,
                    pre: ({ children, ...props }) => <pre className="bg-[#2b366d] p-4 rounded-lg overflow-x-auto mb-4" {...props}>{children}</pre>,
                    blockquote: ({ children, ...props }) => <blockquote className="border-l-4 border-[#5F72BF] pl-4 italic opacity-80 mb-4" {...props}>{children}</blockquote>,
                    a: ({ children, ...props }) => <a className="text-[#E8DDB5] hover:text-white transition-colors underline" {...props}>{children}</a>,
                    img: ({ ...props }) => (
                      <div className="my-6">
                        <img
                          className="rounded-lg w-full"
                          {...props}
                          src={props.src?.startsWith('/') ? props.src : `/icons/projects/${sortedProjects[selectedProject].slug}/${props.src}`}
                        />
                      </div>
                    ),
                  }}
                >
                  {sortedProjects[selectedProject].content || ''}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      )}
      <CursorGlow />
      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 p-2 transition-all duration-300 group
             text-white opacity-60 hover:opacity-100 hover:text-[#E8DDB5] hover:scale-110"
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
          {/* Upper Chevron */}
          <path d="m17 11-5-5-5 5" />
          {/* Lower Chevron */}
          <path d="m17 18l-5-5-5 5" />
        </svg>
      </button>
    </main>
  );
}