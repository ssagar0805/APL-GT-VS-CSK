import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const filePath = path.join(process.cwd(), 'lib/data/gt-vs-csk-21may2026.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(fileContents);
  
  const predictionData = {
    winProbability: data.winProbability,
    keyDrivers: [
      { text: "Target score proximity", impact: "+45%" },
      { text: "Wickets in hand", impact: "-25%" },
      { text: "Current Run Rate", impact: "-15%" }
    ],
    status: "Final Result Concluded"
  };

  return NextResponse.json(predictionData);
}
