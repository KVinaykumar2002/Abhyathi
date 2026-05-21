import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, animate } from "framer-motion";
import { viewportScrollReplay } from "@/lib/motionPresets";
import {
  Package,
  Users,
  BadgeCheck,
  ThumbsUp,
  Headphones,
  Leaf,
  ArrowRight,
  Phone,
  Mail,
  ChevronRight,
  Eye,
  Target,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AboutScrollSequence from "../components/AboutScrollSequence";

function StatItem({ icon: Icon, valueType, target, suffix, label, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px", amount: 0.5 });
  const [text, setText] = useState(
    valueType === "float" ? `0.0${suffix}` : `0${suffix}`
  );

  useEffect(() => {
    if (!inView) return;
    if (valueType === "float") {
      setText(`0.0${suffix}`);
      const ctrl = animate(0, target, {
        duration: 1.4,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (latest) => setText(`${latest.toFixed(1)}${suffix}`),
      });
      return () => ctrl.stop();
    }
    setText(`0${suffix}`);
    const ctrl = animate(0, target, {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setText(`${Math.round(latest)}${suffix}`),
    });
    return () => ctrl.stop();
  }, [inView, target, suffix, valueType]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ ...viewportScrollReplay, margin: "-5% 0px" }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center text-center sm:flex-row sm:items-center sm:gap-5 sm:text-left"
    >
      <span className="mb-4 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-border-muted bg-text-secondary/10 text-text-secondary sm:mb-0">
        <Icon className="h-7 w-7" strokeWidth={1.75} />
      </span>
      <div>
        <p className="text-4xl font-bold tracking-tight text-text-primary md:text-5xl">
          {text}
        </p>
        <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-text-disabled">
          {label}
        </p>
      </div>
    </motion.div>
  );
}

function FeaturePill({
  icon: Icon,
  title,
  desc,
  delay,
  variant,
}) {
  const shell =
    variant === "dark"
      ? "border-transparent bg-surface-raised text-white shadow-[0_16px_40px_rgba(0,0,0,0.2)]"
      : variant === "mid"
        ? "border border-text-secondary/35 bg-surface-base text-white shadow-[0_12px_32px_rgba(243,94,22,0.12)]"
        : "border border-border-muted bg-surface-raised text-text-primary shadow-[0_8px_28px_rgba(0,0,0,0.06)]";

  const iconWrap =
    variant === "dark"
      ? "bg-surface-base text-text-primary"
      : variant === "mid"
        ? "bg-surface-base/20 text-white"
        : "bg-text-secondary text-white";

  const titleClass =
    variant === "light" ? "font-bold text-text-primary" : "font-bold text-white";
  const descClass =
    variant === "light" ? "text-sm text-text-disabled" : "text-sm text-white/75";

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ ...viewportScrollReplay, amount: 0.2 }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`flex w-full max-w-md items-center gap-4 rounded-full px-5 py-4 md:gap-5 md:px-6 md:py-5 ${shell}`}
    >
      <span
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full md:h-[52px] md:w-[52px] ${iconWrap}`}
      >
        <Icon className="h-5 w-5 md:h-[22px] md:w-[22px]" strokeWidth={2} />
      </span>
      <div className="min-w-0 flex-1 text-left">
        <p className={`text-[15px] leading-snug md:text-base ${titleClass}`}>{title}</p>
        <p className={`mt-0.5 leading-relaxed ${descClass}`}>{desc}</p>
      </div>
    </motion.div>
  );
}

export default function About() {
  return (
    <div className="min-h-screen bg-surface-base font-primary selection:bg-text-secondary/30 selection:text-text-secondary">
      <Navbar />

      <main className="pt-24 md:pt-28">
        {/* Hero — white band, black + orange accents */}
        <section className="bg-surface-base pb-10 pt-6 md:pb-12 md:pt-8">
          <div className="mx-auto max-w-7xl px-6 text-center md:px-10 lg:px-12">
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl font-bold tracking-tight text-text-primary md:text-5xl lg:text-[3.25rem]"
            >
              About Us
            </motion.h1>
            <motion.nav
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 flex flex-wrap items-center justify-center gap-1 text-sm font-medium text-text-disabled md:text-base"
              aria-label="Breadcrumb"
            >
              <Link to="/" className="transition-colors hover:text-text-secondary">
                Home
              </Link>
              <span className="flex items-center px-0.5 text-text-disabled" aria-hidden>
                <ChevronRight className="h-4 w-4" strokeWidth={2} />
                <ChevronRight className="-ml-2.5 h-4 w-4" strokeWidth={2} />
              </span>
              <span className="font-semibold text-text-secondary">About Us</span>
            </motion.nav>
          </div>
        </section>

        {/* Vision / Mission + excellence — black shell, orange accents, rounded throughout */}
        <section className="bg-surface-base px-6 pb-12 md:px-10 md:pb-14 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ ...viewportScrollReplay, amount: 0.12 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-7xl overflow-hidden rounded-t-[1.75rem] bg-surface-raised shadow-[0_24px_60px_rgba(243,94,22,0.15)] ring-1 ring-text-secondary/20 md:rounded-t-[2.25rem]"
          >
            <div className="grid gap-12 px-5 py-12 md:gap-14 md:px-10 md:py-16 lg:grid-cols-2 lg:gap-16 lg:px-14 lg:py-20 xl:gap-20">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-5 lg:gap-6">
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ ...viewportScrollReplay, amount: 0.2 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="relative mx-auto mt-9 w-full max-w-sm rounded-2xl border border-white/10 bg-surface-base px-5 pb-8 pt-11 text-center text-white shadow-lg shadow-black/40 sm:mx-0 sm:max-w-none"
                >
                  <div className="absolute -top-7 left-1/2 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full bg-text-secondary text-white shadow-lg shadow-text-secondary/35 ring-4 ring-surface-base">
                    <Eye className="h-6 w-6" strokeWidth={2} aria-hidden />
                  </div>
                  <h2 className="text-lg font-bold md:text-xl">Our Vision</h2>
                  <p className="mt-3 text-sm leading-relaxed text-white/80 md:text-[15px]">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
                    tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
                  </p>
                </motion.article>
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ ...viewportScrollReplay, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
                  className="relative mx-auto mt-9 w-full max-w-sm rounded-2xl border border-white/15 bg-text-secondary px-5 pb-8 pt-11 text-center text-white shadow-lg shadow-text-secondary/30 sm:mx-0 sm:max-w-none"
                >
                  <div className="absolute -top-7 left-1/2 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full bg-surface-base text-text-primary shadow-md ring-4 ring-text-secondary">
                    <Target className="h-6 w-6" strokeWidth={2} aria-hidden />
                  </div>
                  <h2 className="text-lg font-bold md:text-xl">Our Mission</h2>
                  <p className="mt-3 text-sm leading-relaxed text-white/95 md:text-[15px]">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                </motion.article>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ ...viewportScrollReplay, amount: 0.15 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col justify-center text-white lg:pl-2"
              >
                <h2 className="text-2xl font-bold leading-tight tracking-tight md:text-3xl lg:text-[2rem] xl:text-[2.15rem]">
                  Excellence In{" "}
                  <span className="text-text-secondary">Food Service</span> Packaging
                </h2>
                <p className="mt-5 text-sm leading-relaxed text-white/85 md:text-base">
                  From bulk containers and cups to bags and compostable lines—we
                  help restaurants, cloud kitchens, and caterers ship consistent
                  quality with packaging that performs on the shelf and on the road.
                </p>
                <div className="my-8 border-t border-dashed border-text-secondary/45" />
                <p className="text-sm font-semibold tracking-wide text-white">
                  Our Partners:
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-5 md:gap-8">
                  {["Partner One", "Partner Two", "Partner Three"].map((label) => (
                    <div
                      key={label}
                      className="flex h-11 min-w-[6.5rem] items-center justify-center rounded-xl border-2 border-white/35 bg-black/40 px-4 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm transition-colors hover:border-text-secondary hover:bg-text-secondary"
                    >
                      {label}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Scroll-scrub packaging sequence (middle of page — not in header) */}
        <AboutScrollSequence />

        {/* Stats strip — three metrics, dotted rule below */}
        <section className="border-b border-dashed border-border-muted/80">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-14 sm:grid-cols-3 sm:gap-8 md:px-10 lg:px-12 lg:py-16">
            <StatItem
              icon={Package}
              valueType="int"
              target={23}
              suffix=""
              label="Experience"
              index={0}
            />
            <StatItem
              icon={Users}
              valueType="float"
              target={5.8}
              suffix="+"
              label="Customer Rate"
              index={1}
            />
            <StatItem
              icon={BadgeCheck}
              valueType="float"
              target={6.1}
              suffix="+"
              label="Project Done"
              index={2}
            />
          </div>
        </section>

        {/* Why Choose Us — 3 equal columns: copy | mockup | cards (matches reference layout) */}
        <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20 lg:px-12 lg:py-24">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-3 lg:gap-8 xl:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ ...viewportScrollReplay, amount: 0.2 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex max-w-lg flex-col justify-center lg:max-w-none lg:pr-2"
            >
              <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold leading-[1.15] tracking-tight text-text-primary">
                Why Choose Us
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-text-disabled md:text-base">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
                tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-9 w-full sm:w-auto"
              >
                <Link
                  to="/menu"
                  className="inline-flex w-full items-center gap-3 rounded-full bg-surface-raised py-2 pl-2 pr-8 text-sm font-semibold text-white shadow-md transition-colors hover:bg-black sm:w-auto sm:pr-10"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-base text-text-primary">
                    <ArrowRight className="h-4 w-4" aria-hidden strokeWidth={2.25} />
                  </span>
                  Learn More
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ ...viewportScrollReplay, amount: 0.2 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="flex w-full justify-center lg:justify-center"
            >
              <div className="relative flex w-full max-w-[560px] items-center justify-center p-2 sm:p-4 md:max-w-[620px] lg:max-w-none">
                <img
                  src="/1000.png"
                  alt="Cup and paper food bag packaging mockup"
                  className="relative z-[1] mx-auto h-auto w-full max-w-[380px] object-contain drop-shadow-[0_20px_44px_rgba(0,0,0,0.12)] sm:max-w-[440px] md:max-w-[500px] lg:max-w-[540px] xl:max-w-[600px]"
                  width={800}
                  height={800}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ ...viewportScrollReplay, amount: 0.15 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto flex w-full max-w-md flex-col justify-center gap-4 lg:mx-0 lg:max-w-none lg:pl-2"
            >
              <FeaturePill
                icon={ThumbsUp}
                title="Premium Quality"
                desc="Rigorous checks on materials and finishes for every batch."
                variant="dark"
                delay={0}
              />
              <FeaturePill
                icon={Headphones}
                title="24/7 Support"
                desc="Help when you need it—orders, specs, and timelines."
                variant="mid"
                delay={0.08}
              />
              <FeaturePill
                icon={Leaf}
                title="Eco Friendly"
                desc="Compostable and reduced-waste options for modern kitchens."
                variant="light"
                delay={0.16}
              />
            </motion.div>
          </div>
        </section>

        {/* CTA banner — texture bg (10002.jpg), 10001.png left, copy + pills right */}
        <section className="bg-surface-base px-6 pb-20 pt-10 md:px-10 lg:px-12 lg:pb-24 lg:pt-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ ...viewportScrollReplay, amount: 0.12 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto max-w-7xl overflow-hidden rounded-t-[2.5rem] shadow-xl shadow-black/10 ring-1 ring-border-muted md:rounded-t-[3rem]"
          >
            <div
              aria-hidden
              className="absolute inset-0 z-0 bg-stone-200 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: "url(/10002.jpg)" }}
            />
            <div className="relative z-[2] grid grid-cols-1 lg:grid-cols-2 lg:items-stretch">
              <motion.div
                initial={{ opacity: 0, x: -36 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ ...viewportScrollReplay, amount: 0.2 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex min-h-[280px] items-end justify-center px-4 pb-0 pt-10 lg:min-h-[420px]"
              >
                <img
                  src="/10001.png"
                  alt="Delivery professional with packaged orders"
                  className="relative z-[1] max-h-[min(70vh,440px)] w-auto max-w-[100%] object-contain object-bottom drop-shadow-[0_12px_28px_rgba(0,0,0,0.15)]"
                  width={700}
                  height={900}
                  loading="lazy"
                  decoding="async"
                />
              </motion.div>

              <div className="relative flex flex-col justify-center bg-white/92 px-6 py-12 shadow-[inset_1px_0_0_rgba(0,0,0,0.06)] backdrop-blur-lg md:px-10 md:py-14 lg:px-12 lg:py-16">
                <div
                  aria-hidden
                  className="pointer-events-none absolute right-[-10%] top-1/2 h-[min(90%,420px)] w-[min(90%,420px)] -translate-y-1/2 opacity-[0.12]"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(
                      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none" stroke="%23171717" stroke-width="1"><circle cx="100" cy="100" r="78"/><circle cx="100" cy="100" r="42"/><path d="M100 22v156M22 100h156"/></svg>'
                    )}")`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                  }}
                />
                <motion.h2
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportScrollReplay}
                  transition={{ delay: 0.05 }}
                  className="relative z-[1] max-w-lg text-2xl font-bold leading-snug tracking-tight text-[#0a0a0a] md:text-3xl lg:text-[1.85rem] xl:text-4xl"
                >
                  Didn&apos;t find your answer?{" "}
                  <span className="text-text-secondary">Contact us!</span>
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportScrollReplay}
                  transition={{ delay: 0.1 }}
                  className="relative z-[1] mt-4 max-w-lg text-sm leading-relaxed text-neutral-600 md:text-base"
                >
                  Tell us about bulk orders, custom branding, or eco ranges—we
                  reply with clear next steps and timelines.
                </motion.p>
                <div className="relative z-[1] my-8 h-px w-full max-w-lg border-t border-dashed border-neutral-300" />
                <div className="relative z-[1] flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                  <motion.a
                    href="tel:+910000000000"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={viewportScrollReplay}
                    transition={{ delay: 0.15 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex min-w-0 flex-1 items-center gap-3 rounded-full border border-border-muted bg-surface-base px-4 py-3 pr-6 shadow-lg sm:min-w-[240px] sm:flex-initial"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-surface-raised text-white">
                      <Phone className="h-5 w-5" strokeWidth={2} />
                    </span>
                    <div className="min-w-0 text-left">
                      <p className="truncate text-sm font-bold text-text-primary">
                        +91 (000) 000-0000
                      </p>
                      <p className="text-xs text-text-disabled">Call sales & support</p>
                    </div>
                  </motion.a>
                  <motion.a
                    href="mailto:info@abhyatifoodpak.com"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={viewportScrollReplay}
                    transition={{ delay: 0.22 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex min-w-0 flex-1 items-center gap-3 rounded-full bg-text-secondary px-4 py-3 pr-6 text-white shadow-[0_12px_40px_rgba(243,94,22,0.35)] sm:min-w-[240px] sm:flex-initial"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-surface-base text-text-secondary">
                      <Mail className="h-5 w-5" strokeWidth={2} />
                    </span>
                    <div className="min-w-0 text-left">
                      <p className="truncate text-sm font-bold">info@abhyatifoodpak.com</p>
                      <p className="text-xs text-white/85">We reply within one business day</p>
                    </div>
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
