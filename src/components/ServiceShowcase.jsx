import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const SACRAMENTO = "'Sacramento', cursive";

function ShowcaseServiceCard({ title, bgText, imageSrc, theme, className }) {
  const isDark = theme === "dark";
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={cn(
        "relative w-full aspect-square md:aspect-auto md:h-[736px] rounded-[48px] overflow-hidden flex flex-col items-center pt-20 px-6 md:px-10 pb-10 group",
        "bg-surface-raised",
        className
      )}
    >
      <div
        className={cn(
          "absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[20%] pointer-events-none select-none -rotate-[25deg]",
          "text-[320px] md:text-[720px] leading-none whitespace-nowrap transition-transform duration-1000 group-hover:scale-105",
          "text-text-primary/[0.04]"
        )}
        style={{ fontFamily: SACRAMENTO }}
      >
        {bgText}
      </div>

      <div className="relative z-30 text-center max-w-[650px] mb-10">
        <h3
          className={cn(
            "text-4xl md:text-[56px] leading-[1.1] font-semibold tracking-tight",
            "text-text-primary"
          )}
        >
          {title}
        </h3>
      </div>

      <div className="relative flex-grow w-full flex items-center justify-center z-10">
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.5 }}
          className={cn(
            "relative w-[280px] md:w-[420px] aspect-[1.64] overflow-hidden rounded-2xl flex items-center justify-center p-1",
            "border border-border-muted bg-surface-base/50"
          )}
        >
          <img
            src={imageSrc}
            alt=""
            className="w-full h-full object-cover rounded-xl transition-transform duration-700 group-hover:scale-110"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function ServiceShowcase() {
  return (
    <section className="w-full bg-surface-base py-ds-5 px-ds-3 md:px-ds-4">
      <div className="max-w-[1520px] mx-auto grid grid-cols-1 xl:grid-cols-2 gap-8">
        <ShowcaseServiceCard
          theme="dark"
          bgText="growth"
          imageSrc="https://framerusercontent.com/images/rHfULRO1K2vbjZM8nXSkffVmX8.webp?width=2400&height=1600"
          title={
            <>
              Growth, <span className="text-text-secondary">Performance</span>
              <br className="hidden md:block" /> & Scale
            </>
          }
        />

        <ShowcaseServiceCard
          theme="dark"
          bgText="digital"
          imageSrc="https://framerusercontent.com/images/PgbdTcC7ZaDTdbWag0CMigzQM.webp?width=2400&height=1600"
          title={
            <>
              Digital <span className="text-text-secondary">Experience</span>
              <br className="hidden md:block" /> & Development
            </>
          }
        />
      </div>
    </section>
  );
}
