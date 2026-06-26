import React from "react";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50 opacity-70">
      <div className="relative w-26 h-26 animate-spin">
        <span className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white"></span>

        <span className="absolute top-[15%] right-[15%] w-4 h-4 rounded-full bg-white"></span>

        <span className="absolute top-1/2 right-0 -translate-y-1/2 w-4 h-4 rounded-full bg-white"></span>

        <span className="absolute bottom-[15%] right-[15%] w-4 h-4 rounded-full bg-white"></span>

        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white"></span>

        <span className="absolute bottom-[15%] left-[15%] w-4 h-4 rounded-full bg-white"></span>

        <span className="absolute top-1/2 left-0 -translate-y-1/2 w-4 h-4 rounded-full bg-white"></span>

        <span className="absolute top-[15%] left-[15%] w-4 h-4 rounded-full bg-white"></span>
      </div>
    </div>
  );
}
