'use client';

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useMomentum } from "@/hooks/use-polling";

export function MomentumChart() {
  const { data, loading } = useMomentum();

  if (loading) {
    return (
      <Card className="overflow-hidden border-white/10 bg-white/[0.03] rounded-2xl flex flex-col h-[280px] justify-center items-center">
         <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-emerald-500 animate-spin mb-4"></div>
         <p className="text-xs uppercase tracking-widest text-slate-500 font-bold">Initializing Engine...</p>
      </Card>
    );
  }

  const momentumSeries = data?.series || [];

  return (
    <Card className="overflow-hidden border-white/10 bg-white/[0.03] rounded-2xl flex flex-col h-[280px]">
      <CardHeader className="border-b border-white/10 pb-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-[10px] uppercase font-black tracking-[0.2em] text-slate-400">Live Structural Momentum</CardTitle>
          <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest">
            <span className="flex items-center text-blue-400"><span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>GT</span>
            <span className="flex items-center text-yellow-500"><span className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></span>CSK</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={momentumSeries} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorTeam1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorTeam2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#eab308" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#eab308" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="over" stroke="#334155" fontSize={10} tickLine={false} axisLine={false} tickMargin={10} minTickGap={20} />
            <YAxis stroke="#334155" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }}
              itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
              labelStyle={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em' }}
            />
            <Area type="monotone" dataKey="team1" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorTeam1)" />
            <Area type="monotone" dataKey="team2" stroke="#eab308" strokeWidth={3} fillOpacity={1} fill="url(#colorTeam2)" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
