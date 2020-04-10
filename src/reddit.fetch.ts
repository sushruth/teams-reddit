import { useCallback, useState, useMemo } from "react";

type UseFetchReturn<T> = {
  data?: T;
  refetch: () => void;
};

export function useFetch<T>(url: string): UseFetchReturn<T> {
  const [data, setState] = useState<T>();

  const refetch = useCallback(() => {
    setState(undefined);
  }, []);

  useMemo(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setState(data);
      });
  }, [url]);

  return {
    data,
    refetch
  };
}
