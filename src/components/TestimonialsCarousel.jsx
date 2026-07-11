import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, MoveLeft, MoveRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useSiteContent } from "@/hooks/useSiteContent";
import TrustStats from "@/components/TrustStats";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Operations Lead | Multi-Outlet Café Chain",
    quote:
      "“Abhyati Food Pak keeps our takeaway and dine-in packaging consistent across every outlet—sturdy clamshells, leak-tested cups, and reliable bulk delivery. Our team spends less time chasing suppliers and more time serving guests.”",
    image:
      "https://images.unsplash.com/photo-1585516009829-366a6b2e7e77?w=400&h=400&fit=crop&q=80",
  },
  {
    id: 2,
    name: "Daniel Ortiz",
    role: "Procurement | Cloud Kitchen Network",
    quote:
      "“We switched to AFP for compostable containers and portion cups. Lead times are predictable, specs match what we approve, and our delivery partners notice fewer spills and complaints.”",
    image:
      "https://images.unsplash.com/photo-1556910103-1c02745a30bf?w=400&h=400&fit=crop&q=80",
  },
  {
    id: 3,
    name: "Meera Krishnan",
    role: "Catering Director | Institutional Food Service",
    quote:
      "“For large events we need trays, lids, and bags in volume without surprises. Abhyati Food Pak’s B2B support and sampling process made rollout smooth—quality has held up through peak season.”",
    image:
      "https://images.unsplash.com/photo-1605640840605-14ac5835823d?w=400&h=400&fit=crop&q=80",
  },
  {
    id: 4,
    name: "James Walker",
    role: "Owner | Fast-Casual Restaurant Group",
    quote:
      "“Branded sleeves and bags matter for our brand. AFP helped us align packaging sizes with our menu SKUs and kept orange/black print consistent batch to batch.”",
    image:
      "https://images.unsplash.com/photo-1625602812206-5ecc1dd96895?w=400&h=400&fit=crop&q=80",
  },
  {
    id: 5,
    name: "Ananya Bose",
    role: "Supply Chain | Regional QSR Franchise",
    quote:
      "“We standardized hot-hold containers and drink lids across franchises. Fewer SKU mismatches, better stackability in the back-of-house, and a partner that understands audit-ready documentation.”",
    image:
      "https://images.unsplash.com/photo-1590861322315-bfad8f7b1ce8?w=400&h=400&fit=crop&q=80",
  },
  {
    id: 6,
    name: "Marcus Chen",
    role: "Head Chef | Hotel Banquets",
    quote:
      "“Banquet plating and pickup orders need premium look without fragile cost. Their container lines balance presentation, microwave safety, and speed of service for our team.”",
    image:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop&q=80",
  },
  {
    id: 7,
    name: "Sofia Alvarez",
    role: "Sustainability Coordinator | Corporate Cafeteria",
    quote:
      "“We prioritized reduced plastic and clearer labeling. AFP’s eco-forward options and spec sheets made it easier to hit our internal targets without compromising food safety.”",
    image:
      "https://images.unsplash.com/photo-1618256173244-6d2c5ab6b626?w=400&h=400&fit=crop&q=80",
  },
  {
    id: 8,
    name: "Vikram Patel",
    role: "Logistics Manager | Meal-Prep Brand",
    quote:
      "“Portion consistency and seal integrity were pain points with our old vendor. Abhyati Food Pak’s meal-prep trays and films reduced returns and kept cold-chain handoffs cleaner.”",
    image:
      "https://images.unsplash.com/photo-1517677204091-0d74fd337a16?w=400&h=400&fit=crop&q=80",
  },
];

function CustomCursor({ containerRef }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }
    };
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);
    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
    }
    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [containerRef, mouseX, mouseY]);

  const springConfig = { damping: 20, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  return (
    <motion.div
      className="absolute z-50 pointer-events-none hidden md:flex items-center gap-2 px-4 py-2 bg-surface-base/10 backdrop-blur-md border border-white/20 rounded-full"
      style={{
        left: smoothX,
        top: smoothY,
        x: "-50%",
        y: "-50%",
        opacity: isVisible ? 1 : 0,
      }}
    >
      <span className="text-white text-sm font-medium">Drag</span>
      <div className="flex gap-1">
        <MoveLeft size={14} className="text-white" />
        <MoveRight size={14} className="text-white" />
      </div>
    </motion.div>
  );
}

