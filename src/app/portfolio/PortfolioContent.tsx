"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useMemo, useEffect, useRef } from "react";
import { ArrowUpRight, Search, ChevronDown, RotateCcw } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import CursorGlow from "@/app/components/CursorGlow";
import Background from "@/app/components/Background";

interface Project {
    date: string;
    title: string;
    subtitle?: string;
    madeAt: string;
    category: string[];
    displayMode: 'professional' | 'artwork';
    image: string;
    images?: Array<{ src: string; caption: string }>;
    builtWith: string[];
    link: string;
    slug: string;
    content?: string;
}

export default function PortfolioContent() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [selectedProject, setSelectedProject] = useState<number | null>(null);
    const [projects, setProjects] = useState<Project[]>([]);

    const [displayMode, setDisplayMode] = useState<'all' | 'professional' | 'artwork' | 'custom'>('all');
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [showFilterDropdown, setShowFilterDropdown] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        async function loadProjects() {
            try {
                const listResponse = await fetch('/api/projects');
                const projectFiles: string[] = await listResponse.json();

                if (!Array.isArray(projectFiles)) return;

                const loadedProjects = await Promise.all(
                    projectFiles.map(async (slug) => {
                        try {
                            const response = await fetch(`/icons/projects/${slug}.md`);
                            const text = await response.text();
                            const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
                            const match = text.match(frontmatterRegex);

                            if (match) {
                                const metadata: Record<string, any> = {};
                                match[1].split('\n').forEach(line => {
                                    const colonIndex = line.indexOf(':');
                                    if (colonIndex > -1) {
                                        const key = line.substring(0, colonIndex).trim();
                                        let value: any = line.substring(colonIndex + 1).trim();
                                        value = value.replace(/^["']|["']$/g, '');
                                        if (value.startsWith('[') && value.endsWith(']')) {
                                            value = value.slice(1, -1).split(',').map((v: string) => v.trim().replace(/^["']|["']$/g, ''));
                                        }
                                        metadata[key] = value;
                                    }
                                });

                                return {
                                    slug,
                                    content: match[2],
                                    title: metadata.title || "Untitled",
                                    date: metadata.date || new Date().toISOString(),
                                    madeAt: metadata.madeAt || "",
                                    image: metadata.image || "",
                                    link: metadata.link || "#",
                                    displayMode: metadata.type?.toLowerCase() === 'professional' ? 'professional' : 'artwork',
                                    category: Array.isArray(metadata.category) ? metadata.category : [],
                                    builtWith: Array.isArray(metadata.builtWith) ? metadata.builtWith : [],
                                    images: Array.isArray(metadata.images) ? metadata.images : [],
                                } as Project;
                            }
                        } catch (error) {
                            console.error(`Error loading ${slug}:`, error);
                        }
                        return null;
                    })
                );
                setProjects(loadedProjects.filter(Boolean) as Project[]);
            } catch (e) {
                console.error("Failed to load project list:", e);
            }
        }
        loadProjects();
    }, []);

    useEffect(() => {
        const isFiltering = selectedCategories.length > 0 || searchQuery.length > 0;
        if (isFiltering) {
            setDisplayMode('custom');
        } else if (!isFiltering && displayMode === 'custom') {
            setDisplayMode('all');
        }
    }, [selectedCategories, searchQuery]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowFilterDropdown(false);
            }
        }
        if (showFilterDropdown) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showFilterDropdown]);

    const clearAllFilters = () => {
        setSelectedCategories([]);
        setSearchQuery("");
        setDisplayMode('all');
    };

    const categoryCounts = useMemo(() => {
        const counts: Record<string, number> = {};
        projects.forEach(p => {
            p.category.forEach(cat => {
                counts[cat] = (counts[cat] || 0) + 1;
            });
        });
        return counts;
    }, [projects]);

    const allCategories = useMemo(() => {
        return Object.keys(categoryCounts).sort();
    }, [categoryCounts]);

    const filteredAndSortedProjects = useMemo(() => {
        return projects
            .filter(project => {
                const matchesDisplay = displayMode === 'all' || displayMode === 'custom' || project.displayMode === displayMode;

                const searchLower = searchQuery.toLowerCase();
                const matchesSearch =
                    project.title.toLowerCase().includes(searchLower) ||
                    project.madeAt.toLowerCase().includes(searchLower) ||
                    project.category.some(cat => cat.toLowerCase().includes(searchLower)) ||
                    project.builtWith.some(tech => tech.toLowerCase().includes(searchLower));

                const matchesCategory = selectedCategories.length === 0 ||
                    selectedCategories.some(cat => project.category.includes(cat));

                return matchesDisplay && matchesSearch && matchesCategory;
            })
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, [projects, displayMode, searchQuery, selectedCategories]);

    return (
        <main className="min-h-screen py-12" style={{ paddingLeft: '240px', paddingRight: '240px' }}>
            <div className="fixed inset-0 -z-10"><Background /></div>

            <Link href="/" className="group text-2xl text-white mb-2 opacity-50 hover:opacity-100 transition-opacity inline-flex items-center gap-2">
                <span className="relative -top-[2px] text-3xl leading-none transform transition-transform duration-300 group-hover:-translate-x-2">&laquo;</span>
                <span className="tracking-wide">BRIAN WU</span>
            </Link>

            <div className="flex items-baseline gap-4">
                <h1 className="text-7xl text-[#E8DDB5] font-['Impact'] uppercase">ALL PROJECTS</h1>
                <span className="text-2xl text-[#E8DDB5] opacity-60">
                    [{filteredAndSortedProjects.length}]
                </span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mt-4 mb-12">
                <p className="text-lg text-white opacity-50 max-w-[300px] leading-relaxed">now this is awesome.</p>

                <div className="flex flex-wrap items-center gap-3 md:ml-auto">
                    {(selectedCategories.length > 0 || searchQuery !== "" || displayMode !== 'all') && (
                        <button
                            onClick={clearAllFilters}
                            className="group flex items-center gap-1.5 px-3 py-2 text-[10px] uppercase tracking-widest text-white/40 hover:text-[#E8DDB5] transition-colors"
                        >
                            <RotateCcw className="w-3 h-3 transition-transform duration-500 group-hover:rotate-[-270deg]" />
                            Clear All
                        </button>
                    )}

                    <div className="relative">
                        <select
                            value={displayMode}
                            onChange={(e) => setDisplayMode(e.target.value as any)}
                            className="bg-[#2b366d] text-white text-[10px] uppercase tracking-widest px-4 py-2 rounded-full border border-white/10 appearance-none cursor-pointer focus:outline-none pr-8 min-w-[160px]"
                        >
                            {displayMode === 'custom' && <option value="custom">CUSTOM</option>}
                            <option value="all">DISPLAY: ALL</option>
                            <option value="professional">Professional</option>
                            <option value="artwork">Artwork</option>
                        </select>
                        <ChevronDown className="w-3 h-3 text-white/40 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                            className={`flex items-center justify-between gap-2 px-4 py-2 rounded-full border text-[10px] uppercase tracking-widest transition-all w-[130px] ${selectedCategories.length > 0 ? "bg-[#5F72BF] border-[#5F72BF] text-white" : "bg-[#2b366d] border-white/10 text-white/60 hover:text-white"}`}
                        >
                            <span className="truncate">
                                FILTER {selectedCategories.length > 0 && `(${selectedCategories.length})`}
                            </span>
                            <ChevronDown className={`w-3 h-3 flex-shrink-0 transition-transform ${showFilterDropdown ? 'rotate-180' : ''}`} />
                        </button>
                        {showFilterDropdown && (
                            <div className="absolute top-full mt-2 right-0 w-56 bg-[#1a1f3a] border border-white/10 rounded-lg shadow-2xl z-40 p-2">
                                {allCategories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat])}
                                        className={`w-full text-left px-3 py-2 rounded text-xs uppercase tracking-tighter mb-1 transition-colors ${selectedCategories.includes(cat) ? "bg-[#5F72BF] text-white" : "text-white/60 hover:bg-white/5"}`}
                                    >
                                        {cat}
                                        <span className="ml-1.5 opacity-60">[{categoryCounts[cat]}]</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="relative">
                        <Search className="w-3 h-3 text-white/30 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="SEARCH..."
                            className="bg-[#2b366d] border border-white/10 rounded-full py-2 pl-8 pr-4 text-[10px] text-white placeholder:text-white/20 focus:outline-none focus:border-[#5F72BF] transition-all uppercase tracking-widest w-48"
                        />
                    </div>
                </div>
            </div>

            <div className="sticky top-0 z-20 py-4 grid grid-cols-12 gap-4 text-white text-sm font-medium opacity-100 border-b border-white border-opacity-20 -mx-2 px-2">
                <div className="col-span-1">Year</div>
                <div className="col-span-3">Project</div>
                <div className="col-span-2">Made at</div>
                <div className="col-span-3">Built with</div>
                <div className="col-span-3">Link</div>
            </div>

            <div>
                {filteredAndSortedProjects.length > 0 ? (
                    filteredAndSortedProjects.map((project, index) => (
                        <div
                            key={project.slug}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            onClick={() => setSelectedProject(index)}
                            className={`relative cursor-pointer transition-all duration-300 grid grid-cols-12 gap-4 py-6 border-b border-white border-opacity-20 group -mx-2 px-2 ${hoveredIndex !== null && hoveredIndex !== index ? "opacity-50" : "opacity-100"}`}
                        >
                            <div className="absolute inset-y-0 left-0 right-0 bg-gradient-to-r from-[#5F72BF] to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />
                            <div className="col-span-1 text-white opacity-60 text-sm">{new Date(project.date).getFullYear()}</div>
                            <div className="col-span-3 text-white text-base group-hover:text-[#E8DDB5] transition-colors">{project.title}</div>
                            <div className="col-span-2 text-white opacity-60 text-sm">{project.madeAt}</div>
                            <div className="col-span-3 flex flex-wrap gap-2">
                                {project.builtWith.map((tech, idx) => (
                                    <span key={idx} className="text-xs px-3 py-1 rounded-full bg-[#2b366d] text-white text-opacity-60 group-hover:text-opacity-100 group-hover:text-[#E8DDB5]">
                                        {tech}
                                    </span>
                                ))}
                            </div>
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
                    ))
                ) : (
                    <div className="py-12 text-center">
                        <p className="text-white/60 uppercase tracking-[0.2em] text-[16px]">No projects found :(</p>
                    </div>
                )}
            </div>

            {selectedProject !== null && filteredAndSortedProjects[selectedProject] && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-8" onClick={() => setSelectedProject(null)}>
                    <div className="bg-[#1a1f3a] rounded-lg max-w-6xl w-full max-h-[85vh] overflow-y-auto relative p-8 flex gap-8" onClick={e => e.stopPropagation()}>
                        <button className="absolute top-6 right-6 text-white text-3xl opacity-60 hover:opacity-100 z-50" onClick={() => setSelectedProject(null)}>✕</button>
                        <div className="w-2/5 flex-shrink-0 space-y-6">
                            <a href={filteredAndSortedProjects[selectedProject].link} target="_blank" className="flex items-center gap-3 group/title w-fit">
                                <h2 className="text-4xl text-[#E8DDB5] font-['Impact'] group-hover/title:text-white transition-colors">
                                    {filteredAndSortedProjects[selectedProject].title}
                                </h2>
                                <ArrowUpRight className="w-6 h-6 text-[#E8DDB5]" />
                            </a>
                            <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                                <Image src={filteredAndSortedProjects[selectedProject].image} alt="" fill className="object-cover" />
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {filteredAndSortedProjects[selectedProject].category.map((cat, i) => (
                                    <span key={i} className="text-xs px-3 py-1 rounded-full bg-[#2b366d] text-white opacity-60">{cat}</span>
                                ))}
                            </div>
                        </div>
                        <div className="flex-1 text-white space-y-6 overflow-y-auto pr-4">
                            <ReactMarkdown
                                components={{
                                    h1: ({ children }) => <h1 className="text-3xl font-['Impact'] text-[#E8DDB5] mb-4">{children}</h1>,
                                    h2: ({ children }) => <h2 className="text-2xl font-['Impact'] text-[#E8DDB5] mt-8 mb-3">{children}</h2>,
                                    p: ({ children }) => <p className="text-white opacity-80 leading-relaxed mb-4">{children}</p>,
                                    a: ({ children, ...props }) => <a className="text-[#E8DDB5] hover:text-white underline" {...props}>{children}</a>,
                                }}
                            >
                                {filteredAndSortedProjects[selectedProject].content || ''}
                            </ReactMarkdown>
                        </div>
                    </div>
                </div>
            )}

            <CursorGlow />
        </main>
    );
}