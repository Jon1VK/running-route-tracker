import { createSlice } from '@reduxjs/toolkit';

const _nullSession = { userId: null };

const sessionSlice = createSlice({
  name: 'session',
  initialState: _nullSession,
  reducers: {
    receiveCurrentUserId(state, action) {
      state.userId = action.payload;
    },
  },
});

export const selectCurrentUserId = (state) => state.session.userId;

export default sessionSlice.reducer;
