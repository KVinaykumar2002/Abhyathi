import React from "react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-[#101810] pt-32 pb-20 px-6 md:px-12 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#f35e16]/5 rounded-full blur-[120px] pointer-events-none"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
        className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#1a3d1a]/40 rounded-full blur-[100px] pointer-events-none"
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute top-32 left-12 hidden lg:block"
      >
        <div className="w-16 h-16 rounded-full border border-[#f35e16]/20 flex items-center justify-center">
          <motion.div className="w-2 h-2 rounded-full bg-[#f35e16]" />
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#f35e16]/30 bg-[#f35e16]/10 mb-8"
          >
            <span className="text-[#f35e16] text-sm font-medium tracking-wider uppercase">
              Eco-Friendly Food Service Packaging
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-serif text-white leading-tight mb-8"
          >
            Packaging That{" "}
            <span className="italic text-[#f35e16]">Protects</span> Your Brand
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="text-white/70 text-lg md:text-xl max-w-lg mb-10 leading-relaxed"
          >
            Abhyati Food Pak Solutions Pvt Ltd is a leading distributor of
            high-quality, eco-friendly food service packaging — from containers
            and cups to bags and compostable disposables for restaurants,
            cafés, and catering businesses.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
            className="flex flex-wrap gap-4"
          >
            <motion.a
              href="/menu"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-[#f35e16] text-white rounded-full text-lg font-medium shadow-lg shadow-[#f35e16]/20 hover:bg-[#d85212] transition-colors"
            >
              Browse Products
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 border border-white/20 text-white rounded-full text-lg font-medium hover:bg-white/5 transition-colors"
            >
              Request a Quote
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-20 max-w-md"
          >
            <span className="text-[#f35e16] text-6xl font-serif leading-none block mb-4">
              “
            </span>
            <p className="text-white/80 text-lg italic leading-relaxed">
              "Abhyati Food Pak has been our go-to supplier for compostable
              containers and cups. Reliable bulk delivery, consistent quality,
              and packaging our customers actually feel good about using."
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="relative flex flex-col items-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative w-[300px] h-[450px] md:w-[450px] md:h-[650px] rounded-full overflow-hidden border-8 border-[#1a2e1a] shadow-2xl shadow-[#f35e16]/10"
          >
            <img
              src="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?q=80&w=2070&auto=format&fit=crop"
              alt="Eco-friendly food service packaging"
              className="w-full h-full object-cover"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="absolute inset-0 bg-gradient-to-t from-[#101810]/40 via-transparent to-transparent"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="absolute -bottom-4 -left-4 md:left-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4 shadow-xl"
          >
            <p className="text-white/60 text-xs uppercase tracking-wider">
              Product range
            </p>
            <p className="text-white text-2xl font-serif font-bold">120+ SKUs</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
