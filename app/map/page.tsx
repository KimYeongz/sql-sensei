import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import mapData from "@/data/learning_map.json";
import { Milestone, Flag, CheckCircle } from "lucide-react";

export default function MapPage() {
    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div className="space-y-4 text-center">
                <h1 className="text-3xl font-bold">แผนที่การเดินทาง (Learning Map)</h1>
                <p className="text-slate-500">เส้นทางสู่เซียน SQL: เริ่มจากพื้นฐานไปจนถึงระดับสูง</p>
            </div>

            <div className="relative border-l-4 border-slate-200 dark:border-slate-800 ml-4 md:ml-8 space-y-12 py-4">
                {mapData.phases.map((phase, index) => (
                    <div key={phase.id} className="relative pl-8 md:pl-12">
                        {/* Timeline connectors */}
                        <div className="absolute -left-[11px] top-6 bg-slate-50 dark:bg-slate-950 p-1">
                            <div className="w-4 h-4 rounded-full bg-blue-500 ring-4 ring-white dark:ring-slate-950"></div>
                        </div>

                        <Card className="hover:border-blue-500 transition-colors">
                            <CardHeader>
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div>
                                        <div className="text-xs uppercase font-bold text-blue-500 mb-1">Phase {phase.id}</div>
                                        <CardTitle className="text-xl">{phase.title}</CardTitle>
                                        <CardDescription>{phase.description}</CardDescription>
                                    </div>
                                    <div>
                                        <Badge variant="secondary" className="whitespace-nowrap">
                                            {phase.topics.length} หัวข้อ
                                        </Badge>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {phase.topics.map(topic => (
                                        <Badge key={topic} variant="outline" className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700">
                                            {topic}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                ))}

                <div className="relative pl-8 md:pl-12">
                    <div className="absolute -left-[13px] top-1 bg-slate-50 dark:bg-slate-950 p-1">
                        <Flag className="w-6 h-6 text-green-500" />
                    </div>
                    <div className="text-slate-500 italic">เป้าหมาย: เขียน SQL ได้อย่างมั่นใจและถูกต้องตามหลักการ</div>
                </div>
            </div>
        </div>
    );
}
