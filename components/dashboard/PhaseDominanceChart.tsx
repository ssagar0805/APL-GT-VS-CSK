'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { usePhaseDominance } from "@/hooks/use-polling";

export function PhaseDominanceChart() {
  const { data, loading } = usePhaseDominance();

  if (loading) {
     return (
       <div className="h-[250px] flex items-center justify-center">
         <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-blue-500 animate-spin opacity-50"></div>
       </div>
     );
  }

  // Calculate phase dominance. 
  // We'll aggregate runs scored in Powerplay, Middle, Death for both teams to show dominance.
  const phaseData = {
    Powerplay: { name: 'Powerplay', gtRuns: 0, cskRuns: 0 },
    Middle: { name: 'Middle', gtRuns: 0, cskRuns: 0 },
    Death: { name: 'Death', gtRuns: 0, cskRuns: 0 }
  };

  if (data) {
    (data.home || []).forEach((over: any) => {
       if (phaseData[over.phase as keyof typeof phaseData]) {
          phaseData[over.phase as keyof typeof phaseData].gtRuns += over.runsThisOver;
       }
    });
    (data.away || []).forEach((over: any) => {
       if (phaseData[over.phase as keyof typeof phaseData]) {
          phaseData[over.phase as keyof typeof phaseData].cskRuns += over.runsThisOver;
       }
    });
  }

  const chartData = [phaseData.Powerplay, phaseData.Middle, phaseData.Death];

  return (
    <div className="h-[250px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 0, right: 30, left: 20, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" horizontal={false} />
          <XAxis type="number" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
          <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
          <Tooltip 
             contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }}
             itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
          />
          <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
          <Bar dataKey="gtRuns" name="GT Runs" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={12} />
          <Bar dataKey="cskRuns" name="CSK Runs" fill="#eab308" radius={[0, 4, 4, 0]} barSize={12} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
