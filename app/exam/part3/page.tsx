"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SqlViewer } from "@/components/features/SqlViewer";
import questions from "@/data/exam_app.json";
import { Eye, EyeOff, Server } from "lucide-react";

export default function Part3ExamPage() {
    const [revealed, setRevealed] = useState<Record<number, boolean>>({});

    const toggleReveal = (id: number) => {
        setRevealed(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold">ส่วนที่ 3: โจทย์งานจริง (App & Transaction)</h1>
                <p className="text-slate-500">สถานการณ์จำลอง: INSERT, UPDATE, Transaction และการจัดการ Locking</p>
            </div>

            <div className="space-y-12">
                {questions.map((q, index) => (
                    <div key={q.id} className="relative group">
                        <div className="absolute -left-4 md:-left-12 top-0 text-slate-300 font-bold text-4xl hidden md:block">
                            {String(index + 1).padStart(2, '0')}
                        </div>

                        <Card className="overflow-hidden border-t-4 border-t-emerald-500">
                            <CardHeader className="bg-slate-50 dark:bg-slate-900 border-b">
                                <div className="flex justify-between items-start gap-4">
                                    <CardTitle className="text-lg leading-relaxed flex items-center gap-2">
                                        <Server className="w-5 h-5 text-emerald-500" />
                                        {q.question}
                                    </CardTitle>
                                    <Badge variant={q.difficulty === "Hard" ? "destructive" : q.difficulty === "Medium" ? "secondary" : "default"}>
                                        {q.difficulty}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6 space-y-6">
                                <div className="bg-slate-100 dark:bg-slate-950 p-4 rounded-md border border-dashed border-slate-300 dark:border-slate-800 min-h-[80px] flex items-center justify-center text-slate-400 italic text-sm">
                                    เขียนโค้ด Transaction / SQL ของคุณที่นี่...
                                </div>

                                <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => toggleReveal(q.id)}
                                        className="w-full flex items-center justify-center gap-2 text-slate-500 hover:text-emerald-600"
                                    >
                                        {revealed[q.id] ? <><EyeOff className="w-4 h-4" /> ซ่อนเฉลย</> : <><Eye className="w-4 h-4" /> ดูเฉลย</>}
                                    </Button>

                                    {revealed[q.id] && (
                                        <div className="mt-4 animate-in fade-in slide-in-from-top-2">
                                            <SqlViewer sql={q.solutionSQL} title="Implementation" />
                                            <div className="mt-4 p-4 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-200 text-sm rounded-lg border border-emerald-100 dark:border-emerald-900">
                                                <span className="font-bold">แนวคิด:</span> {q.explanation}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
}
