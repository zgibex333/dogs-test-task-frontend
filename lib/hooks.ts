import { useEffect, useState } from 'react';

export const useDebounce = <T>(value: T, ms: number = 300) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    let id: ReturnType<typeof setTimeout> | null = null;

    id = setTimeout(() => {
      setDebouncedValue(value);
    }, ms);

    return () => {
      clearTimeout(id);
    };
  }, [value, ms]);

  return debouncedValue;
};
