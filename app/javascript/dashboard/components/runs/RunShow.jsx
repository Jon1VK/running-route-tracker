import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { fetchRunById, selectRunById } from '../../slices/runsSlice';

const secondsInMinutes = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours} H ${minutes} M ${seconds} S`;
};

const RunShow = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const run = useSelector((state) => selectRunById(state, id));

  useEffect(() => {
    dispatch(fetchRunById(id));
  }, [id]);

  return run ? (
    <div className="run-item">
      <img src={run.staticMapUrl} />
      <div className="run-index-item-data">
        <p>
          <span>{new Date(run.createdAt).toISOString().substring(0, 10)}</span>
        </p>
        <p>
          Duration: <span>{secondsInMinutes(run.duration)}</span>
        </p>
        <p>
          Distance: <span>{(+run.distance).toFixed(1)} KM</span>
        </p>
      </div>
    </div>
  ) : null;
};

export default RunShow;
