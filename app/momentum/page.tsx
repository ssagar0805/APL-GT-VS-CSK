import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MomentumChart } from "@/components/dashboard/MomentumChart";
import { PhaseDominanceChart } from "@/components/dashboard/PhaseDominanceChart";
import { TimelineEvents } from "@/components/dashboard/TimelineEvents";

export default function MomentumPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black italic tracking-tighter text-slate-100">Momentum Engine</h1>
          <p className="text-slate-400 text-sm mt-1">Live structural momentum tracking and phase analysis.</p>
        </div>
        <div className="flex space-x-2">
          {['Past 10 Overs', 'Innings', 'Full Match'].map((period, i) => (
            <button key={period} className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-lg border ${i === 1 ? 'border-white/10 bg-white/5 text-blue-400' : 'border-transparent text-slate-500 hover:text-slate-300'}`}>
              {period}
            </button>
          ))}
        </div>
      </div>

      <section className="grid grid-cols-1 gap-6">
        <MomentumChart />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-white/10 bg-white/[0.03] rounded-2xl flex flex-col">
          <CardHeader className="border-b border-white/10 pb-4">
             <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">Timeline Events</CardTitle>
          </CardHeader>
          <CardContent className="p-4 flex-1">
             <TimelineEvents />
          </CardContent>
        </Card>
        
        <Card className="border-white/10 bg-white/[0.03] rounded-2xl flex flex-col">
          <CardHeader className="border-b border-white/10 pb-4">
            <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">Phase Dominance</CardTitle>
          </CardHeader>
          <CardContent className="p-2 h-full flex flex-col justify-center">
             <PhaseDominanceChart />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
