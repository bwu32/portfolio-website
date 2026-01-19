"use client";

import Link from "next/link";
import Background from "@/app/components/Background";
import CursorGlow from "@/app/components/CursorGlow";
import { ArrowUpRight } from "lucide-react"

export default function GuestbookContent() {
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
        <h1 className="text-7xl text-[#E8DDB5] font-['Impact']">GUESTBOOK</h1>
        <p className="text-lg text-white mt-4 mb-12 opacity-50 max-w-[300px] leading-relaxed">now this is awesome.</p>
        <p className="text-lg text-white mt-4 mb-12 opacity-50 leading-relaxed">come sign my guestbook it is still wip also nobody has signed it yet so that's why there are no entries thanx</p>
      </div>

      <CursorGlow />
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 p-2 transition-all duration-300 group text-white opacity-60 hover:opacity-100 hover:text-[#E8DDB5] hover:scale-110"
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

      <div className="flex justify-center py-12">
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSdM7l3Dgh_SUhAMpwnhwmYgjOzLIGuYen9c9wHxTvDsYUWCbg/viewform?usp=header"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center justify-center px-12 py-6 overflow-hidden rounded-xl transition-all duration-300 hover:scale-105 active:scale-95"
        >
          {/* Background Glow & Gradient Layer */}
          <div className="absolute inset-0 bg-[#2b366d] opacity-40 transition-all duration-300 group-hover:opacity-100" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#5F72BF] to-[#2b366d] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />

          {/* Animated Border/Glow Effect */}
          <div className="absolute inset-0 border-2 border-white border-opacity-10 rounded-xl group-hover:border-[#E8DDB5] group-hover:border-opacity-50 transition-colors duration-300" />

          {/* Button Text */}
          <div className="relative z-10 flex items-center gap-4">
            <span className="text-4xl md:text-5xl text-[#E8DDB5] font-['Impact'] tracking-wider group-hover:text-white transition-colors duration-300">
              SIGN GUESTBOOK
            </span>
            <ArrowUpRight className="w-8 h-8 text-[#E8DDB5] group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
          </div>

          {/* Subtly animated glow behind text on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-white blur-2xl transition-opacity duration-500" />
        </a>
      </div>
    </main>
  );
}