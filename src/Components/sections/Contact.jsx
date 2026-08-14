import { useState } from "react";
import { RevealOnScroll } from "./RevealOnScroll";
import emailjs from "@emailjs/browser";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        e.target,
        {
          publicKey: import.meta.env.VITE_PUBLIC_KEY,
        }
      );

      // Show success message
      alert("Message Sent!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("EmailJS Error:", error);
      alert("Oops! Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="min-h-screen flex items-center justify-center lg:justify-end py-20 relative overflow-hidden px-4 lg:px-32 bg-black"
    >
      {/* Background Image with Dark Glass Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-[length:auto_100%] md:bg-cover bg-left bg-no-repeat transition-opacity duration-1000"
        style={{ backgroundImage: "url(/bg-left.png)" }}
      >
        {/* Gradient overlay: clear on left (for picture), dark on right (behind form) */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-black/50 to-black/90"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/90"></div>
      </div>

      {/* Glowing light around the person on the left */}
      <div className="absolute top-1/2 left-0 md:left-24 -translate-y-1/2 w-[300px] md:w-[400px] h-[500px] bg-blue-500/20 md:bg-cyan-400/20 rounded-full blur-[100px] pointer-events-none z-0 mix-blend-screen"></div>

      <RevealOnScroll>
        <div className="relative z-10 px-4 w-full min-w-[300px] md:w-[500px] sm:w-2/3 p-8 bg-black/40 backdrop-blur-lg rounded-3xl border border-white/10 shadow-[0_10px_40px_rgba(59,130,246,0.1)]">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center">
            Get In Touch
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="relative">
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white transition focus:outline-none focus:border-blue-500 focus:bg-blue-500/5"
                placeholder="Name..."
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white transition focus:outline-none focus:border-blue-500 focus:bg-blue-500/5"
                placeholder="example@gmail.com"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div className="relative">
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white transition focus:outline-none focus:border-blue-500 focus:bg-blue-500/5"
                placeholder="Your Message..."
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-500 text-white py-3 px-6 rounded font-medium transition relative overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>

          {/* Social icons section */}
          <div className="mt-6 flex justify-center space-x-6 text-white">
            <a
              href="https://github.com/SKSHAMKAUSHAL"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition"
              aria-label="GitHub"
            >
              <FaGithub size={24} />
            </a>
            <a
              href="https://linkedin.com/in/sksham-kaushal"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={24} />
            </a>
            <a
              href="https://leetcode.com/u/SKSHAM_KAUSHAL/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition"
              aria-label="Leetcode"
            >
              <SiLeetcode size={24} />
            </a>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
