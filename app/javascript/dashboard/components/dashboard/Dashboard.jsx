import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import RunIndex from '../runs/RunIndex';
import RunNew from '../runs/RunNew';
import RunShow from '../runs/RunShow';

const Dashboard = () => (
  <div className="dashboard">
    <div className="dashboard-links">
      <p>
        <Link to="/">All Runs</Link>
      </p>
    </div>
    <Switch>
      <Route path="/runs/new" component={RunNew} />
      <Route path="/runs/:id" component={RunShow} />
      <Route path="/" component={RunIndex} />
    </Switch>
  </div>
);

export default Dashboard;
