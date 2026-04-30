import { RevealOnScroll } from "./RevealOnScroll";
import { useState, useEffect } from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { db } from "../../firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

const ProjectDescription = ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLong = text && text.length > 120;
  
  return (
    <div className="mb-6">
      <div className={`text-gray-300 text-sm leading-relaxed whitespace-pre-wrap pr-1 ${isExpanded ? 'max-h-32 overflow-y-auto' : 'line-clamp-3'}`}>
        {text}
      </div>
      {isLong && (
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-400 text-xs font-bold mt-2 hover:text-blue-300 transition-colors"
        >
          {isExpanded ? "Show Less" : "Read More..."}
        </button>
      )}
    </div>
  );
};

export const Projects = () => {
  const [showAll, setShowAll] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const defaultProjects = [
    {
      title: "E-Commerce Web App",
      description: "e-commerce website with modern UI using firebase, payment integration.",
      tech: ["firebase", "TailwindCSS", "React", "razorpay"],
      github: "https://github.com/SKSHAMKAUSHAL/E_SHOP_UP.git",
      live: "https://shop-with-shopup.netlify.app/",
      image: "/image3.png"
    },
    {
      title: "URL SHORTNER",
      description: "A URL SHORTNER WEBPAGE",
      tech: ["MERN", "Redis", "JWT", "React", "Tailwind CSS"],
      github: "https://github.com/SKSHAMKAUSHAL/GET_SHORT_URL",
      live: "https://url-shortener-01.vercel.app/",
      image: "/image8.png"
    },
    {
      title: "Movie App",
      description: "A sleek and responsive movie browsing application built using React.",
      tech: ["TMDB", "Netlify", "React"],
      github: "https://github.com/SKSHAMKAUSHAL/Movie-APP.git",
      live: "https://skmovieapp.netlify.app/",
      image: "/image4.png"
    },
    {
      title: "OPEN BOARD",
      description: "A REAL TIME OPEN BOARD SITE",
      tech: ["HTML", "CSS", "JS", "socket.io", "Express.js"],
      github: "https://github.com/SKSHAMKAUSHAL/OPEN-BOARD.git",
      live: "https://open-board-1.onrender.com/",
      image: "/image1.png"
    },
    {
      title: "CAMERA GALLERY APP",
      description: "A CAMERA GALLERY WITH SOME FILTRE",
      tech: ["HTML", "CSS", "JS", "Canvas"],
      github: "https://github.com/SKSHAMKAUSHAL/CAMERA-GALLERY-PROJECT.git",
      live: "https://camera-gallery-sk.netlify.app",
      image: "/image2.png"
    },
    {
      title: "FIT BUDDY",
      description: "A fitness in which you can track your calories.",
      tech: ["MERN", "TailwindCSS", "Netlify"],
      github: "https://github.com/kalviumcommunity/S84_SKSHAM_capstone_FitBuddy.git",
      live: "https://fitbyfitbuddy.netlify.app/",
      image: "/image5.png"
    },
    {
      title: "PAC-MAN-GAME",
      description: "Developed a desktop version of the classic Pac-Man game using Java Swing.",
      tech: ["Java", "Swing", "OOP"],
      github: "https://github.com/SKSHAMKAUSHAL/PacMan.git",
      live: "https://no-1-pacman-game.netlify.app/",
      image: "/image6.png"
    },
    {
      title: "MERN AUTH",
      description: "A MERN AUTH APP",
      tech: ["MERN", "TailwindCss"],
      github: "https://github.com/SKSHAMKAUSHAL/MERN-AUTH.git",
      live: "https://no-1-mern-auth.netlify.app/",
      image: "/image7.png"
    }
  ];

  const [projects, setProjects] = useState(defaultProjects);

  useEffect(() => {
    if (!db) return;
    try {
      const q = query(collection(db, "projects"));
      const unsub = onSnapshot(q, (snapshot) => {
        if (!snapshot.empty) {
          const p = [];
          snapshot.forEach(doc => p.push({ id: doc.id, ...doc.data() }));
          p.sort((a, b) => {
            if (a.order !== undefined && b.order !== undefined) return a.order - b.order;
            return (b.createdAt || 0) - (a.createdAt || 0);
          });
          setProjects(p);
        }
      });
      return () => unsub();
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  }, []);

  const visibleProjects = showAll ? projects : projects.slice(0, 6);

  return (
    <section
      id="projects"
      className="min-h-screen flex items-center justify-center py-20 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-400/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10 w-full">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-300 via-blue-500 to-cyan-400 bg-clip-text text-transparent tracking-tight">
              Featured Projects
            </h2>
            <div className="w-32 h-1 mx-auto bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full opacity-50 mb-4"></div>
            <p className="text-gray-400 font-light max-w-xl mx-auto text-sm">
              A selection of recent work focusing on modern UI, full-stack integration, and scalable architecture.
            </p>
          </div>
        </RevealOnScroll>

        {/* Standard Uniform Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {visibleProjects.map((project, index) => {
            return (
              <div key={index} className="flex flex-col h-full relative group">
                {/* Blue fogging light effect behind the card */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition duration-500"></div>

                <RevealOnScroll className="h-full relative z-10">
                  <div 
                    className="bg-zinc-900 rounded-2xl border border-white/5 overflow-hidden h-full flex flex-col w-full transition-all duration-500 ease-out group-hover:scale-[1.02] group-hover:border-blue-500/40"
                  >
                    
                    {/* Image Container */}
                    <div className="relative overflow-hidden flex-shrink-0 bg-zinc-900 w-full h-56 border-b border-white/5">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover object-top"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-60"></div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 flex flex-col flex-grow justify-between">
                      <div>
                        <h3 className="text-xl font-bold mb-3 transition-colors duration-300 text-white group-hover:text-blue-400">
                          {project.title}
                        </h3>

                        <ProjectDescription text={project.description} />

                        {/* Tech Stack Pills */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.tech.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-3 py-1 rounded text-xs border font-medium transition-colors duration-300 bg-white/5 border-white/10 text-gray-300 group-hover:bg-blue-500/10 group-hover:border-blue-500/30 group-hover:text-blue-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-3 mt-auto pt-6 border-t border-white/5">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-zinc-800 text-white rounded-xl text-sm font-semibold hover:bg-zinc-700 transition-colors border border-white/5"
                        >
                          <FaGithub size={16} />
                          <span>GitHub</span>
                        </a>
                        {project.live && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-500 transition-all border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.2)] hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]"
                          >
                            <FaExternalLinkAlt size={14} />
                            <span>Live Preview</span>
                          </a>
                        )}
                      </div>
                    </div>

                  </div>
                </RevealOnScroll>
              </div>
            );
          })}
        </div>

        {/* Show More / Show Less Button */}
        {projects.length > 6 && (
          <RevealOnScroll>
            <div className="mt-12 flex justify-center">
              <button
                onClick={() => setShowAll(!showAll)}
                className="px-8 py-3 bg-white/5 border border-white/10 text-white rounded-full hover:bg-white/10 transition-all duration-300 font-medium text-sm hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]"
              >
                {showAll ? "Show Less" : "Show More Projects"}
              </button>
            </div>
          </RevealOnScroll>
        )}
      </div>
    </section>
  );
};