import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { motion } from "framer-motion";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Work from "./components/Work";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";

// ضع هذا السطر هنا في الأعلى (خارج المكون) ليعمل فور تحميل السكريبت
if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

const App = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });

  useEffect(() => {
    // إزالة الـ Hash من الرابط
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }

    // إجبار الصفحة على البدء من الأعلى
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className="bg-zinc-950 text-white min-h-screen relative
    overflow-hidden selection:bg-yellow-400 selection:text-zinc-950 font-ubuntu"
    >
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-yellow-400/80 pointer-events-none z-50 flex items-center justify-center"
        animate={{ x: mousePosition.x - 16, y: mousePosition.y - 16 }}
        transition={{ type: "spring", stiffness: 300, damping: 28, mass: 0.5 }}
      >
        <div className="w-2 h-2 rounded-full bg-yellow-400 shadow-[0_0_8px_2px_rgba(255,255,0,0.7)]"></div>
      </motion.div>
      <Navbar />
      <Hero />
      <Skills />
      <Work />
      <Services />
      <Contact />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default App;
