"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown } from "lucide-react";

export default function About() {
    const skills = [
        "Creative Direction",
        "Concept Development",
        "AI Visual & Video Production",
        "Key Visual Architecture",
        "Visual Storytelling",
        "Digital Campaign Systems"
    ];

    const experience = [
        {
            company: "Magic Mango",
            role: "Art Director",
            period: "Sep 2024 – Present",
            description: "Leading creative teams to conceptualize and execute high-impact campaigns. Specializing in integrating AI visual workflows into traditional art direction pipelines for rapid, scalable, and premium quality outputs."
        },
        {
            company: "Hype Invention",
            role: "Junior Art Director",
            period: "Nov 2023 – Aug 2024",
            description: "Bridged the gap between strategy and visual identity. Spearheaded digital-first campaigns and motion graphics for regional clientele, establishing strict aesthetic baselines."
        },
        {
            company: "MullenLowe Sri Lanka",
            role: "Graphic Designer",
            period: "Aug 2021 – Jul 2023",
            description: "Executed high-volume social and digital assets for top-tier national brands. Honed skills in typographic hierarchy, key visual adaptation, and brand-compliant visual storytelling."
        }
    ];

    return (
        <div className="min-h-screen pt-32 pb-24">
            <div className="container mx-auto px-6 md:px-12">

                {/* Hero */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-4xl mb-24"
                >
                    <h1 className="text-5xl md:text-8xl font-display font-bold tracking-tight mb-12 leading-[0.9]">
                        Driven by storytelling. <br />
                        <span className="text-foreground/50 italic mr-8">Defined</span>
                        by execution.
                    </h1>

                    <div className="text-xl md:text-3xl leading-relaxed text-foreground/80 space-y-8 font-medium">
                        <p>
                            I’m an Art Director shaping brand narratives through considered design, cinematic visuals, and evolving creative tools.
                        </p>
                        <p>
                            Across 7+ years in agency environments, I’ve learned to balance bold ideas with rigorous execution, building visual systems that endure beyond a single campaign.
                        </p>
                    </div>
                </motion.div>

                {/* Portrait */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="relative aspect-[4/5] md:aspect-[21/9] w-full mb-32 overflow-hidden rounded-xl bg-foreground/5"
                >
                    <Image
                        src="/media/about/about-hero.jpg"
                        alt="Roshan Mariadas Profile"
                        fill
                        className="object-cover"
                        priority
                    />
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

                    {/* Left Column */}
                    <div className="lg:col-span-5 space-y-24">

                        {/* Skills */}
                        <div>
                            <h2 className="text-sm font-sans tracking-widest uppercase border-b border-foreground/20 pb-4 mb-8 text-foreground/50">
                                Core Capabilities
                            </h2>
                            <div className="flex flex-wrap gap-3">
                                {skills.map(skill => (
                                    <span key={skill} className="px-4 py-2 border border-foreground/20 rounded-full text-xs uppercase tracking-widest font-medium text-foreground hover:bg-foreground hover:text-background transition-colors cursor-default">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Experience */}
                    <div className="lg:col-span-6 lg:col-start-7">
                        <h2 className="text-sm font-sans tracking-widest uppercase border-b border-foreground/20 pb-4 mb-12 text-foreground/50">
                            Experience
                        </h2>

                        <div className="space-y-16">
                            {experience.map((job, i) => (
                                <div key={i} className="relative group">
                                    <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4 gap-2">
                                        <h3 className="text-2xl md:text-3xl font-bold tracking-tight font-display">{job.role}</h3>
                                        <span className="text-xs tracking-widest uppercase opacity-50 shrink-0">{job.period}</span>
                                    </div>
                                    <h4 className="text-lg font-medium text-foreground/70 mb-4">{job.company}</h4>
                                    <p className="text-foreground/80 leading-relaxed max-w-lg">
                                        {job.description}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-32">
                            <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                                <ArrowDown size={32} strokeWidth={1} className="text-foreground/30 mb-8" />
                            </motion.div>
                            <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-8">
                                Ready to talk?
                            </h2>
                            <Link
                                href="/contact"
                                className="inline-block border border-foreground rounded-full px-8 py-4 text-sm uppercase tracking-widest font-bold hover:bg-foreground hover:text-background transition-colors duration-300"
                            >
                                Start a conversation
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
