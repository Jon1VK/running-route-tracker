import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Dashboard from './components/dashboard/Dashboard';
import { HashRouter } from 'react-router-dom';

const App = () => (
  <Provider store={store}>
    <HashRouter>
      <Dashboard />
    </HashRouter>
  </Provider>
);

export default App;
