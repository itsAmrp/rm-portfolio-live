"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useSpring, useReducedMotion, MotionValue } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react";
import type { MediaAsset } from "@/data/portfolio";
import { getMediaUrl, getGalleryItemThumbnail } from "@/data/portfolio";
import { LazyVideo } from "@/components/LazyVideo";

interface MasonryGalleryProps {
    items: MediaAsset[];
    projectFallbackThumbnail?: string;
}

export function MasonryGallery({ items, projectFallbackThumbnail }: MasonryGalleryProps) {
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const mouseX = useMotionValue(-1000);
    const mouseY = useMotionValue(-1000);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (window.innerWidth < 1024) return; // Desktop only
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
    };

    const handleMouseLeave = () => {
        mouseX.set(-1000);
        mouseY.set(-1000);
    };

    if (!items || items.length === 0) return null;

    return (
        <>
            <div
                className="columns-2 sm:columns-2 md:columns-3 xl:columns-4 gap-3 sm:gap-6 space-y-3 sm:space-y-6"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                {items.map((media, i) => (
                    <MasonryTile
                        key={media.url + i}
                        media={media}
                        index={i}
                        mouseX={mouseX}
                        mouseY={mouseY}
                        projectFallbackThumbnail={projectFallbackThumbnail}
                        onClick={() => setLightboxIndex(i)}
                    />
                ))}
            </div>

            <AnimatePresence>
                {lightboxIndex !== null && (
                    <Lightbox
                        items={items}
                        currentIndex={lightboxIndex}
                        onClose={() => setLightboxIndex(null)}
                        onIndexChange={setLightboxIndex}
                    />
                )}
            </AnimatePresence>
        </>
    );
}

interface MasonryTileProps {
    media: MediaAsset;
    index: number;
    mouseX: MotionValue<number>;
    mouseY: MotionValue<number>;
    projectFallbackThumbnail?: string;
    onClick: () => void;
}

function MasonryTile({ media, index, mouseX, mouseY, projectFallbackThumbnail, onClick }: MasonryTileProps) {
    const ref = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();

    const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
    const x = useSpring(0, springConfig);
    const y = useSpring(0, springConfig);
    const rotateX = useSpring(0, springConfig);
    const rotateY = useSpring(0, springConfig);

    useEffect(() => {
        if (prefersReducedMotion) return;

        const unsubscribe = mouseX.on("change", (latestX) => {
            if (!ref.current) return;
            if (latestX === -1000) {
                x.set(0); y.set(0); rotateX.set(0); rotateY.set(0);
                return;
            }

            const rect = ref.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const distanceX = latestX - centerX;
            const distanceY = mouseY.get() - centerY;
            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

            const threshold = 600;

            if (distance < threshold) {
                const intensity = Math.pow(1 - (distance / threshold), 1.5);
                const nX = Math.max(-1, Math.min(1, distanceX / (rect.width / 2)));
                const nY = Math.max(-1, Math.min(1, distanceY / (rect.height / 2)));

                x.set(nX * -8 * intensity);
                y.set(nY * -8 * intensity);
                rotateX.set(nY * -4 * intensity);
                rotateY.set(nX * 4 * intensity);
            } else {
                x.set(0); y.set(0); rotateX.set(0); rotateY.set(0);
            }
        });

        return () => unsubscribe();
    }, [mouseX, mouseY, prefersReducedMotion, x, y, rotateX, rotateY]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: (index % 5) * 0.1, ease: "easeOut" }}
            className="break-inside-avoid relative w-full group cursor-zoom-in overflow-hidden rounded-xl bg-foreground/5 shadow-sm hover:shadow-2xl transition-shadow duration-300 transform-gpu"
            style={{ x, y, rotateX, rotateY, transformPerspective: 1200, willChange: "transform" }}
            onClick={onClick}
            data-cursor={media.type === "video" ? "video" : "image"}
        >
            {media.type === "video" ? (
                <div className="relative w-full aspect-video">
                    <LazyVideo
                        srcMp4={getMediaUrl(media.videoMp4)}
                        srcWebm={getMediaUrl(media.videoWebm)}
                        poster={getGalleryItemThumbnail(media, projectFallbackThumbnail)}
                        alt={media.alt}
                    />
                    <div className="absolute top-4 left-4 flex gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="px-3 py-1 bg-background/80 backdrop-blur-md rounded-full text-[10px] uppercase tracking-widest font-medium shadow-sm flex items-center gap-1.5">
                            <Play size={10} /> Video
                        </span>
                    </div>
                </div>
            ) : (
                <div className="relative w-full">
                    <Image
                        src={getMediaUrl(media.url) || ""}
                        alt={media.alt}
                        width={1000}
                        height={1000}
                        className="w-full h-auto object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    />
                    <div className="absolute top-4 left-4 flex gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="px-3 py-1 bg-background/80 backdrop-blur-md rounded-full text-[10px] uppercase tracking-widest font-medium shadow-sm">
                            Image
                        </span>
                    </div>
                </div>
            )}
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors pointer-events-none" />
        </motion.div>
    );
}

