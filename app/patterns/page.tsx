import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SqlViewer } from "@/components/features/SqlViewer";
import patterns from "@/data/patterns.json";
import { AlertTriangle, Lightbulb } from "lucide-react";

export default function PatternsPage() {
    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold">คลังแพทเทิร์น (SQL Pattern Library)</h1>
                <p className="text-slate-500">รวม 11 โครงสร้าง SQL ที่ใช้บ่อยที่สุดในการแก้โจทย์</p>
            </div>

            <div className="grid gap-8">
                {patterns.map((pattern) => (
                    <Card key={pattern.id} className="overflow-hidden border-l-4 border-l-blue-500">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <Badge variant="outline">{pattern.id}</Badge>
                                        <CardTitle>{pattern.title}</CardTitle>
                                    </div>
                                    <CardDescription className="text-base">{pattern.description}</CardDescription>
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            <SqlViewer sql={pattern.sql} />

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-emerald-50 dark:bg-emerald-950/30 p-4 rounded-lg border border-emerald-100 dark:border-emerald-900">
                                    <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-semibold mb-2">
                                        <Lightbulb className="w-4 h-4" /> แนวคิด (Logic)
                                    </div>
                                    <p className="text-sm text-emerald-800 dark:text-emerald-300">{pattern.explanation}</p>
                                </div>

                                <div className="bg-red-50 dark:bg-red-950/30 p-4 rounded-lg border border-red-100 dark:border-red-900">
                                    <div className="flex items-center gap-2 text-red-700 dark:text-red-400 font-semibold mb-2">
                                        <AlertTriangle className="w-4 h-4" /> จุดที่มักพลาด (Trap)
                                    </div>
                                    <p className="text-sm text-red-800 dark:text-red-300">{pattern.trap}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
