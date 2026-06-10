import { useEffect, useState } from "react";

export function useJson<T>(loader: () => Promise<T>): { data: T | null; loading: boolean; error: Error | null } {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  useEffect(() => {
    let active = true;
    loader()
      .then((d) => { if (active) { setData(d); setLoading(false); } })
      .catch((e) => { if (active) { setError(e); setLoading(false); } });
    return () => { active = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { data, loading, error };
}
