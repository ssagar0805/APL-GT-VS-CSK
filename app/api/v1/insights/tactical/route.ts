import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const filePath = path.join(process.cwd(), 'lib/data/gt-vs-csk-21may2026.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(fileContents);
  
  const tacticalInsights = {
    headline: data.tacticalPreview.headline,
    subheadline: data.tacticalPreview.subheadline,
    description: data.tacticalPreview.description,
    metrics: data.tacticalPreview.metrics,
    fieldAnalysis: data.fieldAnalysis,
    contextualInsights: data.tacticalInsights
  };

  return NextResponse.json(tacticalInsights);
}
