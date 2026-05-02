import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center relative overflow-hidden text-white perspective-[1000px]">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[150px] animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-cyan-400/20 rounded-full blur-[150px] animate-pulse pointer-events-none delay-1000"></div>

      <div className="relative z-10 flex flex-col items-center animate-[float_6s_ease-in-out_infinite] group hover:scale-105 transition-transform duration-700">
        <h1 className="text-[12rem] md:text-[18rem] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-blue-400 via-cyan-300 to-blue-600 drop-shadow-[0_20px_50px_rgba(59,130,246,0.5)] transform-gpu rotate-y-[-10deg] rotate-x-[10deg] group-hover:rotate-y-[0deg] group-hover:rotate-x-[0deg] transition-all duration-700">
          404
        </h1>
        
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
          <h1 className="text-[12rem] md:text-[18rem] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-tr from-cyan-400 to-blue-500 blur-xl">
            404
          </h1>
        </div>
      </div>

      <h2 className="text-3xl md:text-4xl font-bold mt-8 mb-4 text-center z-10 tracking-wide">Lost in Cyberspace?</h2>
      <p className="text-gray-400 text-center max-w-md mb-12 z-10 leading-relaxed font-light">
        The page you're looking for doesn't exist or has been moved to another dimension.
      </p>

      <Link 
        to="/" 
        className="relative z-10 px-8 py-4 bg-zinc-900 border border-white/10 hover:border-blue-500/50 text-white font-bold rounded-full overflow-hidden group transition-all duration-500 shadow-[0_0_20px_rgba(59,130,246,0.1)] hover:shadow-[0_0_40px_rgba(59,130,246,0.4)] hover:-translate-y-2 active:translate-y-0"
      >
        <span className="relative z-10 flex items-center gap-3">
          Return to Reality
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"></div>
      </Link>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotateX(10deg) rotateY(-10deg); }
          50% { transform: translateY(-20px) rotateX(15deg) rotateY(-5deg); }
        }
      `}</style>
    </div>
  );
};
