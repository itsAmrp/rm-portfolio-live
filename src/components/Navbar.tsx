"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import Image from "next/image";
import { nav, siteMeta, getMediaUrl } from "@/data/portfolio";
import { Moon, Sun } from "lucide-react";

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    // Initialize isDark based on the document's class list, defaulting to true (dark) if not present or during SSR.
    const [isDark, setIsDark] = useState(() => {
        if (typeof window !== 'undefined') {
            return !document.documentElement.classList.contains("light");
        }
        return true; // Default to dark on server or if window is not available
    });
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        // Check scroll position immediately on mount
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleTheme = () => {
        if (document.documentElement.classList.contains("light")) {
            document.documentElement.classList.remove("light");
            document.documentElement.classList.add("dark");
            setIsDark(true);
        } else {
            document.documentElement.classList.remove("dark");
            document.documentElement.classList.add("light");
            setIsDark(false);
        }
    };

    let mouseX = useMotionValue(-1000);
    let mouseY = useMotionValue(-1000);

    const handleMouseMove = ({ currentTarget, clientX, clientY }: React.MouseEvent) => {
        let { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    };

    const handleMouseLeave = () => {
        mouseX.set(-1000);
        mouseY.set(-1000);
    };

    return (
        <nav
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`fixed top-0 w-full z-50 transition-all duration-500 overflow-hidden group ${scrolled
                ? "py-4 bg-background/60 backdrop-blur-2xl saturate-200 border-b border-foreground/10 shadow-sm"
                : "py-6 bg-transparent"
                }`}
        >
            {/* Protective underlying gradient to ensure text readability in light mode vs hero images */}
            <div className={`absolute inset-0 z-0 bg-gradient-to-b from-background/80 via-background/20 to-transparent transition-opacity duration-500 ${scrolled ? 'opacity-0' : 'opacity-100'}`} pointer-events-none />

            {/* Apple-style top-edge highlight for surface depth (only visible when scrolled) */}
            <div className={`absolute top-0 left-0 right-0 h-[1px] bg-white/20 z-0 transition-opacity duration-500 ${scrolled ? 'opacity-100' : 'opacity-0'} pointer-events-none`} />

            {/* Subtle cursor tracking radial gradient */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xs opacity-0 transition duration-300 group-hover:opacity-100 mix-blend-screen z-0"
                style={{
                    opacity: mouseX.get() !== -1000 ? 1 : 0,
                    background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)'},
              transparent 80%
            )
          `,
                }}
            />
            <div className="container mx-auto px-6 md:px-12 flex justify-between items-center relative z-10 w-full">
                <Link
                    href="/"
                    className="relative z-50 block opacity-100"
                >
                    <Image
                        src={getMediaUrl("/media/site-assets/logo.png") || ""}
                        alt={`${siteMeta.name} Logo`}
                        width={180}
                        height={48}
                        className={`object-contain h-[28px] md:h-[36px] w-auto transition-none ${isDark ? 'brightness-0 invert drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]' : 'brightness-0 drop-shadow-[0_2px_8px_rgba(255,255,255,0.6)]'}`}
                        priority
                        unoptimized
                        style={{ display: 'block', opacity: 1, mixBlendMode: 'normal' }}
                    />
                </Link>
                <div className="flex items-center gap-6 md:gap-8">
                    {nav.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className={`text-xs md:text-sm uppercase tracking-widest font-medium transition-colors hover:text-accent ${pathname === link.href ? "text-accent" : "text-foreground/80"
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <button
                        onClick={toggleTheme}
                        className="ml-2 p-2 rounded-full hover:bg-foreground/5 transition-colors"
                        aria-label="Toggle theme"
                    >
                        {isDark ? <Sun size={18} /> : <Moon size={18} />}
                    </button>
                </div>
            </div>
        </nav>
    );
}
