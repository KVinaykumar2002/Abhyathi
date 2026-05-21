import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const SACRAMENTO_FONT = "'Sacramento', cursive";
const INTER_TIGHT_FONT = '"Inter Tight", sans-serif';

function CardsServiceCard({
  backgroundColor,
  watermarkText,
  watermarkClassName = "text-white/[0.07]",
  title,
  imageSrc,
  imageFrameClassName = "bg-white/10 border border-white/10",
  className,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{ backgroundColor }}
      className={cn(
        "relative w-full h-[600px] md:h-[734px] rounded-[48px] overflow-hidden flex flex-col items-center pt-16 md:pt-20 px-6 md:px-10 pb-10",
        className
      )}
    >
      <div
        className="absolute pointer-events-none select-none overflow-hidden"
        style={{
          width: "1200px",
          height: "600px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -10%) rotate(-24deg)",
        }}
      >
        <p
          style={{
            fontFamily: SACRAMENTO_FONT,
            fontSize: "min(720px, 60vw)",
            lineHeight: "0.8",
          }}
          className={cn("whitespace-nowrap", watermarkClassName)}
        >
          {watermarkText}
        </p>
      </div>

      <div className="relative z-10 w-full flex flex-col items-center gap-6 text-center">
        <h3
          style={{ fontFamily: INTER_TIGHT_FONT }}
          className="text-4xl md:text-[56px] leading-[1.1] font-semibold max-w-[80%] mx-auto"
        >
          {title}
        </h3>

        <div
          className={cn(
            "mt-8 md:mt-12 relative w-full max-w-[420px] aspect-[1.64] p-1 flex items-center justify-center rounded-sm",
            imageFrameClassName
          )}
        >
          <div className="w-full h-full overflow-hidden relative">
            <motion.img
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              src={imageSrc}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const cardData = [
  {
    backgroundColor: "#111111",
    watermarkClassName: "text-white/[0.07]",
    imageFrameClassName: "bg-white/10 border border-white/10",
    watermarkText: "brand",
    imageSrc:
      "https://framerusercontent.com/images/VW2Pv8mL2QStYnNqhSGaackXGG8.webp?width=1200",
    title: (
      <span className="text-white">
        Brand Identity <br className="hidden md:block" /> &{" "}
        <span className="text-[#f35e16]">Visual</span> Design
      </span>
    ),
  },
  {
    backgroundColor: "#f35e16",
    watermarkClassName: "text-black/[0.12]",
    imageFrameClassName: "bg-black/15 border border-black/20",
    watermarkText: "creative",
    imageSrc:
      "https://framerusercontent.com/images/vAUFxUxKqE6pI3rMyHs7Mbz4.webp?width=1200",
    title: (
      <span className="text-white">
        Content & <span className="text-black font-semibold">Creative</span>{" "}
        <br className="hidden md:block" /> Storytelling
      </span>
    ),
  },
];

export default function ServiceCardsSection() {
  return (
    <section className="w-full py-20 px-4 md:px-8 bg-[#0a0a0a]">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {cardData.map((card, index) => (
          <CardsServiceCard key={index} {...card} />
        ))}
      </div>
    </section>
  );
}
