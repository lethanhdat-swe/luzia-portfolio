"use client";

import { useEffect, useState } from "react";
import ServiceItem from "@/app/(default)/(home)/components/Service/ServiceItem";
import { getSheetContent } from "@/lib/getSheetContent";
import ScrollAnimate from "@/components/ScrollAnimate/ScrollAnimate";

type HomeContent = {
    service_title?: string;
    service_desc?: string;
};

function Service() {
    const [content, setContent] = useState<HomeContent>({});
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchContent() {
            try {
                const data = await getSheetContent("Home");
                setContent(data || {});
                setServices(JSON.parse(data.service_list) || []);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchContent();
    }, []);

    if (loading) {
        return (
            <div className="text-muted-foreground px-6 py-20 text-center text-sm">
                Loading...
            </div>
        );
    }

    return (
        <section className="py-20 md:py-30">
            <div className="mx-auto max-w-7xl px-4 md:px-30">
                {/* Header */}
                <div className="flex flex-col items-center justify-center text-center">
                    <ScrollAnimate direction="down">
                        <h2 className="mb-4 text-2xl font-semibold text-neutral-800 sm:text-3xl lg:text-4xl">
                            {content.service_title}
                        </h2>
                    </ScrollAnimate>

                    <ScrollAnimate direction="down" delay={0.2}>
                        <p className="max-w-3xl text-sm font-medium text-neutral-500 sm:text-base lg:text-lg">
                            {content.service_desc}
                        </p>
                    </ScrollAnimate>
                </div>

                {/* Service Items */}
                <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-14 lg:gap-8">
                    {services.map((service: any, index) => (
                        <ScrollAnimate
                            key={service.id}
                            direction="up"
                            delay={index * 0.12}
                            threshold={0.1}
                            className="h-full" 
                        >
                            <ServiceItem
                                title={service.title}
                                description={service.description}
                                icon={service.icon}
                                images={service.images}
                            />
                        </ScrollAnimate>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Service;
