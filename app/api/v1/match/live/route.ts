import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const filePath = path.join(process.cwd(), 'lib/data/gt-vs-csk-21may2026.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(fileContents);
  
  const matchData = {
    "id": data.matchMetadata.id,
    "title": data.matchMetadata.title,
    "status": data.matchMetadata.status,
    "currentInnings": data.scorecard.currentInnings,
    "teams": data.scorecard.teams,
    "toss": data.matchMetadata.toss,
    "venue": data.matchMetadata.venue,
    "requiredRunRate": data.scorecard.requiredRunRate,
    "projectedScore": data.scorecard.projectedScore,
    "winProbability": data.scorecard.winProbability
  };
  
  return NextResponse.json(matchData);
}
