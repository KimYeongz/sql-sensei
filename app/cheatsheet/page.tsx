import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import cheatSheetData from "@/data/cheat_sheet.json";
import { FileText } from "lucide-react";

export default function CheatSheetPage() {
    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold">สรุปสูตร (Cheat Sheet)</h1>
                <p className="text-slate-500">คู่มือกันลืม: ลำดับการทำงาน, JOIN Types และข้อควรระวัง</p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
                {cheatSheetData.sections.map((section, idx) => (
                    <Card key={idx} className="h-full">
                        <CardHeader className="bg-slate-50 dark:bg-slate-900 border-b">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <FileText className="w-4 h-4 text-slate-500" />
                                {section.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y divide-slate-100 dark:divide-slate-800">
                                {section.content.map((item, i) => (
                                    <div key={i} className="p-4 flex flex-col gap-1 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                                        <span className="font-mono text-sm font-bold text-blue-600 dark:text-blue-400">
                                            {item.keyword}
                                        </span>
                                        <span className="text-sm text-slate-600 dark:text-slate-300">
                                            {item.desc}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
