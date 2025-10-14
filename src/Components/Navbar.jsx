import { useEffect, useState, useCallback } from "react";

export const Navbar = ({ menuOpen, setMenuOpen }) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const updateScrollProgress = useCallback(() => {
    const scrollTop = window.pageYOffset;
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = windowHeight > 0 ? (scrollTop / windowHeight) * 100 : 0;
    setScrollProgress(Math.min(Math.max(progress, 0), 100));
  }, []);

  useEffect(() => {
    // Initial calculation
    updateScrollProgress();

    // Throttled scroll listener for better performance
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateScrollProgress();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateScrollProgress, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateScrollProgress);
    };
  }, [updateScrollProgress]);

  return (
    <nav className="fixed top-0 w-full z-40 bg-[rgba(10, 10, 10, 0.8)] backdrop-blur-lg border-b border-white/10 shadow-lg">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <a
            href="#home"
            className="flex items-center gap-2 font-mono text-xl font-bold text-white group"
          >
            {/* Interactive "S" Icon */}
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white font-extrabold text-lg transition-transform group-hover:rotate-[360deg] duration-500">
              S
            </div>

            Sksham<span className="text-blue-500"> Kaushal</span>
          </a>

          <div
            className="w-7 h-5 relative cursor-pointer z-40 md:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            &#9776;
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="nav-link">
              <span>Home</span>
            </a>
            <a href="#about" className="nav-link">
              <span>About</span>
            </a>
            <a href="#projects" className="nav-link">
              <span>Projects</span>
            </a>
            <a href="#contact" className="nav-link">
              <span>Contact</span>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-400 transition-all duration-150 ease-out shadow-[0_0_10px_rgba(59,130,246,0.6)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </nav>
  );
};
