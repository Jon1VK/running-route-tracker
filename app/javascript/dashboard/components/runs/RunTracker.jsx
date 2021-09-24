import React from 'react';
import { useRunTracker } from '../../hooks/useRunTracker';

const RunTracker = () => {
  const { start, pause, distance, duration, error, latLngs } = useRunTracker();

  const renderedError = error ? <p>{error}</p> : null;

  return (
    <div>
      {renderedError}
      <p>Distance: {distance} kilometers</p>
      <p>Duration: {duration} seconds</p>
      <button onClick={() => start()}>Start</button>
      <button onClick={() => pause()}>Pause</button>
    </div>
  );
};

export default RunTracker;
