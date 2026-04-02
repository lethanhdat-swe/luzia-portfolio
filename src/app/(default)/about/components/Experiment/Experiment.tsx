import { experiences } from "@/app/(default)/about/components/Experiment/data";
import ExItem from "@/app/(default)/about/components/Experiment/ExItem";
import ScrollAnimate from "@/components/ScrollAnimate/ScrollAnimate";
import { getSheetContent } from "@/lib/getSheetContent";

async function Experiment() {
    const content = await getSheetContent("About");

    let experiences = [];
    try {
        experiences = JSON.parse(content.exper_list);
    } catch (error) {
        console.error("Lỗi định dạng JSON tại exper_list:", error);
        experiences = [];
    }

    return (
        <div className="py-20 pb-30">
            <div className="app-container">
                <ScrollAnimate direction="right">
                    <h2 className="mb-6 text-2xl font-medium lg:text-4xl">
                        {content.exper_title}
                    </h2>
                </ScrollAnimate>

                <div className="space-y-2">
                    {experiences.map((item: any, index: number) => (
                        <ScrollAnimate
                            key={item.id}
                            direction="up"
                            delay={index * 0.2}
                            threshold={0}
                        >
                            <ExItem
                                role={item.role}
                                company={item.company}
                                time={item.time}
                                current={item.current}
                            />
                        </ScrollAnimate>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Experiment;
