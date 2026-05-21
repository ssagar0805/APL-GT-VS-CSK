import { Scorecard } from "@/components/dashboard/Scorecard";
import { MomentumChart } from "@/components/dashboard/MomentumChart";
import { InsightPanel } from "@/components/dashboard/InsightPanel";
import { WinProbabilityPreview, BallSpeedPreview, FieldConfigurationPreview } from "@/components/dashboard/Previews";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto space-y-4">
      
      {/* Top visual section: Live Scorecard */}
      <section>
        <Scorecard />
      </section>
      
      {/* Middle visual section: Momentum & Insights */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <MomentumChart />
        <InsightPanel />
      </section>

      {/* Bottom visual section: Live Previews */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <WinProbabilityPreview />
        <BallSpeedPreview />
        <FieldConfigurationPreview />
      </section>

    </div>
  );
}
