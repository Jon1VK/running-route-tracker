import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { useRunTracker } from '../../hooks/useRunTracker';
import { createRun } from '../../slices/runsSlice';

const secondsInMinutes = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours} H ${minutes} M ${seconds} S`;
};

const RunNew = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const RunTracker = useRunTracker();
  const { isTracking, distance, duration, error } = RunTracker;

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
    )
      .unwrap()
      .then((run) => history.push(`/runs/${run.id}`));
  };

  const renderedError = error ? <p>{error}</p> : null;

  const button = isTracking ? (
    <button className="red" onClick={handleStopClick}>
      Stop
    </button>
  ) : (
    <button className="green" onClick={handleStartClick}>
      Start
    </button>
  );

  return (
    <div className="run-new">
      <h2>New Run</h2>
      <div className="error-explanation">
        <p>{renderedError}</p>
      </div>
      <div className="run-index-item-data">
        <p>
          Duration: <span>{secondsInMinutes(duration)}</span>
        </p>
        <p>
          Distance: <span>{(+distance).toFixed(1)} KM</span>
        </p>
      </div>
      {button}
    </div>
  );
};

export default RunNew;
