import { NextResponse } from 'next/server';
import { CricbuzzService } from '@/lib/cricbuzz';

export async function GET() {
  // 1. Attempt to fetch real live data from Cricbuzz unofficial API
  const liveMatches = await CricbuzzService.getLiveMatches();
  
  if (liveMatches && liveMatches.length > 0) {
    // 2. Normalization Layer: Translate the external API match into our Internal Schema
    // For the demo, we take the first active match or just the first matched item
    const realMatch = liveMatches[0];
    
    if (realMatch.matchScore) {
       const batBase = parseInt(realMatch.matchScore.batTeam.score) || 0;
       
       const matchData = {
          "id": `cbz_${realMatch.matchInfo.matchId}`,
          "title": `${realMatch.matchInfo.matchDesc}: ${realMatch.matchScore.batTeam.teamName} vs ${realMatch.matchScore.bowlTeam.teamName}, ${realMatch.matchInfo.series}`,
          "status": "live",
          "currentInnings": "away", // For UI mapping consistency 
          "teams": {
             "home": {
                "name": realMatch.matchScore.bowlTeam.teamName,
                "shortMode": realMatch.matchScore.bowlTeam.teamName.slice(0, 3).toUpperCase(),
                "score": realMatch.matchScore.bowlTeam.score,
                "overs": realMatch.matchScore.bowlTeam.overs,
                "wickets": parseInt(realMatch.matchScore.bowlTeam.wickets) || 10,
                "runRate": "0.0"
             },
             "away": {
                "name": realMatch.matchScore.batTeam.teamName,
                "shortMode": realMatch.matchScore.batTeam.teamName.slice(0, 3).toUpperCase(),
                "score": realMatch.matchScore.batTeam.score,
                "overs": realMatch.matchScore.batTeam.overs,
                "wickets": parseInt(realMatch.matchScore.batTeam.wickets) || 0,
                "runRate": realMatch.matchScore.runRate || "0.00"
             }
          },
          "toss": realMatch.matchInfo.state,
          "venue": "Cricbuzz Live Datacenter",
          "requiredRunRate": realMatch.matchScore.reqRunRate || "0.00",
          "projectedScore": parseInt(realMatch.matchScore.batTeam.score) + 50,
          "winProbability": {
             "home": 50,
             "away": 50
          }
       };
       return NextResponse.json(matchData);
    }
  }

  // 3. FALLBACK: Simulated Live Engine
  // Used if Cricbuzz API is unreachable / rate-limited to preserve demo functionality
  const now = new Date();
  const timeOffset = Math.floor(now.getTime() / 2000); // Ticks every 2s
  
  const awayBaseScore = 192;
  const awayBaseBalls = 34 * 6 + 2; // 34.2 overs = 206 balls
  
  const additionalBalls = timeOffset % 120; // reset every 120 cycles
  const currentBalls = awayBaseBalls + additionalBalls;
  
  const overs = Math.floor(currentBalls / 6);
  const balls = currentBalls % 6;
  const displayOvers = `${overs}.${balls}`;
  
  // Generate randomish score based on balls
  const runsAdded = Math.floor(additionalBalls * 0.85) + (timeOffset % 4);
  const currentScore = awayBaseScore + runsAdded;
  const runRate = (currentScore / (currentBalls / 6)).toFixed(2);
  
  // Fluid win probability
  const awayWinProb = Math.min(99, Math.max(1, 82 + (runsAdded > additionalBalls ? 2 : -2) + (timeOffset % 3 - 1)));
  const homeWinProb = 100 - awayWinProb;

  const matchData = {
    "id": "m_123456",
    "title": "Final: India vs Australia, ICC World Cup",
    "status": "live",
    "currentInnings": "away",
    "teams": {
      "home": {
        "name": "India",
        "shortMode": "IND",
        "score": "240",
        "overs": "50.0",
        "wickets": 10,
        "runRate": "4.80"
      },
      "away": {
        "name": "Australia",
        "shortMode": "AUS",
        "score": currentScore.toString(),
        "overs": displayOvers,
        "wickets": 3 + (timeOffset % 40 === 0 ? 1 : 0),
        "runRate": runRate
      }
    },
    "toss": "Australia won the toss and elected to field",
    "venue": "Narendra Modi Stadium, Ahmedabad",
    "requiredRunRate": ( (241 - currentScore) / (50 - overs) || 0 ).toFixed(2),
    "projectedScore": 241,
    "winProbability": {
      "home": homeWinProb,
      "away": awayWinProb
    }
  };
  
  return NextResponse.json(matchData);
}
