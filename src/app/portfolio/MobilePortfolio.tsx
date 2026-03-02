"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { ArrowUpRight, RotateCcw, Search, X, ChevronLeft, ChevronRight } from "lucide-react";
import ReactMarkdown from "react-markdown";
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
    content?: string;
}

interface GalleryImage {
    src: string;
    caption: string;
}

export default function MobilePortfolio() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [showTopBtn, setShowTopBtn] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isFullGalleryOpen, setIsFullGalleryOpen] = useState(false);
    const [gallery, setGallery] = useState<GalleryImage[]>([]);
    const [sheetDragY, setSheetDragY] = useState(0);
    const [slideDir, setSlideDir] = useState<'next' | 'prev' | null>(null);

    const touchStartX = useRef<number>(0);
    const lightboxThumbRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const sheetRef = useRef<HTMLDivElement>(null);
    const sheetScrollRef = useRef<HTMLDivElement>(null);
    const sheetTouchStartY = useRef<number>(0);
    const sheetTouchStartX = useRef<number>(0);
    const sheetCurrentDragY = useRef<number>(0);
    const sheetIsDragging = useRef<boolean>(false);

    // Load projects from markdown
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
                                    content: match[2].trim(),
                                    title: metadata.title || "Untitled",
                                    date: metadata.date || new Date().toISOString(),
                                    madeAt: metadata.madeAt || "",
                                    image: metadata.image || "",
                                    link: metadata.link || "#",
                                    category: Array.isArray(metadata.category) ? metadata.category : [],
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

    // Gallery loader when a project is selected
    useEffect(() => {
        if (!selectedProject) return;

        const heroSrc = selectedProject.image.startsWith('/')
            ? selectedProject.image
            : `/icons/projects/${selectedProject.image}`;
        setGallery([{ src: heroSrc, caption: "OVERVIEW" }]);
        setCurrentImageIndex(0);
        setSlideDir(null);

        fetch(`/api/projects/${selectedProject.slug}`)
            .then(r => r.json())
            .then((imgs: GalleryImage[]) => {
                if (Array.isArray(imgs) && imgs.length > 0) {
                    const copy = [...imgs];
                    const mainIdx = copy.findIndex(img => img.src.toLowerCase().includes('main'));
                    if (mainIdx > -1) {
                        const [main] = copy.splice(mainIdx, 1);
                        setGallery([main, ...copy]);
                    } else {
                        setGallery([{ src: heroSrc, caption: "OVERVIEW" }, ...copy]);
                    }
                }
            })
            .catch(() => {});
    }, [selectedProject]);

    // Body scroll lock
    useEffect(() => {
        document.body.style.overflow = selectedProject ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [selectedProject]);

    // Lightbox thumbnail auto-scroll
    useEffect(() => {
        if (!isFullGalleryOpen) return;
        lightboxThumbRefs.current[currentImageIndex]?.scrollIntoView({
            behavior: 'smooth', block: 'nearest', inline: 'nearest',
        });
    }, [currentImageIndex, isFullGalleryOpen]);

    // Scroll listener
    useEffect(() => {
        const handleScroll = () => setShowTopBtn(window.scrollY > 400);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Sheet drag-down to dismiss
    useEffect(() => {
        if (!selectedProject || !sheetRef.current) return;
        const sheet = sheetRef.current;

        const onTouchStart = (e: TouchEvent) => {
            sheetTouchStartY.current = e.touches[0].clientY;
            sheetTouchStartX.current = e.touches[0].clientX;
        };

        const onTouchMove = (e: TouchEvent) => {
            const deltaY = e.touches[0].clientY - sheetTouchStartY.current;
            const deltaX = e.touches[0].clientX - sheetTouchStartX.current;
            const scrollTop = sheetScrollRef.current?.scrollTop ?? 0;

            if (scrollTop === 0 && deltaY > 0 && deltaY > Math.abs(deltaX)) {
                e.preventDefault();
                sheetIsDragging.current = true;
                sheetCurrentDragY.current = deltaY;
                setSheetDragY(deltaY);
            }
        };

        const onTouchEnd = () => {
            if (sheetIsDragging.current) {
                const dragY = sheetCurrentDragY.current;
                sheetIsDragging.current = false;
                sheetCurrentDragY.current = 0;
                if (dragY > 120) {
                    setSheetDragY(0);
                    closeModal();
                } else {
                    setSheetDragY(0);
                }
            }
        };

        sheet.addEventListener('touchstart', onTouchStart, { passive: true });
        sheet.addEventListener('touchmove', onTouchMove, { passive: false });
        sheet.addEventListener('touchend', onTouchEnd, { passive: true });

        return () => {
            sheet.removeEventListener('touchstart', onTouchStart);
            sheet.removeEventListener('touchmove', onTouchMove);
            sheet.removeEventListener('touchend', onTouchEnd);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedProject]);

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };
    const handleTouchEnd = (e: React.TouchEvent) => {
        const delta = e.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(delta) < 50 || gallery.length <= 1) return;
        navigateGallery(delta < 0 ? 'next' : 'prev');
    };

    const closeModal = () => {
        setSelectedProject(null);
        setCurrentImageIndex(0);
        setIsFullGalleryOpen(false);
        setGallery([]);
        setSlideDir(null);
        setSheetDragY(0);
    };

    const navigateGallery = (dir: 'prev' | 'next') => {
        setSlideDir(dir);
        setCurrentImageIndex(prev =>
            dir === 'next' ? (prev + 1) % gallery.length : (prev - 1 + gallery.length) % gallery.length
        );
    };

    const navigateToIndex = (newIdx: number) => {
        if (newIdx === currentImageIndex) return;
        const delta = (newIdx - currentImageIndex + gallery.length) % gallery.length;
        setSlideDir(delta <= gallery.length / 2 ? 'next' : 'prev');
        setCurrentImageIndex(newIdx);
    };

    const currentImg = gallery[currentImageIndex] || { src: '', caption: '' };

    const filteredProjects = projects.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.builtWith.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="text-white min-h-screen px-6 py-12 font-sans relative">
            <style>{`
                @keyframes slideFromRight {
                    from { transform: translateX(40px); opacity: 0.4; }
                    to   { transform: translateX(0);    opacity: 1;   }
                }
                @keyframes slideFromLeft {
                    from { transform: translateX(-40px); opacity: 0.4; }
                    to   { transform: translateX(0);     opacity: 1;   }
                }
            `}</style>
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
                />
            </div>

            {/* PROJECT LIST */}
            <main className="space-y-4">
                {filteredProjects.map((proj) => (
                    <button
                        key={proj.slug}
                        onClick={() => setSelectedProject(proj)}
                        className="w-full text-left block bg-[#1a1f3a]/30 border border-white/5 rounded-3xl p-5 active:scale-[0.98] active:bg-[#1a1f3a]/60 transition-all shadow-xl"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex flex-col">
                                <span className="text-white/60 text-[10px] font-bold uppercase tracking-[0.3em] mb-3">
                                    {new Date(proj.date).getFullYear()} — {proj.madeAt || "Independent"}
                                </span>
                                <h3 className="text-3xl font-bold text-[#E8DDB5] uppercase tracking-tight leading-[0.9]">
                                    {proj.title}
                                </h3>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-6">
                            {proj.builtWith.map((tech, i) => (
                                <span key={i} className="relative overflow-hidden px-4 py-1.5 rounded-full text-[11px] font-medium opacity-60 bg-[#2b366d]/40 border border-white/10 shadow-sm">
                                    {tech}
                                </span>
                            ))}
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                            <span className="text-[10px] text-white/60 uppercase tracking-widest font-bold">View Details</span>
                            <ArrowUpRight className="w-4 h-4 text-white/40" />
                        </div>
                    </button>
                ))}

                {/* EMPTY STATE */}
                {filteredProjects.length === 0 && (
                    <div className="text-center py-20">
                        <RotateCcw className="w-8 h-8 mx-auto text-white/10 mb-4" />
                        <p className="text-white/40 uppercase tracking-widest text-xs font-bold">No results for &quot;{searchQuery}&quot; :(</p>
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

            {/* PROJECT MODAL */}
            {selectedProject && (
                <div className="fixed inset-0 z-[80] flex flex-col justify-end">
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeModal} />

                    {/* Bottom Sheet */}
                    <div
                        ref={sheetRef}
                        className="relative h-[92vh] flex flex-col rounded-t-3xl bg-[#1a1f3a] border-t border-white/10 overflow-hidden"
                        style={{
                            transform: `translateY(${sheetDragY}px)`,
                            transition: sheetIsDragging.current ? 'none' : 'transform 0.3s ease-out',
                        }}
                    >
                        {/* Drag handle + close */}
                        <div className="flex-shrink-0 flex items-center justify-center pt-5 pb-4 relative">
                            <div className="w-10 h-1 rounded-full bg-white/20" />
                            <button
                                onClick={closeModal}
                                className="absolute right-5 top-1/2 -translate-y-1/2 p-2 text-white/40 active:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Scrollable content */}
                        <div ref={sheetScrollRef} className="flex-1 overflow-y-auto">

                            {/* Gallery image */}
                            <div className="relative w-full aspect-video bg-black/40 group overflow-hidden">
                                <button
                                    className="relative w-full h-full block"
                                    onTouchStart={handleTouchStart}
                                    onTouchEnd={handleTouchEnd}
                                    onClick={() => setIsFullGalleryOpen(true)}
                                >
                                    <div
                                        key={currentImageIndex}
                                        style={{
                                            position: 'absolute',
                                            inset: 0,
                                            animation: slideDir === 'next'
                                                ? 'slideFromRight 0.25s ease-out'
                                                : slideDir === 'prev'
                                                ? 'slideFromLeft 0.25s ease-out'
                                                : 'none',
                                        }}
                                    >
                                        {currentImg.src && (
                                            <Image
                                                src={currentImg.src}
                                                alt=""
                                                fill
                                                className="object-contain"
                                                unoptimized
                                                priority
                                            />
                                        )}
                                    </div>
                                </button>
                                {gallery.length > 1 && (
                                    <>
                                        <button
                                            onClick={e => { e.stopPropagation(); navigateGallery('prev'); }}
                                            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/60 rounded-full z-20 active:bg-black/90 transition-colors"
                                        >
                                            <ChevronLeft className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={e => { e.stopPropagation(); navigateGallery('next'); }}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/60 rounded-full z-20 active:bg-black/90 transition-colors"
                                        >
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
                                    </>
                                )}
                            </div>

                            {/* Caption + thumbnails */}
                            <div className="px-5 pt-3 pb-2">
                                <p className="text-[11px] text-[#E8DDB5] opacity-60 tracking-[0.2em] uppercase italic mb-3">
                                    {currentImg.caption}
                                </p>
                                {gallery.length > 1 && (
                                    <div className="grid grid-cols-4 gap-2">
                                        {[0, 1, 2, 3].map(i => {
                                            const galleryIdx = (currentImageIndex + i) % gallery.length;
                                            const img = gallery[galleryIdx];
                                            const isViewAll = i === 3;
                                            return (
                                                <button
                                                    key={i}
                                                    onClick={() => isViewAll ? setIsFullGalleryOpen(true) : navigateToIndex(galleryIdx)}
                                                    className={`relative aspect-square rounded-md overflow-hidden border-2 transition-all ${isViewAll ? 'border-transparent bg-black' : currentImageIndex === galleryIdx ? 'border-[#E8DDB5]' : 'border-transparent opacity-40'}`}
                                                >
                                                    <Image src={img.src} alt="" fill className={`object-cover${isViewAll ? ' blur-[4px]' : ''}`} unoptimized />
                                                    {isViewAll && (
                                                        <>
                                                            <div className="absolute inset-0 bg-black/20" />
                                                            <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-[#E8DDB5] drop-shadow-lg z-10 leading-tight text-center px-1">
                                                                {gallery.length > 3 ? `+${gallery.length - 3} MORE` : 'VIEW ALL'}
                                                            </span>
                                                        </>
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                            {/* Title + content */}
                            <div className="px-5 pt-4 pb-12">
                                <a
                                    href={selectedProject.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={e => e.stopPropagation()}
                                    className="flex items-start justify-between mb-2 group/title active:opacity-70 transition-opacity"
                                >
                                    <div className="flex-1 pr-3">
                                        <p className="text-white/40 text-[10px] uppercase tracking-[0.3em] mb-1">
                                            {new Date(selectedProject.date).getFullYear()} — {selectedProject.madeAt || "Independent"}
                                        </p>
                                        <h2 className="text-2xl font-bold text-[#E8DDB5] uppercase tracking-tight leading-tight group-active/title:text-white transition-colors">
                                            {selectedProject.title}
                                        </h2>
                                    </div>
                                    <ArrowUpRight className="w-5 h-5 text-white/40 flex-shrink-0 mt-5" />
                                </a>

                                {/* Markdown content */}
                                <div className="mt-5 mb-6">
                                    {selectedProject.content ? (
                                        <ReactMarkdown
                                            components={{
                                                h1: ({ children }) => <h1 className="text-xl font-bold text-[#E8DDB5] mb-4 uppercase">{children}</h1>,
                                                h2: ({ children }) => <h2 className="text-base font-bold text-[#E8DDB5] mt-6 mb-3 uppercase tracking-wide">{children}</h2>,
                                                p: ({ children }) => <p className="text-white/80 leading-relaxed mb-4 text-sm">{children}</p>,
                                                strong: ({ children }) => <strong className="text-white font-bold">{children}</strong>,
                                                em: ({ children }) => <em className="italic">{children}</em>,
                                                ul: ({ children }) => <ul className="list-disc ml-5 mb-4 space-y-2 text-white/80 text-sm">{children}</ul>,
                                                li: ({ children }) => <li className="leading-relaxed pl-1">{children}</li>,
                                            }}
                                        >
                                            {selectedProject.content}
                                        </ReactMarkdown>
                                    ) : (
                                        <p className="text-white/40 text-sm italic">No description available.</p>
                                    )}
                                </div>

                                {/* Tech tags */}
                                {selectedProject.builtWith.length > 0 && (
                                    <div>
                                        <h4 className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-3">Technologies</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedProject.builtWith.map((tech, idx) => (
                                                <span key={idx} className="px-3 py-1.5 rounded-full text-[11px] font-medium opacity-60 bg-[#2b366d]/40 border border-white/10">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* LIGHTBOX */}
            {isFullGalleryOpen && selectedProject && (
                <div
                    className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-xl flex flex-col items-center justify-center"
                    onClick={() => setIsFullGalleryOpen(false)}
                >
                    <button
                        className="absolute top-6 right-6 text-white/60 z-10 active:text-white transition-colors"
                        onClick={() => setIsFullGalleryOpen(false)}
                    >
                        <X className="w-8 h-8" />
                    </button>

                    <p className="text-[#E8DDB5] text-sm tracking-[0.2em] uppercase mb-4 px-8 text-center">
                        {currentImg.caption}
                    </p>

                    <div
                        className="relative w-full flex items-center justify-center px-12 max-h-[60vh] flex-1 overflow-hidden"
                        onClick={e => e.stopPropagation()}
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                    >
                        <button
                            onClick={() => navigateGallery('prev')}
                            className="absolute left-2 p-3 text-white/40 active:text-white transition-colors z-10"
                        >
                            <ChevronLeft className="w-8 h-8" />
                        </button>
                        <div
                            key={currentImageIndex}
                            className="relative w-full h-full"
                            style={{
                                animation: slideDir === 'next'
                                    ? 'slideFromRight 0.25s ease-out'
                                    : slideDir === 'prev'
                                    ? 'slideFromLeft 0.25s ease-out'
                                    : 'none',
                            }}
                        >
                            <Image src={currentImg.src} alt="" fill className="object-contain" unoptimized />
                        </div>
                        <button
                            onClick={() => navigateGallery('next')}
                            className="absolute right-2 p-3 text-white/40 active:text-white transition-colors z-10"
                        >
                            <ChevronRight className="w-8 h-8" />
                        </button>
                    </div>

                    {/* Thumbnail strip */}
                    <div
                        className="flex gap-3 p-4 mt-4 bg-white/5 rounded-xl border border-white/10 overflow-x-auto max-w-[85vw] no-scrollbar"
                        onClick={e => e.stopPropagation()}
                    >
                        {gallery.map((img, i) => (
                            <button
                                key={i}
                                ref={el => { lightboxThumbRefs.current[i] = el; }}
                                onClick={() => navigateToIndex(i)}
                                className={`relative w-16 aspect-video flex-shrink-0 rounded border-2 transition-all ${currentImageIndex === i ? 'border-[#E8DDB5] scale-105' : 'border-transparent opacity-30'}`}
                            >
                                <Image src={img.src} alt="" fill className="object-cover" unoptimized />
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
