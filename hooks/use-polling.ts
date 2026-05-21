'use client';

import { useState, useEffect } from 'react';
import { fetchLiveMatch, fetchMomentum, fetchPredictions, fetchTacticalInsights } from '@/lib/api';

export function useLiveMatch() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const result = await fetchLiveMatch();
        if (active) {
          setData(result);
          setError(null);
        }
      } catch (err: any) {
        if (active) setError(err.message);
      } finally {
        if (active) setLoading(false);
      }
    };

    load();
    const interval = setInterval(load, 15000); // Poll every 15s
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  return { data, loading, error };
}

export function useMomentum() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const result = await fetchMomentum();
        setData(result);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return { data, loading };
}

export function usePredictions() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const result = await fetchPredictions();
        setData(result);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return { data, loading };
}

export function useTacticalInsights() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const result = await fetchTacticalInsights();
        setData(result);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return { data, loading };
}
