import { NextResponse } from 'next/server';

export async function GET() {
  const predictionData = {
    winProbability: { teamA: 64, teamB: 36 },
    keyDrivers: [
      { text: "Target score proximity", impact: "+12%" },
      { text: "Wickets in hand", impact: "+8%" }
    ],
    status: "Simulation Engine Ready"
  };

  return NextResponse.json(predictionData);
}
