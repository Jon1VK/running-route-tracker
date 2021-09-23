import React from 'react';
import { useRunTracker } from '../../hooks/useRunTracker';

const RunTracker = () => {
  const Tracker = useRunTracker();

  return (
    <div>
      <p>Distance: {Tracker.distance} kilometers</p>
      <p>Duration: {Tracker.duration} seconds</p>
      <button onClick={() => Tracker.start()}>Start</button>
      <button onClick={() => Tracker.pause()}>Pause</button>
    </div>
  );
};

export default RunTracker;
