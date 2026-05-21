import { Scorecard } from "@/components/dashboard/Scorecard";
import { MomentumChart } from "@/components/dashboard/MomentumChart";
import { InsightPanel } from "@/components/dashboard/InsightPanel";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Top visual section: Live Scorecaord */}
      <section>
        <Scorecard />
      </section>
      
      {/* Middle visual section: Momentum & Insights */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <MomentumChart />
        <InsightPanel />
      </section>

    </div>
  );
}
