"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import questions from "@/data/exam_mcq.json";
import { CheckCircle2, XCircle, AlertTriangle, ArrowRight, Trophy, Timer, History } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGamification } from "@/components/providers/GamificationProvider";

export default function Part1ExamPage() {
    const { user, addXp } = useGamification();
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [showResults, setShowResults] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isTimerRunning, setIsTimerRunning] = useState(true);
    const [leaderboard, setLeaderboard] = useState<any[]>([]);

    useEffect(() => {
        let interval: any;
        if (isTimerRunning) {
            interval = setInterval(() => {
                setElapsedTime(prev => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isTimerRunning]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const calculateScore = () => {
        let score = 0;
        questions.forEach(q => {
            if (answers[q.id] === q.answer) score++;
        });
        return score;
    };

    const handleSubmit = async () => {
        setIsTimerRunning(false);
        setShowResults(true);
        const score = calculateScore();

        // Give XP
        if (score > 0) {
            addXp(score * 10); // 10 XP per correct answer
        }

        // Submit to Leaderboard
        if (user) {
            try {
                await fetch('/api/leaderboard/submit', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        userId: user.id,
                        examId: 'part1',
                        score: score,
                        maxScore: questions.length,
                        timeTaken: elapsedTime
                    })
                });
                fetchLeaderboard();
            } catch (e) {
                console.error("Failed to submit score", e);
            }
        }
    };

    const fetchLeaderboard = async () => {
        try {
            const res = await fetch('/api/leaderboard/list?examId=part1');
            const data = await res.json();
            if (data.leaderboard) {
                setLeaderboard(data.leaderboard);
            }
        } catch (e) {
            console.error("Failed to fetch leaderboard", e);
        }
    };

    return (
        <div className="space-y-8 max-w-4xl mx-auto pb-20">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4 sticky top-0 z-10 bg-slate-50 dark:bg-slate-950 py-4 border-b border-slate-200 dark:border-slate-800">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        ส่วนที่ 1: ปรนัย (MCQ)
                    </h1>
                    <p className="text-slate-500">เลือกคำตอบที่ถูกต้องที่สุด ระวัง! มีตัวเลือกหลอก</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className={cn("flex items-center gap-2 px-4 py-2 rounded-full font-mono font-bold text-lg",
                        showResults ? "bg-slate-200 dark:bg-slate-800 text-slate-500" : "bg-blue-100 dark:bg-blue-900 text-blue-600"
                    )}>
                        <Timer className="w-5 h-5" />
                        {formatTime(elapsedTime)}
                    </div>

                    {showResults && (
                        <div className="text-right">
                            <div className="text-3xl font-bold text-blue-600">
                                {calculateScore()} / {questions.length}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Leaderboard Section */}
            {showResults && leaderboard.length > 0 && (
                <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border-indigo-200 dark:border-indigo-800">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300">
                            <Trophy className="w-6 h-6 text-yellow-500" />
                            Leaderboard (Top 20)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-indigo-200 dark:border-indigo-800 text-left">
                                        <th className="p-2">Rank</th>
                                        <th className="p-2">Name</th>
                                        <th className="p-2">Level</th>
                                        <th className="p-2">Score</th>
                                        <th className="p-2">Time</th>
                                        <th className="p-2 text-right">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {leaderboard.map((entry, i) => (
                                        <tr key={i} className={cn(
                                            "border-b border-indigo-100 dark:border-indigo-900 last:border-0",
                                            entry.user_profiles?.display_name === user?.name && "bg-indigo-100 dark:bg-indigo-900/50 font-semibold"
                                        )}>
                                            <td className="p-2">
                                                {i === 0 && "🥇"}
                                                {i === 1 && "🥈"}
                                                {i === 2 && "🥉"}
                                                {i > 2 && `#${i + 1}`}
                                            </td>
                                            <td className="p-2 font-medium">{entry.user_profiles?.display_name || 'Anonymous'}</td>
                                            <td className="p-2"><Badge variant="outline" className="text-xs">Lvl {entry.user_profiles?.current_level}</Badge></td>
                                            <td className="p-2 font-bold text-green-600 dark:text-green-400">{entry.score}</td>
                                            <td className="p-2 font-mono text-slate-500">{formatTime(entry.time_taken_seconds)}</td>
                                            <td className="p-2 text-right text-xs text-slate-400">
                                                {new Date(entry.created_at).toLocaleDateString('th-TH')}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            )}

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
                                                !showResults && userSelected !== choice.id && "hover:bg-slate-50 dark:hover:bg-slate-900 border-slate-200 dark:border-slate-800",
                                                !showResults && userSelected === choice.id && "bg-blue-50 dark:bg-blue-900/20 border-blue-500 ring-1 ring-blue-500",
                                                showResults && choice.id === q.answer && "bg-green-50 dark:bg-green-900/20 border-green-500 ring-1 ring-green-500",
                                                showResults && userSelected === choice.id && userSelected !== q.answer && "bg-red-50 dark:bg-red-900/20 border-red-500",
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
                <div className="fixed bottom-0 left-0 lg:left-64 right-0 p-4 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3 z-20">
                    <Button size="lg" onClick={handleSubmit} className="w-full md:w-auto shadow-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                        ส่งคำตอบและดูเฉลย <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            )}
        </div>
    );
}
