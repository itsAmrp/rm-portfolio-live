"use client";

import { useEffect, useRef } from "react";
import { Play } from "lucide-react";
import Image from "next/image";

interface LazyVideoProps {
    srcMp4?: string;
    srcWebm?: string;
    poster?: string;
    alt: string;
}

export function LazyVideo({ srcMp4, srcWebm, poster, alt }: LazyVideoProps) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!videoRef.current) return;

                // Pause when out of view, optionally play when in view (but requirements said "only autoplay in lightbox to save performance")
                // So we will just ensure it's loaded but paused.
                if (!entry.isIntersecting) {
                    videoRef.current.pause();
                }
            },
            { threshold: 0.1 }
        );

        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // If no poster, we create a fallback UI
    const hasPoster = !!poster;

    return (
        <div className="relative w-full h-full min-h-[200px] bg-foreground/10 flex items-center justify-center overflow-hidden rounded-xl">
            {hasPoster ? (
                <video
                    ref={videoRef}
                    poster={poster}
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                >
                    {srcWebm && <source src={srcWebm} type="video/webm" />}
                    {srcMp4 && <source src={srcMp4} type="video/mp4" />}
                </video>
            ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-foreground/20 flex flex-col items-center justify-center group-hover:from-foreground/10 group-hover:to-foreground/30 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-background/50 backdrop-blur flex items-center justify-center text-foreground shadow-lg">
                        <Play size={20} className="ml-1" />
                    </div>
                </div>
            )}

            {!hasPoster && (
                <video
                    ref={videoRef}
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-0"
                >
                    {srcWebm && <source src={srcWebm} type="video/webm" />}
                    {srcMp4 && <source src={srcMp4} type="video/mp4" />}
                </video>
            )}
        </div>
    );
}
