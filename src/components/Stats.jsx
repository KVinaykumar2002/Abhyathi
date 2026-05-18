import React from "react";
import { motion } from "framer-motion";
import { stats } from "../data/menuData";

const Stats = () => {
  return (
    <section className="bg-[#101810] py-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <h3 className="text-4xl md:text-5xl font-serif text-white mb-2">
              {stat.value}
            </h3>
            <p className="text-white/50 text-sm md:text-base font-medium">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
