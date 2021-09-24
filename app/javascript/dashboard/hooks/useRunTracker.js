import { useRef, useState } from 'react';
import { useGeolocation } from './useGeolocation';
import { useWakeLock } from './useWakeLock';
import { useInterval } from './useInterval';
import { calculateDistance } from '../util/maps/distance';

export function useRunTracker() {
  const latLngsRef = useRef([]);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState(null);

  function handleError(error) {
    setError(error.message);
  }

  const geolocation = useGeolocation();
  const wakeLock = useWakeLock(handleError);
  const [setInterval, clearInterval] = useInterval();

  function handlePositionChange(pos) {
    if (latLngsRef.current.length > 0) {
      const prevLatLng = latLngsRef.current.slice(-1)[0];
      const newLatLng = pos.coords;
      const movedDistance = calculateDistance(prevLatLng, newLatLng);

      if (movedDistance > 0) {
        setDistance((prevDistance) => prevDistance + movedDistance);
        latLngsRef.current.push(newLatLng);
      }
    } else {
      latLngsRef.current.push(pos.coords);
    }
  }

  function tick() {
    setDuration((prevDuration) => prevDuration + 1);
  }

  function start() {
    geolocation.watchPosition(handlePositionChange, handleError);
    wakeLock.request();
    setInterval(tick, 1000);
  }

  function pause() {
    geolocation.clearWatch();
    wakeLock.release();
    clearInterval();
  }

  return {
    start,
    pause,
    distance,
    duration,
    error,
  };
}
