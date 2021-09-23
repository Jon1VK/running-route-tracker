import { useRef } from 'react';

export function useWakeLock(onError) {
  const wakeLockRef = useRef(null);

  function request() {
    if (!wakeLockRef.current) {
      requestWakeLock();
      document.addEventListener('visibilitychange', handleVisibilityChange);
    }
  }

  function release() {
    if (wakeLockRef.current) {
      wakeLockRef.current.release();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    }
  }

  async function requestWakeLock() {
    try {
      wakeLockRef.current = await navigator.wakeLock.request('screen');
      wakeLockRef.current.addEventListener(
        'release',
        () => (wakeLockRef.current = null)
      );
    } catch (error) {
      onError(error);
    }
  }

  function handleVisibilityChange() {
    if (!wakeLockRef.current && document.visibilityState === 'visible') {
      requestWakeLock();
    }
  }

  return {
    request,
    release,
  };
}
