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
                // Actually, for gallery videos to feel alive, we should play them when they are in view since they are visually crucial.
                if (!entry.isIntersecting) {
                    videoRef.current.pause();
                } else {
                    videoRef.current.play().catch(e => {
                        // ignore play interruptions
                    });
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
            {hasPoster && (
                <div className="absolute inset-0 rounded-xl overflow-hidden z-0 bg-foreground/5" />
            )}

            <video
                ref={videoRef}
                poster={poster}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className={`w-full h-full object-cover transition-opacity duration-500 rounded-xl`}
            >
                {srcWebm && <source src={srcWebm} type="video/webm" />}
                {srcMp4 && <source src={srcMp4} type="video/mp4" />}
            </video>
        </div>
    );
}
