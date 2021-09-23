import React from 'react';
import { useRunTracker } from '../../hooks/useRunTracker';

const RunTracker = () => {
  const { start, pause, distance, duration, error, latLngs } = useRunTracker();

  const renderedError = error ? <p>{error}</p> : null;
  const renderedLatLngs = (
    <ul>
      {latLngs.map(({ latitude, longitude }, idx) => (
        <li key={idx}>
          Latitude: {latitude} Longitude: {longitude}
        </li>
      ))}
    </ul>
  );

  return (
    <div>
      {renderedError}
      <p>Distance: {distance} kilometers</p>
      <p>Duration: {duration} seconds</p>
      <button onClick={() => start()}>Start</button>
      <button onClick={() => pause()}>Pause</button>
      {renderedLatLngs}
    </div>
  );
};

export default RunTracker;
