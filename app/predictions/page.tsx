'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FlaskConical } from "lucide-react";
import { usePredictions } from "@/hooks/use-polling";

export default function PredictionsPage() {
  const { data, loading } = usePredictions();

  const renderContent = () => {
    if (loading) {
      return (
        <Card className="col-span-1 lg:col-span-2 border-white/10 bg-white/[0.03] rounded-2xl flex flex-col h-[400px] justify-center items-center">
            <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-emerald-500 animate-spin mb-4"></div>
            <p className="text-xs uppercase tracking-widest text-slate-500 font-bold">Warming up Simulator...</p>
        </Card>
      );
    }

    const { winProbability, keyDrivers, status } = data || {};
    const teamAProb = winProbability?.teamA || 50;
    const teamBProb = winProbability?.teamB || 50;

    return (
      <>
        <Card className="border-white/10 bg-white/[0.03] rounded-2xl flex flex-col h-[400px]">
          <CardHeader className="border-b border-white/10 pb-4">
            <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">Win Probability Engine</CardTitle>
          </CardHeader>
          <CardContent className="p-8 flex flex-col justify-center h-full">
            <div className="w-full flex justify-between text-[10px] font-bold uppercase tracking-widest mb-3">
              <span className="text-blue-400">Team A ({teamAProb}%)</span>
              <span className="text-yellow-500">Team B ({teamBProb}%)</span>
            </div>
            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden flex mb-8">
              <div className="h-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-1000" style={{ width: `${teamAProb}%` }}></div>
              <div className="h-full bg-yellow-600 shadow-[0_0_15px_rgba(202,138,4,0.5)] transition-all duration-1000" style={{ width: `${teamBProb}%` }}></div>
            </div>
            
            <div className="mt-8 space-y-4 border-t border-white/10 pt-8">
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Key Drivers</h4>
              {keyDrivers?.map((driver: any, i: number) => (
                <div key={i} className="flex justify-between items-center bg-black/40 p-3 rounded-lg border border-white/5">
                  <span className="text-sm font-medium text-slate-300">{driver.text}</span>
                  <span className="text-xs font-bold text-emerald-400">{driver.impact}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-white/[0.03] rounded-2xl flex flex-col h-[400px]">
          <CardHeader className="border-b border-white/10 pb-4">
            <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">Captain Decision Simulator</CardTitle>
          </CardHeader>
          <CardContent className="p-6 h-full">
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <div className="w-16 h-16 rounded-full border border-blue-500/30 flex items-center justify-center bg-blue-500/10 mb-2">
                <FlaskConical className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-slate-200">{status || "Simulation Engine Ready"}</h3>
              <p className="text-sm text-slate-400 max-w-sm">
                The decision simulator interprets alternative tactical outcomes (e.g., pace vs spin) using past match data. 
              </p>
              <button className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-widest rounded-lg transition-colors">
                Run Simulation
              </button>
            </div>
          </CardContent>
        </Card>
      </>
    );
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black italic tracking-tighter text-slate-100">Match Predictions</h1>
          <p className="text-slate-400 text-sm mt-1">Live win probability and situational simulation.</p>
        </div>
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {renderContent()}
      </section>
    </div>
  );
}
