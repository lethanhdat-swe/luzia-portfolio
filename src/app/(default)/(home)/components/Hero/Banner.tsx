"use client";

import { images } from "@/assets/images";
import { getSheetContent } from "@/lib/getSheetContent";
import { convertDriveLinkToDirect } from "@/lib/upload";
import Image from "next/image";
import { useEffect, useState } from "react";

function Banner() {
    const [scrollY, setScrollY] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [thumbnail, setThumbnail] = useState("");

    useEffect(() => {
        // Trigger animation khi component mount
        setIsLoaded(true);

        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const http = async () => {
            const content = await getSheetContent("Home");
            if (content?.hero_avatar) {
                // Thực hiện convert ngay tại đây
                const directLink = convertDriveLinkToDirect(
                    content.hero_avatar,
                );
                setThumbnail(directLink as string);
            }
        };

        http();
    }, []);

    // Tính toán transform dựa trên scroll (rất nhẹ)
    const scale = 1 + scrollY * 0.00005; // Zoom in cực nhẹ
    const translateY = scrollY * 0.2; // Parallax rất nhẹ
    const opacity = 1 - scrollY * 0.0005; // Fade out chậm

    return (
        <div className="static h-[50vh] w-full sm:h-[80vh] xl:absolute xl:bottom-0 xl:left-1/2 xl:h-[90vh] xl:-translate-x-1/2">
            <div
                className="relative h-full w-full"
                style={{
                    transform: `translateY(${translateY}px) scale(${scale * (isLoaded ? 1 : 0.8)})`,
                    transformOrigin: "center bottom",
                    opacity: isLoaded ? Math.max(opacity, 0) : 0,
                    transition: isLoaded
                        ? "transform 1s ease-out"
                        : "transform 1s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 1s ease-out",
                }}
            >
                <div className="absolute bottom-0 h-full w-full">
                    {thumbnail && (
                        <Image
                            src={thumbnail}
                            alt="Le Thanh Dat"
                            fill
                            priority
                            className="object-contain object-top"
                            sizes="(max-width: 768px) 100vw, 672px"
                        />
                    )}

                    {/* Natural blur with decreasing intensity */}
                    <div
                        className="pointer-events-none absolute right-0 bottom-0 left-0"
                        style={{
                            height: "40%",
                            background:
                                "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.05) 15%, rgba(255,255,255,0.15) 30%, rgba(255,255,255,0.35) 45%, rgba(255,255,255,0.6) 60%, rgba(255,255,255,0.85) 75%, rgba(255,255,255,0.95) 85%, #ffffff 100%)",
                            backdropFilter: "blur(12px)",
                            WebkitBackdropFilter: "blur(12px)",
                            maskImage:
                                "linear-gradient(to top, black 0%, black 40%, transparent 100%)",
                            WebkitMaskImage:
                                "linear-gradient(to top, black 0%, black 40%, transparent 100%)",
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default Banner;
