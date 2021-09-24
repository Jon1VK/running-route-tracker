import React from 'react';

const RunIndexItem = ({ run }) => (
  <div>
    <img src={run.staticMapUrl} />
    <br />
    Duration: {run.duration}
    Distance: {run.distance}
  </div>
);

export default RunIndexItem;
