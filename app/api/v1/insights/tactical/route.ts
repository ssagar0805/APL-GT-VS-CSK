import { NextResponse } from 'next/server';

export async function GET() {
  const tacticalInsights = {
    headline: "Tactical Execution: Bowling",
    subheadline: "The Dry Ball Strategy",
    description: "Australia is actively attempting to preserve the ball's roughness to gain reverse swing. Cummins has adjusted his release point 4cm wider, creating a steeper entry angle. This forces the batsman to play away from the body.",
    metrics: [
      { label: "Release Angle", value: "14.2°" },
      { label: "Deviation", value: "1.8°" }
    ],
    fieldAnalysis: {
      title: "Aggressive Leg-side Trap",
      description: "A short leg and leg gully have been stationed for the last 4 overs. This implies a short-ball barrage strategy against the incoming batsman. The AI notes a 74% likelihood of a bouncer next over."
    },
    contextualInsights: [
      {
        id: "insight_1",
        timestamp: "33.4",
        title: "Australia seizes control",
        description: "Partnership between Head and Labuschagne has absorbed the initial pressure. Dot ball percentage has dropped by 45% in the last 10 overs.",
        type: "Activity",
        color: "text-emerald-400"
      },
      {
        id: "insight_2",
        timestamp: "32.1",
        title: "Spin ineffectiveness",
        description: "Indian spinners are extracting 1.2 degrees less turn compared to the first innings, reducing their threat against right-handed batters.",
        type: "BrainCircuit",
        color: "text-blue-400"
      },
      {
        id: "insight_3",
        timestamp: "30.0",
        title: "Strike Rotation Efficiency",
        description: "Australia is actively maneuvering the field, rotating strike on 62% of legal deliveries this phase, nullifying aggressive field placements.",
        type: "Target",
        color: "text-emerald-400"
      }
    ]
  };

  return NextResponse.json(tacticalInsights);
}
