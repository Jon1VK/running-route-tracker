import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from './slices/sessionSlice';
import runsReducer from './slices/runsSlice';
import { receiveCurrentUser } from './slices/sessionSlice';

const store = configureStore({
  reducer: {
    session: sessionReducer,
    runs: runsReducer,
  },
});

// Current user is bootstrapped as a JSON string into a meta tag.
const currentUserMetaTag = document.getElementsByName('current-user')[0];
// Get the content of the correct meta tag and parse the string to JSON.
const currentUser = JSON.parse(currentUserMetaTag.content);
// Dispatch an action to receive current user data.
store.dispatch(receiveCurrentUser(currentUser));
// When done, delete the meta tag
currentUserMetaTag.remove();

export default store;
