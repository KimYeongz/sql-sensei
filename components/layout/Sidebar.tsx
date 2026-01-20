"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    Map,
    FileText,
    Code,
    Database,
    PenTool,
    GraduationCap,
    LayoutDashboard
} from "lucide-react";
import { UserXPBar } from "@/components/features/gamification/UserXPBar";

// Translated navigation items
const navigation = [
    { name: "แดชบอร์ด", href: "/", icon: LayoutDashboard },
    { name: "แผนการเรียนรู้", href: "/map", icon: Map },
    { name: "สรุปสูตร (Cheat Sheet)", href: "/cheatsheet", icon: FileText },
    { name: "คลังแพทเทิร์น", href: "/patterns", icon: Code },
    { name: "โครงสร้างข้อมูล", href: "/schema", icon: Database },
    { name: "สอบวัดระดับ", href: "/exam", icon: PenTool },
    { name: "โหมดติวเข้ม", href: "/tutor", icon: GraduationCap },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="flex flex-col h-full bg-slate-900 text-white w-64 border-r border-slate-800">
            <div className="p-6 border-b border-slate-800">
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 text-transparent bg-clip-text">
                    SQL Sensei
                </h1>
                <p className="text-xs text-slate-400 mt-1">ติวสอบฐานข้อมูลแบบเข้มข้น</p>
            </div>

            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {navigation.map((item) => {
                    const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                                isActive
                                    ? "bg-blue-600 text-white"
                                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                            )}
                        >
                            <item.icon className="w-5 h-5" />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-slate-800">
                <div className="mb-4">
                    <UserXPBar />
                </div>
                <div className="p-4 bg-slate-800 rounded-lg text-xs text-slate-400">
                    <p className="font-semibold text-slate-200 mb-1">สถานะ: พร้อมใช้งาน</p>
                    <p>DB: MySQL 8 Compatible</p>
                </div>
            </div>
        </div>
    );
}
