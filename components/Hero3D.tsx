
import React from 'react';

const Hero3D: React.FC = () => {
  return (
    <div className="relative w-full max-w-sm aspect-[9/18] perspective-1000 mx-auto">
      {/* 3D Mobile Container */}
      <div className="w-full h-full rotate-3d relative">
        {/* Mobile Body */}
        <div className="absolute inset-0 bg-slate-800 rounded-[3rem] border-4 border-slate-700 shadow-2xl overflow-hidden">
          {/* Screen Content */}
          <div className="absolute inset-1.5 bg-blue-900 rounded-[2.5rem] overflow-hidden flex flex-col">
            <div className="h-6 w-24 bg-black rounded-b-xl mx-auto flex items-center justify-center gap-2">
              <div className="w-2 h-2 rounded-full bg-slate-700"></div>
              <div className="w-8 h-1 rounded-full bg-slate-700"></div>
            </div>
            
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-white space-y-4">
               <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                 <i className="fas fa-check-circle text-3xl text-blue-400"></i>
               </div>
               <div className="space-y-2">
                 <div className="h-2 w-32 bg-white/30 rounded-full mx-auto"></div>
                 <div className="h-2 w-24 bg-white/20 rounded-full mx-auto"></div>
                 <div className="h-2 w-28 bg-white/10 rounded-full mx-auto"></div>
               </div>
               <div className="text-xs font-bold uppercase tracking-widest text-blue-300">
                 100% Tested
               </div>
            </div>

            <div className="h-1 bg-white/20 w-1/3 mx-auto mb-4 rounded-full"></div>
          </div>
          
          {/* Side Buttons */}
          <div className="absolute top-24 -left-1 w-1 h-12 bg-slate-600 rounded-r-lg"></div>
          <div className="absolute top-40 -left-1 w-1 h-10 bg-slate-600 rounded-r-lg"></div>
          <div className="absolute top-32 -right-1 w-1 h-16 bg-slate-600 rounded-l-lg"></div>
        </div>

        {/* Gloss Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 pointer-events-none rounded-[3rem]"></div>
      </div>
      
      {/* Reflection Shadow */}
      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-black/20 blur-xl rounded-full"></div>
    </div>
  );
};

export default Hero3D;
