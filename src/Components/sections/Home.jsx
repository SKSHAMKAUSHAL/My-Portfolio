import { RevealOnScroll } from "./RevealOnScroll";
import { FaDownload, FaGithub, FaLinkedin } from "react-icons/fa";  

export const Home = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative"
    >
      <RevealOnScroll>
        <div className="text-center z-10 px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent leading-right">
            Hi, I'm Sksham Kaushal
          </h1>

          <p className="text-gray-400 text-lg mb-8 max-w-lg mx-auto">
            I’m a full-stack developer who loves crafting clean, scalable web
            applications. I enjoy learning new technologies and continuously improving my skills
          </p>

          {/* ✅ Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#projects"
              className="bg-blue-500 text-white py-3 px-6 rounded font-medium transition relative overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]"
            >
              View Projects
            </a>

          
            <a
              href="/Port/public/Sksham Kaushal   (3).pdf" 
              download
              className="flex items-center gap-2 border border-blue-500/50 text-blue-500 py-3 px-6 rounded font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] hover:bg-blue-500/10"
            >
              <FaDownload className="text-blue-500" />
              Resume
            </a>
          </div>

       <div className="mt-6 flex justify-center gap-6 text-xl">
  <a
    href="https://github.com/SKSHAMKAUSHAL" 
    target="_blank"
    rel="noopener noreferrer"
    className="text-white hover:text-blue-500 transition"
    aria-label="GitHub"
  >
    <FaGithub />
  </a>
  <a
    href="https://linkedin.com/in/sksham-kaushal" 
    target="_blank"
    rel="noopener noreferrer"
    className="text-white hover:text-blue-500 transition"
    aria-label="LinkedIn"
  >
    <FaLinkedin />
  </a>
</div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
