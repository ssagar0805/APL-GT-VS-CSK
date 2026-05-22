'use client';

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Sparkles, ArrowRight, BrainCircuit, Activity, Target } from "lucide-react";
import { useTacticalInsights } from "@/hooks/use-polling";

const iconMap: Record<string, any> = {
  Activity: Activity,
  BrainCircuit: BrainCircuit,
  Target: Target,
};

export function InsightPanel() {
  const { data, loading } = useTacticalInsights();

  if (loading) {
     return (
       <Card className="col-span-1 h-full border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent rounded-2xl flex flex-col justify-center items-center">
         <div className="w-6 h-6 rounded-full border-2 border-white/20 border-t-emerald-500 animate-spin mb-3"></div>
         <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Synthesizing Insights...</p>
       </Card>
     )
  }

  const insightsList = data?.contextualInsights || [];

  return (
    <Card className="h-full border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent rounded-2xl flex flex-col min-h-0">
      <CardHeader className="border-b border-white/10 pb-3 flex flex-row items-center justify-between">
        <CardTitle className="text-[10px] uppercase font-black tracking-[0.2em] text-emerald-400">Tactical Feed</CardTitle>
        <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
      </CardHeader>
      <CardContent className="p-0 flex-1 overflow-y-auto">
        <div className="divide-y divide-white/10">
          {insightsList.map((insight: any) => {
            const Icon = iconMap[insight.type] || Sparkles;
            return (
              <div key={insight.id} className="p-3 hover:bg-white/5 transition-colors group cursor-pointer">
                <div className="flex items-start">
                  <div className={`mt-0.5 mr-3 p-1.5 rounded bg-white/5 border border-white/10 ${insight.color}`}>
                    <Icon className="w-3 h-3" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-0.5">
                      <span className="text-[9px] font-mono font-bold text-slate-500 bg-black/40 px-1.5 py-0.5 rounded border border-white/5">{insight.timestamp}</span>
                      <h4 className="text-[11px] font-bold text-slate-200 group-hover:text-white transition-colors">{insight.title}</h4>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">{insight.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
