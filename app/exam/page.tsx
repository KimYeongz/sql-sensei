import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Brain, Database, ShieldCheck, ArrowRight } from "lucide-react";

export default function ExamDashboardPage() {
    const exams = [
        {
            id: "part1",
            title: "ส่วนที่ 1: ปรนัย (MCQ) แนวคิด",
            desc: "25 ข้อวัด Concept เน้นความแม่นยำทางทฤษฎีและลำดับการทำงาน (Execution Order) มีจุดหลอกเยอะ",
            icon: Brain,
            color: "text-purple-500",
            href: "/exam/part1",
            count: "25 ข้อ"
        },
        {
            id: "part2",
            title: "ส่วนที่ 2: เขียน SQL (SELECT)",
            desc: "20 โจทย์ปัญหา ตั้งแต่การดึงข้อมูลธรรมดา (Basic) จนถึงการ JOIN 3 ตารางและการใช้ Subquery",
            icon: Database,
            color: "text-blue-500",
            href: "/exam/part2",
            count: "20 ข้อ"
        },
        {
            id: "part3",
            title: "ส่วนที่ 3: โจทย์งานจริง (App SQL)",
            desc: "20 สถานการณ์จริง: INSERT, UPDATE, ลบข้อมูล, Transaction, Locking และความปลอดภัย",
            icon: ShieldCheck,
            color: "text-emerald-500",
            href: "/exam/part3",
            count: "20 ข้อ"
        }
    ];

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-extrabold">ศูนย์สอบ (Exam Center)</h1>
                <p className="text-xl text-slate-500">เลือกสนามสอบของคุณ (ข้อสอบมีความยากผสม)</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {exams.map((exam) => (
                    <Link key={exam.id} href={exam.href} className="group">
                        <Card className="h-full hover:border-blue-500 transition-colors relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <exam.icon className="w-24 h-24" />
                            </div>
                            <CardHeader>
                                <exam.icon className={`w-10 h-10 mb-2 ${exam.color}`} />
                                <CardTitle>{exam.title}</CardTitle>
                                <div className="text-xs font-mono bg-slate-100 dark:bg-slate-800 w-fit px-2 py-1 rounded">
                                    {exam.count}
                                </div>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base font-medium text-slate-600 dark:text-slate-300">
                                    {exam.desc}
                                </CardDescription>
                                <div className="mt-6 flex items-center text-blue-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
                                    เริ่มทำข้อสอบ <ArrowRight className="ml-1 w-4 h-4" />
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
