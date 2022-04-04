import { useEffect, useState } from 'react';
import axios from 'axios';

export function getUser(url: string) {
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<null | unknown>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(url)
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);

  return { data, error, loading };
}
