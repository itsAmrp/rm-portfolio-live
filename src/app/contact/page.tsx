"use client";

import { motion } from "framer-motion";
import { siteMeta, socialLinks } from "@/data/portfolio";

export default function Contact() {
    return (
        <div className="min-h-screen pt-32 pb-24">
            <div className="container mx-auto px-6 md:px-12">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-5xl mb-24"
                >
                    <h1 className="text-5xl md:text-8xl lg:text-[8vw] font-display font-bold tracking-tight uppercase leading-[0.9] mb-8">
                        Let&apos;s build <br />
                        <span className="text-foreground/50 italic mr-8">something</span>
                        bold.
                    </h1>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

                    {/* Left Info Column */}
                    <div className="lg:col-span-5 space-y-16">

                        <div>
                            <h2 className="text-sm font-sans tracking-widest uppercase opacity-50 mb-6">Current Location</h2>
                            <p className="text-2xl md:text-3xl font-display font-medium">
                                {siteMeta.location}
                            </p>
                            <p className="text-foreground/60 mt-2">Available for remote & freelance work worldwide.</p>
                        </div>

                        <div>
                            <h2 className="text-sm font-sans tracking-widest uppercase opacity-50 mb-6">Direct Inquiries</h2>
                            <div className="flex flex-col gap-2">
                                <a
                                    href={`mailto:${siteMeta.email}`}
                                    className="text-2xl md:text-3xl font-display font-medium hover:opacity-70 transition-opacity"
                                >
                                    {siteMeta.email}
                                </a>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-sm font-sans tracking-widest uppercase opacity-50 mb-6">Socials</h2>
                            <ul className="flex flex-col gap-4">
                                {socialLinks.map((link) => (
                                    <li key={link.label}>
                                        <a
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xl md:text-2xl font-display font-medium uppercase tracking-wide hover:opacity-70 transition-opacity flex items-center gap-4 group"
                                        >
                                            <span className="w-8 h-[1px] bg-foreground/30 group-hover:w-16 group-hover:bg-foreground transition-all duration-300" />
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Right Form Column */}
                    <div className="lg:col-span-6 lg:col-start-7">
                        <div className="bg-foreground/5 p-8 md:p-12 rounded-2xl">
                            <h2 className="text-3xl font-display font-bold tracking-tight mb-8">Send a message</h2>
                            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-sans tracking-widest uppercase opacity-70">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        required
                                        className="w-full bg-transparent border-b border-foreground/30 py-4 focus:outline-none focus:border-foreground transition-colors font-medium text-lg placeholder:text-foreground/30"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-sans tracking-widest uppercase opacity-70">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        required
                                        className="w-full bg-transparent border-b border-foreground/30 py-4 focus:outline-none focus:border-foreground transition-colors font-medium text-lg placeholder:text-foreground/30"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-sans tracking-widest uppercase opacity-70">Message</label>
                                    <textarea
                                        id="message"
                                        required
                                        rows={4}
                                        className="w-full bg-transparent border-b border-foreground/30 py-4 focus:outline-none focus:border-foreground transition-colors font-medium text-lg placeholder:text-foreground/30 resize-none"
                                        placeholder="Tell me about your project..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-foreground text-background py-5 rounded-full uppercase tracking-widest text-sm font-bold hover:opacity-90 transition-opacity mt-8"
                                >
                                    Submit Inquiry
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
