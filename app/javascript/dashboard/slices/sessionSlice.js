import { createSlice } from '@reduxjs/toolkit';

const _nullSession = { currentUser: null };

const sessionSlice = createSlice({
  name: 'session',
  initialState: _nullSession,
  reducers: {
    receiveCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
  },
});

export const { receiveCurrentUser } = sessionSlice.actions;

export const selectCurrentUser = (state) => state.session.currentUser;

export default sessionSlice.reducer;
