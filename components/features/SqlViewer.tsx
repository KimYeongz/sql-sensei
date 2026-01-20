"use client";

import { cn } from "@/lib/utils";

interface SqlViewerProps {
    sql: string;
    className?: string;
    title?: string;
}

export function SqlViewer({ sql, className, title }: SqlViewerProps) {
    // Simple syntax highlighting via regex replacement or just clean display
    // For a real app we might use prismjs, but here we'll do basic formatting.

    return (
        <div className={cn("rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 text-slate-50 font-mono text-sm", className)}>
            {title && (
                <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 text-xs text-slate-400 font-sans uppercase tracking-wider">
                    {title}
                </div>
            )}
            <div className="p-4 overflow-x-auto whitespace-pre-wrap">
                <code>{sql}</code>
            </div>
        </div>
    );
}
