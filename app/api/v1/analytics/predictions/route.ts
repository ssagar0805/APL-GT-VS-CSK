import { NextResponse } from 'next/server';

export async function GET() {
  const now = new Date();
  const timeOffset = Math.floor(now.getTime() / 2000); // 2 second ticks

  const awayWinProb = Math.min(99, Math.max(1, 64 + (timeOffset % 9) - 4));
  const homeWinProb = 100 - awayWinProb;

  const statusOptions = [
    "Simulation Engine Ready",
    "Recalculating Trajectory...",
    "Analyzing Pitch Degradation...",
    "Simulating Next 5 Overs...",
  ];
  
  const status = statusOptions[Math.floor(timeOffset / 3) % statusOptions.length];

  const predictionData = {
    winProbability: { teamA: homeWinProb, teamB: awayWinProb },
    keyDrivers: [
      { text: "Target score proximity", impact: awayWinProb > 65 ? "+14%" : "+12%" },
      { text: "Wickets in hand", impact: (timeOffset % 3 === 0) ? "+7%" : "+8%" },
      { text: "Current Run Rate", impact: (timeOffset % 2 === 0) ? "+2%" : "-1%" }
    ],
    status: status
  };

  return NextResponse.json(predictionData);
}
