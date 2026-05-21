'use client';

import { Activity, BrainCircuit, LineChart as ChartIcon, Trophy } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { name: "Live Dashboard", href: "/", icon: Activity },
  { name: "Momentum Engine", href: "/momentum", icon: ChartIcon },
  { name: "Tactical Insights", href: "/insights", icon: BrainCircuit },
  { name: "Match Predictions", href: "/predictions", icon: Trophy },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-white/10 bg-black/40 backdrop-blur-md">
      <div className="flex h-16 items-center px-6 border-b border-white/10">
        <span className="text-sm font-black uppercase tracking-widest text-slate-200">Cricket AI</span>
      </div>
      
      <div className="px-4 py-6">
        <ul className="space-y-2">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <li key={item.name}>
                <Link 
                  href={item.href} 
                  className={cn(
                    "flex items-center rounded-lg px-3 py-2 text-[10px] font-bold uppercase tracking-widest transition-colors",
                    isActive 
                      ? "bg-white/[0.05] border border-white/10 text-blue-400" 
                      : "text-slate-400 hover:bg-white/[0.05] hover:text-slate-100"
                  )}
                >
                  <Icon className="mr-3 h-4 w-4" />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
