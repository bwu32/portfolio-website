"use client";

import { useEffect, useState } from "react";
import Loader from "@/app/components/Loader";
import Background from "@/app/components/Background";
import LeftColumn from "@/app/components/LeftColumn";
import RightColumn from "@/app/components/RightColumn";
import CursorGlow from "./components/CursorGlow";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false); // Start with false
  const [progress, setProgress] = useState(0);

  // Function to simulate data fetching
  const fetchData = () => {
    setIsLoading(true);
    setProgress(0);

    // Simulate data loading with progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsLoading(false); // Hide loader when done
          return 100;
        }
        return Math.min(prev + 20, 100); // Increase progress by 20%
      });
    }, 500); // Adjust interval time as needed
  };

  useEffect(() => {
    // Call fetchData() when the component mounts to simulate loading
    fetchData();
  }, []);

  // If loading, show the loader
  // if (isLoading) {
  //   return <Loader loading={isLoading} progress={progress} />;
  // }

return (
    <main className="relative min-h-screen bg-black">
      <Background />
      <CursorGlow />
      
      <div className="relative z-10 flex w-full max-w-screen-xl mx-auto">
        <LeftColumn />
        <RightColumn />
      </div>
    </main>
  );
}
