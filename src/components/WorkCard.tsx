"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Project } from "@/data/portfolio";
import { getMediaUrl } from "@/data/portfolio";
import { VideoPlayer } from "./VideoPlayer";

interface WorkCardProps {
    project: Project;
    className?: string;
    priority?: boolean;
}

export function WorkCard({ project, className, priority = false }: WorkCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={cn("group block w-full relative transition-all duration-300 ease-out md:hover:-translate-y-1 md:hover:shadow-2xl rounded-xl", className)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link href={`/work/${project.slug}`} className="block w-full overflow-hidden bg-foreground/5 rounded-xl cursor-none">
                <div className="relative aspect-[4/5] md:aspect-[16/9] lg:aspect-[4/3] overflow-hidden rounded-xl">
                    {project.heroMedia.type === "video" ? (
                        <div className="w-full h-full scale-[1.01] transition-transform duration-300 ease-out md:group-hover:scale-105">
                            <VideoPlayer
                                srcMp4={getMediaUrl(project.heroMedia.videoMp4)}
                                srcWebm={getMediaUrl(project.heroMedia.videoWebm)}
                                poster={getMediaUrl(project.heroMedia.url)}
                                alt={project.brand}
                            />
                        </div>
                    ) : (
                        <Image
                            src={getMediaUrl(project.heroMedia.url) || ""}
                            alt={project.title}
                            fill
                            priority={priority}
                            className="object-cover transition-transform duration-300 ease-out md:group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    )}

                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

                    <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between text-white opacity-0 md:group-hover:opacity-100 transition-all duration-300 z-20 pointer-events-none">
                        <div className="flex justify-between items-start translate-y-2 md:group-hover:translate-y-0 transition-transform duration-300 ease-out">
                            <span className="text-xs md:text-sm font-medium tracking-widest uppercase bg-white/10 backdrop-blur-md px-3 py-1 rounded-full">{project.brand}</span>
                            <span className="text-xs md:text-sm font-medium tracking-widest">{project.year}</span>
                        </div>

                        <div className="translate-y-4 md:group-hover:translate-y-0 text-white/90 md:group-hover:text-white transition-all duration-300 ease-out">
                            <h3 className="text-2xl md:text-3xl font-display font-bold tracking-tight mb-2 opacity-80 md:group-hover:opacity-100 transition-opacity duration-300">{project.title}</h3>
                            <p className="text-xs md:text-sm tracking-widest uppercase opacity-80">{project.disciplines.slice(0, 3).join(" • ")}</p>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
