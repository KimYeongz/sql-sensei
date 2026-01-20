"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SqlViewer } from "@/components/features/SqlViewer";
import schemaData from "@/data/schema.json";
import { Database, Table, Key, FileCode, HardDrive } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function SchemaPage() {
    const [activeTab, setActiveTab] = useState<"dictionary" | "ddl" | "seed">("dictionary");

    return (
        <div className="space-y-8 max-w-6xl mx-auto">
            <div className="space-y-4">
                <h1 className="text-3xl font-bold">โครงสร้างข้อมูล (Database Schema)</h1>
                <p className="text-slate-500">
                    ระบบ E-commerce จำลอง ประกอบด้วยลูกค้า (Customers), สินค้า (Products),
                    คำสั่งซื้อ (Orders), รายการสั่งซื้อ (Items) และการชำระเงิน (Payments)
                </p>
            </div>

            <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800 pb-1 overflow-x-auto">
                <Button
                    variant="ghost"
                    onClick={() => setActiveTab("dictionary")}
                    className={cn("gap-2", activeTab === "dictionary" && "bg-slate-100 dark:bg-slate-800 text-blue-600")}
                >
                    <Table className="w-4 h-4" /> พจนานุกรมข้อมูล (Dictionary)
                </Button>
                <Button
                    variant="ghost"
                    onClick={() => setActiveTab("ddl")}
                    className={cn("gap-2", activeTab === "ddl" && "bg-slate-100 dark:bg-slate-800 text-blue-600")}
                >
                    <FileCode className="w-4 h-4" /> DDL Script (SQL)
                </Button>
                <Button
                    variant="ghost"
                    onClick={() => setActiveTab("seed")}
                    className={cn("gap-2", activeTab === "seed" && "bg-slate-100 dark:bg-slate-800 text-blue-600")}
                >
                    <HardDrive className="w-4 h-4" /> Sample Data (Seed)
                </Button>
            </div>

            {activeTab === "dictionary" && (
                <div className="grid gap-12">
                    {schemaData.tables.map((table) => (
                        <div key={table.name} className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Database className="w-5 h-5 text-slate-400" />
                                <h2 className="text-xl font-bold font-mono text-blue-700 dark:text-blue-400">{table.name}</h2>
                                <span className="text-sm text-slate-500">({table.description})</span>
                            </div>

                            <div className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-slate-50 dark:bg-slate-900 text-slate-500 font-medium">
                                        <tr>
                                            <th className="px-4 py-3 w-1/4">Column</th>
                                            <th className="px-4 py-3 w-1/4">Type</th>
                                            <th className="px-4 py-3">Attributes</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-950">
                                        {table.columns.map((col: any) => (
                                            <tr key={col.name} className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                                                <td className="px-4 py-3 font-mono font-medium">{col.name}</td>
                                                <td className="px-4 py-3 text-slate-500 font-mono text-xs">{col.type}</td>
                                                <td className="px-4 py-3">
                                                    <div className="flex gap-2">
                                                        {col.isPk && <Badge variant="default" className="bg-amber-500 hover:bg-amber-600 text-[10px] h-5 px-1.5"><Key className="w-3 h-3 mr-1" /> PK</Badge>}
                                                        {col.isFk && <Badge variant="outline" className="text-[10px] h-5 px-1.5 border-blue-400 text-blue-500">FK</Badge>}
                                                        {col.constraints?.includes("NOT NULL") && <Badge variant="secondary" className="text-[10px] h-5 px-1.5">NN</Badge>}
                                                        {col.constraints?.includes("UNIQUE") && <Badge variant="secondary" className="text-[10px] h-5 px-1.5">UQ</Badge>}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {activeTab === "ddl" && (
                <div className="space-y-4">
                    <div className="p-4 bg-yellow-50 text-yellow-800 border-l-4 border-yellow-400 text-sm">
                        Run script นี้เพื่อสร้างตารางทั้งหมดในเครื่องของคุณ
                    </div>
                    <SqlViewer sql={`-- Copy from ddl.sql content here or load dynamically --\n\nCREATE TABLE customers ...`} title="schema.sql" />
                    <p className="text-xs text-slate-400">* เพื่อความรวดเร็ว DDL ฉบับเต็มอยู่ในไฟล์ ddl.sql ในโฟลเดอร์ data</p>
                </div>
            )}

            {activeTab === "seed" && (
                <div className="space-y-4">
                    <div className="p-4 bg-green-50 text-green-800 border-l-4 border-green-400 text-sm">
                        ข้อมูลตัวอย่าง (Dummy Data) สำหรับทดสอบ Query
                    </div>
                    <SqlViewer sql={`-- Copy from seed.sql content here --\n\nINSERT INTO customers ...`} title="seed.sql" />
                    <p className="text-xs text-slate-400">* เพื่อความรวดเร็ว Seed ฉบับเต็มอยู่ในไฟล์ seed.sql ในโฟลเดอร์ data</p>
                </div>
            )}
        </div>
    );
}
