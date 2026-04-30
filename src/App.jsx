import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoadingScreen } from "./Components/sections/LoadingScreen";
import { ParticleBackground } from "./Components/ParticleBackground";
import { Navbar } from "./Components/Navbar";
import { MobileMenu } from "./Components/MobileMenu";
import { Home } from "./Components/sections/Home";
import { About } from "./Components/sections/About";
import { Projects } from "./Components/sections/Projects";
import { Contact } from "./Components/sections/Contact";
import { Admin } from "./Components/sections/Admin";

const MainPortfolio = ({ isLoaded, setIsLoaded, menuOpen, setMenuOpen }) => {
  return (
    <>
      {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}

      <div
        className={`min-h-screen transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        } bg-black text-gray-100`}
      >
        <ParticleBackground />
        <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <Home />
        <About />
        <Projects />
        <Contact />
      </div>
    </>
  );
};

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPortfolio isLoaded={isLoaded} setIsLoaded={setIsLoaded} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
