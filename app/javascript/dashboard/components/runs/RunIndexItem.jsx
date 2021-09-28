import React from 'react';
import { useHistory } from 'react-router';

const secondsInMinutes = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours} H ${minutes} M ${seconds} S`;
};

const RunIndexItem = ({ run }) => {
  const history = useHistory();

  return (
    <div
      onClick={() => history.push(`/runs/${run.id}`)}
      className="run-index-item"
    >
      <img src={run.staticMapUrl} />
      <div className="run-index-item-data">
        <p>{new Date(run.createdAt).toISOString().substring(0, 10)}</p>
        <p>
          Duration: <span>{secondsInMinutes(run.duration)}</span>
        </p>
        <p>
          Distance: <span>{(+run.distance).toFixed(1)} KM</span>
        </p>
      </div>
    </div>
  );
};

export default RunIndexItem;
