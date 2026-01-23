"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useMemo, useEffect, useRef } from "react";
import {
    ArrowUpRight, Search, ChevronDown, RotateCcw, X,
    ChevronLeft, ChevronRight, ChevronUp
} from "lucide-react";
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
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isFullGalleryOpen, setIsFullGalleryOpen] = useState(false);
    const [displayMode, setDisplayMode] = useState<'all' | 'professional' | 'artwork' | 'custom'>('all');
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [showFilterDropdown, setShowFilterDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const modalContentRef = useRef<HTMLDivElement>(null);

    // 1. Memoized Category Counts (Moved up to ensure availability)
    const categoryCounts = useMemo(() => {
        const counts: Record<string, number> = {};
        projects.forEach(p => {
            if (p.category && Array.isArray(p.category)) {
                p.category.forEach(cat => {
                    counts[cat] = (counts[cat] || 0) + 1;
                });
            }
        });
        return counts;
    }, [projects]);

    const allCategories = useMemo(() => Object.keys(categoryCounts).sort(), [categoryCounts]);

    // Initial load of markdown files
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
                                    images: []
                                } as Project;
                            }
                        } catch (e) { console.error(e); }
                        return null;
                    })
                );
                setProjects(loadedProjects.filter(Boolean) as Project[]);
            } catch (e) { console.error(e); }
        }
        loadProjects();
    }, []);

    // Filter Logic
    const filteredAndSortedProjects = useMemo(() => {
        return projects
            .filter(project => {
                const matchesDisplay = displayMode === 'all' || displayMode === 'custom' || project.displayMode === displayMode;
                const searchLower = searchQuery.toLowerCase();
                const matchesSearch = project.title.toLowerCase().includes(searchLower) ||
                    project.madeAt.toLowerCase().includes(searchLower) ||
                    project.category.some(cat => cat.toLowerCase().includes(searchLower)) ||
                    project.builtWith.some(tech => tech.toLowerCase().includes(searchLower));
                const matchesCategory = selectedCategories.length === 0 || selectedCategories.some(cat => project.category.includes(cat));
                return matchesDisplay && matchesSearch && matchesCategory;
            })
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, [projects, displayMode, searchQuery, selectedCategories]);

    // Gallery Loader
    useEffect(() => {
        async function loadGallery() {
            if (selectedProject === null) return;
            const activeProject = filteredAndSortedProjects[selectedProject];
            if (!activeProject) return;

            try {
                const response = await fetch(`/api/projects/${activeProject.slug}`);
                const folderImages = await response.json();

                let finalGallery = [];
                const heroSrc = activeProject.image.startsWith('/') ? activeProject.image : `/icons/projects/${activeProject.image}`;

                if (Array.isArray(folderImages) && folderImages.length > 0) {
                    const mainIdx = folderImages.findIndex(img => img.src.toLowerCase().includes('main'));
                    if (mainIdx > -1) {
                        const [mainImg] = folderImages.splice(mainIdx, 1);
                        finalGallery = [mainImg, ...folderImages];
                    } else {
                        finalGallery = [{ src: heroSrc, caption: "OVERVIEW" }, ...folderImages];
                    }
                } else {
                    finalGallery = [{ src: heroSrc, caption: "OVERVIEW" }];
                }

                setProjects(prev => prev.map(p =>
                    p.slug === activeProject.slug ? { ...p, images: finalGallery } : p
                ));
            } catch (e) { console.error("Gallery load error:", e); }
        }
        loadGallery();
    }, [selectedProject, filteredAndSortedProjects]);

    // Nav & Escape
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedProject === null) return;
            if (e.key === 'Escape') {
                if (isFullGalleryOpen) setIsFullGalleryOpen(false);
                else { setSelectedProject(null); setCurrentImageIndex(0); }
                return;
            }
            const activeProject = filteredAndSortedProjects[selectedProject];
            const currentGallery = activeProject?.images || [];
            if (currentGallery.length <= 1) return;
            if (e.key === 'ArrowRight') setCurrentImageIndex(prev => (prev + 1) % currentGallery.length);
            if (e.key === 'ArrowLeft') setCurrentImageIndex(prev => (prev - 1 + currentGallery.length) % currentGallery.length);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedProject, isFullGalleryOpen, filteredAndSortedProjects]);

    const activeProject = selectedProject !== null ? filteredAndSortedProjects[selectedProject] : null;

    const gallery = useMemo(() => {
        if (!activeProject) return [];
        if (activeProject.images && activeProject.images.length > 0) return activeProject.images;
        const heroSrc = activeProject.image.startsWith('/') ? activeProject.image : `/icons/projects/${activeProject.image}`;
        return [{ src: heroSrc, caption: "OVERVIEW" }];
    }, [activeProject]);

    const currentImg = gallery[currentImageIndex] || gallery[0] || { src: '', caption: '' };

    const [showScrollTop, setShowScrollTop] = useState(false);
  
      // back to top button
      useEffect(() => {
          const handleScroll = () => {
              // Appears after scrolling down one full window height
              if (window.scrollY > window.innerHeight) {
                  setShowScrollTop(true);
              } else {
                  setShowScrollTop(false);
              }
          };
  
          window.addEventListener("scroll", handleScroll);
          return () => window.removeEventListener("scroll", handleScroll);
      }, []);

    return (
        <main className="min-h-screen py-12 px-6 md:px-[240px]">
            <div className="fixed inset-0 -z-10"><Background /></div>

            <Link href="/" className="group text-2xl text-white mb-2 opacity-50 hover:opacity-100 transition-opacity inline-flex items-center gap-2">
                <span className="relative -top-[2px] text-3xl leading-none transform transition-transform duration-300 group-hover:-translate-x-2">&laquo;</span>
                <span className="tracking-wide">BRIAN WU</span>
            </Link>

            <div className="flex items-baseline gap-4">
                <h1 className="text-7xl text-[#E8DDB5] font-['Impact'] uppercase">ALL PROJECTS</h1>
                <span className="text-2xl text-[#E8DDB5] opacity-60">[{filteredAndSortedProjects.length}]</span>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mt-4 mb-12">
                <p className="text-lg text-white opacity-50 max-w-[300px] leading-relaxed">now this is awesome.</p>
                <div className="flex flex-wrap items-center gap-3 md:ml-auto">
                    {(selectedCategories.length > 0 || searchQuery !== "" || displayMode !== 'all') && (
                        <button onClick={() => { setSelectedCategories([]); setSearchQuery(""); setDisplayMode('all'); }} className="group flex items-center gap-1.5 px-3 py-2 text-[10px] uppercase tracking-widest text-white/40 hover:text-[#E8DDB5]">
                            <RotateCcw className="w-3 h-3 transition-transform duration-500 group-hover:rotate-[-270deg]" /> Clear All
                        </button>
                    )}
                    <div className="relative">
                        <select value={displayMode} onChange={(e) => setDisplayMode(e.target.value as any)} className="bg-[#2b366d] text-white text-[10px] uppercase tracking-widest px-4 py-2 rounded-full border border-white/10 appearance-none cursor-pointer pr-8 min-w-[160px] focus:outline-none">
                            {displayMode === 'custom' && <option value="custom">CUSTOM</option>}
                            <option value="all">DISPLAY: ALL</option>
                            <option value="professional">Professional</option>
                            <option value="artwork">Personal</option>
                        </select>
                        <ChevronDown className="w-3 h-3 text-white/40 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                    <div className="relative" ref={dropdownRef}>
                        <button onClick={() => setShowFilterDropdown(!showFilterDropdown)} className={`flex items-center justify-between gap-2 px-4 py-2 rounded-full border text-[10px] uppercase tracking-widest transition-all w-[130px] ${selectedCategories.length > 0 ? "bg-[#5F72BF] border-[#5F72BF] text-white" : "bg-[#2b366d] border-white/10 text-white/60"}`}>
                            <span className="truncate">FILTER {selectedCategories.length > 0 && `(${selectedCategories.length})`}</span>
                            <ChevronDown className="w-3 h-3" />
                        </button>
                        {showFilterDropdown && (
                            <div className="absolute top-full mt-2 right-0 w-56 bg-[#1a1f3a] border border-white/10 rounded-lg shadow-2xl z-40 p-2">
                                {allCategories.map(cat => (
                                    <button key={cat} onClick={() => setSelectedCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat])} className={`w-full text-left px-3 py-2 rounded text-xs uppercase mb-1 transition-colors ${selectedCategories.includes(cat) ? "bg-[#5F72BF] text-white" : "text-white/60 hover:bg-white/5"}`}>
                                        {cat} <span className="ml-1.5 opacity-60">[{categoryCounts[cat]}]</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="relative">
                        <Search className="w-3 h-3 text-white/30 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="SEARCH..." className="bg-[#2b366d] border border-white/10 rounded-full py-2 pl-8 pr-4 text-[10px] text-white focus:outline-none w-48 uppercase tracking-widest" />
                    </div>
                </div>
            </div>

            {/* Headers */}
            <div className="sticky top-0 z-20 py-4 grid grid-cols-12 gap-4 text-white text-sm font-medium border-b border-white border-opacity-20 -mx-2 px-2">
                <div className="col-span-1">Year</div>
                <div className="col-span-3">Project</div>
                <div className="col-span-2">Made at</div>
                <div className="col-span-3">Built with</div>
                <div className="col-span-3">Link</div>
            </div>

            {/* List */}
            <div>
                {filteredAndSortedProjects.map((project, index) => (
                    <div key={project.slug} onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)} onClick={() => setSelectedProject(index)} className={`relative cursor-pointer transition-all duration-300 grid grid-cols-12 gap-4 py-6 border-b border-white border-opacity-20 group -mx-2 px-2 ${hoveredIndex !== null && hoveredIndex !== index ? "opacity-50" : "opacity-100"}`}>
                        <div className="absolute inset-y-0 left-0 right-0 bg-gradient-to-r from-[#5F72BF] to-transparent opacity-0 group-hover:opacity-10 pointer-events-none" />
                        <div className="col-span-1 text-white opacity-60 text-sm">{new Date(project.date).getFullYear()}</div>
                        <div className="col-span-3 text-white text-base group-hover:text-[#E8DDB5]">{project.title}</div>
                        <div className="col-span-2 text-white opacity-60 text-sm">{project.madeAt}</div>
                        <div className="col-span-3 flex flex-wrap gap-2">
                            {project.builtWith.map((tech, idx) => (
                                <span key={idx} className="text-xs px-3 py-1 rounded-full bg-[#2b366d] text-white/60 group-hover:text-[#E8DDB5]">{tech}</span>
                            ))}
                        </div>
                        <div className="col-span-3 flex items-start">
                            <a href={project.link} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-white/50 hover:text-white text-sm flex items-start gap-1">
                                <span>{project.link.includes('http') ? new URL(project.link).hostname.replace('www.', '') : project.link}</span>
                                <ArrowUpRight className="w-3 h-3 mt-0.5" />
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            {/* MODAL */}
            {activeProject && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8 bg-black/40 backdrop-blur-[2px]" onClick={() => { setSelectedProject(null); setCurrentImageIndex(0); }}>
                    <div className="relative w-full max-w-7xl h-fit max-h-[85vh] flex flex-col md:flex-row shadow-2xl rounded-xl border border-white/10 bg-[#1a1f3a] overflow-hidden" onClick={e => e.stopPropagation()}>

                        {/* LEFT SIDE: Media & Metadata */}
                        <div className="w-full md:w-[40%] p-8 flex flex-col gap-6 border-r border-white/10 bg-black/20 overflow-y-auto">
                            <div className="space-y-3">
                                <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-black/40 border border-white/5 group">
                                    <Image src={currentImg.src} alt="" fill className="object-contain" unoptimized priority />
                                    {gallery.length > 1 && (
                                        <>
                                            <button onClick={() => setCurrentImageIndex(prev => (prev - 1 + gallery.length) % gallery.length)} className="absolute left-2 top-1/2 -translate-y-1/2 p-1 bg-black/50 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity z-10"><ChevronLeft className="w-5 h-5" /></button>
                                            <button onClick={() => setCurrentImageIndex(prev => (prev + 1) % gallery.length)} className="absolute right-2 top-1/2 -translate-y-1/2 p-1 bg-black/50 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity z-10"><ChevronRight className="w-5 h-5" /></button>
                                        </>
                                    )}
                                    <div onClick={() => setIsFullGalleryOpen(true)} className="absolute inset-0 cursor-pointer" />
                                </div>
                                <p className="text-[11px] text-[#E8DDB5] opacity-60 tracking-[0.2em] uppercase italic">{currentImg.caption}</p>
                            </div>

                            <div className="grid grid-cols-4 gap-2">
                                {gallery.slice(0, 3).map((img, i) => (
                                    <button key={i} onClick={() => setCurrentImageIndex(i)} className={`relative aspect-square rounded-md overflow-hidden border-2 transition-all ${currentImageIndex === i ? 'border-[#E8DDB5]' : 'border-transparent opacity-40'}`}>
                                        <Image src={img.src} alt="" fill className="object-cover" unoptimized />
                                    </button>
                                ))}
                                <button onClick={() => setIsFullGalleryOpen(true)} className="relative aspect-square rounded-md overflow-hidden flex flex-col items-center justify-center border border-white/10 group bg-black">
                                    <Image
                                        src={gallery[3]?.src || gallery[0]?.src || ""}
                                        alt=""
                                        fill
                                        className="object-cover blur-[4px] opacity-40 group-hover:opacity-70 transition-opacity"
                                        unoptimized
                                    />
                                    <div className="absolute inset-0 bg-black/20" />
                                    <span className="relative z-10 text-[9px] font-bold text-[#E8DDB5] drop-shadow-lg">
                                        {gallery.length > 3 ? `+${gallery.length - 3} MORE` : 'VIEW ALL'}
                                    </span>
                                </button>
                            </div>

                            {/* Tags Meta */}
                            <div className="space-y-6 pt-4 border-t border-white/5">
                                <div>
                                    <h4 className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-3">Categories</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {activeProject.category.map(cat => (
                                            <span key={cat} className="px-3 py-1 bg-[#2b366d] border border-white/5 rounded-full text-[10px] text-[#E8DDB5]/80 uppercase">{cat}</span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-3">Technologies</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {activeProject.builtWith.map(tech => (
                                            <span key={tech} className="px-3 py-1 bg-white/5 border border-white/5 rounded-full text-[10px] text-white/60 uppercase">{tech}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT SIDE: Content */}
                        <div className="flex-1 flex flex-col min-h-0 relative">
                            {/* Close Button */}
                            <button
                                className="absolute top-6 right-6 text-white/40 hover:text-white z-30 transition-transform"
                                onClick={() => setSelectedProject(null)}
                            >
                                <X className="w-6 h-6" />
                            </button>

                            {/* Header */}
                            <div className="p-8 pb-4">
                                <a
                                    href={activeProject.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-block"
                                >
                                    <div className="flex items-start gap-3">
                                        <h2 className="text-4xl text-[#E8DDB5] font-['Impact'] uppercase leading-none group-hover:text-white transition-colors">
                                            {activeProject.title}
                                        </h2>
                                        <ArrowUpRight className="w-6 h-6 text-[#E8DDB5] opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                                    </div>
                                    <p className="text-white/40 font-medium tracking-[0.3em] text-[11px] uppercase mt-2 group-hover:text-white/60 transition-colors">
                                        {activeProject.madeAt}
                                    </p>
                                </a>
                            </div>

                            {/* Scrollable Text Area */}
                            <div ref={modalContentRef} className="flex-1 overflow-y-auto p-8 pt-4 custom-scrollbar pr-12">
                                <ReactMarkdown components={{
                                    h1: ({ children }) => <h1 className="text-3xl font-['Impact'] text-[#E8DDB5] mb-4 uppercase">{children}</h1>,
                                    p: ({ children }) => <p className="text-white/70 leading-relaxed mb-6">{children}</p>,
                                }}>{activeProject.content || ''}</ReactMarkdown>

                                {/* Spacer to ensure text doesn't get hidden behind the floating button */}
                                <div className="h-12" />
                            </div>

                            {/* Fixed Button: Now anchored to the bottom-right of the physical modal box */}
                            <div className="absolute bottom-6 right-8 z-30">
                                <button
                                    onClick={() => modalContentRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}
                                    className="sticky bottom-0 float-right group text-white opacity-60 hover:opacity-100 hover:text-[#E8DDB5]"
                                >
                                    <ChevronUpIcon className="transform group-hover:-translate-y-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* LIGHTBOX */}
            {isFullGalleryOpen && activeProject && (
                <div className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-xl flex flex-col items-center justify-center p-8" onClick={() => setIsFullGalleryOpen(false)}>
                    <button className="absolute top-10 right-10 text-white/60 hover:text-white"><X className="w-10 h-10" /></button>
                    <div className="relative w-full max-w-6xl aspect-video flex items-center justify-center" onClick={e => e.stopPropagation()}>
                        <button onClick={() => setCurrentImageIndex(prev => (prev - 1 + gallery.length) % gallery.length)} className="absolute -left-16 p-4 text-white/40 hover:text-white"><ChevronLeft className="w-12 h-12" /></button>
                        <div className="relative w-full h-full">
                            <Image src={currentImg.src} alt="" fill className="object-contain" unoptimized />
                            <p className="absolute -top-12 left-0 right-0 text-center text-[#E8DDB5] font-['Impact'] text-2xl tracking-[0.3em] uppercase">{currentImg.caption}</p>
                        </div>
                        <button onClick={() => setCurrentImageIndex(prev => (prev + 1) % gallery.length)} className="absolute -right-16 p-4 text-white/40 hover:text-white"><ChevronRight className="w-12 h-12" /></button>
                    </div>
                    <div className="absolute bottom-10 flex gap-3 p-4 bg-white/5 rounded-xl border border-white/10 overflow-x-auto max-w-[85vw] no-scrollbar" onClick={e => e.stopPropagation()}>
                        {gallery.map((img, i) => (
                            <button key={i} onClick={() => setCurrentImageIndex(i)} className={`relative w-24 aspect-video flex-shrink-0 rounded border-2 transition-all ${currentImageIndex === i ? 'border-[#E8DDB5] scale-105' : 'border-transparent opacity-30'}`}>
                                <Image src={img.src} alt="" fill className="object-cover" unoptimized />
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <CursorGlow />
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className={`fixed bottom-8 right-8 p-2 transition-all duration-500 z-50 group text-white hover:text-[#E8DDB5] hover:scale-110 
        ${showScrollTop
                        ? "opacity-60 translate-y-0 pointer-events-auto"
                        : "opacity-0 translate-y-10 pointer-events-none"
                    } hover:opacity-100`}
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
                    <path d="m17 11-5-5-5 5" />
                    <path d="m17 18l-5-5-5 5" />
                </svg>
            </button>
        </main>
    );
}

// Simple internal helper component for the Scroll Up icon
function ChevronUpIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="m17 11-5-5-5 5" /><path d="m17 18l-5-5-5 5" />
        </svg>
    );
}