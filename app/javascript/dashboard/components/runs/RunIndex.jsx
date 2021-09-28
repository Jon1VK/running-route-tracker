import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchRuns, selectAllRuns } from '../../slices/runsSlice';
import RunIndexItem from './RunIndexItem';

const RunIndex = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRuns());
  }, []);

  const runs = useSelector(selectAllRuns);

  const renderedRuns = runs.map((run) => (
    <RunIndexItem key={run.id} run={run} />
  ));

  return (
    <div className="run-index">
      <h2>My Runs</h2>
      <Link className="button green" to="/runs/new">
        Start a new Run
      </Link>
      <div className="run-index-items">{renderedRuns}</div>
    </div>
  );
};

export default RunIndex;
