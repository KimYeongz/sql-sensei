"use client";
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight, BookOpen, Brain, Trophy, ShieldAlert, Zap, Star, Target, Crown } from "lucide-react";
import { useGamification } from "@/components/providers/GamificationProvider";
import confetti from "canvas-confetti";

export default function Home() {
  const { user, level, xp } = useGamification();

  const handleStart = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 z-0"></div>
        <div className="relative z-10 p-8 md:p-16 text-center space-y-6">
          <Badge variant="outline" className="border-blue-500 text-blue-400 px-4 py-1 mb-4 animate-pulse">
            🚀 V2.0: Gamification Update
          </Badge>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-4">
            SQL <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Sensei</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            เปลี่ยนเรื่อง <span className="text-blue-300 font-semibold">SQL</span> ที่น่าเบื่อ ให้กลายเป็น <span className="text-emerald-300 font-semibold">เกม</span> ที่สนุกและท้าทาย!
            ติวสอบแบบตะลุยด่าน เก็บเลเวล และไต่อันดับสู่ความเป็นสุดยอด Master
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Link href={user ? "/exam/part1" : "/map"}>
              <Button size="xl" onClick={handleStart} className="text-lg px-8 py-6 h-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-900/50 transition-all hover:scale-105">
                {user ? "ลุยโจทย์ต่อเลย! ⚔️" : "เริ่มผจญภัยทันที ⚔️"}
              </Button>
            </Link>
            <Link href="/tutor">
              <Button size="xl" variant="outline" className="text-lg px-8 py-6 h-auto border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
                โหมดติวเข้ม 🔥
              </Button>
            </Link>
          </div>

          {user && (
            <div className="mt-8 flex items-center justify-center gap-6 text-slate-400 text-sm">
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-yellow-500" />
                <span>Level {level}</span>
              </div>
              <div className="w-px h-4 bg-slate-700"></div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-500" />
                <span>{xp} XP</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Features Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: "Roadmap to Master",
            desc: "แผนการเรียนรู้จาก 0 ถึง 100",
            icon: BookOpen,
            href: "/map",
            color: "text-blue-500",
            bg: "bg-blue-500/10"
          },
          {
            title: "Challenge Mode",
            desc: "แข่งทำโจทย์ Time Attack",
            icon: Trophy,
            href: "/exam/part1",
            color: "text-yellow-500",
            bg: "bg-yellow-500/10"
          },
          {
            title: "Concept & Patterns",
            desc: "สรุปสูตรและแพทเทิร์นลับ",
            icon: ShieldAlert,
            href: "/patterns",
            color: "text-emerald-500",
            bg: "bg-emerald-500/10"
          },
          {
            title: "Real-world Labs",
            desc: "จำลอง Database จริง",
            icon: Brain,
            href: "/exam",
            color: "text-purple-500",
            bg: "bg-purple-500/10"
          }
        ].map((item, i) => (
          <Link key={item.title} href={item.href}>
            <Card className="h-full hover:bg-slate-50 dark:hover:bg-slate-900 transition-all hover:-translate-y-1 cursor-pointer border-l-4 group" style={{ borderLeftColor: 'currentcolor' }}>
              <CardHeader>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${item.bg}`}>
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <CardTitle className="group-hover:text-blue-600 transition-colors">{item.title}</CardTitle>
                <CardDescription>{item.desc}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>

      {/* Stats / Promo Section */}
      <div className="grid md:grid-cols-2 gap-8">
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-32 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Target className="w-6 h-6 text-red-500" />
              ภารกิจประจำวัน
            </h3>
            <ul className="space-y-4">
              {[
                { text: "ทำแบบฝึกหัด 5 ข้อ", done: false },
                { text: "อ่านบทเรียนเรื่อง Joins", done: true },
                { text: "ล็อกอินต่อเนื่อง 3 วัน", done: false }
              ].map((task, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-300 bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                  {task.done ? (
                    <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-black text-xs">✓</div>
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-slate-500"></div>
                  )}
                  <span className={task.done ? "line-through text-slate-500" : ""}>{task.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-white dark:bg-slate-950 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 relative">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold flex items-center gap-2">
              <Crown className="w-6 h-6 text-yellow-500" />
              Hall of Fame
            </h3>
            <Link href="/exam/part1" className="text-sm text-blue-500 hover:underline">ดูทั้งหมด</Link>
          </div>

          <div className="space-y-4">
            {[
              { name: "Dev_Nut", xp: 2540, rank: 1 },
              { name: "SQL_Wizard", xp: 2100, rank: 2 },
              { name: "Somchai_DB", xp: 1850, rank: 3 },
            ].map((player) => (
              <div key={player.rank} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 flex items-center justify-center rounded-lg font-bold
                                ${player.rank === 1 ? "bg-yellow-100 text-yellow-700" :
                      player.rank === 2 ? "bg-slate-100 text-slate-700" :
                        "bg-orange-100 text-orange-800"}`}>
                    {player.rank}
                  </div>
                  <span className="font-medium">{player.name}</span>
                </div>
                <div className="text-sm font-mono text-slate-500">{player.xp} XP</div>
              </div>
            ))}
            <div className="text-center pt-2">
              <p className="text-xs text-slate-400">แข่งทำโจทย์ให้ไว แล้วมาติดอันดับกัน!</p>
            </div>
          </div>
        </section>
      </div>

    </div>
  );
}
