import React from "react";
import { motion } from "framer-motion";

const CTA = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-[#101810] rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden"
        >
          {/* Background Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#f35e16]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#f35e16]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-serif text-white mb-8 leading-tight">
              Ready to embark on a{" "}
              <span className="italic">culinary adventure?</span>
            </h2>
            <p className="text-white/60 text-lg mb-12">
              Join our exclusive table and be the first to experience our
              seasonal tasting menus and private chef events.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-[#f35e16] text-white rounded-full text-lg font-medium hover:bg-[#d85212] transition-colors"
              >
                Join Membership
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-transparent border border-white/20 text-white rounded-full text-lg font-medium hover:bg-white hover:text-[#101810] transition-colors"
              >
                Contact Concierge
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
