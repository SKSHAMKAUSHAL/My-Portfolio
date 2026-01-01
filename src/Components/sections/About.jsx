import { RevealOnScroll } from "./RevealOnScroll";
import { FaCode, FaServer, FaTools } from "react-icons/fa"; 
import { useState } from "react";

export const About = () => {
  const frontendSkills = ["React", "HTML", "CSS", "TailwindCSS", "JavaScript"];
  const backendSkills = ["Node.js", "Java", "MongoDB", "Express.js"];
  const tools = ["Git", "GitHub", "VS Code", "Postman", "Netlify"];
  const [hoveredSkill, setHoveredSkill] = useState(null);

  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center py-20"
    >
      <RevealOnScroll>
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center underline decoration-blue-500/40 underline-offset-8">
            About Me
          </h2>

<div className="rounded-xl p-8 border border-white/10 hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(59,130,246,0.15)] transition-all duration-300">
            <p className="text-gray-300 mb-6 text-center text-lg leading-relaxed hover:text-white transition-colors duration-300">
              Passionate full-stack developer with a strong focus on building
              user-friendly, scalable, and performance-driven applications.
            </p>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              {/* Frontend */}
              <div className="rounded-xl p-6 border border-white/10 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(59,130,246,0.2)] hover:border-blue-500/30 transition-all duration-300 group">
                <h3 className="text-xl font-bold mb-4 flex justify-center items-center gap-2 group-hover:text-blue-400 transition-colors">
                  <FaCode className="group-hover:rotate-12 transition-transform duration-300" /> Frontend
                </h3>
                <div className="flex flex-wrap justify-center gap-2">
                  {frontendSkills.map((tech, key) => (
                    <span
                      key={key}
                      onMouseEnter={() => setHoveredSkill(tech)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      className={`bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500 hover:text-white hover:scale-110 hover:shadow-[0_4px_15px_rgba(59,130,246,0.4)] transition-all duration-300 cursor-pointer ${
                        hoveredSkill === tech ? "ring-2 ring-blue-400" : ""
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Backend */}
              <div className="rounded-xl p-6 border border-white/10 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(59,130,246,0.2)] hover:border-blue-500/30 transition-all duration-300 group">
                <h3 className="text-xl font-bold mb-4 flex justify-center items-center gap-2 group-hover:text-blue-400 transition-colors">
                  <FaServer className="group-hover:rotate-12 transition-transform duration-300" /> Backend
                </h3>
                <div className="flex flex-wrap justify-center gap-2">
                  {backendSkills.map((tech, key) => (
                    <span
                      key={key}
                      onMouseEnter={() => setHoveredSkill(tech)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      className={`bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500 hover:text-white hover:scale-110 hover:shadow-[0_4px_15px_rgba(59,130,246,0.4)] transition-all duration-300 cursor-pointer ${
                        hoveredSkill === tech ? "ring-2 ring-blue-400" : ""
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tools */}
              <div className="rounded-xl p-6 border border-white/10 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(59,130,246,0.2)] hover:border-blue-500/30 transition-all duration-300 group">
                <h3 className="text-xl font-bold mb-4 flex justify-center items-center gap-2 group-hover:text-blue-400 transition-colors">
                  <FaTools className="group-hover:rotate-12 transition-transform duration-300" /> Tools & Platforms
                </h3>
                <div className="flex flex-wrap justify-center gap-2">
                  {tools.map((tool, key) => (
                    <span
                      key={key}
                      onMouseEnter={() => setHoveredSkill(tool)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      className={`bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500 hover:text-white hover:scale-110 hover:shadow-[0_4px_15px_rgba(59,130,246,0.4)] transition-all duration-300 cursor-pointer ${
                        hoveredSkill === tool ? "ring-2 ring-blue-400" : ""
                      }`}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Education & Services */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            {/* Education */}
            <div className="p-6 rounded-xl border border-white/10 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(59,130,246,0.2)] hover:border-blue-500/30 transition-all duration-300 group">
              <h3 className="text-xl font-bold mb-4 group-hover:text-blue-400 transition-colors">🏫 Education</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li className="typing-animation">
                  <strong>B.E. in Computer Science</strong> – Chitkara University x Kalvium (2024–2028)
                </li>
                <li className="typing-animation" style={{animationDelay: '1s'}}>
                  Gaining hands-on experience in modern technologies like React, Node.js, and Git practices through continuous collaboration and mentoring.
                </li>
              </ul>
            </div>

            {/* Services */}
            <div className="p-6 rounded-xl border border-white/10 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(59,130,246,0.2)] hover:border-blue-500/30 transition-all duration-300 group">
              <h3 className="text-xl font-bold mb-4 group-hover:text-blue-400 transition-colors">💼 Services</h3>
              <div className="space-y-4 text-gray-300">
                <div className="hover:translate-x-2 transition-transform duration-300">
                  <h4 className="font-semibold typing-animation" style={{animationDelay: '1.5s'}}>Development</h4>
                  <p className="typing-animation" style={{animationDelay: '2s'}}>
                    I develop custom web applications that offer smooth and responsive experiences.
                  </p>
                </div>
                <div className="hover:translate-x-2 transition-transform duration-300">
                  <h4 className="font-semibold typing-animation" style={{animationDelay: '2.5s'}}>Web Design</h4>
                  <p className="typing-animation" style={{animationDelay: '3s'}}>
                    Creating aesthetically pleasing and functional websites tailored to user needs.
                  </p>
                </div>
                <div className="hover:translate-x-2 transition-transform duration-300">
                  <h4 className="font-semibold typing-animation" style={{animationDelay: '3.5s'}}>Maintenance & Support</h4>
                  <p className="typing-animation" style={{animationDelay: '4s'}}>
                    Providing long-term support and updates for deployed applications.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
