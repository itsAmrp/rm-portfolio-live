"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { nav, siteMeta } from "@/data/portfolio";
import { Moon, Sun } from "lucide-react";

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [isDark, setIsDark] = useState(true);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);

        // Initial theme check
        if (document.documentElement.classList.contains("light")) {
            setIsDark(false);
        }

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

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-500 bg-background/50 backdrop-blur-md border-b border-foreground/5 ${scrolled ? "py-4 shadow-sm" : "py-6"
                }`}
        >
            <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
                <Link
                    href="/"
                    className="text-xl font-display font-bold tracking-tight hover:opacity-70 transition-opacity"
                >
                    {siteMeta.name}
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
