import ScrollAnimate from "@/components/ScrollAnimate/ScrollAnimate";
import { Button } from "@/components/ui/button";
import { getSheetContent } from "@/lib/getSheetContent";
import Link from "next/link";

async function Email() {
    const content = await getSheetContent("Home");

    return (
        <div className="static right-20 bottom-50 z-10 max-w-none xl:absolute xl:max-w-md">
            <ScrollAnimate direction="left">
                <p className="mb-10 text-sm leading-relaxed font-normal text-gray-900 sm:mb-6 md:text-[15px]">
                    {content.hero_desc || ""}
                </p>
            </ScrollAnimate>
            <ScrollAnimate direction="left" delay={0.2}>
                <Link href={"/contact"}>
                    <Button className="text-md bg-gold shadow-gold cursor-pointer rounded-2xl p-6 font-semibold text-white transition-all hover:scale-105 hover:shadow-xl">
                        Liên hệ ngay
                    </Button>
                </Link>
            </ScrollAnimate>
        </div>
    );
}

export default Email;
