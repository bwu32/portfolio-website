"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowUpRight, RotateCcw, Search, ChevronUp } from "lucide-react";
import Background from "@/app/components/Background";

interface Project {
    date: string;
    title: string;
    madeAt: string;
    category: string[];
    image: string;
    builtWith: string[];
    link: string;
    slug: string;
}

export default function MobilePortfolio() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [showTopBtn, setShowTopBtn] = useState(false);

    // 1. Fetching Markdown Data (Logic kept from desktop)
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
                                    title: metadata.title || "Untitled",
                                    date: metadata.date || new Date().toISOString(),
                                    madeAt: metadata.madeAt || "",
                                    image: metadata.image || "",
                                    link: metadata.link || "#",
                                    builtWith: Array.isArray(metadata.builtWith) ? metadata.builtWith : [],
                                } as Project;
                            }
                        } catch (e) { console.error(e); }
                        return null;
                    })
                );
                const sorted = (loadedProjects.filter(Boolean) as Project[])
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                setProjects(sorted);
            } catch (e) { console.error(e); }
        }
        loadProjects();
    }, []);

    // Scroll Logic
    useEffect(() => {
        const handleScroll = () => setShowTopBtn(window.scrollY > 400);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Filter Logic for Search
    const filteredProjects = projects.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.builtWith.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="text-white min-h-screen px-6 py-12 font-sans relative">
            <div className="fixed inset-0 -z-10"><Background /></div>

            {/* NAVIGATION */}
            <Link href="/" className="pt-4 inline-flex items-center gap-2 text-white/40 mb-2 uppercase tracking-[0.3em] text-lg font-bold">
                <span className="relative -top-[3px] text-3xl leading-none">&laquo;</span> BRIAN WU
            </Link>

            {/* HEADER */}
            <header className="mb-12">
                <div className="flex items-baseline gap-3 mb-2">
                    <h1 className="text-7xl font-black text-[#E8DDB5] -ml-1 tracking-tight leading-none">
                        PROJECTS
                    </h1>
                    <span className="text-xl text-[#E8DDB5] opacity-40 font-bold">[{filteredProjects.length}]</span>
                </div>
                <p className="mt-4 text-white/60 text-lg tracking-tight">
                    now this is awesome.
                </p>
            </header>

            {/* SEARCH BAR */}
            <div className="relative mb-12">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
                <input
                    type="text"
                    placeholder="SEARCH PROJECTS..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#0f172a]/50 border border-white/10 rounded-3xl py-4 pl-12 pr-4 text-s uppercase tracking-widest focus:outline-none focus:border-[#5F72BF] transition-all"

                // relative bg-[#0f172a] p-8 rounded-3xl border border-white/10 text-center overflow-hidden
                />
            </div>

            {/* PROJECT LIST */}
            <main className="space-y-8">
                {filteredProjects.map((proj) => (
                    <a
                        key={proj.slug}
                        href={proj.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block bg-[#1a1f3a]/30 border border-white/5 rounded-3xl p-5 active:scale-[0.98] active:bg-[#1a1f3a]/60 transition-all shadow-xl"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex flex-col">
                                <span className="text-white/60 text-[10px] font-bold uppercase tracking-[0.3em] mb-3">
                                    {new Date(proj.date).getFullYear()} — {proj.madeAt || "Independent"}
                                </span>
                                <h3 className="text-3xl font-bold text-[#E8DDB5] uppercase tracking-tight leading-[0.9] group-active:text-white transition-colors">
                                    {proj.title}
                                </h3>
                            </div>

                        </div>

                        {/* Tech Stack Pills */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            {proj.builtWith.map((tech, i) => (
                                <span key={i} className="relative overflow-hidden px-4 py-1.5 rounded-full text-[11px] font-medium opacity-60 bg-[#2b366d]/40 border border-white/10 shadow-sm transition-all active:bg-[#2b366d]/60">
                                    {tech}
                                </span>
                            ))}
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                            <span className="text-[10px] text-white/60 uppercase tracking-widest font-bold">View Source</span>
                            <ArrowUpRight className="w-4 h-4 text-white/40" />
                        </div>
                    </a>
                ))}

                {/* EMPTY STATE */}
                {filteredProjects.length === 0 && (
                    <div className="text-center py-20">
                        <RotateCcw className="w-8 h-8 mx-auto text-white/10 mb-4" />
                        <p className="text-white/40 uppercase tracking-widest text-xs font-bold">No results for "{searchQuery}" :(</p>
                    </div>
                )}
            </main>

            {/* SCROLL TO TOP */}
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