export interface CricbuzzMatchInfo {
  matchId: string;
  series: string;
  matchDesc: string;
  state: string;
}

export interface CricbuzzScore {
  batTeam: {
    teamName: string;
    teamId: string;
    score: string;
    wickets: string;
    overs: string;
  };
  bowlTeam: {
    teamName: string;
    teamId: string;
    score: string;
    wickets: string;
    overs: string;
  };
  reqRunRate?: string;
  runRate?: string;
}

export interface CricbuzzLiveMatch {
  matchInfo: CricbuzzMatchInfo;
  matchScore?: CricbuzzScore;
}

export class CricbuzzService {
  private static readonly ENDPOINT = 'https://www.cricbuzz.com/match-api/livematches.json';

  static async getLiveMatches(): Promise<CricbuzzLiveMatch[] | null> {
    try {
      // Create abort controller for 2 second timeout to fallback quickly
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);

      const response = await fetch(this.ENDPOINT, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Cricket Intelligence/1.0)',
          'Accept': 'application/json'
        },
        signal: controller.signal,
        next: { revalidate: 10 }
      });
      
      clearTimeout(timeoutId);

      if (!response.ok) {
        return null;
      }
      
      const data = await response.json();
      return this.normalizeApiResponse(data);
    } catch (error) {
      return null; // Signals to use fallback
    }
  }

  // Normalization Layer: Converts RAW API response object into our internal format
  private static normalizeApiResponse(rawData: any): CricbuzzLiveMatch[] {
    if (!rawData || !rawData.matches) return [];
    
    // Map external unofficial structure to our internal interface safely
    return Object.values(rawData.matches).map((m: any) => ({
       matchInfo: {
         matchId: String(m.match_id || ''),
         series: m.series_name || '',
         matchDesc: m.header?.match_desc || 'Unknown Match',
         state: m.header?.state || 'live'
       },
       matchScore: m.bat_team ? {
         batTeam: {
           teamName: m.bat_team?.name || 'Batting Team',
           teamId: m.bat_team?.id || '',
           score: String(m.bat_team?.innings?.[0]?.score || '0'),
           wickets: String(m.bat_team?.innings?.[0]?.wkts || '0'),
           overs: String(m.bat_team?.innings?.[0]?.overs || '0.0')
         },
         bowlTeam: {
           teamName: m.bow_team?.name || 'Bowling Team',
           teamId: m.bow_team?.id || '',
           score: String(m.bow_team?.innings?.[0]?.score || '0'),
           wickets: String(m.bow_team?.innings?.[0]?.wkts || '0'),
           overs: String(m.bow_team?.innings?.[0]?.overs || '0.0')
         },
         reqRunRate: m.miniscore?.req_rr ? String(m.miniscore.req_rr) : undefined,
         runRate: m.miniscore?.crr ? String(m.miniscore.crr) : undefined
       } : undefined
    }));
  }
}
