import { configureStore } from '@reduxjs/toolkit';
import playersReducer from './playersSlice';

export const store = configureStore({
  reducer: {
    players: playersReducer,
  },
});
