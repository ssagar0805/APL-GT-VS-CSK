import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const dataPath = path.join(process.cwd(), 'sample-data', 'match.json');
    const matchData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    
    return NextResponse.json(matchData);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load match data' }, { status: 500 });
  }
}
