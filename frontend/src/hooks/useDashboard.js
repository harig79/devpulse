import { useState, useEffect, useCallback } from 'react';
import { getDashboard } from '../services/api';
import axios from 'axios';

export default function useDashboard(githubUsername, leetcodeUsername) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [trigger, setTrigger] = useState(0);

  const refetch = useCallback(() => setTrigger((n) => n + 1), []);

  useEffect(() => {
    if (!githubUsername || !leetcodeUsername) return;

    const controller = new AbortController();

    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        const result = await getDashboard(githubUsername, leetcodeUsername, controller.signal);
        setData(result);
      } catch (err) {
        if (axios.isCancel(err)) return;

        if (err.response) {
          const status = err.response.status;
          if (status === 404) {
            setError({ type: 'not_found', message: 'User not found. Check the usernames and try again.' });
          } else {
            setError({ type: 'server', message: `Server error (${status}). Please try again later.` });
          }
        } else if (err.request) {
          setError({ type: 'network', message: 'Network error. Check your connection and try again.' });
        } else {
          setError({ type: 'unknown', message: err.message || 'Something went wrong.' });
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    return () => controller.abort();
  }, [githubUsername, leetcodeUsername, trigger]);

  return { data, loading, error, refetch };
}
