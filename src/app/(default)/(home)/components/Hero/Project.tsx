"use client";

import ScrollAnimate from "@/components/ScrollAnimate/ScrollAnimate";
import { getSheetContent } from "@/lib/getSheetContent";
import { useEffect, useState } from "react";

export default function Project() {
    const [mounted, setMounted] = useState(false);
    const [content, setContent] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        setMounted(true);

        // fetch content từ Sheet
        async function fetchContent() {
            const data = await getSheetContent("Home");

            setContent(data);
        }

        fetchContent();
    }, []);

    if (!mounted) return null; // Tránh SSR mismatch

    return (
        <div className="relative z-10 xl:absolute xl:bottom-20 xl:left-12">
            {/* Badge vùng */}
            <ScrollAnimate direction="down">
                <div className="md:text-md mt-10 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50/80 px-4 py-1 text-sm text-amber-700 backdrop-blur-sm lg:mt-30">
                    <span className="relative flex h-2.5 w-2.5">
                        <span
                            className="absolute top-1/2 left-1/2 h-3 w-3 rounded-full bg-amber-400 opacity-0"
                            style={{
                                animation: "pingPulse 2s ease-out infinite",
                            }}
                        />
                        <span className="relative h-2.5 w-2.5 rounded-full bg-amber-500 shadow-lg shadow-amber-500/50" />
                    </span>
                    {content.hero_badge_area ||
                        "Chuyên khu vực: Quận 6 (TP.HCM)"}
                </div>
            </ScrollAnimate>

            {/* Title */}
            <ScrollAnimate direction="down" delay={0.2}>
                <h1 className="mt-4 mb-6 max-w-4xl text-3xl font-medium text-gray-900 md:text-4xl xl:mb-0 xl:max-w-xl">
                    <span className="text-gold">
                        {content.hero_title_highlight || "Tuấn Phát"}
                    </span>{" "}
                    {content.hero_title_main
                        ? content.hero_title_main.replace(
                              content.hero_title_highlight || "",
                              "",
                          )
                        : "– Đồng hành cùng bạn trong đầu tư và an cư bền vững"}
                </h1>
            </ScrollAnimate>

            {/* Styled-jsx animation */}
            <style jsx>{`
                @keyframes pingPulse {
                    0% {
                        transform: translate(-50%, -50%) scale(1);
                        opacity: 0.75;
                    }
                    30% {
                        transform: translate(-50%, -50%) scale(2.5);
                        opacity: 0;
                    }
                    100% {
                        transform: translate(-50%, -50%) scale(2.5);
                        opacity: 0;
                    }
                }
            `}</style>
        </div>
    );
}
