import { Scorecard } from "@/components/dashboard/Scorecard";
import { MomentumChart } from "@/components/dashboard/MomentumChart";
import { InsightPanel } from "@/components/dashboard/InsightPanel";
import { LiveBattleArea } from "@/components/dashboard/LiveBattleArea";
import { TimelineEvents } from "@/components/dashboard/TimelineEvents";
import { WinProbabilityPreview, FieldConfigurationPreview } from "@/components/dashboard/Previews";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto space-y-4">
      
      {/* Top visual section: Live Scorecard */}
      <section>
        <Scorecard />
      </section>

      {/* Middle visual section: Battle Area & Insight Panel */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-auto lg:h-[420px]">
        <div className="lg:col-span-2 h-full">
           <LiveBattleArea />
        </div>
        <div className="h-full max-h-[420px]">
           <InsightPanel />
        </div>
      </section>
      
      {/* Lower section: Momentum and Timeline */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Momentum takes 2 columns */}
        <div className="lg:col-span-2">
           <MomentumChart />
        </div>
        {/* Timeline Event list inside a Card */}
        <Card className="col-span-1 border-white/10 bg-white/[0.03] rounded-2xl flex flex-col h-[280px]">
          <CardHeader className="border-b border-white/10 pb-4">
            <CardTitle className="text-[10px] uppercase font-black tracking-[0.2em] text-emerald-400">Timeline Events</CardTitle>
          </CardHeader>
          <CardContent className="p-4 flex-1 overflow-hidden">
             <TimelineEvents />
          </CardContent>
        </Card>
      </section>

      {/* Bottom visual section: Live Previews */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <WinProbabilityPreview />
        <FieldConfigurationPreview />
      </section>

    </div>
  );
}
