import React from "react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-[#101810] pt-32 pb-20 px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side */}
        <div className="z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-serif text-white leading-tight mb-8"
          >
            Make a Moment <br />
            with <span className="italic">Craving</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-white/70 text-lg md:text-xl max-w-lg mb-10 leading-relaxed"
          >
            Embark on a gastronomic journey with Craving. Our curated selection
            of international flavors will tantalize your taste transport.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-[#f35e16] text-white rounded-full text-lg font-medium shadow-lg shadow-[#f35e16]/20 hover:bg-[#d85212] transition-colors"
          >
            Book a Moment
          </motion.button>

          {/* Testimonial Quote in Hero */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-20 max-w-md"
          >
            <span className="text-[#f35e16] text-6xl font-serif leading-none block mb-4">
              “
            </span>
            <p className="text-white/80 text-lg italic leading-relaxed">
              "I've been coming to Craving for years, and I've never been
              disappo pointed. The food is always fresh and flavorful, and the
              service."
            </p>
          </motion.div>
        </div>

        {/* Right Side */}
        <div className="relative flex flex-col items-center">
          {/* Main Circular Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative w-[300px] h-[450px] md:w-[450px] md:h-[650px] rounded-full overflow-hidden border-8 border-[#1a2e1a]"
          >
            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop"
              alt="Gourmet Dish"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Floating Chef Image */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="absolute -bottom-10 -left-10 md:-left-20 w-[200px] md:w-[320px] aspect-[4/5] rounded-2xl overflow-hidden border-4 border-[#101810] shadow-2xl"
          >
            <img
              src="https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=1968&auto=format&fit=crop"
              alt="Expert Chef"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
