import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Background from "@/app/components/Background";
import CursorGlow from "@/app/components/CursorGlow";

export default function GuestbookPage() {
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
      {/* Subheading with link back home */}
      <Link
        href="/"
        className="group text-2xl text-white mb-2 opacity-50 hover:opacity-100 transition-opacity inline-flex items-center gap-2"
      >
        <span
          className="relative -top-[2px] text-3xl leading-none transform transition-transform duration-300 group-hover:-translate-x-2"
        >
          &laquo;
        </span>
        <span className="tracking-wide">BRIAN WU</span>
      </Link>

      {/* Main Title */}
      <div>
        <h1 className="text-7xl text-[#E8DDB5] font-['Impact']">GUESTBOOK</h1>
        <p className="text-lg text-white mt-4 mb-12 opacity-50 max-w-[300px] leading-relaxed">now this is awesome.</p>
      </div>
      <CursorGlow />
    </main>
  );
}
