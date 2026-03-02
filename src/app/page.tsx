"use client";

import { useState } from "react";
import MobileView from "@/app/components/MobileView";
import Background from "@/app/components/Background";
import LeftColumn from "@/app/components/LeftColumn";
import RightColumn from "@/app/components/RightColumn";
import CursorGlow from "./components/CursorGlow";

export default function Home() {
  const [moreHoveredIndex, setMoreHoveredIndex] = useState<number | null>(null);

  return (
    <main className="min-h-screen w-full relative">
      {/* 1. Background - Fixed behind everything */}
      <div className="fixed inset-0 z-0">
        <Background />
      </div>

      {/* 2. DESKTOP VIEW - Only renders blocks/flex on md+ screens */}
      <div
        className="hidden md:block relative z-10 w-full"
        style={{
          '--left-col-width': '26.67vw',
          '--right-col-width': '53.33vw',
          '--total-content-width': 'calc(var(--left-col-width) + var(--right-col-width))',
          '--remaining-space': 'calc(100vw - var(--total-content-width))',
          '--side-margin': 'calc(var(--remaining-space) / 2)',
          '--left-start': 'var(--side-margin)',
          '--right-start': 'calc(var(--side-margin) + var(--left-col-width))'
        } as React.CSSProperties}
      >
        <CursorGlow />
        <LeftColumn moreHoveredIndex={moreHoveredIndex} onMoreHover={setMoreHoveredIndex} />
        <RightColumn moreHoveredIndex={moreHoveredIndex} onMoreHover={setMoreHoveredIndex} />
      </div>

      {/* 3. MOBILE VIEW - Completely ignored by Desktop layout */}
      <div className="md:hidden relative z-20 w-full">
        <MobileView />
      </div>
    </main>
  );
}