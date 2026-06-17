"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import { Autoplay } from "swiper/modules";
import { convertDriveLinkToDirect } from "@/lib/upload";
import { Target, Home, Briefcase, Users } from "lucide-react";

type ServiceItemProps = {
    title: string;
    description: string;
    icon: React.ElementType | string;
    images: string[];
};

const ICON_MAP: Record<string, React.ElementType> = {
    Target: Target,
    Home: Home,
    Briefcase: Briefcase,
    Users: Users,
};

function ServiceItem({ title, description, icon, images }: ServiceItemProps) {
    const Icon = typeof icon === "string" ? ICON_MAP[icon] : icon;

    return (
        <div className="flex h-full flex-col justify-between rounded-xl border-2 border-white bg-gray-100 p-4 sm:p-5 md:p-6">
            {/* Top Content */}
            <div className="flex-grow">
                {/* Icon */}
                <span className="flex h-14 w-14 items-center justify-center rounded-sm bg-black/5 sm:h-16 sm:w-16">
                    {Icon && <Icon size={24} className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" color="#0e3a27" />}
                </span>

                {/* Title */}
                <h3 className="my-2 text-lg font-medium sm:text-xl md:text-2xl">
                    {title}
                </h3>

                {/* Description */}
                <p className="mb-6 text-xs text-neutral-700 sm:text-sm md:text-base">
                    {description}
                </p>
            </div>

            {/* Swiper (Always pinned to bottom) */}
            {images && images.length > 0 && (
                <div className="mt-auto w-full">
                    <Swiper
                        spaceBetween={10}
                        slidesPerView={2}
                        breakpoints={{
                            640: { slidesPerView: 2, spaceBetween: 10 },
                            768: { slidesPerView: 2, spaceBetween: 12 },
                        }}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        modules={[Autoplay]}
                        className="hover:cursor-grab"
                    >
                        {images.map((img, index) => {
                            const directLink = convertDriveLinkToDirect(img);
                            if (!directLink) return null;
                            return (
                                <SwiperSlide key={index}>
                                    <div className="relative aspect-square w-full overflow-hidden rounded-md">
                                        <Image
                                            src={directLink}
                                            alt={title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>
            )}
        </div>
    );
}

export default ServiceItem;