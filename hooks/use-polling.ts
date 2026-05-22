'use client';

import { useState, useEffect } from 'react';
import { fetchLiveMatch, fetchMomentum, fetchPredictions, fetchTacticalInsights, fetchPhaseDominance, fetchLiveDuel } from '@/lib/api';

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
    const interval = setInterval(load, 2000);
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
    let active = true;
    const load = async () => {
      try {
        const result = await fetchMomentum();
        if (active) setData(result);
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    const interval = setInterval(load, 2500);
    return () => { active = false; clearInterval(interval); };
  }, []);

  return { data, loading };
}

export function usePredictions() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const result = await fetchPredictions();
        if (active) setData(result);
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    const interval = setInterval(load, 3000);
    return () => { active = false; clearInterval(interval); };
  }, []);

  return { data, loading };
}

export function useTacticalInsights() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const result = await fetchTacticalInsights();
        if (active) setData(result);
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    const interval = setInterval(load, 4000);
    return () => { active = false; clearInterval(interval); };
  }, []);

  return { data, loading };
}

export function usePhaseDominance() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const result = await fetchPhaseDominance();
        if (active) setData(result);
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    const interval = setInterval(load, 5000);
    return () => { active = false; clearInterval(interval); };
  }, []);

  return { data, loading };
}

export function useLiveDuel() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const result = await fetchLiveDuel();
        if (active) setData(result);
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    const interval = setInterval(load, 5000);
    return () => { active = false; clearInterval(interval); };
  }, []);

  return { data, loading };
}
