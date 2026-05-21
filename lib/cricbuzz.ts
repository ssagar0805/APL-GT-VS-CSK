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
  static async getLiveMatches(): Promise<CricbuzzLiveMatch[] | null> {
    try {
      const host = process.env.RAPIDAPI_HOST;
      const key = process.env.RAPIDAPI_KEY;

      const endpoint = host && key 
        ? `https://${host}/matches/v1/live` 
        : 'https://www.cricbuzz.com/match-api/livematches.json';

      // Create abort controller for 3 second timeout to fallback cleanly
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);

      const headers: Record<string, string> = {
        'Accept': 'application/json'
      };

      if (host && key) {
        headers['X-RapidAPI-Host'] = host;
        headers['X-RapidAPI-Key'] = key;
      } else {
        headers['User-Agent'] = 'Mozilla/5.0 (Cricket Intelligence/1.0)';
      }

      const response = await fetch(endpoint, {
        headers,
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
      return null; // Signals to use fallback simulation
    }
  }

  // Normalization Layer: Converts RAW API response object into our internal format
  private static normalizeApiResponse(rawData: any): CricbuzzLiveMatch[] {
    const internalMatches: CricbuzzLiveMatch[] = [];

    // Fallback parsing for RapidAPI `cricbuzz-cricket` standard structure
    if (rawData && rawData.typeMatches) {
       rawData.typeMatches.forEach((tm: any) => {
         tm.seriesMatches?.forEach((sm: any) => {
           const matches = sm.seriesAdWrapper?.matches || sm.matches || [];
           matches.forEach((m: any) => {
             if (m.matchInfo && m.matchScore) {
               internalMatches.push({
                 matchInfo: {
                   matchId: String(m.matchInfo.matchId || ''),
                   series: m.matchInfo.seriesName || '',
                   matchDesc: m.matchInfo.matchDesc || '',
                   state: m.matchInfo.state || 'live'
                 },
                 matchScore: {
                    batTeam: {
                      teamName: m.matchInfo.team1?.teamSName || 'Team 1',
                      teamId: String(m.matchInfo.team1?.teamId || ''),
                      score: String(m.matchScore.team1Score?.inngs1?.runs || '0'),
                      wickets: String(m.matchScore.team1Score?.inngs1?.wickets || '0'),
                      overs: String(m.matchScore.team1Score?.inngs1?.overs || '0.0')
                    },
                    bowlTeam: {
                      teamName: m.matchInfo.team2?.teamSName || 'Team 2',
                      teamId: String(m.matchInfo.team2?.teamId || ''),
                      score: String(m.matchScore.team2Score?.inngs1?.runs || '0'),
                      wickets: String(m.matchScore.team2Score?.inngs1?.wickets || '0'),
                      overs: String(m.matchScore.team2Score?.inngs1?.overs || '0.0')
                    }
                 }
               })
             }
           });
         });
       });
       if (internalMatches.length > 0) return internalMatches;
    }

    // Original unofficial cricbuzz match-api structure used previously
    if (rawData && rawData.matches) {
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
    
    return internalMatches;
  }
}
