import React from 'react';

export const InteractiveBg = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute top-[8%] left-[10%] w-[38vw] h-[38vw] rounded-full bg-indigo-500/8 blur-[130px] animate-blob-1" />
      <div className="absolute top-[38%] right-[5%] w-[35vw] h-[35vw] rounded-full bg-purple-500/6 blur-[110px] animate-blob-2" />
      <div className="absolute bottom-[12%] left-[18%] w-[40vw] h-[40vw] rounded-full bg-cyan-500/8 blur-[125px] animate-blob-3" />
    </div>
  );
};
