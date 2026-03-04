"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import { projects, getMediaUrl } from "@/data/portfolio";

export function ShowcaseReel() {
    const featuredProjects = projects.filter(p => p.heroMedia).slice(0, 10);
    const [activeIndex, setActiveIndex] = useState(0);
    const [galleryIndex, setGalleryIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (isHovered || featuredProjects.length === 0) return;

        const interval = setInterval(() => {
            setGalleryIndex((prevGalleryIdx) => {
                const activeProject = featuredProjects[activeIndex];
                const galleryItems = activeProject.gallery || [];
                const totalItems = galleryItems.length > 0 ? galleryItems.length : 1;

                if (prevGalleryIdx + 1 >= totalItems) {
                    setActiveIndex((prevActiveIdx) => (prevActiveIdx + 1) % featuredProjects.length);
                    return 0;
                } else {
                    return prevGalleryIdx + 1;
                }
            });
        }, 3000);

        return () => clearInterval(interval);
    }, [isHovered, featuredProjects.length, activeIndex]);

    if (featuredProjects.length === 0) return null;

    const activeProject = featuredProjects[activeIndex];
    const galleryItems = activeProject.gallery || [];
    const validGalleryItems = galleryItems.length > 0 ? galleryItems : [activeProject.heroMedia];

    // Ensure galleryIndex is bounded
    const safeGalleryIndex = galleryIndex >= validGalleryItems.length ? 0 : galleryIndex;
    const showcaseMedia = validGalleryItems[safeGalleryIndex];
    if (!showcaseMedia) return null;

    const parsedUrl = getMediaUrl(showcaseMedia.url);
    const parsedMp4 = getMediaUrl(showcaseMedia.videoMp4);

    const mediaUrl = showcaseMedia.type === 'video' ? parsedMp4 : parsedUrl;
    const isVideo = showcaseMedia.type === 'video';

    return (
        <section className="py-24 md:py-32 px-6 md:px-12 bg-background border-t border-foreground/10 relative overflow-hidden">
            <div className="container mx-auto max-w-7xl relative z-10 flex flex-col md:flex-row items-center gap-12">

                {/* Left: Ticker/Brand List */}
                <div
                    className="w-full md:w-1/3 flex flex-col items-start gap-6 border-l border-foreground/10 pl-6 h-full justify-center mt-12 md:mt-0"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <h2 className="text-xs tracking-widest uppercase opacity-50 font-sans mb-4">Showcase Reel</h2>

                    <div className="flex flex-col gap-4 w-full">
                        {featuredProjects.map((project, idx) => (
                            <div
                                key={project.slug}
                                className={`group cursor-pointer py-2 w-full transition-all duration-300 ${activeIndex === idx ? 'opacity-100 pl-4 border-l-2 border-foreground' : 'opacity-40 hover:opacity-70'}`}
                                onMouseEnter={() => {
                                    setActiveIndex(idx);
                                    setGalleryIndex(0);
                                }}
                            >
                                <h3 className="text-2xl md:text-3xl font-display font-bold truncate">
                                    {project.brand}
                                </h3>
                                {/* Small metadata line active state */}
                                <AnimatePresence>
                                    {activeIndex === idx && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden mt-1"
                                        >
                                            <p className="text-xs uppercase tracking-widest opacity-60">
                                                {project.disciplines.join(', ')}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Media Preview */}
                <div
                    className="w-full md:w-2/3 relative rounded-xl overflow-hidden cursor-pointer max-w-full"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <Link href={`/work/${activeProject.slug}`} className="block w-full h-full relative group">
                        <motion.div layout className="grid w-full relative min-h-[300px] md:min-h-[500px] bg-foreground/5 rounded-xl">
                            <AnimatePresence>
                                <motion.div
                                    key={`${activeProject.slug}-${safeGalleryIndex}`}
                                    initial={{ opacity: 0, scale: 1.02 }}
                                    animate={{ opacity: 1, scale: 1, gridColumn: 1, gridRow: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                    className="w-full h-full flex flex-col items-center justify-center p-4 md:p-8 relative"
                                    style={{ gridArea: '1 / 1 / 2 / 2' }}
                                >
                                    {isVideo ? (
                                        <div className="relative flex justify-center w-full">
                                            <video
                                                src={mediaUrl}
                                                poster={parsedUrl}
                                                autoPlay
                                                loop
                                                muted
                                                playsInline
                                                className="w-full h-auto max-h-[75vh] object-contain shadow-2xl rounded-sm"
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-background/20 backdrop-blur-sm z-20">
                                                <div className="w-16 h-16 rounded-full bg-foreground text-background flex items-center justify-center pl-1 shadow-2xl">
                                                    <Play fill="currentColor" size={24} />
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="relative w-full h-full max-h-[75vh] flex items-center justify-center">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={mediaUrl || ''}
                                                alt={activeProject.brand}
                                                className="w-full h-auto max-h-[75vh] object-contain shadow-sm rounded-sm max-w-full block mx-auto my-auto"
                                            />
                                        </div>
                                    )}

                                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8 z-10">
                                        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                            <p className="text-lg font-bold font-display">{activeProject.title}</p>
                                            <p className="text-xs uppercase tracking-widest font-sans text-background bg-foreground px-3 py-1 mt-2 inline-block rounded-full">View Case Study</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </motion.div>
                    </Link>
                </div>

            </div>
        </section>
    );
}
