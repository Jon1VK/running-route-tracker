import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

  return <div>{renderedRuns}</div>;
};

export default RunIndex;
