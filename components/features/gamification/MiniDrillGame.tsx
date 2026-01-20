"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RotateCw, Check, X, Clock, Play } from "lucide-react";
import { useGamification } from "@/components/providers/GamificationProvider";
import { cn } from "@/lib/utils";

type DrillQuestion = {
    q: string;
    a: string;
};

export function MiniDrillGame({ questions }: { questions: DrillQuestion[] }) {
    const { addXp, unlockAchievement } = useGamification();
    const [gameState, setGameState] = useState<"IDLE" | "PLAYING" | "FINISHED">("IDLE");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(0);
    const [isActive, setIsActive] = useState(false);

    // Timer logic
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isActive) {
            interval = setInterval(() => {
                setTimer((seconds) => seconds + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isActive]);

    const startGame = () => {
        setGameState("PLAYING");
        setCurrentIndex(0);
        setScore(0);
        setTimer(0);
        setIsActive(true);
        setShowAnswer(false);
    };

    const handleAnswer = (correct: boolean) => {
        if (correct) setScore((prev) => prev + 1);

        if (currentIndex < questions.length - 1) {
            setCurrentIndex((prev) => prev + 1);
            setShowAnswer(false);
        } else {
            endGame(correct ? score + 1 : score);
        }
    };

    const endGame = (finalScore: number) => {
        setGameState("FINISHED");
        setIsActive(false);

        // Calculate Reward
        const xpEarned = finalScore * 10; // 10 XP per correct answer
        addXp(xpEarned);

        // Check Achievements
        if (finalScore === questions.length) {
            // Assuming 'speed_demon' requires full score under 30s as per SQL schema
            if (timer <= 30) {
                unlockAchievement("speed_demon");
            }
        }

        if (finalScore > 0) {
            unlockAchievement("first_blood"); // Easy achievement check
        }
    };

    if (gameState === "IDLE") {
        return (
            <Card className="bg-slate-900 text-white border-slate-800">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-emerald-400">
                        <RotateCw className="w-6 h-6" /> แบบฝึกหัดทดสอบความไว (Time Attack)
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-center py-8">
                    <div className="text-4xl">⚡</div>
                    <p className="text-slate-400">ทดสอบความแม่นยำและความเร็วโจทย์ {questions.length} ข้อ</p>
                    <Button onClick={startGame} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8">
                        เริ่มจับเวลา <Play className="w-4 h-4 ml-2" />
                    </Button>
                    <p className="text-xs text-slate-500">ตอบถูกได้ข้อละ 10 XP</p>
                </CardContent>
            </Card>
        );
    }

    if (gameState === "FINISHED") {
        return (
            <Card className="bg-slate-900 text-white border-slate-800">
                <CardHeader>
                    <CardTitle className="text-center text-emerald-400">สรุปผลการทดสอบ</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-6 py-4">
                    <div className="text-6xl font-bold">{score}/{questions.length}</div>
                    <div className="flex justify-center gap-4 text-sm text-slate-400">
                        <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {timer} วินาที</span>
                        <span className="flex items-center gap-1 text-yellow-400"><Badge variant="outline" className="text-yellow-400 border-yellow-400/30">+{score * 10} XP</Badge></span>
                    </div>
                    <Button onClick={startGame} variant="outline" className="border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800">
                        ลองอีกครั้ง
                    </Button>
                </CardContent>
            </Card>
        );
    }

    // PLAYING STATE
    const currentQuestion = questions[currentIndex];

    return (
        <Card className="bg-slate-900 text-white border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-emerald-400 text-base">
                    ข้อที่ {currentIndex + 1}/{questions.length}
                </CardTitle>
                <div className="flex items-center gap-2 text-slate-400 font-mono text-sm">
                    <Clock className="w-4 h-4" /> {timer}s
                </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-4">
                <div className="text-lg font-medium text-center min-h-[60px] flex items-center justify-center">
                    {currentQuestion.q}
                </div>

                {!showAnswer ? (
                    <Button
                        onClick={() => setShowAnswer(true)}
                        className="w-full h-12 text-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
                    >
                        เฉลย
                    </Button>
                ) : (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="bg-emerald-950/30 border border-emerald-900/50 p-4 rounded text-center text-emerald-300 font-mono">
                            {currentQuestion.a}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <Button
                                onClick={() => handleAnswer(false)}
                                className="bg-red-900/50 hover:bg-red-900/80 text-red-200 border-red-900"
                                variant="outline"
                            >
                                <X className="w-4 h-4 mr-2" /> ตอบผิด
                            </Button>
                            <Button
                                onClick={() => handleAnswer(true)}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white"
                            >
                                <Check className="w-4 h-4 mr-2" /> ตอบถูก
                            </Button>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
