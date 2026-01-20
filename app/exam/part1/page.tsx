"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import questions from "@/data/exam_mcq.json";
import { CheckCircle2, XCircle, AlertTriangle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Part1ExamPage() {
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [showResults, setShowResults] = useState(false);

    const calculateScore = () => {
        let score = 0;
        questions.forEach(q => {
            if (answers[q.id] === q.answer) score++;
        });
        return score;
    };

    return (
        <div className="space-y-8 max-w-4xl mx-auto pb-20">
            <div className="flex justify-between items-start">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold">ส่วนที่ 1: ปรนัย (MCQ)</h1>
                    <p className="text-slate-500">เลือกคำตอบที่ถูกต้องที่สุด ระวัง! มีตัวเลือกหลอก</p>
                </div>
                {showResults && (
                    <div className="text-right">
                        <div className="text-4xl font-bold text-blue-600">
                            {calculateScore()} / {questions.length}
                        </div>
                        <p className="text-sm text-slate-500">คะแนนรวม</p>
                    </div>
                )}
            </div>

            <div className="space-y-6">
                {questions.map((q, index) => {
                    const isAnswered = !!answers[q.id];
                    const isCorrect = answers[q.id] === q.answer;
                    const userSelected = answers[q.id];

                    return (
                        <Card key={q.id} className={cn("border-l-4",
                            showResults
                                ? (isCorrect ? "border-l-green-500" : "border-l-red-500")
                                : "border-l-slate-200 dark:border-l-slate-800"
                        )}>
                            <CardHeader>
                                <CardTitle className="text-base font-medium leading-relaxed">
                                    <span className="mr-2 text-slate-400">#{index + 1}</span>
                                    {q.question}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-2">
                                    {q.choices.map((choice) => (
                                        <button
                                            key={choice.id}
                                            disabled={showResults}
                                            onClick={() => setAnswers(prev => ({ ...prev, [q.id]: choice.id }))}
                                            className={cn(
                                                "w-full text-left p-3 rounded-lg border text-sm transition-all flex items-center justify-between",
                                                // Default state
                                                !showResults && userSelected !== choice.id && "hover:bg-slate-50 dark:hover:bg-slate-900 border-slate-200 dark:border-slate-800",
                                                // Selected state (pre-result)
                                                !showResults && userSelected === choice.id && "bg-blue-50 dark:bg-blue-900/20 border-blue-500 ring-1 ring-blue-500",
                                                // Post-result: Correct Answer
                                                showResults && choice.id === q.answer && "bg-green-50 dark:bg-green-900/20 border-green-500 ring-1 ring-green-500",
                                                // Post-result: User Wrong Selection
                                                showResults && userSelected === choice.id && userSelected !== q.answer && "bg-red-50 dark:bg-red-900/20 border-red-500",
                                                // Post-result: Fade others
                                                showResults && choice.id !== q.answer && userSelected !== choice.id && "opacity-50"
                                            )}
                                        >
                                            <span className="flex items-center gap-3">
                                                <span className="font-mono font-bold text-slate-400 capitalize">{choice.id}.</span>
                                                {choice.text}
                                            </span>
                                            {showResults && choice.id === q.answer && <CheckCircle2 className="w-4 h-4 text-green-600" />}
                                            {showResults && userSelected === choice.id && userSelected !== q.answer && <XCircle className="w-4 h-4 text-red-600" />}
                                        </button>
                                    ))}
                                </div>

                                {showResults && (
                                    <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 text-sm space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                                        <div className="font-semibold flex items-center gap-2 text-slate-900 dark:text-slate-100">
                                            <CheckCircle2 className="w-4 h-4 text-green-500" /> เหตุผล:
                                        </div>
                                        <p className="text-slate-600 dark:text-slate-400">{q.explanation}</p>

                                        <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                                            <div className="font-semibold flex items-center gap-2 text-amber-600 dark:text-amber-500 mb-1">
                                                <AlertTriangle className="w-4 h-4" /> จุดหลอก (Trap):
                                            </div>
                                            <p className="text-slate-600 dark:text-slate-400">{q.trap}</p>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {!showResults && (
                <div className="fixed bottom-0 left-0 lg:left-64 right-0 p-4 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex justify-end">
                    <Button size="lg" onClick={() => setShowResults(true)} className="w-full md:w-auto shadow-xl">
                        ส่งคำตอบและดูเฉลย <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            )}
        </div>
    );
}
