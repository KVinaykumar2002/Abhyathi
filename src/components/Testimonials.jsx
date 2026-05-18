import React from "react";
import { motion } from "framer-motion";

const Testimonials = () => {
  return (
    <section className="py-24 bg-[#101810] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-square rounded-3xl overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070&auto=format&fit=crop"
                alt="Dining Experience"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[#101810]/20" />
            </motion.div>
          </div>

          <div className="w-full md:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-[#f35e16] font-serif italic text-2xl mb-6 block">
                What our customers say
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-white mb-8 leading-tight">
                "A dining experience like no other. The fusion of flavors and
                the impeccable service make Craving my top choice for any
                occasion."
              </h2>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden">
                  <img
                    src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                    alt="Customer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-white font-serif text-xl">
                    Alexander Thompson
                  </h4>
                  <p className="text-white/50 text-sm">
                    Food Critic & Gourmet Explorer
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
