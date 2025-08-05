import { RevealOnScroll } from "./RevealOnScroll";

export const Projects = () => {
  return (
    <section
      id="projects"
      className="min-h-screen flex items-center justify-center py-20"
    >
 <RevealOnScroll>
  <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center">
            {" "}
            Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl border border-white/10 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition">
              <h3 className="text-xl font-bold mb-2"> OPEN BOARD</h3>
              <p className="text-gray-400 mb-4">
                A REAL TIME OPEN BOARD SITE 
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {["HTML", "CSS", "JS", "socket.io","Express.js"].map((tech, key) => (
                  <span
                    key={key}
                    className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 
                                    hover:shadow-[0_2px_8px_rgba(59,130,246,0.1)] transition-all
                    "
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex justify-between items-center">
                  <a
                  href="https://github.com/SKSHAMKAUSHAL/OPEN-BOARD.git"
                  className="text-blue-400 hover:text-blue-300 transition-colors my-4"
                >
                  View Project →
                </a>
                <a
                  href="https://open-board-1.onrender.com/"
                  className="text-blue-400 hover:text-blue-300 transition-colors my-4"
                >
                  Live link 👁
                </a>
              </div>
            </div>
            <div
              className="
              glass p-6 rounded-xl border border-white/10 
              hover:-translate-y-1 hover:border-blue-500/30
              hover:shadow-[0_4px_20px_rgba(59,130,246,0.1)]
              transition-all
            "
            >
              <h3 className="text-xl font-bold mb-2">CAMERA-GALLERY-PROJECT</h3>
              <p className="text-gray-400 mb-4">
              A Camera Gallery which work i like a real camera app
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {["HTML", "CSS", "Javascript" , "Canvas","indexDB"].map((tech, key) => (
                  <span
                    key={key}
                    className="
                      bg-blue-500/10 text-blue-500 py-1 px-3 
                      rounded-full text-sm
                      transition
                      hover:bg-blue-500/20 hover:-translate-y-0.5
                      hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)]
                    "
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center">
                   <a
                  href="https://github.com/SKSHAMKAUSHAL/CAMERA-GALLERY-PROJECT.git"
                  className="text-blue-400 hover:text-blue-300 transition-colors my-4"
                >
                  View Project →
                </a>
                <a
                  href=" camera-gallery-sk.netlify.app"
                  className="text-blue-400 hover:text-blue-300 transition-colors my-4"
                >
                  Live link 👁
                </a>
                
              </div>
              
            </div>

            <div
              className="
              glass p-6 rounded-xl border border-white/10 
              hover:-translate-y-1 hover:border-blue-500/30
              hover:shadow-[0_4px_20px_rgba(59,130,246,0.1)]
              transition-all
            "
            >
              <h3 className="text-xl font-bold mb-2">E-Commerce Web App</h3>
              <p className="text-gray-400 mb-4">
                e-commerce website with modern UI using firebase, payment
                integration.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {["firebase", "TailwindCSS", "React", "razorpay"].map(
                  (tech) => (
                    <span
                      key={tech}
                      className="
                      bg-blue-500/10 text-blue-500 py-1 px-3 
                      rounded-full text-sm
                      transition
                      hover:bg-blue-500/20 hover:-translate-y-0.5
                      hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)]
                    "
                    >
                      {tech}
                    </span>
                  )
                )}
              </div>
              <div className="flex justify-between items-center">
                
                   <a
                  href="https://github.com/SKSHAMKAUSHAL/E_SHOP_UP.git"
                  className="text-blue-400 hover:text-blue-300 transition-colors my-4"
                >
                  View Project →
                </a>
                <a
                  href="https://shop-with-shopup.netlify.app/"
                  className="text-blue-400 hover:text-blue-300 transition-colors my-4"
                >
                  Live link 👁
                </a>

              </div>
            </div>

            <div
              className="
              glass p-6 rounded-xl border border-white/10 
              hover:-translate-y-1 hover:border-blue-500/30
              hover:shadow-[0_4px_20px_rgba(59,130,246,0.1)]
              transition-all
            "
            >
              <h3 className="text-xl font-bold mb-2">Movie App</h3>
              <p className="text-gray-400 mb-4">
              A sleek and responsive movie browsing application built using React. </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {["TMDB", "Netlify", "React"].map((tech, key) => (
                  <span
                    key={key}
                    className="
                      bg-blue-500/10 text-blue-500 py-1 px-3 
                      rounded-full text-sm
                      transition
                      hover:bg-blue-500/20 hover:-translate-y-0.5
                      hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)]
                    "
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center ">
                  <a
                  href="https://github.com/SKSHAMKAUSHAL/Movie-APP.git"
                  className="text-blue-400 hover:text-blue-300 transition-colors my-4"
                >
                  View Project →
                </a>
                <a
                  href="https://skmovieapp.netlify.app/"
                  className="text-blue-400 hover:text-blue-300 transition-colors my-4"
                >
                  Live link 👁
                </a>
              </div>
            </div>

{/* lol */}


<div className="p-6 rounded-xl border border-white/10 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition">
              <h3 className="text-xl font-bold mb-2"> FIT BUDDY</h3>
              <p className="text-gray-400 mb-4">
                A fitness in which you can track your calories.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {["MERN", "TailwindCSS", "Netlify"].map((tech, key) => (
                  <span
                    key={key}
                    className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 
                                    hover:shadow-[0_2px_8px_rgba(59,130,246,0.1)] transition-all
                    "
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex justify-between items-center">
                  <a
                  href="https://github.com/kalviumcommunity/S84_SKSHAM_capstone_FitBuddy.git"
                  className="text-blue-400 hover:text-blue-300 transition-colors my-4"
                >
                  View Project →
                </a>
                <a
                  href="https://fitbyfitbuddy.netlify.app/"
                  className="text-blue-400 hover:text-blue-300 transition-colors my-4"
                >
                  Live link 👁
                </a>
              </div>
            </div>




            <div className="p-6 rounded-xl border border-white/10 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition">
              <h3 className="text-xl font-bold mb-2"> PAC-MAN-GAME</h3>
              <p className="text-gray-400 mb-4">
             Developed a desktop version of the classic Pac-Man game using Java Swing. 
             </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {["Java", "Swing", " Object-Oriented Programming"].map((tech, key) => (
                  <span
                    key={key}
                    className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 
                                    hover:shadow-[0_2px_8px_rgba(59,130,246,0.1)] transition-all
                    "
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex justify-between items-center">
                  <a
                  href="https://github.com/SKSHAMKAUSHAL/PacMan.git"
                  className="text-blue-400 hover:text-blue-300 transition-colors my-4"
                >
                  View Project →
                </a>
              </div>
            </div>





<div className="p-6 rounded-xl border border-white/10 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition">
              <h3 className="text-xl font-bold mb-2"> MERN AUTH</h3>
              <p className="text-gray-400 mb-4">
                A MERN AUTH APP 
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {["MERN", "TailwindCss"].map((tech, key) => (
                  <span
                    key={key}
                    className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 
                                    hover:shadow-[0_2px_8px_rgba(59,130,246,0.1)] transition-all
                    "
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex justify-between items-center">
                  <a
                  href="https://github.com/SKSHAMKAUSHAL/MERN-AUTH.git"
                  className="text-blue-400 hover:text-blue-300 transition-colors my-4"
                >
                  View Project →
                </a>
                <a
                  href="https://no-1-mern-auth.netlify.app/"
                  className="text-blue-400 hover:text-blue-300 transition-colors my-4"
                >
                  Live link 👁
                </a>
              </div>
            </div>


            {/* lol */}

            
          </div>
        </div>
</RevealOnScroll>
    </section>
  );
};