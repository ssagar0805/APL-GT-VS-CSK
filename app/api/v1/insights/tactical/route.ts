import { NextResponse } from 'next/server';

export async function GET() {
  const now = new Date();
  const timeOffset = Math.floor(now.getTime() / 4000); // Rotates every 4s

  const rotate = timeOffset % 2 === 0;

  const tacticalInsights = {
    headline: rotate ? "Tactical Execution: Bowling" : "Tactical Execution: Baseline",
    subheadline: rotate ? "The Dry Ball Strategy" : "Squeezing the Singles",
    description: rotate 
      ? "Gujarat Titans are actively attempting to utilize the hard new ball. Shami has adjusted his release point 4cm wider, creating a steeper entry angle."
      : "Chennai Super Kings have brought mid-off and mid-on inside the circle, challenging the batters to go over the top on a slowing surface. Dot ball percentage is rising.",
    metrics: rotate ? [
      { label: "Release Angle", value: (14.2 + (timeOffset % 10) * 0.1).toFixed(1) + "°" },
      { label: "Deviation", value: "1.8°" }
    ] : [
      { label: "Dot Ball %", value: (45 + (timeOffset % 5)).toString() + "%" },
      { label: "Avg Speed", value: "88 km/h" }
    ],
    fieldAnalysis: {
      title: "Aggressive Leg-side Trap",
      description: "A short leg and leg gully have been stationed for the last 4 overs. This implies a short-ball barrage strategy against the incoming batsman. The AI notes a 74% likelihood of a bouncer next over."
    },
    contextualInsights: [
      {
        id: `insight_${timeOffset}`,
        timestamp: "Live",
        title: rotate ? "Pace change detected" : "Length fluctuation",
        description: rotate ? "Rashid Khan has dropped his average speed by 4 km/h in this spell, relying more on drift." : "Pathirana is bowling 20% more full deliveries in this over.",
        type: "Activity",
        color: "text-red-400"
      },
      {
        id: "insight_1",
        timestamp: "14.2",
        title: "CSK seizes control",
        description: "Partnership between Conway and Dube has absorbed the initial pressure. Dot ball percentage has dropped by 45% in the last 4 overs.",
        type: "Activity",
        color: "text-emerald-400"
      },
      {
        id: "insight_2",
        timestamp: "12.1",
        title: "Spin ineffectiveness",
        description: "GT spinners are extracting 1.2 degrees less turn compared to the first innings, reducing their threat against right-handed batters.",
        type: "BrainCircuit",
        color: "text-blue-400"
      },
      {
        id: "insight_3",
        timestamp: "10.0",
        title: "Strike Rotation Efficiency",
        description: "CSK is actively maneuvering the field, rotating strike on 62% of legal deliveries this phase, nullifying aggressive field placements.",
        type: "Target",
        color: "text-emerald-400"
      }
    ].slice(0, 3) 
  };

  return NextResponse.json(tacticalInsights);
}
