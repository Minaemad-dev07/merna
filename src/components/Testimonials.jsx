import { useInView, motion } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import test1 from "../assets/hero.png";
import test2 from "../assets/hero.png";
import test3 from "../assets/hero.png";

const Testimonials = () => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(2);

  const testimonials = [
    {
      id: 1,
      name: "Name",
      role: "customer",
      image: test1,
      text: "text........",
      rating: 5,
    },
    {
      id: 2,
      name: "Name",
      role: "customer",
      image: test2,
      text: "text........",
      rating: 5,
    },
    {
      id: 3,
      name: "Name",
      role: "customer",
      image: test3,
      text: "text........",
      rating: 5,
    },
  ];
  useEffect(() => {
    const updateItems = () => {
      setItemsPerPage(window.innerWidth < 640 ? 1 : 2);
      setCurrentIndex(0);
    };
    updateItems();
    window.addEventListener("resize", updateItems);
    return () => window.removeEventListener("resize", updateItems);
  }, []);

  const maxIndex = Math.max(0, testimonials.length - itemsPerPage);
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);
  const handlePointerUp = (e) => {
    if (!isDragging) return;
    setIsDragging(false);
    containerRef.current?.releasePointerCapture?.(e.pointerId);
    if (dragOffset > 50)
      setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
    else if (dragOffset < -50) {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
    setDragOffset(0);
  };

  const handlePointerDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setDragOffset(0);
    containerRef.current?.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (isDragging) setDragOffset(startX - e.clientX);
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
      },
    },
  };

  const cardWidth =
    itemsPerPage === 1
      ? "100%"
      : itemsPerPage === 2
        ? "calc((100% - 24px) / 2)"
        : "calc((100% - 48px) / 3)";

  return (
    <section
      id="testimonials"
      ref={ref}
      className="lg:min-h-screen
    bg-zinc-950 text-white py-20 sm:py-28 px-4 sm:px-6
    font-ubuntu scroll-m-4 relative overflow-hidden"
    >
      <div
        className="absolute top-32 left-1/2 w-64 sm:w-80
        lg:w-96 h-64 sm:h-80 lg:h-80 bg-yellow-400/20 rounded-full
        blur-3xl pointer-events-none"
      ></div>
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
            className="text-yellow-400 font-semibold text-xs sm:text-sm
          tracking-[0.2em] sm:tracking-[0.3em] uppercase"
          >
            Testimonials
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold"
          >
            What People{" "}
            <span
              className="bg-linear-to-r from-yellow-400
            to-yellow-400 bg-clip-text text-transparent"
            >
              Say
            </span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="w-20 sm:w-24 h-1 bg-yellow-400 mx-auto mt-4 rounded-full"
          ></motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="text-zinc-400 text-sm sm:text-lg max-w-2xl
          mx-auto mt-5 sm:mt-6 px-2 font-light leading-relaxed"
          >
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil
            maxime possimus voluptatibus non aliquid sit placeat odio facilis a.
            Consequatur.
          </motion.p>
        </motion.div>
        <div
          ref={containerRef}
          className="relative overflow-hidden
        cursor-grab active:cursor-grabbing touch-pan-y select-none"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => {
            setIsDragging(false);
            setDragOffset(0);
          }}
        >
          <motion.div
            className="flex gap-6"
            style={{
              transform: `translateX(calc(-${currentIndex * (100 / itemsPerPage)}% - ${currentIndex * (24 / itemsPerPage)}px - ${dragOffset}px))`,
              transition: isDragging ? "none" : "transform 0.5s ease-in-out",
            }}
          >
            {testimonials.map((test, index) => (
              <motion.div
                key={test.id}
                custom={index}
                variants={itemVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                style={{ width: cardWidth, minWidth: cardWidth }}
                className="group shrink-0"
              >
                <div
                  className="relative bg-zinc-800/30
                backdrop-blur-sm rounded-2xl p-6 sm:p-8 border
                border-zinc-700/30 hover:border-yellow-400/50 shadow-lg
                hover:shadow-yellow-400/10 transition-all duration-300 h-full min-h-70 flex flex-col items-start
                overflow-hidden"
                >
                  <div className="absolute top-4 right-4 text-yellow-400/20">
                    <FaQuoteLeft className="w-10 h-10 sm:w-12 sm:h-12" />
                  </div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(test.rating)].map((_, i) => (
                      <FaStar key={i} className="w-4 h-4 text-yellow-400" />
                    ))}
                  </div>
                  <p
                    className="text-zinc-300 text-sm leading-relaxed mb-6
                  relative z-10"
                  >
                    "{test.text}"
                  </p>
                  <div className="flex items-center gap-3 mt-auto relative z-10">
                    <img
                      src={test.image}
                      alt={test.name}
                      className="w-11 sm:w-12 h-11 sm:h-12 rounded-full
                    object-cover border-2 border-yellow-400/30"
                    />
                    <div>
                      <h4
                        className="text-white font-semibold text-sm
                        group-hover:text-yellow-400 transition-colors
                        duration-300"
                      >
                        {test.name}
                      </h4>
                      <p className="text-zinc-500 text-xs">{test.role}</p>
                    </div>
                  </div>
                  <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2
                  w-0 h-0.5 bg-yellow-400 group-hover:w-2/3 transition-all
                  duration-300 rounded-full"
                  ></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="flex justify-center items-center gap-2 mt-6">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() =>
                setCurrentIndex(Math.min(index * itemsPerPage, maxIndex))
              }
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                Math.floor(currentIndex / itemsPerPage) === index
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

export default Testimonials;
