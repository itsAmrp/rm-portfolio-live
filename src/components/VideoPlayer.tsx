"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import Image from "next/image";

interface VideoPlayerProps {
    srcMp4?: string;
    srcWebm?: string;
    poster?: string;
    alt?: string;
    autoPlay?: boolean;
    loop?: boolean;
    muted?: boolean;
    className?: string;
}

export const VideoPlayer = ({
    srcMp4,
    srcWebm,
    poster,
    alt = "Video",
    autoPlay = true,
    loop = true,
    muted = true,
    className = "",
}: VideoPlayerProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    const [isPlaying, setIsPlaying] = useState(autoPlay);
    const [isMuted, setIsMuted] = useState(muted);
    const [showControls, setShowControls] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [isIntersecting, setIsIntersecting] = useState(false);

    // Intersection Observer for performance
    useEffect(() => {
        if (!containerRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                setIsIntersecting(entry.isIntersecting);

                if (videoRef.current && autoPlay) {
                    if (entry.isIntersecting) {
                        // Only play if it's supposed to be playing
                        if (isPlaying) {
                            const playPromise = videoRef.current.play();
                            if (playPromise !== undefined) {
                                playPromise.catch(() => {
                                    // Auto-play was prevented
                                    setIsPlaying(false);
                                });
                            }
                        }
                    } else {
                        videoRef.current.pause();
                    }
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(containerRef.current);

        return () => {
            observer.disconnect();
        };
    }, [autoPlay, isPlaying]);

    const togglePlay = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!videoRef.current) return;

        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const toggleMute = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!videoRef.current) return;

        videoRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
    };

    // Check if we have any video source
    const hasVideoSource = srcMp4 || srcWebm;

    if (hasError || !hasVideoSource) {
        if (poster) {
            return (
                <div className={`relative w-full h-full overflow-hidden bg-muted/20 ${className}`}>
                    <Image
                        src={poster}
                        alt={alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
            );
        }
        return <div className={`w-full h-full bg-muted/20 flex items-center justify-center ${className}`}>Media Unavailable</div>;
    }

    return (
        <div
            ref={containerRef}
            className={`relative w-full h-full overflow-hidden group bg-muted/20 ${className}`}
        >
            <video
                ref={videoRef}
                className="w-full h-full object-cover pointer-events-none"
                poster={poster}
                autoPlay={autoPlay && isIntersecting}
                loop={loop}
                muted={muted}
                playsInline
                preload="metadata"
                onError={() => setHasError(true)}
            >
                {srcWebm && <source src={srcWebm} type="video/webm" />}
                {srcMp4 && <source src={srcMp4} type="video/mp4" />}
                Your browser does not support the video tag.
            </video>
        </div>
    );
};