function TestimonialCard({ testimonial, index }) {
  const blurPos = [
    "bottom-0 right-0",
    "top-0 left-10",
    "bottom-0 left-0",
    "top-0 right-0",
    "bottom-0 right-10",
    "top-0 left-0",
  ][index % 6];

  return (
    <div className="relative group shrink-0 w-[300px] md:w-[490px] h-[280px] md:h-[240px]">
      <div
        className={cn(
          "absolute w-20 h-20 bg-text-secondary blur-[40px] opacity-40 group-hover:opacity-60 transition-opacity",
          blurPos
        )}
      />
      <div className="relative h-full w-full p-2 bg-surface-base/10 backdrop-blur-3xl border border-white/10 rounded-2xl overflow-hidden">
        <div className="h-full w-full bg-[#0b0b0b] rounded-xl p-4 md:p-6 flex flex-col gap-2 md:gap-4">
          <div className="flex flex-col">
            <h4 className="text-white font-medium text-base md:text-lg">
              {testimonial.name}
            </h4>
            <span className="text-text-secondary text-[10px] md:text-xs font-medium uppercase tracking-wider">
              {testimonial.role}
            </span>
          </div>
          <p className="text-white/50 text-sm leading-relaxed overflow-hidden line-clamp-6 md:line-clamp-4 italic">
            {testimonial.quote}
          </p>
        </div>
      </div>
    </div>
  );
}

const MotionLink = motion(Link);

export default function TestimonialsCarousel() {
  const { data: siteContent } = useSiteContent();
  const testimonials =
    (siteContent?.testimonials ?? []).length > 0 ? siteContent.testimonials : TESTIMONIALS;
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef(null);
  const containerRef = useRef(null);
  const minXRef = useRef(0);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [dragLimits, setDragLimits] = useState({ left: -4000, right: 0 });

  useLayoutEffect(() => {
    const measure = () => {
      if (!sliderRef.current || !containerRef.current) return;
      const scrollW = sliderRef.current.scrollWidth;
      const cw = containerRef.current.clientWidth;
      const min = Math.min(0, cw - scrollW);
      minXRef.current = min;
      setDragLimits({ left: min, right: 0 });
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    if (sliderRef.current) ro.observe(sliderRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  useEffect(() => {
    let frame;
    const tick = () => {
      if (!isDragging && minXRef.current < -2) {
        let next = x.get() - 0.3;
        if (next <= minXRef.current) next = 0;
        x.set(next);
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isDragging, x]);

  return (
    <section className="relative flex min-h-[70vh] w-full flex-col items-center justify-center overflow-hidden bg-surface-raised py-ds-5 px-ds-3 font-primary text-text-primary md:min-h-[min(85vh,720px)] md:px-0">
      <div className="relative z-10 container mx-auto flex flex-col items-center gap-12 md:gap-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center gap-4 max-w-4xl"
        >
          <h3 className="text-white font-medium text-base tracking-wide uppercase opacity-80">
            Premium food packaging
          </h3>
          <h2 className="text-4xl md:text-7xl font-bold text-white tracking-tight leading-tight">
            Packaging built for{" "}
            <span className="text-text-secondary">real kitchens.</span>
          </h2>
          <p className="text-white/50 text-base md:text-lg max-w-lg">
            Clamshells, cups, bags, and bulk disposables—spec-driven supply for
            restaurants, cafés, catering, and cloud kitchens.
          </p>

          <MotionLink
            to="/menu"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative mt-8 px-8 py-3 rounded-full flex items-center gap-3 bg-text-secondary/20 backdrop-blur-lg border border-white/10 group overflow-hidden"
          >
            <motion.div
              animate={{
                x: isHovered ? 20 : 0,
                y: isHovered ? -5 : 0,
                scale: isHovered ? 1.5 : 1,
              }}
              className="absolute -right-4 -bottom-4 w-12 h-12 bg-text-secondary rounded-full blur-xl opacity-60 pointer-events-none"
            />
            <div className="relative z-10 w-8 h-8 rounded-full bg-text-secondary flex items-center justify-center transition-transform duration-500 group-hover:rotate-45">
              <ArrowRight size={18} className="text-white" />
            </div>
            <span className="relative z-10 font-medium text-lg text-white">
              Get Started
            </span>
          </MotionLink>
        </motion.div>

        <div
          ref={containerRef}
          className="relative w-full max-w-[100vw] overflow-hidden cursor-grab active:cursor-grabbing touch-pan-y"
        >
          <motion.div
            ref={sliderRef}
            style={{ x }}
            drag="x"
            dragConstraints={dragLimits}
            dragElastic={0.06}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)}
            className="flex gap-6 px-6 md:px-10 w-max"
          >
            {testimonials.map((testimonial, idx) => (
              <TestimonialCard
                key={testimonial.id || `${testimonial.name}-${idx}`}
                testimonial={testimonial}
                index={idx}
              />
            ))}
          </motion.div>

          <CustomCursor containerRef={containerRef} />
        </div>

        <TrustStats
          variant="dark"
          className="w-full max-w-5xl border-t border-white/10 px-6 pt-10 md:px-10"
        />
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}
