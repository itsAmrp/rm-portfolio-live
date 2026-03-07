"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

type CursorState = "default" | "link" | "image" | "video";

export const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [state, setState] = useState<CursorState>("default");
    const [hidden, setHidden] = useState(true);
    const pathname = usePathname();

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        if (mediaQuery.matches) return;

        const handleMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
            if (hidden) setHidden(false);

            // Re-evaluate target on movement just in case
            const target = e.target as HTMLElement | null;
            if (target) {
                const cursorTarget = target.closest('[data-cursor]');
                const linkTarget = target.closest('a, button, [role="button"]');

                if (cursorTarget) {
                    const cursorType = cursorTarget.getAttribute('data-cursor') as CursorState;
                    if (["image", "video"].includes(cursorType) && state !== cursorType) {
                        setState(cursorType);
                    }
                    return;
                }

                if (linkTarget) {
                    if (state !== "link") setState("link");
                    return;
                }

                if (state !== "default") setState("default");
            }
        };

        const handleMouseLeave = () => setHidden(true);
        const handleMouseEnter = () => setHidden(false);

        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseleave", handleMouseLeave);
        document.addEventListener("mouseenter", handleMouseEnter);

        // reset state on navigation
        setState("default");

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseleave", handleMouseLeave);
            document.removeEventListener("mouseenter", handleMouseEnter);
        };
    }, [hidden, pathname, state]);

    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return null;
    }

    const variants = {
        default: { width: 14, height: 14 },
        link: { width: 36, height: 36 },
        image: { width: 72, height: 36 },
        video: { width: 72, height: 36 }
    };

    const textVariants = {
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.8 }
    };

    return (
        <motion.div
            className={`pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center -translate-x-1/2 -translate-y-1/2 hidden md:flex transition-colors duration-300 ${(state === "image" || state === "video")
                    ? "bg-background/80 backdrop-blur-md border border-foreground/10 shadow-lg"
                    : state === "link"
                        ? "bg-transparent border border-foreground/30"
                        : "bg-transparent border border-foreground/40"
                }`}
            animate={{
                x: position.x,
                y: position.y,
                width: variants[state].width,
                height: variants[state].height,
                borderRadius: state === "default" || state === "link" ? "50%" : "20px",
                opacity: hidden ? 0 : 1,
            }}
            transition={{
                type: "spring",
                stiffness: 800,
                damping: 40,
                mass: 0.5,
            }}
            style={{
                transformOrigin: "center center",
            }}
        >
            <AnimatePresence mode="wait">
                {state === "image" && (
                    <motion.span
                        key="view"
                        variants={textVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.15 }}
                        className="text-[10px] uppercase tracking-widest font-medium text-foreground whitespace-nowrap"
                    >
                        View
                    </motion.span>
                )}
                {state === "video" && (
                    <motion.span
                        key="play"
                        variants={textVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.15 }}
                        className="text-[10px] uppercase tracking-widest font-medium text-foreground flex items-center gap-1.5 whitespace-nowrap"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-foreground" /> Play
                    </motion.span>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {state === "default" && (
                    <motion.div
                        key="dot"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        className="w-1.5 h-1.5 rounded-full bg-foreground"
                    />
                )}
            </AnimatePresence>
        </motion.div>
    );
};
