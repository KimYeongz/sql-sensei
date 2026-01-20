"use client";

import { useGamification } from "@/components/providers/GamificationProvider";
import { Progress } from "@/components/ui/progress";
import { Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

interface UserXPBarProps {
    className?: string;
}

export function UserXPBar({ className }: UserXPBarProps) {
    const { xp, level, levelData } = useGamification();

    // Calculate progress to next level
    const currentLevelData = levelData.find((l) => l.level === level) || levelData[0];
    const nextLevelData = levelData.find((l) => l.level === level + 1);

    let progress = 100;
    let nextLevelXp = xp; // Maxed out if no next level

    if (nextLevelData) {
        const xpInLevel = xp - currentLevelData.xpRequired;
        const xpNeededForNext = nextLevelData.xpRequired - currentLevelData.xpRequired;
        progress = Math.min(100, Math.max(0, (xpInLevel / xpNeededForNext) * 100));
        nextLevelXp = nextLevelData.xpRequired;
    }

    return (
        <div className={cn("bg-slate-800/50 border border-slate-700 rounded-lg p-4 space-y-3 shadow-sm", className)}>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="bg-yellow-900/30 p-2 rounded-full text-yellow-400">
                        <Trophy className="w-4 h-4" />
                    </div>
                    <div>
                        <div className="text-[10px] text-slate-400 font-medium uppercase">Level {level}</div>
                        <div className="font-bold text-xs text-slate-100">{currentLevelData.title}</div>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-[10px] text-slate-500 font-mono">XP</div>
                    <div className="font-bold text-blue-400 text-xs">{xp} <span className="text-slate-500 text-[10px]">/ {nextLevelXp}</span></div>
                </div>
            </div>

            <div className="space-y-1">
                <Progress value={progress} className="h-1.5 bg-slate-700" />
                <div className="flex justify-between text-[10px] text-slate-500">
                    <span>{currentLevelData.xpRequired} XP</span>
                    <span>{nextLevelData ? `${nextLevelData.xpRequired} XP` : 'MAX'}</span>
                </div>
            </div>
        </div>
    );
}
