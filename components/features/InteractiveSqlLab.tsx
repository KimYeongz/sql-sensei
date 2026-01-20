import { useEffect, useState, useRef } from "react";
// @ts-ignore
import initSqlJs from "sql.js";
import { LAB_INIT_SQL } from "@/lib/lab_data";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Play, RefreshCw, Table, Loader2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SqlLabProps {
    initialSql?: string;
    onRun?: (result: any[], error: string | null) => void;
}

export function InteractiveSqlLab({ initialSql = "", onRun }: SqlLabProps) {
    const [db, setDb] = useState<any>(null);
    const [sql, setSql] = useState(initialSql);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<{ columns: string[], values: any[][] } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadDb = async () => {
            try {
                const SQL = await initSqlJs({
                    locateFile: (file: string) => `/${file}`
                });
                const database = new SQL.Database();
                database.run(LAB_INIT_SQL);
                setDb(database);
                setLoading(false);
            } catch (err) {
                console.error("Failed to load sql.js", err);
                setError("Failed to initialize database engine.");
                setLoading(false);
            }
        };
        loadDb();
    }, []);

    const runQuery = () => {
        if (!db) return;
        setError(null);
        setResult(null);

        try {
            const res = db.exec(sql);
            if (res.length > 0) {
                setResult(res[0]);
                if (onRun) onRun(res[0].values, null);
            } else {
                setResult({ columns: ["Message"], values: [["Query executed successfully. No rows returned."]] });
                if (onRun) onRun([], null);
            }
        } catch (e: any) {
            setError(e.message);
            if (onRun) onRun([], e.message);
        }
    };

    const resetDb = () => {
        if (!db) return;
        setResult(null);
        setError(null);
        try {
            db.run(LAB_INIT_SQL); // Re-run init script
        } catch (e: any) {
            setError("Failed to reset database: " + e.message);
        }
    };

    if (loading) {
        return <div className="p-8 text-center text-slate-500 flex flex-col items-center gap-2">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            Preparing Database...
        </div>;
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                    <Table className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Interactive SQL Console</span>
                </div>
                <Button size="sm" variant="ghost" onClick={resetDb} className="h-8 text-xs text-slate-500 hover:text-red-500">
                    <RefreshCw className="w-3 h-3 mr-1" /> Reset DB
                </Button>
            </div>

            <div className="relative">
                <Textarea
                    value={sql}
                    onChange={(e) => setSql(e.target.value)}
                    className="font-mono text-sm min-h-[150px] bg-slate-900 text-slate-100 border-slate-700 resize-y p-4 leading-relaxed"
                    placeholder="SELECT * FROM customers..."
                    spellCheck={false}
                />
                <Button
                    onClick={runQuery}
                    className="absolute bottom-4 right-4 bg-green-600 hover:bg-green-700 shadow-lg"
                >
                    <Play className="w-4 h-4 mr-2" /> Run Query
                </Button>
            </div>

            {/* Error Display */}
            {error && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-300 rounded-lg text-sm border border-red-200 dark:border-red-900 font-mono">
                    ⚠️ Error: {error}
                </div>
            )}

            {/* Result Display */}
            {result && (
                <div className="rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300">
                                <tr>
                                    {result.columns.map((col, i) => (
                                        <th key={i} className="px-4 py-3 font-semibold border-b border-slate-200 dark:border-slate-800 whitespace-nowrap">
                                            {col}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-950">
                                {result.values.map((row, i) => (
                                    <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                                        {row.map((cell: any, j: number) => (
                                            <td key={j} className="px-4 py-3 font-mono text-slate-600 dark:text-slate-400 whitespace-nowrap">
                                                {cell === null ? <span className="text-slate-300 italic">NULL</span> : String(cell)}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-900 px-4 py-2 text-xs text-slate-500 border-t border-slate-200 dark:border-slate-800 text-right">
                        {result.values.length} rows returned
                    </div>
                </div>
            )}
        </div>
    );
}
