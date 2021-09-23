import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import RunTracker from './components/runs/RunTracker';

const Routes = () => (
  <BrowserRouter>
    <Route path="/" component={RunTracker} />
  </BrowserRouter>
);

export default Routes;
