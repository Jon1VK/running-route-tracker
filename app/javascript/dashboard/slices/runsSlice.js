import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import * as runAPI from '../util/apis/run_api';

const runsAdapter = createEntityAdapter();

export const fetchRuns = createAsyncThunk('runs/requestRuns', () =>
  runAPI.fetchRuns()
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
      .addCase(createRun.fulfilled, runsAdapter.addOne);
  },
});

export const { selectAll: selectAllRuns } = runsAdapter.getSelectors(
  (state) => state.runs
);

export default runsSlice.reducer;
