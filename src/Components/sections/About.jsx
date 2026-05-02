import { RevealOnScroll } from "./RevealOnScroll";
import { FaCode, FaServer, FaTools } from "react-icons/fa";
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

export const About = () => {
  const frontendSkills = ["React", "HTML", "CSS", "TailwindCSS", "JavaScript"];
  const backendSkills = ["Node.js", "Java", "MongoDB", "Express.js"];
  const tools = ["Git", "GitHub", "VS Code", "Postman", "Netlify"];
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const defaultJourneyItems = [
    {
      title: "Education",
      description: "B.E. in Computer Science at Chitkara University x Kalvium (2024–2028). Gaining hands-on experience in modern technologies.",
      icon: "🎓",
    },
    {
      title: "TCS CodeVita",
      description: "Participated in TCS CodeVita, ranking among top performers out of 100,000+ participants globally.",
      icon: "🏆",
    },
    {
      title: "MERN Stack Developer",
      description: "Building scalable and performant full-stack web applications using MongoDB, Express.js, React, and Node.js.",
      icon: "💻",
    },
    {
      title: "Hackathons",
      description: "Actively participated in multiple hackathons including HackIndia and SIH (Smart India Hackathon) to solve real-world problems.",
      icon: "🚀",
    }
  ];

  const [journeyItems, setJourneyItems] = useState(defaultJourneyItems);

  useEffect(() => {
    if (!db) return;
    try {
      const q = query(collection(db, "journeys"), orderBy("createdAt", "asc"));
      const unsub = onSnapshot(q, (snapshot) => {
        if (!snapshot.empty) {
          const j = [];
          snapshot.forEach(doc => j.push({ id: doc.id, ...doc.data() }));
          setJourneyItems(j);
        }
      });
      return () => unsub();
    } catch (error) {
      console.error("Error fetching journeys:", error);
    }
  }, []);

  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center py-20 relative overflow-hidden"
    >
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-cyan-400/10 rounded-full blur-[120px] pointer-events-none"></div>

      <RevealOnScroll>
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-300 via-blue-500 to-cyan-400 bg-clip-text text-transparent tracking-tight">
              About Me
            </h2>
            <div className="w-24 h-1 mx-auto bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full opacity-50"></div>
          </div>

          <div className="bg-zinc-900/40 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:shadow-[0_16px_48px_rgba(59,130,246,0.05)] transition-all duration-500">
            <p className="text-gray-300 mb-12 text-center text-lg md:text-xl leading-relaxed font-light">
              Passionate full-stack developer with a strong focus on building
              <span className="text-blue-400 font-medium"> user-friendly</span>,
              <span className="text-blue-400 font-medium"> scalable</span>, and
              <span className="text-blue-400 font-medium"> performance-driven</span> applications.
            </p>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {/* Frontend */}
              <div className="bg-zinc-950/50 rounded-2xl p-8 border border-white/5 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(59,130,246,0.1)] hover:border-blue-500/20 transition-all duration-500 group">
                <h3 className="text-xl font-bold mb-6 flex justify-center items-center gap-3 text-white group-hover:text-blue-400 transition-colors">
                  <FaCode className="text-blue-500 group-hover:rotate-12 transition-transform duration-500" /> Frontend
                </h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {frontendSkills.map((tech, key) => (
                    <span
                      key={key}
                      onMouseEnter={() => setHoveredSkill(tech)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      className={`bg-zinc-800 text-gray-300 py-1.5 px-4 rounded-full text-sm border border-white/5 hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-500 hover:text-white hover:border-transparent hover:scale-110 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all duration-300 cursor-pointer ${hoveredSkill === tech ? "ring-2 ring-blue-400/50" : ""
                        }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Backend */}
              <div className="bg-zinc-950/50 rounded-2xl p-8 border border-white/5 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(59,130,246,0.1)] hover:border-blue-500/20 transition-all duration-500 group">
                <h3 className="text-xl font-bold mb-6 flex justify-center items-center gap-3 text-white group-hover:text-blue-400 transition-colors">
                  <FaServer className="text-blue-500 group-hover:rotate-12 transition-transform duration-500" /> Backend
                </h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {backendSkills.map((tech, key) => (
                    <span
                      key={key}
                      onMouseEnter={() => setHoveredSkill(tech)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      className={`bg-zinc-800 text-gray-300 py-1.5 px-4 rounded-full text-sm border border-white/5 hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-500 hover:text-white hover:border-transparent hover:scale-110 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all duration-300 cursor-pointer ${hoveredSkill === tech ? "ring-2 ring-blue-400/50" : ""
                        }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tools */}
              <div className="bg-zinc-950/50 rounded-2xl p-8 border border-white/5 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(59,130,246,0.1)] hover:border-blue-500/20 transition-all duration-500 group">
                <h3 className="text-xl font-bold mb-6 flex justify-center items-center gap-3 text-white group-hover:text-blue-400 transition-colors">
                  <FaTools className="text-blue-500 group-hover:rotate-12 transition-transform duration-500" /> Tools & Platforms
                </h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {tools.map((tool, key) => (
                    <span
                      key={key}
                      onMouseEnter={() => setHoveredSkill(tool)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      className={`bg-zinc-800 text-gray-300 py-1.5 px-4 rounded-full text-sm border border-white/5 hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-500 hover:text-white hover:border-transparent hover:scale-110 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all duration-300 cursor-pointer ${hoveredSkill === tool ? "ring-2 ring-blue-400/50" : ""
                        }`}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Roadmap Journey */}
          <div className="mt-32 mb-10">
            <h3 className="text-3xl md:text-4xl font-bold mb-16 text-center text-white bg-gradient-to-r from-blue-300 to-cyan-400 bg-clip-text text-transparent tracking-wide">
              My Journey
            </h3>
            <div className="relative max-w-4xl mx-auto px-4 md:px-0">
              {/* Thin Vertical Line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-blue-500/40 to-transparent -translate-x-1/2"></div>

              <div className="space-y-12">
                {journeyItems.map((item, index) => (
                  <div key={index} className={`relative flex flex-col md:flex-row items-center ${index % 2 === 0 ? "md:flex-row-reverse" : ""} group`}>
                    
                    {/* Glowing Sharp Dot */}
                    <div className="absolute left-8 md:left-1/2 w-3 h-3 rounded-full bg-blue-500 -translate-x-1/2 z-10 group-hover:scale-[2] group-hover:bg-cyan-400 transition-all duration-500 shadow-[0_0_10px_rgba(59,130,246,0.8)] group-hover:shadow-[0_0_20px_rgba(34,211,238,1)]"></div>

                    {/* Connecting Line (Desktop) */}
                    <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 h-[2px] w-12 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-all duration-500 z-0 ${
                      index % 2 === 0
                        ? "left-1/2 from-blue-500/80 to-transparent"
                        : "right-1/2 from-transparent to-blue-500/80"
                    }`}></div>

                    {/* Content Box */}
                    <div className={`ml-20 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pl-12" : "md:pr-12"} w-[calc(100%-5rem)]`}>
                      <div className="relative bg-zinc-900/30 backdrop-blur-md p-6 rounded-2xl border border-white/5 overflow-hidden group-hover:border-blue-500/40 transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_10px_40px_rgba(59,130,246,0.15)]">
                        {/* Hover Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                        
                        <div className="relative z-10 flex flex-col sm:flex-row items-start gap-4">
                          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-zinc-800/50 flex items-center justify-center text-2xl grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110 group-hover:bg-blue-500/20 border border-white/5 group-hover:border-blue-500/30">
                            {item.icon}
                          </div>
                          <div>
                            <h4 className="text-xl font-bold text-gray-200 mb-2 group-hover:text-blue-400 transition-colors tracking-tight">{item.title}</h4>
                            <p className="text-gray-400 text-sm leading-relaxed font-light">{item.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </RevealOnScroll>
    </section>
  );
};
