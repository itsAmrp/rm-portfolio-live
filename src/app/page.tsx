"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useSpring, useMotionValue } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projects, siteMeta, brandList, featuredOrder, getMediaUrl } from "@/data/portfolio";
import { WorkCard } from "@/components/WorkCard";
import { ShowcaseReel } from "@/components/ShowcaseReel";
import { MediaWallHero } from "@/components/MediaWallHero";
import Image from "next/image";


export default function Home() {
  const [loading, setLoading] = useState(true);

  // Using a ref to prevent state updates if the component unmounts quickly
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    // If reduced motion is preferred, remove loading state smoothly
    if (mediaQuery.matches) {
      setTimeout(() => {
        if (isMounted.current) setLoading(false);
      }, 0);
      return;
    }

    const timer = setTimeout(() => {
      if (isMounted.current) setLoading(false);
    }, 2000);

    return () => {
      isMounted.current = false;
      clearTimeout(timer);
    };
  }, []);

  const featuredProjects = featuredOrder
    .map(slug => projects.find(p => p.slug === slug))
    .filter((p): p is typeof projects[0] => p !== undefined);

  const servicesList = [
    "Creative Direction",
    "Concept Development",
    "Motion Design & Production",
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
        <MediaWallHero />

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
                  Built on craft. Defined by execution.
                </h2>
                <div className="space-y-6 text-foreground/80 text-lg leading-relaxed mb-12">
                  <p>
                    With over seven years of agency leadership and hands-on production experience, I shape bold ideas into clear visual narratives.
                  </p>
                  <p>
                    My work balances aesthetic intuition with technical rigor, building creative systems that scale while protecting the integrity of the design.
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
