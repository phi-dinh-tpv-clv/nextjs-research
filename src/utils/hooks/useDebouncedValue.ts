import { useEffect, useState } from "react";

export function useDebouncedValue(value: any, delay: number) {
  const [state, setState] = useState(value);
  useEffect(() => {
    const t = setTimeout(setState, delay, value);
    return () => {
      clearTimeout(t);
    };
  }, [value, delay]);
  return state;
}
