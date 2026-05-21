import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Large “WORKS” hero with script overlay.
 * When `pinScrollTargetRef` is set, scroll-linked motion uses that element (pin spacer);
 * transforms stay neutral so the block reads static while fixed in the layout shell.
 */
export default function WorksHero({ pinScrollTargetRef } = {}) {
  const localRef = useRef(null);
  const scrollTarget = pinScrollTargetRef ?? localRef;
  const pinned = Boolean(pinScrollTargetRef);

  const { scrollYProgress } = useScroll({
    target: scrollTarget,
    offset: pinned ? ["start start", "end start"] : ["start end", "end start"],
  });

  const yWorks = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    pinned ? [0, 0, 0] : [72, 0, -96]
  );
  const yScript = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    pinned ? [0, 0, 0] : [110, 0, -140]
  );
  const yGlow = useTransform(scrollYProgress, [0, 1], pinned ? [0, 0] : [0, -72]);
  const scaleWorks = useTransform(
    scrollYProgress,
    [0, 1],
    pinned ? [1, 1] : [1, 0.96]
  );

  return (
    <section
      ref={pinned ? undefined : localRef}
      className={`relative w-full bg-[#0a0a0a] flex items-center justify-center overflow-hidden font-sans ${
        pinned ? "h-full min-h-0" : "min-h-[520px] h-[72vh] max-h-[825px]"
      }`}
    >
      <div className="relative flex flex-col items-center justify-center w-full h-full select-none">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            y: yWorks,
            scale: scaleWorks,
            fontFamily: '"Inter Tight", sans-serif',
          }}
          className="text-white font-semibold text-[25vw] md:text-[28vw] lg:text-[410px] leading-[0.9] tracking-[-0.03em] md:tracking-[-0.05em] text-center will-change-transform"
        >
          WORKS
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: -2 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ y: yScript }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none will-change-transform"
        >
          <span
            className="text-[#f35e16] font-normal text-[15vw] md:text-[18vw] lg:text-[280px] leading-none text-center whitespace-nowrap mt-[5%] md:mt-[2%]"
            style={{
              fontFamily: '"Sacramento", cursive',
              textShadow: "0 10px 40px rgba(0,0,0,0.5)",
            }}
          >
            last projects
          </span>
        </motion.div>
      </div>

      <motion.div
        style={{ y: yGlow }}
        className="absolute inset-0 pointer-events-none opacity-20 will-change-transform"
      >
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[30%] bg-gradient-to-t from-[#f35e16]/25 to-transparent blur-3xl rounded-full" />
      </motion.div>
    </section>
  );
}
