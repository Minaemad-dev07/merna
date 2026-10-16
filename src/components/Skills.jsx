import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaFigma } from "react-icons/fa";
import { MdOutlineDesignServices } from "react-icons/md";
import { DiPhotoshop, DiIllustrator } from "react-icons/di";
import { TbBrandAdobeIndesign , TbBrandAdobeAfterEffect } from "react-icons/tb";

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const [activeCategory, setActiveCategory] = useState("graphicDesign");

  const skillCategories = {
    graphicDesign: {
      name: "Graphic Designer",
      icon: MdOutlineDesignServices,
      skills: [
        { name: "Photoshop", icon: DiPhotoshop, color: "#31A8FF" },
        { name: "Illustrator", icon: DiIllustrator, color: "#FF9A00" },
        { name: "Figma", icon: FaFigma, color: "#F24E1E" },
        { name: "InDesign", icon: TbBrandAdobeIndesign, color: "#FF3366" },
        { name: "AfterEffect", icon: TbBrandAdobeAfterEffect, color: "#9999FF" },
      ],
    },
  };

  const filteredSkills = skillCategories[activeCategory]?.skills || [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { type: "spring", damping: 12, stiffness: 100 },
    },
  };

  return (
    <section
      id="skills"
      ref={ref}
      className="lg:min-h-screen text-white py-24 lg:py-28 px-4 sm:px-6 font-ubuntu scroll-m-12 relative overflow-hidden"
    >
      <div className="absolute top-1/3 right-0 w-44 h-44 lg:w-96 lg:h-80 bg-yellow-400/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/3 left-0 w-44 h-44 lg:w-96 lg:h-80 bg-yellow-400/25 rounded-full blur-3xl pointer-events-none"></div>
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.2 }}
            className="text-yellow-400 font-semibold text-xs sm:text-sm
            tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-3"
          >
            My Expertise
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.3 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold"
          >
            Skills &{" "}
            <span
              className="bg-linear-to-r from-yellow-400
                to-yellow-500 bg-clip-text text-transparent"
            >
              Technologies
            </span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="w-20 sm:w-24 h-1 bg-yellow-400 mx-auto rounded-full mt-4"
          ></motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-3 mb-10 sm:mb-12 mt-8"
          >
            {Object.entries(skillCategories).map(([key, category]) => {
              const CategoryIcon = category.icon;
              return (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key)}
                  className={`px-5 sm:px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 flex items-center gap-2 ${
                    activeCategory === key
                      ? "bg-yellow-400 text-zinc-950 shadow-lg shadow-yellow-400/40"
                      : "bg-zinc-800/50 text-zinc-400 hover:bg-zinc-700/50 hover:text-white border border-zinc-700/20"
                  }`}
                >
                  <CategoryIcon className="text-lg" />
                  {category.name}
                </button>
              );
            })}
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6"
        >
          {filteredSkills.map((skill) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={skill.name}
                variants={itemVariants}
                whileHover={{
                  y: -8,
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 300 },
                }}
                className="group relative bg-zinc-800/30 backdrop-blur-sm rounded-2xl p-6 sm:p-7 lg:p-8 min-h-41.25 sm:min-h-47.5 lg:min-h-50 flex flex-col items-center justify-center gap-4 border border-zinc-700/30 hover:border-yellow-400 shadow-lg hover:shadow-yellow-400/10 transition-all duration-300 cursor-pointer overflow-hidden"
                style={{
                  background: `linear-gradient(145deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01))`,
                }}
              >
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${skill.color}15, transparent 70%)`,
                  }}
                ></div>

                <div
                  className="text-5xl sm:text-6xl transition-transform duration-300 group-hover:scale-110 relative z-10"
                  style={{ color: skill.color }}
                >
                  <Icon />
                </div>

                <p
                  className="text-zinc-300 text-sm sm:text-base
                font-medium text-center relative z-10 group-hover:text-white
                transition-colors duration-300"
                >
                  {skill.name}
                </p>
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2
                w-0 h-0.5 bg-yellow-400 group-hover:w-2/3 transition-all duration-300 rounded-full"
                ></div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
