import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Skills", href: "#skills" },
  { name: "Work", href: "#work" },
  { name: "Services", href: "#services" },
  { name: "Testimonials", href: "#testimonials" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className="fixed top-4 sm:top-6 left-0 w-full z-40 flex justify-center px-4">
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative bg-zinc-900/90 backdrop-blur-md px-4 sm:px-8 py-3 sm:py-4 rounded-full flex items-center justify-between gap-4 sm:gap-10 shadow-2xl shadow-black/50 w-full sm:w-auto max-w-7xl"
      >
        <a
          href="#home"
          className="text-lg sm:text-xl font-black tracking-widest text-white shrink-0"
        >
          Merna<span className="text-yellow-400">Ayman</span>
        </a>
        
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="text-sm font-medium text-zinc-300 hover:text-yellow-400 transition-colors duration-200 tracking-wide"
            >
              {link.name}
            </a>
          ))}
        </div>

        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="#contact"
          className="hidden md:inline-block px-7 py-2.5 text-sm rounded-full bg-yellow-400 text-black font-semibold hover:bg-yellow-300 transition-colors shadow-lg shadow-yellow-400/20 text-center"
        >
          Contact Me
        </motion.a>

        <button
          onClick={toggleMenu}
          className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Toggle Menu"
        >
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
              isOpen ? "rotate-45 translate-y-2" : ""
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
              isOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
              isOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></span>
        </button>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="absolute top-full left-0 right-0 mt-3 bg-zinc-900/95 backdrop-blur-md rounded-2xl p-6 shadow-2xl shadow-black/50 md:hidden"
            >
              <div className="flex flex-col gap-4 items-center">
                {navLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    onClick={closeMenu}
                    className="text-base font-medium text-zinc-300 hover:text-yellow-400 transition-colors duration-200 tracking-wide w-full text-center py-2 rounded-lg hover:bg-white/5"
                  >
                    {link.name}
                  </a>
                ))}
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#contact"
                  onClick={closeMenu}
                  className="w-full px-7 py-3 text-sm rounded-full bg-yellow-400 text-black font-semibold hover:bg-yellow-300 transition-colors shadow-lg shadow-yellow-400/20 text-center mt-2"
                >
                  Contact Me
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
};

export default Navbar;