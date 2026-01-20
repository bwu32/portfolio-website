"use client";

import { useEffect, useState } from "react";
import Background from "@/app/components/Background";
import LeftColumn from "@/app/components/LeftColumn";
import RightColumn from "@/app/components/RightColumn";
import MobileView from "@/app/components/MobileView"; // Import your new component
import CursorGlow from "./components/CursorGlow";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const fetchData = () => {
    setIsLoading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsLoading(false);
          return 100;
        }
        return Math.min(prev + 20, 100);
      });
    }, 500);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="min-h-screen">
      <Background />
      
      {/* 1. MOBILE VIEW: Shows only on small screens */}
      <div className="block md:hidden relative z-10">
        <MobileView />
      </div>

      {/* 2. DESKTOP VIEW: Shows only on medium (768px) screens and up */}
      <div 
        className="hidden md:flex w-full z-10 relative"
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
        <LeftColumn />
        <RightColumn />
      </div>
    </main>
  );
}