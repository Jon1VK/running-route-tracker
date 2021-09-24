import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Dashboard from './components/dashboard/Dashboard';

const App = () => (
  <Provider store={store}>
    <Dashboard />
  </Provider>
);

export default App;
