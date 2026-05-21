export const fetcher = async <T>(url: string): Promise<T> => {
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });
  
  if (!res.ok) {
    throw new Error(`An error occurred while fetching the data from ${url}`);
  }
  
  return res.json();
};

export const fetchLiveMatch = () => fetcher<any>('/api/v1/match/live');
export const fetchMomentum = () => fetcher<any>('/api/v1/analytics/momentum');
export const fetchPredictions = () => fetcher<any>('/api/v1/analytics/predictions');
export const fetchTacticalInsights = () => fetcher<any>('/api/v1/insights/tactical');
export const fetchPhaseDominance = () => fetcher<any>('/api/v1/analytics/phase');
