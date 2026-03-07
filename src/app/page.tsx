"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { projects, siteMeta, brandList, featuredOrder, getMediaUrl } from "@/data/portfolio";
import { WorkCard } from "@/components/WorkCard";
import { ShowcaseReel } from "@/components/ShowcaseReel";
import Image from "next/image";

// Subtle Magnetic Repulsion Component for specifically large text
function RepellingText({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const handlePointerMove = (e: React.PointerEvent<HTMLSpanElement>) => {
    // Desktop only, ignore touches/styluses. Safety catch for preferences.
    if (e.pointerType !== "mouse" || prefersReducedMotion) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate distance from center
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    // We want repulsion (move away from cursor), bounded strictly to subtle limits (e.g. max 12px)
    // The closer to center, the harder the push (capped). Opposite math logic.
    const maxRepel = 12;
    // Normalized distance threshold (within 200px acts strongly)
    const threshold = 200;

    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    if (distance < threshold) {
      // Repel intensity mapping
      const intensity = 1 - distance / threshold;
      // Reverse direction to repel, capped by maxRepel
      const moveX = -(distanceX / distance) * maxRepel * intensity;
      const moveY = -(distanceY / distance) * maxRepel * intensity;

      x.set(moveX);
      y.set(moveY);
    } else {
      // Ease back
      x.set(0);
      y.set(0);
    }
  };

  const handlePointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ x: smoothX, y: smoothY, display: "inline-block" }}
    >
      {children}
    </motion.span>
  );
}

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user prefers reduced motion; skip loader if so
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const prefersReducedMotion = useReducedMotion();

  const containerVariant: import("framer-motion").Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1 }
    }
  };

  const lineVariant: import("framer-motion").Variants = {
    hidden: { y: prefersReducedMotion ? 0 : 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { ease: "easeOut", duration: 0.5 }
    }
  };

  const roleVariant: import("framer-motion").Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, delay: 0.12, ease: "easeOut" }
    }
  };

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 800], [0, 200]);
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const parallaxX = useSpring(mouseX, { damping: 25, stiffness: 150 });
  const parallaxY = useSpring(mouseY, { damping: 25, stiffness: 150 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 20;
    const y = (clientY / innerHeight - 0.5) * 20;
    mouseX.set(x);
    mouseY.set(y);
  };

  const featuredProjects = featuredOrder
    .map(slug => projects.find(p => p.slug === slug))
    .filter((p): p is typeof projects[0] => p !== undefined);

  const aiWorkflowSteps = [
    { title: "Strategy", desc: "Defining the core narrative and creative objective." },
    { title: "Concept", desc: "Ideating visual directions that align with brand goals." },
    { title: "Styleframes", desc: "Generating initial keyframes using AI to establish the look." },
    { title: "AI Image Pipeline", desc: "Refining and upscaling assets for pixel-perfect clarity." },
    { title: "AI Video Pipeline", desc: "Animating stills and generating native video loops." },
    { title: "Finishing", desc: "Compositing, color grading, and adding typographic layers." },
    { title: "Delivery", desc: "Exporting optimized final assets across all digital formats." }
  ];

  const servicesList = [
    "Creative Direction",
    "Concept Development",
    "AI Visual & Video Production",
    "Key Visual Architecture",
    "Visual Storytelling",
    "Digital Campaign Systems"
  ];

  return (
    <>
      {/* SECTION A: Loader */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center"
          >
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.2, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                className="font-display text-4xl md:text-6xl text-foreground font-bold tracking-tight mb-2"
              >
                {siteMeta.name}
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-8">
              <motion.p
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.3, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                className="text-foreground/60 tracking-widest uppercase text-sm"
              >
                {siteMeta.role}
              </motion.p>
            </div>
            <div className="w-64 h-[1px] bg-foreground/10 overflow-hidden relative">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute inset-0 bg-foreground"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col min-h-screen">
        {/* SECTION B: Hero */}
        <section
          className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-32 pb-20 items-center overflow-hidden"
          onMouseMove={handleMouseMove}
        >
          {/* Step 1: Soft Reveal of background grain and faint radial glow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-foreground/[0.03] via-background to-background"
          />
          <div className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-background via-background to-accent/5 opacity-50 dark:opacity-20" />

          <motion.div
            style={{ y: heroY, opacity: heroOpacity }}
            className="max-w-7xl mx-auto w-full relative z-10 flex flex-col justify-center flex-grow"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mt-0">

              {/* Left Column: Name & Title */}
              <div className="lg:col-span-7 flex flex-col items-start pr-4 relative z-20">
                {/* Step 2: Name reveals with custom staggered variants */}
                <motion.div
                  variants={containerVariant}
                  initial="hidden"
                  animate="visible"
                  className="w-full flex flex-col"
                >
                  <div className="overflow-hidden pb-1 w-full mt-4">
                    <motion.h1
                      variants={lineVariant}
                      className="text-[12vw] sm:text-[10vw] lg:text-[8vw] font-display font-bold tracking-tight leading-[0.85] m-0"
                    >
                      <RepellingText>Roshan</RepellingText>
                    </motion.h1>
                  </div>
                  <div className="overflow-hidden pb-4 w-full">
                    <motion.h1
                      variants={lineVariant}
                      className="text-[12vw] sm:text-[10vw] lg:text-[8vw] font-display font-bold tracking-tight leading-[0.85] m-0 mb-2"
                    >
                      <RepellingText>Mariadas</RepellingText>
                    </motion.h1>
                  </div>

                  {/* Step 3: Role fades in */}
                  <div className="overflow-hidden w-full">
                    <motion.p
                      variants={roleVariant}
                      className="text-xl md:text-3xl font-display font-medium tracking-tight opacity-70 ml-1"
                    >
                      Art Director
                    </motion.p>
                  </div>
                </motion.div>
              </div>

              {/* Right Column: Focus Block */}
              <div className="lg:col-span-5 flex flex-col items-start lg:items-end w-full relative z-30 lg:-mr-12 mt-12 lg:mt-0">

                {/* Step 4 & Parallax: Focus block outline and gentle drift */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.2, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  style={{ x: parallaxX, y: parallaxY }}
                  className="w-full max-w-md p-8 md:p-12 rounded-3xl border border-foreground/10 bg-background/40 backdrop-blur-xl shadow-2xl relative overflow-hidden group"
                >
                  {/* Subtle inner glow for premium feel */}
                  <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-transparent opacity-50" />

                  <div className="relative z-10 flex flex-col items-start">
                    <div className="flex flex-col items-start mb-10 w-full text-lg md:text-xl text-foreground/80 font-medium tracking-wide">
                      <span>Storytelling meets</span>

                      {/* Step 5: "Execution" signature animation */}
                      <div className="overflow-hidden mt-2 pb-2 w-full">
                        <motion.span
                          initial={{ opacity: 0, x: -20, skewX: 10 }}
                          animate={{ opacity: 1, x: 0, skewX: 0 }}
                          transition={{ duration: 1, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
                          className="font-display italic text-4xl md:text-5xl lg:text-5xl text-left block text-foreground tracking-tight origin-left"
                        >
                          Execution.
                        </motion.span>
                      </div>
                    </div>

                    {/* Step 6: Buttons stagger in */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
                      <motion.div
                        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.20, ease: "easeOut" }}
                        className="w-full sm:w-auto"
                      >
                        <Link
                          href="/work"
                          className="h-14 w-full sm:w-auto px-8 rounded-full bg-foreground text-background flex items-center justify-center text-xs tracking-widest uppercase font-bold hover:scale-105 transition-transform duration-300 shadow-xl"
                        >
                          View Work
                        </Link>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
                        className="w-full sm:w-auto"
                      >
                        <Link
                          href="/contact"
                          className="h-14 w-full sm:w-auto px-8 rounded-full border border-foreground/20 bg-transparent flex items-center justify-center text-xs tracking-widest uppercase font-bold hover:bg-foreground/5 transition-colors duration-300"
                        >
                          Contact
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </div>

            </div>
          </motion.div>

          {/* Scroll Cue Hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 1, delay: 2.2 }}
            style={{ opacity: useTransform(scrollY, [0, 100], [0.5, 0]) }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
          >
            <div className="w-[1px] h-12 bg-gradient-to-b from-foreground/50 to-transparent" />
          </motion.div>
        </section>

        {/* SECTION C: Selected Work */}
        <section className="py-24 px-6 md:px-12 bg-background border-t border-foreground/10">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
              <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight">
                Selected Work
              </h2>
              <Link
                href="/work"
                className="flex items-center gap-2 text-sm uppercase tracking-widest font-medium border-b border-transparent hover:border-foreground transition-all pb-1 group"
              >
                View full archive <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
              {featuredProjects.map((project, index) => (
                <WorkCard
                  key={project.slug}
                  project={project}
                  className={index % 2 !== 0 ? "md:max-w-[85%] md:ml-auto md:mt-32" : "md:max-w-[90%]"}
                  priority={index < 2}
                />
              ))}
            </div>
          </div>
        </section>

        {/* SECTION D: Showcase Reel */}
        <ShowcaseReel />

        {/* SECTION E: Brand Marquee */}
        <section className="py-24 bg-background border-y border-foreground/10 overflow-hidden relative">
          <div className="flex whitespace-nowrap">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 50, ease: "linear" }}
              className="flex text-4xl md:text-7xl font-display font-bold tracking-tight opacity-40 hover:opacity-100 transition-opacity duration-500 w-max"
            >
              {[...brandList, ...brandList].map((brand, i) => (
                <Link key={i} href={`/work?brand=${encodeURIComponent(brand)}`} className="px-8 md:px-16 hover:text-accent transition-colors">
                  {brand}
                </Link>
              ))}
            </motion.div>
          </div>
        </section>

        {/* SECTION F: Services */}
        <section className="py-32 px-6 md:px-12">
          <div className="container mx-auto">
            <h2 className="text-sm font-sans uppercase tracking-widest text-foreground/50 mb-12 border-b border-foreground/10 pb-4">
              Core Capabilities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {servicesList.map((service, i) => (
                <div key={i} className="p-8 md:p-12 border border-foreground/10 rounded-2xl hover:bg-foreground/5 transition-colors group">
                  <div className="h-12 w-12 rounded-full border border-foreground/20 flex items-center justify-center mb-16 text-xs text-foreground/50 group-hover:bg-foreground group-hover:text-background transition-colors">
                    {i + 1}
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight leading-tight w-2/3">
                    {service}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION G: Short About */}
        <section className="py-32 px-6 md:px-12 bg-accent/5">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
              <div className="lg:col-span-5 relative h-[60vh] lg:h-auto rounded-xl overflow-hidden bg-foreground/10">
                <Image
                  src={getMediaUrl("/media/about/about-hero.jpg") || ""}
                  alt="Roshan Mariadas Portrait"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="lg:col-span-6 lg:col-start-7 flex flex-col justify-center">
                <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-8">
                  Driven by visual storytelling & relentless execution.
                </h2>
                <div className="space-y-6 text-foreground/80 text-lg leading-relaxed mb-12">
                  <p>
                    With over 7 years of experience across agency leadership and hands-on production, I shape ideas into cohesive visual narratives.
                  </p>
                  <p>
                    My work blends strategic thinking with evolving tools, building systems that scale while protecting the integrity of the craft.
                  </p>
                </div>
                <div className="mt-8">
                  <Link
                    href="/about"
                    className="h-12 px-8 rounded-full border border-foreground/20 inline-flex items-center justify-center text-xs tracking-widest uppercase font-bold hover:bg-foreground hover:text-background transition-colors duration-300"
                  >
                    More About Me
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
