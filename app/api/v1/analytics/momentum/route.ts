import { NextResponse } from 'next/server';

export async function GET() {
  const now = new Date();
  const timeOffset = Math.floor(now.getTime() / 2000);
  
  const baseSeries = [
    { over: 20, ind: 60, aus: 40 },
    { over: 22, ind: 55, aus: 45 },
    { over: 24, ind: 48, aus: 52 },
    { over: 26, ind: 42, aus: 58 },
    { over: 28, ind: 35, aus: 65 },
    { over: 30, ind: 30, aus: 70 },
    { over: 32, ind: 25, aus: 75 },
    { over: 34, ind: 18, aus: 82 },
  ];
  
  // Make the last point fluctuate
  const lastPoint = { ...baseSeries[baseSeries.length - 1] };
  const fluctuation = (timeOffset % 15) - 7;
  lastPoint.ind = Math.max(0, Math.min(100, lastPoint.ind + fluctuation));
  lastPoint.aus = 100 - lastPoint.ind;
  
  baseSeries[baseSeries.length - 1] = lastPoint;
  
  // Occasionally add a new "live" point to show progress over time
  if (timeOffset % 20 < 10) {
     baseSeries.push({
       over: 34.5,
       ind: Math.max(0, Math.min(100, lastPoint.ind + (timeOffset % 5) - 2)),
       aus: 100 - Math.max(0, Math.min(100, lastPoint.ind + (timeOffset % 5) - 2))
     });
  }

  return NextResponse.json({
    status: "active",
    primary_driver: "strike_rotation_efficiency",
    series: baseSeries,
  });
}
