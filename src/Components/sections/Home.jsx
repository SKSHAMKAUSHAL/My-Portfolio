import { RevealOnScroll } from "./RevealOnScroll";
import { FaDownload, FaGithub, FaLinkedin } from "react-icons/fa";
import proPic from "/proPic.jpg";

export const Home = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative text-center py-20 md:py-0"
    >
      <RevealOnScroll>
        <div className="z-10 px-4">
          {/* Profile Picture */}
          <div className="mb-6">
            <img
              src={proPic}
              alt="Sksham Kaushal"
              className="w-40 h-40 md:w-48 md:h-48 rounded-full mx-auto object-cover border-4 border-blue-500/50 shadow-lg transition-transform duration-300 hover:scale-105"
            />
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent leading-tight">
            Hi, I'm Sksham Kaushal
          </h1>

          <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
            I’m a full-stack developer who loves crafting clean, scalable web
            applications. I enjoy learning new technologies and continuously
            improving my skills.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#projects"
              className="bg-blue-500 text-white py-3 px-6 rounded-md font-medium transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/30"
            >
              View Projects
            </a>

            <a
              href="https://docs.google.com/document/d/1pbIXoxfexCJ_l1Ro8eUWYgo7GUCJ7dHMJzy1XTuwNhw/edit?usp=sharing"
              download
              className="flex items-center gap-2 border border-blue-500/50 text-blue-500 py-3 px-6 rounded-md font-medium transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/20 hover:bg-blue-500/10"
            >
              <FaDownload />
              Resume
            </a>
          </div>

          {/* Social Links */}
          <div className="mt-8 flex justify-center gap-6 text-2xl">
            <a
              href="https://github.com/SKSHAMKAUSHAL"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 transition-colors duration-300"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a
              href="https://linkedin.com/in/sksham-kaushal"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 transition-colors duration-300"
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
