import { NextResponse } from 'next/server';

export async function GET() {
  const now = new Date();
  const timeOffset = Math.floor(now.getTime() / 2000);
  
  const baseSeries = [
    { over: 5, team1: 60, team2: 40 },
    { over: 8, team1: 55, team2: 45 },
    { over: 10, team1: 48, team2: 52 },
    { over: 12, team1: 42, team2: 58 },
    { over: 14, team1: 35, team2: 65 },
  ];
  
  // Make the last point fluctuate
  const lastPoint = { ...baseSeries[baseSeries.length - 1] };
  const fluctuation = (timeOffset % 15) - 7;
  lastPoint.team1 = Math.max(0, Math.min(100, lastPoint.team1 + fluctuation));
  lastPoint.team2 = 100 - lastPoint.team1;
  
  baseSeries[baseSeries.length - 1] = lastPoint;
  
  // Occasionally add a new "live" point to show progress over time
  if (timeOffset % 20 < 10) {
     baseSeries.push({
       over: 14.5,
       team1: Math.max(0, Math.min(100, lastPoint.team1 + (timeOffset % 5) - 2)),
       team2: 100 - Math.max(0, Math.min(100, lastPoint.team1 + (timeOffset % 5) - 2))
     });
  }

  return NextResponse.json({
    status: "active",
    primary_driver: "strike_rotation_efficiency",
    series: baseSeries,
  });
}
