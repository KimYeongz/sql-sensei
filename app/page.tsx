import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight, BookOpen, Brain, Trophy, ShieldAlert } from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          ยินดีต้อนรับสู่ <span className="text-blue-600">SQL Sensei</span>
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl">
          เว็บติว SQL สายโหด เน้นสอบได้จริง ฝึกแพทเทิร์น จับจุดหลอก และเขียนโค้ดให้เป๊ะ
        </p>
        <div className="flex gap-4">
          <Link href="/map">
            <Button size="lg" className="gap-2">
              เริ่มเรียนรู้ <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/exam">
            <Button size="lg" variant="outline" className="gap-2">
              ทำข้อสอบ <Trophy className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: "แผนการเรียนรู้",
            desc: "เริ่มจากศูนย์จนถึงระดับสูง (Advance)",
            icon: BookOpen,
            href: "/map",
            color: "text-blue-500"
          },
          {
            title: "ตะลุยโจทย์ MCQ",
            desc: "25 ข้อเน้นคอนเซปต์และจุดหลอก",
            icon: Brain,
            href: "/exam/part1",
            color: "text-purple-500"
          },
          {
            title: "คลังแพทเทิร์น",
            desc: "11 สูตรสำเร็จ SQL ที่ต้องรู้",
            icon: ShieldAlert,
            href: "/patterns",
            color: "text-emerald-500"
          },
          {
            title: "โหมดติวเข้ม",
            desc: "เช็ค Top Errors และ Checklist ก่อนสอบ",
            icon: Trophy,
            href: "/tutor",
            color: "text-amber-500"
          }
        ].map((item) => (
          <Link key={item.title} href={item.href}>
            <Card className="h-full hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors cursor-pointer border-l-4" style={{ borderLeftColor: 'currentcolor' }}>
              <CardHeader>
                <item.icon className={`w-8 h-8 mb-2 ${item.color}`} />
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.desc}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>

      <section className="bg-slate-100 dark:bg-slate-900 rounded-xl p-8 border border-slate-200 dark:border-slate-800">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="space-y-4 flex-1">
            <Badge variant="warning">ใหม่!</Badge>
            <h2 className="text-2xl font-bold">จำลองการสอบแบบเข้ม (Strict Exam)</h2>
            <p className="text-slate-600 dark:text-slate-400">
              ข้อสอบของเราออกแบบมาเพื่อ "หลอกดาว" โดยเฉพาะ เราทดสอบ Edge cases, การจัดการ NULL,
              และความเข้าใจเรื่อง Transaction ถ้าคุณสอบผ่านที่นี่ คุณสอบผ่านทุกที่
            </p>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-green-500" /> ใช้ Schema ระบบร้านค้าจริง (E-commerce)</li>
              <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-green-500" /> เฉลยละเอียดพร้อมเหตุผล</li>
              <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-green-500" /> มีตัวจับเวลา Drill (เร็วๆ นี้)</li>
            </ul>
          </div>
          <div className="flex-1 bg-slate-950 p-6 rounded-lg text-slate-300 font-mono text-sm shadow-2xl w-full max-w-md">
            <div className="flex gap-2 mb-4 border-b border-slate-800 pb-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <p className="text-purple-400">SELECT</p>
            <p className="pl-4 text-blue-400">c.name, COUNT(o.id)</p>
            <p className="text-purple-400">FROM</p>
            <p className="pl-4 text-yellow-300">customers c</p>
            <p className="text-purple-400">LEFT JOIN</p>
            <p className="pl-4 text-yellow-300">orders o ON c.id = o.customer_id</p>
            <p className="text-purple-400">GROUP BY</p>
            <p className="pl-4 text-blue-400">c.id</p>
            <p className="text-purple-400">HAVING</p>
            <p className="pl-4 text-red-400">COUNT(o.id) {'>'} 5;</p>
          </div>
        </div>
      </section>
    </div>
  );
}
