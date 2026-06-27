"use client";

import { getSheetContent } from "@/lib/getSheetContent";
import Link from "next/link";
import { useEffect, useState } from "react";

type LinkItem = {
    title: string;
    href: string;
    type?: "internal" | "external" | "phone" | "email";
};

function Navlist() {
    const [content, setContent] = useState<any>(null);

    useEffect(() => {
        const http = async () => {
            const res = await getSheetContent("Contact");
            setContent(res);
        };

        http();
    }, []);

    if (!content) return;

    // Bổ sung type: "internal" để logic renderLinks chạy đúng thẻ <Link> vốn có của bạn
    const menus: LinkItem[] = [
        { title: "Trang chủ", href: "/", type: "internal" },
        { title: "Giới thiệu", href: "/about", type: "internal" },
    ];

    const contacts: LinkItem[] = [
        { title: "Tiktok", href: content.tiktok_link, type: "external" },
        { title: "Zalo", href: content.zalo_link, type: "external" },
        { title: "Facebook", href: content.facebook_link, type: "external" },
        { title: "Instagram", href: content.ig_link, type: "external" },
        { title: "LinkedIn", href: content.linkedin_link, type: "external" },
        {
            title: "Hotline",
            href: `tel:${content.phone_number}`,
            type: "phone",
        },
        {
            title: "Email",
            href: `mailto:${content.contact_email}`,
            type: "email",
        },
    ];

    const renderLinks = (items: LinkItem[]) =>
        items.map((item) => {
            if (item.type === "internal") {
                return (
                    <Link
                        key={item.title}
                        href={item.href}
                        className="transition-colors hover:text-gray-400"
                    >
                        {item.title}
                    </Link>
                );
            }

            return (
                <a
                    key={item.title}
                    href={item.href}
                    target={item.type === "external" ? "_blank" : undefined}
                    rel={
                        item.type === "external"
                            ? "noopener noreferrer"
                            : undefined
                    }
                    className="transition-colors hover:text-gray-400"
                >
                    {item.title}
                </a>
            );
        });

    return (
        /* Sử dụng flex để cố định khoảng cách giữa 2 cụm lớn, đẩy toàn bộ menu sát lề phải */
        <div className="flex flex-col gap-12 font-medium sm:flex-row sm:gap-16 lg:gap-24">
            {/* Menus */}
            <div className="flex min-w-[100px] flex-col gap-4">
                {renderLinks(menus)}
            </div>

            {/* Contacts - Chuyển sang bố cục 2 cột để dàn trải không gian dàn ngang */}
            <div className="grid min-w-[200px] grid-cols-2 gap-x-12 gap-y-4">
                {renderLinks(contacts)}
            </div>
        </div>
    );
}

export default Navlist;
