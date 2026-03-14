"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion, useMotionValue } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { getMediaUrl } from "@/data/portfolio";

// Helper for premium magnetic text (reused from page.tsx design language)
function MagneticLetter({ children, mouseX, mouseY, isHovered, maxRepel = 14, threshold = 240 }: { children: React.ReactNode, mouseX: import("framer-motion").MotionValue<number>, mouseY: import("framer-motion").MotionValue<number>, isHovered: boolean, maxRepel?: number, threshold?: number }) {
    const prefersReducedMotion = useReducedMotion();
    const letterRef = useRef<HTMLSpanElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
    const smoothX = useSpring(x, springConfig);
    const smoothY = useSpring(y, springConfig);

    useEffect(() => {
        if (prefersReducedMotion) return;

        let rafId: number;

        const updatePosition = () => {
            if (!isHovered) {
                x.set(0);
                y.set(0);
                rafId = requestAnimationFrame(updatePosition);
                return;
            }

            if (!letterRef.current) return;
            const rect = letterRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const currentMouseX = mouseX.get();
            const currentMouseY = mouseY.get();

            const distanceX = currentMouseX - centerX;
            const distanceY = currentMouseY - centerY;
            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

            if (distance < threshold) {
                const rawIntensity = 1 - distance / threshold;
                const intensity = Math.pow(rawIntensity, 2);

                const moveX = -(distanceX / distance) * maxRepel * intensity;
                const moveY = -(distanceY / distance) * maxRepel * intensity;

                x.set(moveX);
                y.set(moveY);
            } else {
                x.set(0);
                y.set(0);
            }

            rafId = requestAnimationFrame(updatePosition);
        };

        updatePosition();
        return () => cancelAnimationFrame(rafId);
    }, [mouseX, mouseY, isHovered, prefersReducedMotion, x, y, maxRepel, threshold]);

    return (
        <motion.span ref={letterRef} style={{ x: smoothX, y: smoothY, display: "inline-block" }}>
            {children}
        </motion.span>
    );
}

function MagneticText({ text, maxRepel = 14, threshold = 240 }: { text: string, maxRepel?: number, threshold?: number }) {
    const prefersReducedMotion = useReducedMotion();
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [isHovered, setIsHovered] = useState(false);

    const handlePointerMove = (e: React.PointerEvent<HTMLSpanElement>) => {
        if (e.pointerType !== "mouse" || prefersReducedMotion) return;
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
    };

    return (
        <span
            onPointerEnter={() => setIsHovered(true)}
            onPointerLeave={() => setIsHovered(false)}
            onPointerMove={handlePointerMove}
            style={{ display: "inline-flex" }}
        >
            {text.split("").map((char, index) => (
                <MagneticLetter key={index} mouseX={mouseX} mouseY={mouseY} isHovered={isHovered} maxRepel={maxRepel} threshold={threshold}>
                    {char === " " ? "\u00A0" : char}
                </MagneticLetter>
            ))}
        </span>
    );
}

