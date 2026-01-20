import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Use Inter as standard font (it supports Thai reasonably well or fallback) - Actually Inter might not support Thai perfectly, but browsers fallback to system sans-serif. For better Thai, 'Prompt' or 'Sarabun' is better. Let's assume standard sans is okay.
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";
import { GamificationProvider } from "@/components/providers/GamificationProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SQL Exam Tutor | ติวสอบเข้ม",
  description: "ฝึกฝน SQL ด้วยโจทย์จริง เรียนรู้จากแพทเทิร์น และจุดหลอกที่พบบ่อย (Strict Mode)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className={inter.className}>
        <GamificationProvider>
          <div className="flex h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-hidden">
            {/* Sidebar for Desktop */}
            <div className="hidden lg:block h-full">
              <Sidebar />
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-full overflow-hidden">
              <Navbar />
              <main className="flex-1 overflow-y-auto p-4 md:p-8">
                {children}
              </main>
            </div>
          </div>
        </GamificationProvider>
      </body>
    </html>
  );
}
