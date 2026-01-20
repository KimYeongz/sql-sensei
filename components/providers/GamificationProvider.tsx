"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { LoginModal } from "@/components/features/gamification/LoginModal";

export type Achievement = {
    id: string;
    title: string;
    description: string;
    icon: string;
    xpReward: number;
};

type GamificationContextType = {
    xp: number;
    level: number;
    achievements: string[];
    addXp: (amount: number) => void;
    unlockAchievement: (id: string) => void;
    levelData: { level: number; xpRequired: number; title: string }[];
    user: { id: number; name: string } | null;
};

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

const LEVELS = [
    { level: 1, xpRequired: 0, title: "Novice SQL Learner" },
    { level: 2, xpRequired: 100, title: "Select Statement Apprentice" },
    { level: 3, xpRequired: 300, title: "Join Master" },
    { level: 4, xpRequired: 600, title: "Subquery Specialist" },
    { level: 5, xpRequired: 1000, title: "Database Architect" },
    { level: 6, xpRequired: 2000, title: "Grandmaster" },
];

export function GamificationProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<{ id: number; name: string } | null>(null);
    const [xp, setXp] = useState(0);
    const [achievements, setAchievements] = useState<string[]>([]);
    const [level, setLevel] = useState(1);
    const [showLogin, setShowLogin] = useState(false);

    // Load user from session storage or check cookie on mount? 
    // Simplified: Check localStorage for userId, if exists, fetch profile.
    // Ideally, use a real auth cookie. Here we act as if we just "remember" the device.
    useEffect(() => {
        const savedUserId = localStorage.getItem("sql_sensei_user_id");
        const savedUserName = localStorage.getItem("sql_sensei_user_name");

        if (savedUserId && savedUserName) {
            // Optimistic set
            setUser({ id: parseInt(savedUserId), name: savedUserName });
            // Fetch fresh data
            fetchProfile(savedUserName);
        } else {
            setShowLogin(true);
        }
    }, []);

    const fetchProfile = async (name: string) => {
        try {
            const res = await fetch('/api/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name })
            });
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Login failed');
            }

            if (data.user) {
                setUser({ id: data.user.user_id, name: data.user.display_name });
                setXp(data.user.current_xp);
                setLevel(data.user.current_level);
                if (data.achievements) setAchievements(data.achievements);

                // Persist locally
                localStorage.setItem("sql_sensei_user_id", data.user.user_id.toString());
                localStorage.setItem("sql_sensei_user_name", data.user.display_name);
                setShowLogin(false);
            }
        } catch (e: any) {
            console.error("Failed to fetch profile", e);
            alert("เข้าสู่ระบบไม่สำเร็จ: " + e.message + "\n(ลอง Restart Server หรือเช็ค Database)");
            throw e;
        }
    };

    const handleLogin = async (name: string) => {
        await fetchProfile(name);
    };

    const syncProgress = async (newXp: number, newLevel: number, newAchievements: string[]) => {
        if (!user) return;
        try {
            await fetch('/api/user/sync', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: user.id,
                    xp: newXp,
                    level: newLevel,
                    achievements: newAchievements
                })
            });
        } catch (e) {
            console.error("Sync failed", e);
        }
    };

    // Logic to calculate level from XP
    const calculateLevel = (currentXp: number) => {
        return LEVELS.reduce((acc, curr) => {
            if (currentXp >= curr.xpRequired) return curr.level;
            return acc;
        }, 1);
    };

    const addXp = (amount: number) => {
        setXp((prev) => {
            const nextXp = prev + amount;
            const nextLevel = calculateLevel(nextXp);

            if (nextLevel > level) {
                setLevel(nextLevel);
                triggerCelebration();
                alert(`ยินดีด้วย! คุณเลื่อนระดับเป็น Level ${nextLevel}`);
            }

            // Sync to backend
            syncProgress(nextXp, nextLevel > level ? nextLevel : level, achievements);

            return nextXp;
        });
    };

    const unlockAchievement = (id: string) => {
        if (!achievements.includes(id)) {
            setAchievements((prev) => {
                const next = [...prev, id];
                triggerCelebration();
                // Sync
                syncProgress(xp, level, next);
                return next;
            });
        }
    };

    const triggerCelebration = () => {
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) return clearInterval(interval);
            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);
    };

    return (
        <GamificationContext.Provider value={{ xp, level, achievements, addXp, unlockAchievement, levelData: LEVELS, user }}>
            {showLogin && <LoginModal onLogin={handleLogin} />}
            {!showLogin && children}
        </GamificationContext.Provider>
    );
}

export function useGamification() {
    const context = useContext(GamificationContext);
    if (context === undefined) {
        throw new Error("useGamification must be used within a GamificationProvider");
    }
    return context;
}
