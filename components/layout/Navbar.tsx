import { Menu } from "lucide-react";

export function Navbar() {
    return (
        <div className="h-16 border-b bg-white dark:bg-slate-950 flex items-center px-6 lg:hidden">
            <button className="p-2 -ml-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800">
                <Menu className="w-6 h-6" />
            </button>
            <span className="ml-4 font-bold text-lg">SQL Sensei</span>
        </div>
    );
}
