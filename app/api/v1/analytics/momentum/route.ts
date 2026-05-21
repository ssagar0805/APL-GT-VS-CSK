import { NextResponse } from 'next/server';

export async function GET() {
  const momentumSeries = [
    { over: 20, ind: 60, aus: 40 },
    { over: 22, ind: 55, aus: 45 },
    { over: 24, ind: 48, aus: 52 },
    { over: 26, ind: 42, aus: 58 },
    { over: 28, ind: 35, aus: 65 },
    { over: 30, ind: 30, aus: 70 },
    { over: 32, ind: 25, aus: 75 },
    { over: 34, ind: 18, aus: 82 },
  ];

  return NextResponse.json({
    status: "active",
    primary_driver: "strike_rotation_efficiency",
    series: momentumSeries,
  });
}