interface LightboxProps {
    items: MediaAsset[];
    currentIndex: number;
    onClose: () => void;
    onIndexChange: (index: number) => void;
}

function Lightbox({ items, currentIndex, onClose, onIndexChange }: LightboxProps) {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowRight") onIndexChange((currentIndex + 1) % items.length);
            if (e.key === "ArrowLeft") onIndexChange((currentIndex - 1 + items.length) % items.length);
        };
        window.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden";

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "auto";
        };
    }, [currentIndex, items.length, onClose, onIndexChange]);

    const activeItem = items[currentIndex];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-xl"
        >
            <button
                onClick={onClose}
                className="absolute top-6 right-6 lg:top-12 lg:right-12 z-50 p-4 rounded-full bg-foreground/10 hover:bg-foreground/20 text-foreground transition-colors"
                aria-label="Close lightbox"
            >
                <X size={24} />
            </button>

            <button
                onClick={() => onIndexChange((currentIndex - 1 + items.length) % items.length)}
                className="absolute left-4 lg:left-12 z-40 p-4 rounded-full bg-foreground/5 hover:bg-foreground/20 text-foreground transition-colors"
            >
                <ChevronLeft size={32} />
            </button>

            <button
                onClick={() => onIndexChange((currentIndex + 1) % items.length)}
                className="absolute right-4 lg:right-12 z-40 p-4 rounded-full bg-foreground/5 hover:bg-foreground/20 text-foreground transition-colors"
            >
                <ChevronRight size={32} />
            </button>

            <div className="relative w-full h-full max-w-7xl max-h-screen p-4 flex items-center justify-center pointer-events-none">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="relative w-full h-[85vh] flex items-center justify-center pointer-events-auto"
                    >
                        {activeItem.type === "video" ? (
                            <div className="relative w-full h-full flex items-center justify-center bg-black/20 rounded-2xl overflow-hidden shadow-2xl">
                                <video
                                    src={getMediaUrl(activeItem.videoMp4 || activeItem.videoWebm)}
                                    poster={getGalleryItemThumbnail(activeItem)}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    preload="metadata"
                                    className="max-w-full max-h-full object-contain"
                                />
                            </div>
                        ) : (
                            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-foreground/5">
                                <Image
                                    src={getMediaUrl(activeItem.url) || ""}
                                    alt={activeItem.alt}
                                    fill
                                    quality={100}
                                    className="object-contain"
                                    sizes="100vw"
                                />
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="absolute bottom-12 left-0 right-0 text-center pointer-events-none">
                <span className="px-4 py-2 rounded-full bg-foreground/5 text-xs tracking-widest font-medium uppercase backdrop-blur-md">
                    {currentIndex + 1} / {items.length}
                </span>
            </div>
        </motion.div>
    );
}
