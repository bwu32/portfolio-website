"use client";

import Link from "next/link";
import { useMemo } from "react"; // Added useMemo
import Background from "@/app/components/Background";
import CursorGlow from "@/app/components/CursorGlow";
import { ArrowUpRight } from "lucide-react";

// Mock data
const GUESTBOOK_ENTRIES = [
  {
    name: "ivyisaplant",
    website: "she has a website i swear",
    message: "meow",
    date: "2026-01-19"
  },
  {
    name: "Raymond Truong",
    website: "",
    message: "i am recoil ray for a reason",
    date: "2026-01-20"
  },
  {
    name: "david hong",
    website: "",
    message: "sigma",
    date: "2026-01-20"
  },
];

export default function GuestbookContent() {
  // Auto-sort entries by date (Descending: Newest first)
  const sortedEntries = useMemo(() => {
    return [...GUESTBOOK_ENTRIES].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, []);

  return (
    <main className="min-h-screen py-12" style={{ paddingLeft: '240px', paddingRight: '240px' }}>
      <div className="fixed inset-0 -z-10"><Background /></div>
      <CursorGlow />

      {/* Back Link */}
      <Link href="/" className="group text-2xl text-white mb-2 opacity-50 hover:opacity-100 transition-opacity inline-flex items-center gap-2">
        <span className="relative -top-[2px] text-3xl leading-none transform transition-transform duration-300 group-hover:-translate-x-2">&laquo;</span>
        <span className="tracking-wide">BRIAN WU</span>
      </Link>

      {/* Title and Action Button Row */}
      <div className="flex items-center justify-between gap-6 mb-12">
        <div className="flex items-baseline gap-4">
          <h1 className="text-7xl text-[#E8DDB5] font-['Impact'] uppercase -ml-1 leading-none">
            GUESTBOOK
          </h1>
          <span className="text-2xl text-[#E8DDB5] opacity-60">
            [{sortedEntries.length}]
          </span>
        </div>

        {/* Enlarged Sign Button */}
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSdM7l3Dgh_SUhAMpwnhwmYgjOzLIGuYen9c9wHxTvDsYUWCbg/viewform?usp=header"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center gap-6 px-6 py-4 bg-[#2b366d]/60 border-2 border-white/10 rounded-full transition-all hover:scale-105 active:scale-95 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#5F72BF] to-[#2b366d] opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
          <span className="relative z-10 md:text-4xl text-[#E8DDB5] font-['Impact'] tracking-wider group-hover:text-white transition-colors duration-300">
            SIGN GUESTBOOK
          </span>
          <ArrowUpRight className="relative z-10 h-8 text-[#E8DDB5] group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-white blur-xl transition-opacity duration-500" />
        </a>
      </div>

      <p className="text-lg text-white opacity-50 max-w-[500px] leading-relaxed mb-12">
        now this is awesome. come sign my guestbook! 
      </p>

      {/* Table Header */}
      <div className="sticky top-0 z-20 py-4 grid grid-cols-12 gap-4 text-white text-sm font-medium border-b border-white border-opacity-20 -mx-2 px-2">
        <div className="col-span-2">Name</div>
        <div className="col-span-3">Website</div>
        <div className="col-span-5">Message</div>
        <div className="col-span-2">Date Signed</div>
      </div>

      {/* Sorted Guestbook List */}
      <div className="mb-24">
        {sortedEntries.map((entry, index) => (
          <div
            key={index}
            className="relative transition-all duration-300 grid grid-cols-12 gap-4 py-6 border-b border-white border-opacity-20 group -mx-2 px-2 hover:opacity-100 opacity-80"
          >
            <div className="absolute inset-y-0 left-0 right-0 bg-gradient-to-r from-[#5F72BF] to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />

            <div className="col-span-2 text-white text-base group-hover:text-[#E8DDB5] transition-colors font-medium">
              {entry.name}
            </div>

            <div className="col-span-3 flex items-start">
              <a
                href={entry.website.startsWith('http') ? entry.website : `https://${entry.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white opacity-50 hover:opacity-100 transition-opacity text-sm flex items-center gap-1"
              >
                <span className="truncate">{entry.website}</span>
                <ArrowUpRight className="w-3 h-3 flex-shrink-0" />
              </a>
            </div>

            <div className="col-span-5 text-white opacity-60 text-sm leading-relaxed pr-4">
              {entry.message}
            </div>

            <div className="col-span-2 text-white opacity-40 text-sm">
              {new Date(entry.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Scroll to Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 p-2 transition-all duration-300 group text-white opacity-60 hover:opacity-100 hover:text-[#E8DDB5] hover:scale-110"
        aria-label="Scroll to top"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:-translate-y-1 transition-transform">
          <path d="m17 11-5-5-5 5" /><path d="m17 18l-5-5-5 5" />
        </svg>
      </button>
    </main>
  );
}