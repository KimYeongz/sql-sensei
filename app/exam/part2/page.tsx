"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SqlViewer } from "@/components/features/SqlViewer";
import { InteractiveSqlLab } from "@/components/features/InteractiveSqlLab";
import questions from "@/data/exam_select.json";
import { Eye, EyeOff, Terminal } from "lucide-react";

export default function Part2ExamPage() {
    const [revealed, setRevealed] = useState<Record<number, boolean>>({});
    const [showLab, setShowLab] = useState<Record<number, boolean>>({});

    const toggleReveal = (id: number) => {
        setRevealed(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const toggleLab = (id: number) => {
        setShowLab(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className="space-y-8 max-w-4xl mx-auto pb-20">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold">ส่วนที่ 2: เขียน SQL (SELECT)</h1>
                <p className="text-slate-500">จงเขียนคำสั่ง SQL เพื่อหาคำตอบตามโจทย์ที่กำหนด (รันโค้ดจริงใน Lab ได้เลย)</p>
            </div>

            <div className="space-y-12">
                {questions.map((q, index) => (
                    <div key={q.id} className="relative group">
                        <div className="absolute -left-4 md:-left-12 top-0 text-slate-300 font-bold text-4xl hidden md:block">
                            {String(index + 1).padStart(2, '0')}
                        </div>

                        <Card className="overflow-hidden">
                            <CardHeader className="bg-slate-50 dark:bg-slate-900 border-b">
                                <div className="flex justify-between items-start gap-4">
                                    <CardTitle className="text-lg leading-relaxed">{q.question}</CardTitle>
                                    <Badge variant={q.difficulty === "Hard" ? "destructive" : q.difficulty === "Medium" ? "secondary" : "default"}>
                                        {q.difficulty}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6 space-y-6">
                                {/* Action Buttons */}
                                <div className="flex gap-2">
                                    <Button
                                        onClick={() => toggleLab(q.id)}
                                        variant={showLab[q.id] ? "default" : "outline"}
                                        className="gap-2"
                                    >
                                        <Terminal className="w-4 h-4" />
                                        {showLab[q.id] ? "ปิด Lab ทดลอง" : "เปิด Lab ทดลองเขียนโค้ด"}
                                    </Button>

                                    <Button
                                        variant="ghost"
                                        onClick={() => toggleReveal(q.id)}
                                        className="gap-2 text-slate-500 hover:text-blue-600 ml-auto"
                                    >
                                        {revealed[q.id] ? <><EyeOff className="w-4 h-4" /> ซ่อนเฉลย</> : <><Eye className="w-4 h-4" /> ดูเฉลย</>}
                                    </Button>
                                </div>

                                {/* Interactive Lab Area */}
                                {showLab[q.id] && (
                                    <div className="animate-in fade-in zoom-in-95 duration-200">
                                        <InteractiveSqlLab initialSql="" />
                                    </div>
                                )}

                                {/* Keywords Hint */}
                                {!showLab[q.id] && !revealed[q.id] && (
                                    <div className="bg-slate-100 dark:bg-slate-950 p-8 rounded-md border border-dashed border-slate-300 dark:border-slate-800 text-center space-y-2">
                                        <p className="text-slate-400 italic text-sm">กดปุ่ม "เปิด Lab" เพื่อลองเขียนโค้ดค้นหาคำตอบ</p>
                                        <div className="flex flex-wrap gap-2 justify-center mt-2">
                                            {q.keywords.map(k => (
                                                <Badge key={k} variant="outline" className="text-xs font-mono bg-white dark:bg-slate-900 opacity-50">{k}</Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Solution Area */}
                                {revealed[q.id] && (
                                    <div className="mt-4 animate-in fade-in slide-in-from-top-2 space-y-4">
                                        <SqlViewer sql={q.solutionSQL} title="Optimal Solution" />
                                        <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 p-4 rounded-lg border border-blue-100 dark:border-blue-900 text-sm">
                                            <span className="font-bold">แนวคิด:</span> {q.explanation}
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
}
