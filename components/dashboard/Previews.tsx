'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePredictions, useTacticalInsights } from "@/hooks/use-polling";

export function WinProbabilityPreview() {
  const { data, loading } = usePredictions();
  
  if (loading) {
     return <Card className="col-span-1 border-white/10 bg-white/[0.03] animate-pulse h-[120px] rounded-2xl" />;
  }
  const teamAProb = data?.winProbability?.home || 50;
  const teamBProb = data?.winProbability?.away || 50;
  
  return (
    <Card className="col-span-1 border-white/10 bg-white/[0.03] flex flex-col h-[120px] rounded-2xl hover:bg-white/[0.04] transition-colors cursor-pointer group">
       <CardHeader className="border-b border-white/10 pb-2 pt-3">
         <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400 group-hover:text-emerald-300 transition-colors">Win Probability Engine</CardTitle>
       </CardHeader>
       <CardContent className="p-3 flex-1 flex flex-col justify-center">
         <div className="w-full flex justify-between text-[9px] font-bold uppercase tracking-widest mb-2">
            <span className="text-blue-400">GT {teamAProb}%</span>
            <span className="text-yellow-500">CSK {teamBProb}%</span>
         </div>
         <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden flex mb-2">
            <div className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all duration-1000" style={{ width: `${teamAProb}%` }}></div>
            <div className="h-full bg-yellow-600 shadow-[0_0_10px_rgba(202,138,4,0.5)] transition-all duration-1000" style={{ width: `${teamBProb}%` }}></div>
         </div>
         <div className="flex justify-between items-center text-[9px] text-slate-400 uppercase tracking-widest">
           <span>Chase Confidence</span>
           <span className="font-bold text-slate-200">Impossible</span>
         </div>
       </CardContent>
    </Card>
  )
}

export function BallSpeedPreview() {
  const { data, loading } = useTacticalInsights();
  
  if (loading) {
     return <Card className="col-span-1 border-white/10 bg-white/[0.03] animate-pulse h-[120px] rounded-2xl" />;
  }
  
  const metric1 = data?.metrics?.[0] || { label: "Pace", value: "140 km/h" };
  const metric2 = data?.metrics?.[1] || { label: "Dev", value: "1.2°" };

  return (
    <Card className="col-span-1 border-white/10 bg-white/[0.03] flex flex-col h-[120px] rounded-2xl relative overflow-hidden group cursor-pointer hover:bg-white/[0.04]">
       <div className="absolute -right-8 -top-8 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl animate-pulse group-hover:bg-blue-500/20 transition-colors"></div>
       <CardHeader className="border-b border-white/10 pb-2 pt-3">
         <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 flex items-center justify-between group-hover:text-blue-300 transition-colors">
           Bowling Intensity
           <span className="flex h-1.5 w-1.5 relative">
             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
             <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500"></span>
           </span>
         </CardTitle>
       </CardHeader>
       <CardContent className="p-3 flex-1 flex flex-col justify-center">
          <div className="grid grid-cols-2 gap-4">
             <div>
                <p className="text-[9px] uppercase font-bold text-slate-500 mb-1">{metric1.label}</p>
                <div className="flex items-baseline space-x-1">
                   <p className="text-lg font-mono font-bold text-slate-200 tabular-nums transition-all">{metric1.value}</p>
                </div>
             </div>
             <div>
                <p className="text-[9px] uppercase font-bold text-slate-500 mb-1">{metric2.label}</p>
                <div className="flex items-baseline space-x-1">
                   <p className="text-lg font-mono font-bold text-emerald-400 tabular-nums transition-all">{metric2.value}</p>
                </div>
             </div>
          </div>
       </CardContent>
    </Card>
  )
}

export function FieldConfigurationPreview() {
  const { data, loading } = useTacticalInsights();
  
  if (loading) {
     return <Card className="col-span-1 border-white/10 bg-white/[0.03] animate-pulse h-[120px] rounded-2xl" />;
  }

  const title = data?.fieldAnalysis?.title || "Standard Field";

  return (
    <Card className="col-span-1 border-white/10 bg-white/[0.03] flex flex-col h-[120px] rounded-2xl group cursor-pointer hover:border-white/20 transition-colors hover:bg-white/[0.04]">
       <CardHeader className="border-b border-white/10 pb-2 pt-3">
         <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-slate-300 transition-colors">Field Strategy Focus</CardTitle>
       </CardHeader>
       <CardContent className="p-3 flex-1 flex items-center space-x-4">
          <div className="w-12 h-12 shrink-0 border border-emerald-900/50 rounded-full flex items-center justify-center relative bg-emerald-950/20 shadow-[inset_0_0_10px_rgba(4,47,46,0.5)]">
            <div className="w-1 h-3 bg-white/20 absolute rounded-[1px]"></div>
            <div className="absolute top-2 left-2 w-1 h-1 bg-red-500 rounded-full shadow-[0_0_6px_red] animate-pulse"></div>
            <div className="absolute bottom-2 right-2 w-1 h-1 bg-red-500 rounded-full shadow-[0_0_6px_red] animate-pulse"></div>
            <div className="absolute top-1/2 left-1.5 w-1 h-1 bg-red-500 rounded-full shadow-[0_0_6px_red] animate-pulse" style={{ animationDelay: '500ms' }}></div>
          </div>
          <div>
            <h4 className="text-[11px] font-bold text-slate-200 group-hover:text-emerald-400 transition-colors">{title}</h4>
            <p className="text-[9px] text-slate-400 mt-0.5 line-clamp-2 leading-relaxed">{data?.fieldAnalysis?.description}</p>
          </div>
       </CardContent>
    </Card>
  )
}
