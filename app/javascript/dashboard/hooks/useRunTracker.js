import { useRef, useState } from 'react';
import { calculateDistance } from '../util/maps/distance';

const POS_OPTIONS = {
  enableHighAccuracy: true,
  maximumAge: 10000,
};

export function useRunTracker() {
  const watchIdRef = useRef(null);
  const intervalIdRef = useRef(null);
  const latLngsRef = useRef([]);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);

  function success(pos) {
    const { latitude: lat, longitude: lng } = pos.coords;
    latLngsRef.current.push({ lat, lng });

    if (latLngsRef.current.length > 1) {
      const [latLng1, latLng2] = latLngsRef.current.slice(-2);
      setDistance(
        (prevDistance) => prevDistance + calculateDistance(latLng1, latLng2)
      );
    }
  }

  function start() {
    if (!watchIdRef.current && navigator.geolocation) {
      watchIdRef.current = navigator.geolocation.watchPosition(
        success,
        null,
        POS_OPTIONS
      );
      intervalIdRef.current = setInterval(
        () => setDuration((prevDuration) => prevDuration + 1),
        1000
      );
    }
  }

  function pause() {
    if (watchIdRef.current) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
  }

  return {
    start,
    pause,
    distance,
    duration,
  };
}
