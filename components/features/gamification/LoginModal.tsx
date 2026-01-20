"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Trophy, ArrowRight, Loader2 } from "lucide-react";

interface LoginModalProps {
    onLogin: (name: string) => Promise<void>;
}

export function LoginModal({ onLogin }: LoginModalProps) {
    const [name, setName] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;

        setIsLoading(true);
        try {
            await onLogin(name);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md bg-slate-900 border-slate-800 text-white">
                <CardHeader className="text-center space-y-4">
                    <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                        <Trophy className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 text-transparent bg-clip-text">
                            SQL Sensei
                        </CardTitle>
                        <CardDescription className="text-slate-400 mt-2">
                            กรุณาใส่ชื่อของคุณเพื่อเริ่มเก็บเลเวลและสะสมเหรียญรางวัล
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Input
                                placeholder="ชื่อของคุณ (เช่น DevMaster)"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="bg-slate-950 border-slate-800 text-white placeholder:text-slate-600 h-12 text-lg text-center"
                                autoFocus
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full h-12 bg-blue-600 hover:bg-blue-700 font-bold text-lg"
                            disabled={isLoading || !name.trim()}
                        >
                            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <span className="flex items-center gap-2">เริ่มผจญภัย <ArrowRight className="w-5 h-5" /></span>}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
