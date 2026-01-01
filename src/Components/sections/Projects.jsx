import { RevealOnScroll } from "./RevealOnScroll";

export const Projects = () => {
  const projects = [
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
      tech: ["MERN STACK", "Redis", "JWT", "Winston","React 19", "Tailwind CSS", "Chart.js", "Lucide Icons","Vercel"],
      github: "https://github.com/SKSHAMKAUSHAL/GET_SHORT_URL",
      live: "https://url-shortener-01.vercel.app/",
      image: "/image8.png"
    }
    ,
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
      tech: ["Java", "Swing", "Object-Oriented Programming"],
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

  return (
    <section
      id="projects"
      className="min-h-screen flex items-center justify-center py-20"
    >
      <RevealOnScroll>
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center">
            Projects...
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-gray-900/50 to-gray-800/30 rounded-2xl border border-white/10 overflow-hidden hover:border-blue-500/50 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(59,130,246,0.3)] hover:-translate-y-2 flex flex-col h-full"
              >
                {/* Image Container with Overlay - Fixed Height */}
                <div className="relative h-48 overflow-hidden flex-shrink-0">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    loading="lazy"
                  />

                  {/* Elegant Blurred Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-blue-800/70 to-cyan-900/80 opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-md"></div>

                  {/* Text Overlay that appears on hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 z-10">
                    <div className="text-center px-4">
                      <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-2xl">
                        {project.title}
                      </h3>
                      <p className="text-sm text-blue-200 font-medium tracking-wide">View Details</p>
                    </div>
                  </div>
                </div>

                {/* Content Section - Flexible Height */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-4 text-sm leading-relaxed line-clamp-2 min-h-[2.5rem]">
                    {project.description}
                  </p>

                  {/* Tech Stack - Fixed Height */}
                  <div className="flex flex-wrap gap-2 mb-5 min-h-[3rem]">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-xs font-medium border border-blue-500/20 hover:bg-blue-500/20 hover:scale-105 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all duration-300 h-fit"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links - Push to Bottom */}
                  <div className="flex items-center gap-4 pt-4 border-t border-white/10 mt-auto">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center py-2.5 px-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg font-medium hover:from-blue-500 hover:to-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all duration-300 transform hover:scale-105"
                    >
                      GitHub →
                    </a>
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center py-2.5 px-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg font-medium hover:from-blue-500 hover:to-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all duration-300 transform hover:scale-105"
                      >
                        Live 👁
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};