import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InsightPanel } from "@/components/dashboard/InsightPanel";

export default function InsightsPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black italic tracking-tighter text-slate-100">Tactical Insights</h1>
          <p className="text-slate-400 text-sm mt-1">AI-generated observations and reasoning.</p>
        </div>
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          <Card className="border-white/10 bg-white/[0.03] rounded-2xl flex flex-col">
            <CardHeader className="border-b border-white/10 pb-4">
              <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">Tactical Execution: Bowling</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
               <div className="border-l-2 border-emerald-500 pl-4 mb-6">
                 <h3 className="text-lg font-bold text-slate-200">The Dry Ball Strategy</h3>
                 <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                   Australia is actively attempting to preserve the ball's roughness to gain reverse swing. 
                   Cummins has adjusted his release point 4cm wider, creating a steeper entry angle. 
                   This forces the batsman to play away from the body.
                 </p>
               </div>
               
               <div className="grid grid-cols-2 gap-4 mt-6">
                 <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                   <p className="text-[10px] uppercase font-bold text-slate-500 mb-1">Release Angle</p>
                   <p className="text-2xl font-mono text-emerald-400">14.2°</p>
                 </div>
                 <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                   <p className="text-[10px] uppercase font-bold text-slate-500 mb-1">Deviation</p>
                   <p className="text-2xl font-mono text-emerald-400">1.8°</p>
                 </div>
               </div>
            </CardContent>
          </Card>
          
          <Card className="border-white/10 bg-white/[0.03] rounded-2xl flex flex-col">
            <CardHeader className="border-b border-white/10 pb-4">
              <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">Field Configuration Analysis</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
               <div className="flex items-center space-x-6">
                 <div className="w-1/3 aspect-square border-2 border-emerald-900/50 rounded-full flex items-center justify-center relative bg-emerald-950/20">
                    <div className="w-4 h-12 bg-white/10 absolute rounded-sm border border-white/20"></div>
                    <div className="absolute top-8 left-8 w-1.5 h-1.5 bg-red-500 rounded-full shadow-[0_0_8px_red]"></div>
                    <div className="absolute top-1/2 right-4 w-1.5 h-1.5 bg-red-500 rounded-full shadow-[0_0_8px_red]"></div>
                    <div className="absolute bottom-12 left-10 w-1.5 h-1.5 bg-red-500 rounded-full shadow-[0_0_8px_red]"></div>
                 </div>
                 <div className="flex-1 space-y-4">
                   <h3 className="text-md font-bold text-slate-200">Aggressive Leg-side Trap</h3>
                   <p className="text-sm text-slate-400 leading-relaxed">
                     A short leg and leg gully have been stationed for the last 4 overs. This implies a short-ball barrage strategy against the incoming batsman. The AI notes a 74% likelihood of a bouncer next over.
                   </p>
                 </div>
               </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-4 h-full">
           <InsightPanel />
        </div>
      </section>
    </div>
  );
}
