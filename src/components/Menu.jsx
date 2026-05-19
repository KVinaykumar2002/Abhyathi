import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { menuItems } from "../data/menuData";

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState("All Products");
  const categories = [
    "All Products",
    "Containers",
    "Bags & Wraps",
    "Cups & Lids",
    "Eco-Friendly",
  ];

  const filteredItems =
    activeCategory === "All Products"
      ? menuItems.slice(0, 6)
      : menuItems
          .filter((item) => item.category === activeCategory)
          .slice(0, 6);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-serif text-[#101810] mb-6"
          >
            Our Product Range
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-lg max-w-2xl mx-auto"
          >
            Explore our catalog of containers, cups, bags, and compostable
            disposables — sourced for quality, sustainability, and reliable
            bulk supply.
          </motion.p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 border ${
                activeCategory === cat
                  ? "bg-[#f35e16] text-white border-[#f35e16]"
                  : "bg-white text-gray-600 border-gray-200 hover:border-[#f35e16] hover:text-[#f35e16]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="bg-[#f8f9fa] rounded-3xl overflow-hidden group hover:shadow-xl transition-all duration-500"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative h-80 overflow-hidden"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="p-8"
                >
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex justify-between items-start mb-4"
                  >
                    <span className="text-[#f35e16] text-2xl font-serif font-semibold">
                      From ${item.price}
                    </span>
                    <span className="px-4 py-1.5 rounded-full border border-gray-200 text-gray-600 text-xs font-medium uppercase tracking-wider">
                      {item.category}
                    </span>
                  </motion.div>

                  <h3 className="text-3xl font-serif text-[#101810] mb-4 group-hover:text-[#f35e16] transition-colors">
                    {item.name}
                  </h3>

                  <p className="text-gray-500 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-16"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/menu"
              className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-[#f35e16] hover:bg-[#e04e08] text-white font-semibold text-base transition-colors duration-300 shadow-xl shadow-[#f35e16]/30"
            >
              View Full Catalog
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">
                →
              </span>
            </Link>
          </motion.div>
          <p className="text-gray-400 text-sm mt-4 font-sans">
            120+ SKUs across containers, cups, bags, and eco-friendly lines
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Menu;
