import { useEffect } from "react";

export const Navbar = ({ menuOpen, setMenuOpen }) => {
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

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
    </nav>
  );
};
