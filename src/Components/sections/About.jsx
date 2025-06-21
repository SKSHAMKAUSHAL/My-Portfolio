import { RevealOnScroll } from "./RevealOnScroll";
import { FaCode, FaServer, FaTools } from "react-icons/fa"; 

export const About = () => {
  const frontendSkills = ["React", "HTML", "CSS", "TailwindCSS", "JavaScript"];
  const backendSkills = ["Node.js", "Java", "SQL", "MongoDB", "Express.js"];
  const tools = ["Git", "GitHub", "VS Code", "Postman", "Netlify"];

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

          <div className="rounded-xl p-8 border border-white/10 hover:-translate-y-1 transition-all">
            <p className="text-gray-300 mb-6 text-center text-lg">
              Passionate full-stack developer with a strong focus on building
              user-friendly, scalable, and performance-driven applications.
            </p>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              {/* Frontend */}
              <div className="rounded-xl p-6 border border-white/10 hover:-translate-y-1 transition-all">
                <h3 className="text-xl font-bold mb-4 flex justify-center items-center gap-2">
                  <FaCode /> Frontend
                </h3>
                <div className="flex flex-wrap justify-center gap-2">
                  {frontendSkills.map((tech, key) => (
                    <span
                      key={key}
                      className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Backend */}
              <div className="rounded-xl p-6 border border-white/10 hover:-translate-y-1 transition-all">
                <h3 className="text-xl font-bold mb-4 flex justify-center items-center gap-2">
                  <FaServer /> Backend
                </h3>
                <div className="flex flex-wrap justify-center gap-2">
                  {backendSkills.map((tech, key) => (
                    <span
                      key={key}
                      className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tools */}
              <div className="rounded-xl p-6 border border-white/10 hover:-translate-y-1 transition-all">
                <h3 className="text-xl font-bold mb-4 flex justify-center items-center gap-2">
                  <FaTools /> Tools & Platforms
                </h3>
                <div className="flex flex-wrap justify-center gap-2">
                  {tools.map((tool, key) => (
                    <span
                      key={key}
                      className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition"
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
            <div className="p-6 rounded-xl border border-white/10 hover:-translate-y-1 transition-all">
              <h3 className="text-xl font-bold mb-4">🏫 Education</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
               <li>
      <strong>B.E. in Computer Science</strong> – Chitkara University x Kalvium (2024–2028)
    </li>
 
    <li>
      Gaining hands-on experience in modern technologies like React, Node.js, Git, and Agile practices through continuous collaboration and mentoring.
    </li>
    </ul>
            </div>

            {/* Services */}
            <div className="p-6 rounded-xl border border-white/10 hover:-translate-y-1 transition-all">
              <h3 className="text-xl font-bold mb-4">💼 Services</h3>
              <div className="space-y-4 text-gray-300">
                <div>
                  <h4 className="font-semibold">Development</h4>
                  <p>
                    I develop custom web applications that offer smooth and responsive experiences.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">Web Design</h4>
                  <p>
                    Creating aesthetically pleasing and functional websites tailored to user needs.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">Maintenance & Support</h4>
                  <p>
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
