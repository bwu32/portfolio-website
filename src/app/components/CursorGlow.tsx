// src/components/CursorGlow.tsx
"use client";  // This makes the component a client component

import { useEffect, useRef } from 'react';

const CursorGlow = () => {
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${event.clientX}px`;
        cursorRef.current.style.top = `${event.clientY}px`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed pointer-events-none w-[1000px] h-[1000px] bg-cover bg-center opacity-[7%] transform -translate-x-1/2 -translate-y-1/2 z-0" // Changed w-160 to w-32 and h-160 to h-32
      style={{
        backgroundImage: 'url("/icons/glow.png")', // Update with your image path
      }}
    />
  );
};

export default CursorGlow;
