"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/portfolio";
import { getMediaUrl, getProjectThumbnail } from "@/data/portfolio";
import { VideoPlayer } from "@/components/VideoPlayer";
import { MasonryGallery } from "@/components/MasonryGallery";

interface CaseStudyClientProps {
    project: Project;
    nextProject: Project | null;
    prevProject: Project | null;
    relatedProjects: Project[];
}

export function CaseStudyClient({ project, nextProject, prevProject, relatedProjects }: CaseStudyClientProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Parallax for hero
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    // Sticky nav active state
    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll("section[id]");
            const navLinks = document.querySelectorAll(".sticky-nav a");

            let current = "";
            sections.forEach(section => {
                const sectionTop = (section as HTMLElement).offsetTop;
                if (window.scrollY >= sectionTop - 200) {
                    current = section.getAttribute("id") || "";
                }
            });

            navLinks.forEach(link => {
                link.classList.remove("text-foreground", "font-bold");
                link.classList.add("text-foreground/40");
                if (link.getAttribute("href")?.includes(current) && current !== "") {
                    link.classList.remove("text-foreground/40");
                    link.classList.add("text-foreground", "font-bold");
                }
            });
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const staggerContainer: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const staggerItem: Variants = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    return (
        <article className="min-h-screen pb-20" ref={containerRef}>
            {/* 1. Hero Media */}
            <div className="relative h-screen w-full overflow-hidden">
                <motion.div style={{ y }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
                    {project.heroMedia.type === "video" ? (
                        <VideoPlayer
                            srcMp4={getMediaUrl(project.heroMedia.videoMp4)}
                            srcWebm={getMediaUrl(project.heroMedia.videoWebm)}
                            poster={getProjectThumbnail(project)}
                            alt={project.title}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <Image
                            src={getMediaUrl(project.heroMedia.url) || ""}
                            alt={project.title}
                            fill
                            priority
                            className="object-cover"
                            sizes="100vw"
                        />
                    )}
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

                <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-12 pb-24 container mx-auto">
                    <Link
                        href="/work"
                        className="inline-flex items-center gap-2 text-sm uppercase tracking-widest font-medium hover:opacity-70 transition-opacity mb-12 w-fit"
                    >
                        <ArrowLeft size={16} /> Archive
                    </Link>

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="show"
                    >
                        <motion.div variants={staggerItem} className="mb-4">
                            <span className="px-4 py-1.5 border border-foreground/30 rounded-full text-xs uppercase tracking-widest bg-background/50 backdrop-blur-md">
                                {project.brand}
                            </span>
                        </motion.div>
                        <motion.h1
                            variants={staggerItem}
                            className="text-5xl md:text-7xl lg:text-[7vw] font-display font-bold tracking-tight leading-[0.9] max-w-5xl"
                        >
                            {project.title}
                        </motion.h1>
                    </motion.div>
                </div>
            </div>

            <div className="container mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-16 relative mt-16">

                {/* Sticky Mini Nav (Desktop) */}
                <div className="hidden lg:block w-48 shrink-0">
                    <div className="sticky top-32 flex flex-col gap-4 text-sm font-medium tracking-widest uppercase sticky-nav">
                        <a href="#overview" className="text-foreground/40 hover:text-foreground transition-colors">Overview</a>
                        <a href="#gallery" className="text-foreground/40 hover:text-foreground transition-colors">Gallery</a>
                        <a href="#story" className="text-foreground/40 hover:text-foreground transition-colors">Story</a>
                    </div>
                </div>

                <div className="flex-1 w-full max-w-4xl">

                    {/* 2. Meta Row */}
                    <section id="overview" className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24 border-y border-foreground/10 py-12">
                        <div>
                            <h4 className="text-xs tracking-widest uppercase text-foreground/50 mb-3">Year</h4>
                            <p className="font-medium text-sm md:text-base">{project.year}</p>
                        </div>
                        <div>
                            <h4 className="text-xs tracking-widest uppercase text-foreground/50 mb-3">Region</h4>
                            <p className="font-medium text-sm md:text-base">{project.region}</p>
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <h4 className="text-xs tracking-widest uppercase text-foreground/50 mb-3">Disciplines</h4>
                            <ul className="space-y-1">
                                {project.disciplines.map(d => <li key={d} className="font-medium text-sm md:text-base">{d}</li>)}
                            </ul>
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <h4 className="text-xs tracking-widest uppercase text-foreground/50 mb-3">Tools</h4>
                            <ul className="space-y-1 text-sm md:text-base opacity-80">
                                {project.tools.map(t => <li key={t}>{t}</li>)}
                            </ul>
                        </div>
                    </section>

                    {/* 3. Short Intro */}
                    <div className="mb-24">
                        <p className="text-2xl md:text-4xl font-display leading-[1.3] tracking-tight">
                            {project.shortDescription}
                        </p>
                        <p className="mt-8 text-foreground/70 text-lg">
                            <strong className="text-foreground font-semibold">Role:</strong> {project.roleSummary}
                        </p>
                    </div>

                    {/* 10. Gallery */}
                    <section id="gallery" className="mb-32">
                        {(!project.gallery || project.gallery.length === 0) ? (
                            <div className="py-24 text-center border border-foreground/10 rounded-xl bg-foreground/5">
                                <h3 className="text-xl md:text-2xl font-display font-medium text-foreground/50">Gallery coming soon</h3>
                            </div>
                        ) : (
                            <MasonryGallery items={project.gallery} />
                        )}
                    </section>

                    {/* Structured Content (Story) */}
                    <section id="story" className="space-y-24 mb-32">

                        {/* 4. Challenge */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
                            <div className="md:col-span-4">
                                <h3 className="text-sm tracking-widest uppercase text-foreground/50 border-b border-foreground/10 pb-4">Challenge</h3>
                            </div>
                            <div className="md:col-span-8">
                                <p className="text-xl md:text-2xl leading-relaxed">{project.caseStudySections.challenge}</p>
                            </div>
                        </div>

                        {/* 5. Insight */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
                            <div className="md:col-span-4">
                                <h3 className="text-sm tracking-widest uppercase text-foreground/50 border-b border-foreground/10 pb-4">Insight</h3>
                            </div>
                            <div className="md:col-span-8">
                                <p className="text-xl md:text-2xl leading-relaxed italic font-display opacity-90">&quot;{project.caseStudySections.insight}&quot;</p>
                            </div>
                        </div>

                        {/* 6. Idea */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
                            <div className="md:col-span-4">
                                <h3 className="text-sm tracking-widest uppercase text-foreground/50 border-b border-foreground/10 pb-4">Idea</h3>
                            </div>
                            <div className="md:col-span-8">
                                <p className="text-xl md:text-2xl leading-relaxed font-medium">{project.caseStudySections.idea}</p>
                            </div>
                        </div>

                        {/* 7. Execution */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
                            <div className="md:col-span-4">
                                <h3 className="text-sm tracking-widest uppercase text-foreground/50 border-b border-foreground/10 pb-4">Execution</h3>
                            </div>
                            <div className="md:col-span-8">
                                <p className="text-xl md:text-2xl leading-relaxed text-foreground/80">{project.caseStudySections.execution}</p>
                            </div>
                        </div>

                        {/* 8. Outcome */}
                        {project.caseStudySections.outcome && (
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
                                <div className="md:col-span-4">
                                    <h3 className="text-sm tracking-widest uppercase text-foreground/50 border-b border-foreground/10 pb-4">Outcome</h3>
                                </div>
                                <div className="md:col-span-8">
                                    <p className="text-xl md:text-2xl leading-relaxed text-foreground/80">{project.caseStudySections.outcome}</p>
                                </div>
                            </div>
                        )}

                        {/* 9. Deliverables List */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 pt-12 border-t border-foreground/10">
                            <div className="md:col-span-4">
                                <h3 className="text-sm tracking-widest uppercase text-foreground/50 pb-4">Deliverables</h3>
                            </div>
                            <div className="md:col-span-8">
                                <ul className="grid grid-cols-2 gap-y-4">
                                    {project.deliverables.map(item => (
                                        <li key={item} className="flex items-center gap-2 text-lg">
                                            <span className="w-1.5 h-1.5 rounded-full bg-foreground/30" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                    </section>

                </div>
            </div>

            {/* 11. Related Projects & 12. Nav */}
            <div className="container mx-auto px-6 md:px-12 mt-32 border-t border-foreground/10 pt-24">

                <div className="flex justify-between items-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-display tracking-tight font-bold">More Work</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
                    {relatedProjects.map((p) => (
                        <Link key={p.slug} href={`/work/${p.slug}`} className="group block" data-cursor={p.heroMedia.type === "video" ? "video" : "image"}>
                            <div className="relative aspect-[4/3] w-full overflow-hidden bg-foreground/5 rounded-xl mb-6">
                                <Image
                                    src={getProjectThumbnail(p)}
                                    alt={p.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                            </div>
                            <h3 className="text-xl font-bold tracking-tight mb-2 group-hover:text-foreground/70 transition-colors flex items-center gap-2">
                                {p.title} <ArrowUpRight size={16} className="opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all" />
                            </h3>
                            <p className="text-sm text-foreground/50 tracking-widest uppercase">{p.brand}</p>
                        </Link>
                    ))}
                </div>

                {/* Next / Prev Navigation */}
                <div className="flex flex-col sm:flex-row justify-between pt-12 border-t border-foreground/10 gap-8">
                    {prevProject ? (
                        <Link href={`/work/${prevProject.slug}`} className="group max-w-sm">
                            <span className="text-xs uppercase tracking-widest text-foreground/50 block mb-2 font-medium">Previous Project</span>
                            <p className="text-xl md:text-2xl font-display font-medium group-hover:opacity-70 transition-opacity">
                                &larr; {prevProject.title}
                            </p>
                        </Link>
                    ) : <div />}

                    {nextProject ? (
                        <Link href={`/work/${nextProject.slug}`} className="group max-w-sm sm:text-right">
                            <span className="text-xs uppercase tracking-widest text-foreground/50 block mb-2 font-medium">Next Project</span>
                            <p className="text-xl md:text-2xl font-display font-medium group-hover:opacity-70 transition-opacity">
                                {nextProject.title} &rarr;
                            </p>
                        </Link>
                    ) : <div />}
                </div>
            </div>

        </article>
    );
}
