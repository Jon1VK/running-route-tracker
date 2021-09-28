# Running Route Tracker

Running Route Tracker is a web app for tracking your running distance, duration
and route. App tracks your running route using geolocation API and uses Google
Maps APIs to show the route after the run has been finished. Check out the LIVE
version of the app at
[https://running-route-tracker.herokuapp.com/](https://running-route-tracker.herokuapp.com/).

## Technologies used

### Ruby on Rails

Backend is implemented with Ruby on Rails framework. Backend serves static HTML
pages and JSON formatted run data from implemented API endpoints.
Devise gem was used for authentication.

### AWS S3

Amazon Web Services were used for storing KML layer files containing paths for
the runs.

### React + Redux

React was used for implementing the frontend of the app. Redux was used for
storing global data of the app.

### React Router

React Router was used frontend routing.

### Google Maps API

Google Static Maps and Javascript Maps APIs were used to show run routes as static
images or as an interactive and zoomable map.

## Deeper dive to implementation

### Custom Hooks

Geolocation Wakelock APIs were wrapped in a custom hook to ease the usage for React.
Here is for example useGeolocation custom hook.

```javascript
/* ./app/javascript/dashboard/hooks/useGeolocation.js */

import { useRef } from 'react';

const defaultPosOptions = {
  maximumAge: 1000,
  timeOut: 10000,
  enableHighAccuracy: true,
};

export function useGeolocation() {
  const watchIdRef = useRef(null);

  function getCurrentPosition(success, error, posOptions = defaultOptions) {
    navigator.geolocation.getCurrentPosition(success, error, posOptions);
  }

  function watchPosition(success, error, posOptions = defaultPosOptions) {
    if (!watchIdRef.current) {
      watchIdRef.current = navigator.geolocation.watchPosition(
        success,
        error,
        posOptions
      );
    }
  }

  function clearWatch() {
    if (watchIdRef.current) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
  }

  return {
    getCurrentPosition,
    watchPosition,
    clearWatch,
  };
}
```

With the use of above custom hooks it was easier to implement useRunTracker
custom hook with API for tracking run route, distance, and duration data.

## Redux Toolkit

Redux toolkit was used for smoother development of reducers and actions.
Also state normalizations was done with Redux Toolkits createEntityAdapter API.
Here is for example the implementation of the run slice of the store.

```javascript
/* ./app/javascript/dashboard/slices/runsSlice.js */

import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import * as runAPI from '../util/apis/run_api';

const runsAdapter = createEntityAdapter();

export const fetchRuns = createAsyncThunk('runs/fetchRuns', () =>
  runAPI.fetchRuns()
);

export const fetchRunById = createAsyncThunk(
  'runs/fetchRunById',
  (id, { getState }) => {
    if (!getState().runs.ids[id]) {
      return runAPI.fetchRunById(id);
    }
  }
);

export const createRun = createAsyncThunk(
  'runs/createRun',
  (run, { rejectWithValue }) =>
    runAPI.createRun(run).catch((errors) => rejectWithValue(errors))
);

const runsSlice = createSlice({
  name: 'runs',
  initialState: runsAdapter.getInitialState(),
  extraReducers(builder) {
    builder
      .addCase(fetchRuns.fulfilled, runsAdapter.setAll)
      .addCase(createRun.fulfilled, runsAdapter.addOne)
      .addCase(fetchRunById.fulfilled, runsAdapter.addOne);
  },
});

export const { selectAll: selectAllRuns, selectById: selectRunById } =
  runsAdapter.getSelectors((state) => state.runs);

export default runsSlice.reducer;
```
