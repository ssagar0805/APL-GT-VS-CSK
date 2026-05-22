'use client';
import { useLiveDuel } from '@/hooks/use-polling';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldAlert, Crosshair, Zap, Activity } from 'lucide-react';
import { useState } from 'react';

export function LiveBattleArea() {
  const { data, loading } = useLiveDuel();
  const [activeTab, setActiveTab] = useState<'current' | 'next'>('current');

  if (loading) return (
     <Card className="border-white/10 bg-white/[0.03] rounded-2xl h-full flex items-center justify-center">
       <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-emerald-500 animate-spin opacity-50"></div>
     </Card>
  );

  const { batters, bowler, nextBatter } = data || {};

  return (
    <Card className="border-white/10 bg-white/[0.03] rounded-2xl flex flex-col h-full">
      <CardHeader className="border-b border-white/10 pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400 flex items-center">
             <Activity className="w-3.5 h-3.5 mr-2" />
             Live Tactical Duel
          </CardTitle>
          <div className="flex space-x-2">
             <button onClick={() => setActiveTab('current')} className={`text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded transition-colors ${activeTab === 'current' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-white/5 text-slate-400 border border-white/10'}`}>Current Focus</button>
             <button onClick={() => setActiveTab('next')} className={`text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded transition-colors ${activeTab === 'next' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-white/5 text-slate-400 border border-white/10'}`}>Next Batter</button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {activeTab === 'current' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
             {/* Batters */}
             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 border-b border-white/10 pb-2">At The Crease</h3>
                {batters?.map((batter: any, i: number) => (
                  <div key={i} className="p-3 bg-white/5 border border-white/5 rounded-lg flex flex-col">
                     <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center space-x-2">
                           <span className="font-bold text-slate-200 text-sm">{batter.name}</span>
                           {i === 0 && <span className="bg-yellow-500/20 text-yellow-500 border border-yellow-500/30 px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-wider">Strike</span>}
                        </div>
                        <div className="text-right flex items-baseline">
                           <span className="font-black text-white text-lg">{batter.runs}</span>
                           <span className="text-slate-400 text-[10px] font-mono ml-1">({batter.balls})</span>
                        </div>
                     </div>
                     <div className="flex justify-between items-center mb-3 text-[10px]">
                        <span className="text-slate-400 uppercase tracking-widest font-bold">SR: {batter.strikeRate}</span>
                        <span className="text-emerald-400/80">{batter.matchupVsBowler}</span>
                     </div>
                     <div className="flex space-x-1 mt-auto">
                        {batter.recentShots?.map((shot: string, j: number) => (
                          <div key={j} className={`flex-1 h-6 rounded flex items-center justify-center text-[10px] font-black font-mono border ${shot === 'W' ? 'bg-red-500/20 text-red-400 border-red-500/30' : shot === '4' || shot === '6' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-white/5 text-slate-300 border-white/5'}`}>{shot}</div>
                        ))}
                     </div>
                  </div>
                ))}
             </div>
             {/* Bowler */}
             <div className="flex flex-col h-full">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 border-b border-white/10 pb-2">Operating Bowler</h3>
                <div className="p-4 bg-white/5 border border-white/5 rounded-lg flex flex-col h-full">
                   <div className="flex justify-between items-start mb-4">
                      <div>
                         <span className="font-bold text-slate-200 text-sm block mb-1">{bowler?.name}</span>
                         <span className="text-slate-400 text-[10px] tracking-widest uppercase font-bold">{bowler?.overs} Overs • {bowler?.runs}/{bowler?.wickets}</span>
                      </div>
                      <div className="text-right">
                         <span className="text-[9px] tracking-widest uppercase font-bold text-slate-500 block mb-1">Avg Pace</span>
                         <span className="font-mono text-emerald-400 text-sm font-bold">{bowler?.avgSpeed}</span>
                      </div>
                   </div>
                   
                   <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-black/30 p-2 rounded border border-white/5">
                         <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold block mb-1">Dot %</span>
                         <span className="font-mono text-slate-200 text-xs font-bold">{bowler?.dotBallPercent}</span>
                      </div>
                      <div className="bg-black/30 p-2 rounded border border-white/5">
                         <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold block mb-1">Econ</span>
                         <span className="font-mono text-slate-200 text-xs font-bold">{bowler?.economy}</span>
                      </div>
                   </div>

                   <div className="mb-4 text-[10px]">
                      <span className="text-slate-500 uppercase tracking-widest font-bold block mb-1">Key Variations</span>
                      <div className="flex flex-wrap gap-1.5">
                         {bowler?.variations?.map((v: string, i: number) => (
                           <span key={i} className="bg-white/10 text-slate-300 px-2 py-1 rounded font-bold">{v}</span>
                         ))}
                      </div>
                   </div>

                   <div className="mt-auto pt-2">
                      <span className="text-slate-500 text-[9px] uppercase tracking-widest font-bold block mb-1.5">Recent Deliveries</span>
                      <div className="flex space-x-1">
                         {bowler?.recentDeliveries?.map((ball: string, i: number) => (
                            <div key={i} className={`flex-1 h-6 rounded flex items-center justify-center text-[9px] font-black font-mono border ${ball === 'W' ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-black/40 text-slate-400 border-white/5'}`}>
                               {ball}
                            </div>
                         ))}
                      </div>
                   </div>
                </div>
             </div>
          </div>
        ) : (
          <div className="h-full flex flex-col p-2">
             <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-blue-500/10 rounded-full border-2 border-blue-500/30 flex items-center justify-center">
                   <ShieldAlert className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                   <h2 className="text-base font-black text-white">{nextBatter?.name}</h2>
                   <p className="text-[9px] text-blue-400 uppercase tracking-widest font-bold font-mono mt-0.5">Incoming Target Profile</p>
                </div>
             </div>
             
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
                <div className="bg-white/5 border border-white/5 rounded-lg p-3">
                   <h3 className="text-[9px] text-emerald-400 font-black tracking-widest uppercase mb-2 flex items-center"><Zap className="w-3 h-3 mr-1" /> Strengths</h3>
                   <ul className="space-y-1.5">
                      {nextBatter?.strengths?.map((s: string, i: number) => (
                        <li key={i} className="text-[11px] text-slate-300 flex items-center"><span className="w-1 h-1 bg-emerald-500 rounded-full mr-2 shrink-0"></span>{s}</li>
                      ))}
                   </ul>
                </div>
                <div className="bg-white/5 border border-white/5 rounded-lg p-3">
                   <h3 className="text-[9px] text-red-400 font-black tracking-widest uppercase mb-2 flex items-center"><Crosshair className="w-3 h-3 mr-1" /> Vulnerabilities</h3>
                   <ul className="space-y-1.5">
                      {nextBatter?.weaknesses?.map((s: string, i: number) => (
                        <li key={i} className="text-[11px] text-slate-300 flex items-center"><span className="w-1 h-1 bg-red-500 rounded-full mr-2 shrink-0"></span>{s}</li>
                      ))}
                   </ul>
                </div>
             </div>

             <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-3 mt-4">
                <span className="text-[9px] text-blue-400/70 font-black tracking-widest uppercase block mb-1">AI Tactical Formulation</span>
                <p className="text-xs text-blue-100 font-medium leading-relaxed">{nextBatter?.tacticalNotes}</p>
                <div className="mt-2 text-[10px] font-mono font-bold text-red-400 bg-red-400/10 inline-block px-2 py-0.5 rounded border border-red-400/20">
                   Matchup Risk: {nextBatter?.matchupRisk}
                </div>
             </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
