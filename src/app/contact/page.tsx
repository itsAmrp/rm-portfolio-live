"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteMeta, socialLinks } from "@/data/portfolio";
import HCaptcha from "@hcaptcha/react-hcaptcha";

export default function Contact() {
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [token, setToken] = useState<string | null>(null);
    const captchaRef = useRef<HCaptcha>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!token) {
            alert("Please complete the captcha.");
            return;
        }

        setStatus("submitting");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, message, hcaptchaToken: token }),
            });

            if (!res.ok) throw new Error("Failed to send message");

            setStatus("success");
            setName("");
            setEmail("");
            setMessage("");
            setToken(null);
            captchaRef.current?.resetCaptcha();
        } catch (error) {
            console.error("Submission error:", error);
            setStatus("error");
        }
    };

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
                            <AnimatePresence mode="wait">
                                {status === "success" ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="h-full flex flex-col items-center justify-center py-16 text-center space-y-6"
                                    >
                                        <div className="w-16 h-16 bg-foreground/10 text-foreground rounded-full flex items-center justify-center mb-4">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                        </div>
                                        <h3 className="text-3xl font-display font-bold tracking-tight">Message Sent</h3>
                                        <p className="text-foreground/70">Thanks for reaching out. I&apos;ll get back to you soon.</p>
                                        <button
                                            onClick={() => setStatus("idle")}
                                            className="mt-8 px-8 py-3 rounded-full border border-foreground/20 text-xs tracking-widest uppercase font-bold hover:bg-foreground/5 transition-colors"
                                        >
                                            Send another
                                        </button>
                                    </motion.div>
                                ) : (
                                    <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8" onSubmit={handleSubmit}>
                                        <div className="space-y-2">
                                            <label htmlFor="name" className="text-sm font-sans tracking-widest uppercase opacity-70">Name</label>
                                            <input
                                                type="text"
                                                id="name"
                                                required
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                disabled={status === "submitting"}
                                                className="w-full bg-transparent border-b border-foreground/30 py-4 focus:outline-none focus:border-foreground transition-colors font-medium text-lg placeholder:text-foreground/30 disabled:opacity-50"
                                                placeholder="John Doe"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="email" className="text-sm font-sans tracking-widest uppercase opacity-70">Email</label>
                                            <input
                                                type="email"
                                                id="email"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                disabled={status === "submitting"}
                                                className="w-full bg-transparent border-b border-foreground/30 py-4 focus:outline-none focus:border-foreground transition-colors font-medium text-lg placeholder:text-foreground/30 disabled:opacity-50"
                                                placeholder="john@example.com"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="message" className="text-sm font-sans tracking-widest uppercase opacity-70">Message</label>
                                            <textarea
                                                id="message"
                                                required
                                                rows={4}
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                                disabled={status === "submitting"}
                                                className="w-full bg-transparent border-b border-foreground/30 py-4 focus:outline-none focus:border-foreground transition-colors font-medium text-lg placeholder:text-foreground/30 resize-none disabled:opacity-50"
                                                placeholder="Tell me about your project..."
                                            />
                                        </div>

                                        <div className="pt-4">
                                            <HCaptcha
                                                sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY || "10000000-ffff-ffff-ffff-000000000001"}
                                                onVerify={(token) => setToken(token)}
                                                ref={captchaRef}
                                                theme="dark"
                                            />
                                        </div>

                                        {status === "error" && (
                                            <p className="text-red-500 text-sm">Failed to send message. Please try again.</p>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={status === "submitting" || !token}
                                            className="w-full bg-foreground text-background py-5 rounded-full uppercase tracking-widest text-sm font-bold hover:opacity-90 transition-opacity mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {status === "submitting" ? "Sending..." : "Submit Inquiry"}
                                        </button>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
