import FAQs from "@/app/(default)/(home)/components/FAQs/FAQs";
import Hero from "@/app/(default)/(home)/components/Hero/Hero";
import Info from "@/app/(default)/(home)/components/Info/Info";
import Service from "@/app/(default)/(home)/components/Service/Service";

async function HomePage() {
    return (
        <div>
            <Hero />
            <Info withBg />
            <Service />
            <FAQs />
        </div>
    );
}

export default HomePage;