// Media assets for the mosaic grid, pulled from top projects in portfolio.ts
const wallMedia = [
    { type: "video", url: "https://res.cloudinary.com/ddxa0ahzp/video/upload/v1772741168/rm-portfolio-live/dilmah-sri-lanka/hero.mp4", poster: "https://res.cloudinary.com/ddxa0ahzp/video/upload/v1772741168/rm-portfolio-live/dilmah-sri-lanka/hero.jpg", size: "large", priority: true },
    { type: "image", url: "/media/idemitsu-mena/08.jpg", size: "small" },
    { type: "image", url: "/media/cinnamon/05.jpg", size: "medium" },
    { type: "video", url: "https://res.cloudinary.com/ddxa0ahzp/video/upload/v1772733662/rm-portfolio-live/anchor-butter/hero.mp4", poster: "https://res.cloudinary.com/ddxa0ahzp/video/upload/v1772733662/rm-portfolio-live/anchor-butter/hero.jpg", size: "medium", priority: true },
    { type: "image", url: "/media/anchor-newdale/02.jpg", size: "small" },
    { type: "image", url: "/media/idemitsu-mena/04.jpg", size: "large" },
    { type: "video", url: "https://res.cloudinary.com/ddxa0ahzp/video/upload/v1772733678/rm-portfolio-live/anchor-moments/hero.mp4", poster: "https://res.cloudinary.com/ddxa0ahzp/video/upload/v1772733678/rm-portfolio-live/anchor-moments/hero.jpg", size: "small" },
    { type: "image", url: "/media/baby-cheramy/04.jpg", size: "medium" },
    { type: "image", url: "/media/cinnamon/06.jpg", size: "large" },
    { type: "image", url: "/media/dialog/03.jpg", size: "small" },
    { type: "video", url: "https://res.cloudinary.com/ddxa0ahzp/video/upload/v1772640810/rm-portfolio-live/anchor-moments/25.mp4", size: "small" },
    { type: "video", url: "/media/mazda-motor-oil-mena/hero.mp4", size: "large", priority: true },
    { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772640713/rm-portfolio-live/anchor-butter/05.jpg", size: "small" },
    { type: "image", url: "/media/portfolio-2024/10.jpg", size: "medium" },
    { type: "image", url: "/media/cinnamon/10.jpg", size: "small" },
    { type: "image", url: "/media/baby-cheramy/02.jpg", size: "small" },
    { type: "video", url: "https://res.cloudinary.com/ddxa0ahzp/video/upload/v1772733667/rm-portfolio-live/anchor-butter/swirl.mp4", size: "medium" },
    { type: "image", url: "/media/cinnamon/11.jpg", size: "large" },
    { type: "image", url: "/media/sprite/rmdn-02.png", size: "medium" },
    { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772640713/rm-portfolio-live/anchor-butter/04.jpg", size: "medium" },
    { type: "video", url: "https://res.cloudinary.com/ddxa0ahzp/video/upload/v1772733599/rm-portfolio-live/brewery/3.mp4", size: "small" },
    { type: "video", url: "/media/anchor-newdale/hero.mp4", size: "large" },
    { type: "image", url: "/media/idemitsu-mena/11.jpg", size: "medium" },
    { type: "image", url: "/media/cinnamon/02.jpg", size: "small" },
    { type: "image", url: "/media/potted/05.jpg", size: "medium" },
];

export function MediaWallHero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();
    const prefersReducedMotion = useReducedMotion();
    const [isNameHovered, setIsNameHovered] = useState(false);

    // Gentle parallax effects for the background grid
    const y1 = useTransform(scrollY, [0, 1000], [0, -100]);
    const y2 = useTransform(scrollY, [0, 1000], [0, -200]);
    const y3 = useTransform(scrollY, [0, 1000], [0, -150]);

    // Opacity fade out when scrolling down
    const heroOpacity = useTransform(scrollY, [0, 800], [1, 0]);

    return (
        <section
            ref={containerRef}
            className="relative h-screen w-full overflow-hidden bg-background flex items-center justify-center p-4 sm:p-6"
        >
            {/* 1. Background Cinematic Media Grid */}
            <motion.div
                style={{ opacity: prefersReducedMotion ? 1 : heroOpacity }}
                className="absolute inset-0 z-0 h-[120vh] -top-[10vh] left-0 right-0 w-full overflow-hidden opacity-80"
            >
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4 p-2 w-full h-full min-w-[120vw] -ml-[10vw]">

                    {/* Column 1 */}
                    <motion.div style={{ y: prefersReducedMotion ? 0 : y1 }} className="flex flex-col gap-3 md:gap-4 mt-12 md:-mt-24">
                        {wallMedia.slice(0, 5).map((media, i) => (
                            <MediaTile key={`col1-${i}`} media={media} delay={i * 0.1} />
                        ))}
                    </motion.div>

                    {/* Column 2 */}
                    <motion.div style={{ y: prefersReducedMotion ? 0 : y2 }} className="flex flex-col gap-3 md:gap-4 mt-4 md:mt-12">
                        {wallMedia.slice(5, 10).map((media, i) => (
                            <MediaTile key={`col2-${i}`} media={media} delay={i * 0.15 + 0.1} />
                        ))}
                    </motion.div>

                    {/* Column 3 (Center - mostly hidden by text, but provides depth) */}
                    <motion.div style={{ y: prefersReducedMotion ? 0 : y1 }} className="hidden md:flex flex-col gap-3 md:gap-4 -mt-12">
                        {wallMedia.slice(10, 15).map((media, i) => (
                            <MediaTile key={`col3-${i}`} media={media} delay={i * 0.12 + 0.2} />
                        ))}
                    </motion.div>

                    {/* Column 4 */}
                    <motion.div style={{ y: prefersReducedMotion ? 0 : y3 }} className="hidden lg:flex flex-col gap-3 md:gap-4 mt-16 md:mt-24">
                        {wallMedia.slice(15, 20).map((media, i) => (
                            <MediaTile key={`col4-${i}`} media={media} delay={i * 0.1 + 0.3} />
                        ))}
                    </motion.div>

                    {/* Column 5 */}
                    <motion.div style={{ y: prefersReducedMotion ? 0 : y2 }} className="hidden xl:flex flex-col gap-3 md:gap-4 -mt-8">
                        {wallMedia.slice(20, 25).map((media, i) => (
                            <MediaTile key={`col5-${i}`} media={media} delay={i * 0.18 + 0.4} />
                        ))}
                    </motion.div>

                </div>
            </motion.div>

            {/* 2. Dark Cinematic Overlay (Gradient from center and bottom) */}
            <div className="absolute inset-0 z-10 bg-black/40 xl:bg-black/30 pointer-events-none" />
            <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.7)_100%)] pointer-events-none" />
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-background via-background/60 to-transparent pointer-events-none" />

            {/* 3. Center Hero Information Block */}
            <div className="relative z-20 flex flex-col items-center justify-center w-full max-w-5xl mx-auto text-center mt-[-5%]">

                {/* Art Director Tag */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
                    className="mb-4 sm:mb-6"
                >
                    <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-[10px] sm:text-xs tracking-[0.3em] font-medium uppercase text-white/80">
                        Art Director
                    </div>
                </motion.div>

                {/* Name Title */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                    className="pb-4"
                >
                    <div
                        className="relative"
                        onPointerEnter={() => {
                            if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
                            setIsNameHovered(true);
                        }}
                        onPointerLeave={() => setIsNameHovered(false)}
                    >
                        {/* Soft Glow/Blur Hover Layer (Desktop only) */}
                        <div className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ease-out hidden md:flex flex-wrap justify-center gap-[2vw] md:gap-4 blur-xl ${isNameHovered ? 'opacity-40' : 'opacity-0'}`}>
                            <span className="block text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[7vw] font-display font-bold tracking-tight leading-[0.9] text-white">Roshan Mariadas</span>
                        </div>

                        {/* Interactive Main Layer */}
                        <h1 className="relative z-10 text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[7vw] font-display font-bold tracking-tight leading-[0.9] text-white m-0 drop-shadow-2xl flex flex-wrap justify-center gap-[2vw] md:gap-4">
                            <span className="block"><MagneticText text="Roshan" /></span>
                            <span className="block"><MagneticText text="Mariadas" /></span>
                        </h1>
                    </div>
                </motion.div>

                {/* Supporting Line */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
                >
                    <div className="font-sans text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] uppercase text-white/90 font-bold mb-4 sm:mb-6 drop-shadow-md">
                        Translating bold ideas into precise visual realities
                    </div>
                </motion.div>

                {/* Premium CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
                    className="mt-10 md:mt-12 flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
                >
                    {/* Primary View Work - Premium Liquid Glass */}
                    <Link
                        href="/work"
                        className="group relative h-14 px-8 rounded-full bg-white/10 overflow-hidden backdrop-blur-md border border-white/20 hover:border-white/40 hover:bg-white/15 transition-all duration-500 shadow-[0_0_40px_-10px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_-5px_rgba(255,255,255,0.2)] flex items-center justify-center min-w-[180px]"
                    >
                        {/* Glossy inner reflection */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/5 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        <span className="text-white text-xs md:text-sm tracking-[0.2em] font-bold uppercase relative z-10 transition-transform duration-500 group-hover:scale-105">
                            View Work
                        </span>
                    </Link>

                    {/* Secondary About - Minimal Glass */}
                    <Link
                        href="/about"
                        className="group relative h-14 px-8 rounded-full bg-transparent overflow-hidden backdrop-blur-sm border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all duration-500 flex items-center justify-center min-w-[180px]"
                    >
                        <span className="text-white/80 group-hover:text-white text-xs md:text-sm tracking-[0.2em] font-bold uppercase relative z-10 transition-transform duration-500 group-hover:scale-105">
                            About
                        </span>
                    </Link>
                </motion.div>
            </div>

        </section>
    );
}

// Sub-component for individual grid media tiles
function MediaTile({ media, delay }: { media: { type: string, url: string, poster?: string, size: string, priority?: boolean }, delay: number }) {
    const prefersReducedMotion = useReducedMotion();

    // Height variation based on specified size
    const heightClass = media.size === "large" ? "h-[450px]" : media.size === "medium" ? "h-[320px]" : "h-[220px]";

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay }}
            whileHover={{ scale: prefersReducedMotion ? 1 : 1.02 }}
            className={`relative w-full ${heightClass} rounded-2xl md:rounded-3xl overflow-hidden bg-background/20 backdrop-blur-md shadow-2xl border border-white/5 group`}
        >
            {/* Subtle overlay inside tile for rich contrast */}
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent to-black/30 opacity-60" />

            {media.type === "video" ? (
                <video
                    src={getMediaUrl(media.url)}
                    poster={getMediaUrl(media.poster)}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover origin-center transition-transform duration-[20s] group-hover:scale-110"
                />
            ) : (
                <Image
                    src={getMediaUrl(media.url) || ""}
                    alt="Portfolio media tile"
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                    className="object-cover origin-center transition-transform duration-[20s] group-hover:scale-110"
                    priority={media.priority}
                />
            )}
        </motion.div>
    );
}
