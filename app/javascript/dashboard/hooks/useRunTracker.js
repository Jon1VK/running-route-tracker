import { encode } from '@googlemaps/polyline-codec';
import { useRef, useState } from 'react';
import { useGeolocation } from './useGeolocation';
import { useWakeLock } from './useWakeLock';
import { useInterval } from './useInterval';
import { calculateDistance } from '../util/maps/distance';
import { getKMLLayerAsString } from '../util/maps/kml_layer';

export function useRunTracker() {
  const latLngsRef = useRef([]);
  const [isTracking, setIsTracking] = useState(false);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState(null);

  function handleError(error) {
    setError(error.message);
  }

  const geolocation = useGeolocation();
  const wakeLock = useWakeLock(handleError);
  const [setInterval, clearInterval] = useInterval();

  function handlePositionChange({ coords: newLatLng }) {
    if (latLngsRef.current.length > 0) {
      const prevLatLng = latLngsRef.current.slice(-1)[0];
      const movedDistance = calculateDistance(prevLatLng, newLatLng);

      if (movedDistance > 0.01) {
        setDistance((prevDistance) => prevDistance + movedDistance);
        latLngsRef.current.push(newLatLng);
      }
    } else {
      latLngsRef.current.push(newLatLng);
    }
  }

  function tick() {
    setDuration((prevDuration) => prevDuration + 1);
  }

  function start() {
    geolocation.watchPosition(handlePositionChange, handleError);
    wakeLock.request();
    setInterval(tick, 1000);
    setIsTracking(true);
  }

  function stop() {
    geolocation.clearWatch();
    wakeLock.release();
    clearInterval();
    setIsTracking(false);
  }

  function getEncodedPath() {
    return encode(
      latLngsRef.current.map(({ latitude: lat, longitude: lng }) => ({
        lat,
        lng,
      }))
    );
  }

  function getKMLLayerFile() {
    if (latLngsRef.current.length > 0) {
      return new File([getKMLLayerAsString(latLngsRef.current)], 'layer.kml');
    }
  }

  return {
    isTracking,
    start,
    stop,
    getEncodedPath,
    getKMLLayerFile,
    distance,
    duration,
    error,
  };
}
