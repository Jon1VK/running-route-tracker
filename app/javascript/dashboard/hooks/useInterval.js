import { useRef } from 'react';

export function useInterval() {
  const intervalIdRef = useRef(null);

  function setupInterval(cb, ms) {
    if (!intervalIdRef.current) {
      intervalIdRef.current = setInterval(cb, ms);
    }
  }

  function removeInterval() {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
  }

  return [setupInterval, removeInterval];
}
