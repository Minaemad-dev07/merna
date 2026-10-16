import { motion, useInView } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";
import { DiPhotoshop } from "react-icons/di";
import { TbBrandAdobeIndesign, TbBrandAdobePremiere } from "react-icons/tb";
import { FaFigma } from "react-icons/fa";

const Services = () => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  const services = [
    {
      id: 1,
      title: "Brand Identity & UI/UX",
      desc: "Designing cohesive brand identities and modern user interfaces using Figma and vector tools.",
      icon: FaFigma,
      color: "#F24E1E",
    },
    {
      id: 2,
      title: "Social Media & Graphics",
      desc: "Creating eye-catching social media designs, banners, and digital graphics with Photoshop.",
      icon: DiPhotoshop,
      color: "#31A8FF",
    },
    {
      id: 3,
      title: "Print & Editorial Design",
      desc: "Crafting professional layouts for magazines, books, and print media using InDesign and Illustrator.",
      icon: TbBrandAdobeIndesign,
      color: "#FF3366",
    },
    {
      id: 4,
      title: "Video Editing",
      desc: "Editing and producing professional videos, reels, and visual content using Premiere Pro.",
      icon: TbBrandAdobePremiere,
      color: "#9999FF",
    },
  ];

  useEffect(() => {
    const updateItems = () => {
      setItemsPerPage(
        window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3,
      );
    };
    updateItems();
    window.addEventListener("resize", updateItems);
    return () => window.removeEventListener("resize", updateItems);
  }, []);

  const maxIndex = Math.max(0, services.length - itemsPerPage);

  const handlePointerDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setDragOffset(0);
    containerRef.current?.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (isDragging) setDragOffset(startX - e.clientX);
  };

  const handlePointerUp = (e) => {
    if (!isDragging) return;
    setIsDragging(false);
    containerRef.current?.releasePointerCapture?.(e.pointerId);
    if (dragOffset > 50) {
      setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
    } else if (dragOffset < -50) {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
    setDragOffset(0);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
        delay: index * 0.1,
      },
    }),
  };

  const cardWidth =
    itemsPerPage === 1
      ? "100%"
      : itemsPerPage === 2
        ? "calc((100% - 24px) / 2)"
        : "calc((100% - 48px) / 3)";

  return (
    <section
      id="services"
      ref={ref}
      className="lg:min-h-screen bg-zinc-950 text-white
        py-24 sm:py-28 lg:py-24 px-4 font-ubuntu scroll-m-4 relative
        overflow-hidden"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-yellow-400 font-semibold text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-2"
          >
            What I Do
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold"
          >
            My{" "}
            <span
              className="bg-linear-to-r
                    from-yellow-400 to-yellow-500
                    bg-clip-text text-transparent"
            >
              Services
            </span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="w-20 sm:w-24 h-1 bg-yellow-400 mx-auto mt-4
                    rounded-full"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="text-zinc-400 text-sm sm:text-lg
                    max-w-2xl mx-auto mt-5 sm:mt-6 px-2 font-light
                    leading-relaxed"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </motion.p>
        </motion.div>

        <div
          ref={containerRef}
          className="relative overflow-hidden cursor-grab
                active:cursor-grabbing touch-pan-y select-none w-full"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => {
            setIsDragging(false);
            setDragOffset(0);
          }}
        >
          <motion.div
            className="flex gap-6 w-full"
            style={{
              transform: `translateX(calc(-${currentIndex * (100 / itemsPerPage)}% - ${currentIndex * (24 / itemsPerPage)}px - ${dragOffset}px))`,
              transition: isDragging ? "none" : "transform 0.5s ease-in-out",
            }}
          >
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  style={{ width: cardWidth, minWidth: cardWidth }}
                  className="group shrink-0"
                >
                  <div
                    className="relative bg-zinc-800/30
                                backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-zinc-700/30
                                hover:border-yellow-400/50 shadow-lg hover:shadow-yellow-400/10 transition-all
                                duration-300 h-full min-h-70 flex flex-col items-start
                                overflow-hidden"
                  >
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0
                                    group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at 50% 0%, ${service.color}15, transparent 70%)`,
                      }}
                    />

                    <div
                      className="text-3xl sm:text-4xl mb-4 transition-transform
                                    duration-300 group-hover:scale-110 relative z-10"
                      style={{ color: service.color }}
                    >
                      <Icon />
                    </div>

                    <h3
                      className="text-lg sm:text-xl font-bold mb-3
                                    text-white group-hover:text-yellow-400
                                    transition-colors duration-300 relative z-10"
                    >
                      {service.title}
                    </h3>

                    <p
                      className="text-zinc-400 text-sm leading-relaxed
                                    relative z-10 group-hover:text-zinc-300 transition-colors
                                    duration-300"
                    >
                      {service.desc}
                    </p>

                    <div
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0
                                    h-0.5 bg-yellow-400 group-hover:w-2/3 transition-all
                                    duration-300 rounded-full"
                    />

                    <div
                      className="absolute bottom-4 right-4 opacity-0
                                    group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <span
                        className="text-yellow-400 text-xs sm:text-sm
                                            font-semibold"
                      >
                        Learn More
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        <div className="flex justify-center items-center gap-2 mt-6">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? "w-8 bg-yellow-400"
                  : "w-2 bg-zinc-600 hover:bg-zinc-400"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
