import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import tutorData from "@/data/tutor_mode.json";
import { CheckSquare, AlertOctagon, RotateCw } from "lucide-react";
import { MiniDrillGame } from "@/components/features/gamification/MiniDrillGame";

export default function TutorModePage() {
    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <div className="space-y-4 text-center max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold">โหมดติวเข้ม (Tutor Mode)</h1>
                <p className="text-slate-500">ทบทวนจุดผิดพลาดที่พบบ่อย เช็กลิสต์ก่อนส่งงาน และฝึกความไวด้วย Mini-Drill</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Top Mistakes */}
                <Card className="border-red-500 border-l-4">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-red-600">
                            <AlertOctagon className="w-6 h-6" /> 20 จุดตายที่คนมักพลาด
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {tutorData.top_mistakes.map((mistake) => (
                                <li key={mistake.id} className="flex gap-3 text-sm text-slate-700 dark:text-slate-300">
                                    <span className="font-mono font-bold text-red-400 w-6 shrink-0">{mistake.id}.</span>
                                    {mistake.text}
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                <div className="space-y-8">
                    {/* Pre-Exam Checklist */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-blue-600">
                                <CheckSquare className="w-6 h-6" /> Checklist ก่อนส่งงาน
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3">
                                {tutorData.checklist.map((item, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                                        <span className="text-sm">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>

                    {/* Mini Drill Game */}
                    <MiniDrillGame questions={tutorData.mini_drill} />
                </div>
            </div>
        </div>
    );
}
