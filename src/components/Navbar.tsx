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
            className={`fixed top-0 w-full z-50 transition-all duration-500 overflow-hidden ${scrolled
                ? "py-4 bg-background/60 backdrop-blur-2xl saturate-150 border-b border-foreground/5 shadow-[inset_0_-1px_0_0_rgba(255,255,255,0.05),0_4px_30px_rgba(0,0,0,0.05)]"
                : "py-6 bg-transparent"
                }`}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100 mix-blend-screen"
                style={{
                    opacity: mouseX.get() !== -1000 ? 1 : 0,
                    background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'},
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
