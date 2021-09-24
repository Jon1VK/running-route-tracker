import React from 'react';
import { useDispatch } from 'react-redux';
import { useRunTracker } from '../../hooks/useRunTracker';
import { createRun } from '../../slices/runsSlice';

const RunNew = () => {
  const dispatch = useDispatch();
  const RunTracker = useRunTracker();
  const { distance, duration, error } = RunTracker;

  const handleStartClick = () => RunTracker.start();
  const handleStopClick = () => {
    RunTracker.stop();
    dispatch(
      createRun({
        distance,
        duration,
        encoded_path: RunTracker.getEncodedPath(),
        kml_layer_file: RunTracker.getKMLLayerFile(),
      })
    );
  };

  const renderedError = error ? <p>{error}</p> : null;

  return (
    <div>
      {renderedError}
      <p>Distance: {distance} kilometers</p>
      <p>Duration: {duration} seconds</p>
      <button onClick={handleStartClick}>Start</button>
      <button onClick={handleStopClick}>Stop</button>
    </div>
  );
};

export default RunNew;
