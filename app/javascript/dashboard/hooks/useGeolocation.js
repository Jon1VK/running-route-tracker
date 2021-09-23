import { useRef } from 'react';

const defaultPosOptions = {
  maximumAge: 1000,
  timeOut: 10000,
  enableHighAccuracy: true,
};

export function useGeolocation() {
  const watchIdRef = useRef(null);

  function getCurrentPosition(success, error, posOptions = defaultOptions) {
    navigator.geolocation.getCurrentPosition(success, error, posOptions);
  }

  function watchPosition(success, error, posOptions = defaultPosOptions) {
    if (!watchIdRef.current) {
      watchIdRef.current = navigator.geolocation.watchPosition(
        success,
        error,
        posOptions
      );
    }
  }

  function clearWatch() {
    if (watchIdRef.current) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
  }

  return {
    getCurrentPosition,
    watchPosition,
    clearWatch,
  };
}
