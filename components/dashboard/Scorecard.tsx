'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLiveMatch } from "@/hooks/use-polling";

export function Scorecard() {
  const { data, loading, error } = useLiveMatch();

  if (loading) {
    return (
      <Card className="overflow-hidden border-white/10 bg-white/[0.03] rounded-2xl h-[330px] flex items-center justify-center animate-pulse">
        <div className="text-center">
          <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-emerald-500 animate-spin mx-auto mb-4"></div>
          <p className="text-xs uppercase tracking-widest text-slate-500 font-bold">Connecting to live feed...</p>
        </div>
      </Card>
    );
  }

  if (error || !data) {
    return (
      <Card className="overflow-hidden border-white/10 bg-white/[0.03] rounded-2xl h-[330px] flex items-center justify-center">
        <div className="text-center">
          <p className="text-xs uppercase tracking-widest text-red-500 font-bold mb-2">Feed Disconnected</p>
          <p className="text-xs text-slate-500">{error || "Failed to load match data"}</p>
        </div>
      </Card>
    );
  }

  const isHomeBatting = data.currentInnings === 'home';

  return (
    <Card className="overflow-hidden border-white/10 bg-white/[0.03] rounded-2xl h-[330px]">
      <CardContent className="p-0 h-full flex flex-col justify-between">
        <div className="flex justify-between items-start p-6">
          <div>
            <Badge variant="outline" className="text-emerald-400 border-emerald-400/20 bg-emerald-400/10 hover:bg-emerald-400/20 mb-3 text-[10px] tracking-widest font-black uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-2 animate-pulse"></span>
              LIVE
            </Badge>
            <h2 className="text-xl font-bold tracking-tight text-white mb-1">{data.title}</h2>
            <p className="text-sm font-medium text-slate-400">{data.venue} • {data.toss}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase font-bold tracking-widest text-slate-500 mb-1">Required RR</p>
            <p className="text-xl font-mono font-bold text-white transition-all duration-300 transform scale-100">{data.requiredRunRate}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 divide-x divide-white/10 border-y border-white/10 bg-black/20 flex-1">
          <div className={`p-6 flex flex-col justify-center transition-opacity duration-500 ${isHomeBatting ? 'bg-white/[0.02]' : 'opacity-40 grayscale -z-10'}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold uppercase tracking-widest text-slate-400">{data.teams.home.name}</span>
              {isHomeBatting && <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />}
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-5xl font-black tracking-tighter text-white tabular-nums transition-transform duration-300">{data.teams.home.score}/{data.teams.home.wickets}</span>
            </div>
            <div className="mt-2 text-sm text-slate-400 font-mono transition-colors duration-300">({data.teams.home.overs} ov) • CRR: {data.teams.home.runRate}</div>
          </div>
          
          <div className={`p-6 flex flex-col justify-center transition-opacity duration-500 ${!isHomeBatting ? 'bg-white/[0.02]' : 'opacity-40 grayscale -z-10'}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold uppercase tracking-widest text-slate-400">{data.teams.away.name}</span>
              {!isHomeBatting && <span className="w-2 h-2 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.8)]" />}
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-5xl font-black tracking-tighter text-white tabular-nums transition-transform duration-300">{data.teams.away.score}/{data.teams.away.wickets}</span>
            </div>
            <div className="mt-2 text-sm text-slate-400 font-mono transition-colors duration-300">({data.teams.away.overs} ov) • CRR: {data.teams.away.runRate}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
