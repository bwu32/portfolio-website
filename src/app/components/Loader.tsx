// src/components/Loader.tsx
import React from 'react';

interface LoaderProps {
  loading: boolean;
  progress: number; // Progress value should be between 0 and 100
}

const Loader: React.FC<LoaderProps> = ({ loading, progress }) => {
  if (!loading) return null; // Do not render if not loading

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#1B224C] z-50">
      <div className="relative">
        {/* Replace 'path/to/your/image.png' with your image path */}
        <img 
          src="/icons/snowflake.png" 
          alt="Loading" 
          className="slow-spin h-16 w-16" 
        />
      </div>
      <div className="w-full max-w-xs mt-4">
        <div className="bg-gray-300 rounded-full h-2.5">
          <div 
            className="bg-white rounded-full h-2.5" 
            style={{ width: `${progress}%` }} // Dynamically set width
          />
        </div>
      </div>
    </div>
  );
}

export default Loader;
