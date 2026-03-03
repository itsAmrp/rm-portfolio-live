"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [hovered, setHovered] = useState(false);
    const [hidden, setHidden] = useState(true);
    const cursorRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    useEffect(() => {
        // Check if the user prefers reduced motion, if so, disable custom cursor
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        if (mediaQuery.matches) {
            return;
        }

        const handleMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
            if (hidden) setHidden(false);
        };

        const handleMouseLeave = () => setHidden(true);
        const handleMouseEnter = () => setHidden(false);

        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseleave", handleMouseLeave);
        document.addEventListener("mouseenter", handleMouseEnter);

        const handleLinkHover = () => setHovered(true);
        const handleLinkLeave = () => setHovered(false);

        const interactiveElements = document.querySelectorAll(
            "a, button, input, textarea, select, [role='button']"
        );

        interactiveElements.forEach((el) => {
            el.addEventListener("mouseenter", handleLinkHover);
            el.addEventListener("mouseleave", handleLinkLeave);
        });

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseleave", handleMouseLeave);
            document.removeEventListener("mouseenter", handleMouseEnter);

            interactiveElements.forEach((el) => {
                el.removeEventListener("mouseenter", handleLinkHover);
                el.removeEventListener("mouseleave", handleLinkLeave);
            });
        };
    }, [pathname, hidden]);

    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return null;
    }

    return (
        <>
            <motion.div
                className="pointer-events-none fixed left-0 top-0 z-[100] h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground mix-blend-difference hidden md:block"
                animate={{
                    x: position.x,
                    y: position.y,
                    scale: hovered ? 0 : 1,
                    opacity: hidden ? 0 : 1,
                }}
                transition={{
                    type: "spring",
                    stiffness: 1500,
                    damping: 80,
                    mass: 0.1,
                }}
                style={{
                    transformOrigin: "center center",
                }}
            />
            <motion.div
                className="pointer-events-none fixed left-0 top-0 z-[100] h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground mix-blend-difference hidden md:block"
                ref={cursorRef}
                animate={{
                    x: position.x,
                    y: position.y,
                    scale: hovered ? 1.5 : 1,
                    opacity: hidden ? 0 : 0.5,
                    backgroundColor: hovered ? "var(--foreground)" : "transparent",
                }}
                transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 40,
                    mass: 0.5,
                }}
                style={{
                    transformOrigin: "center center",
                }}
            />
        </>
    );
};
