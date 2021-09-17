import { configureStore } from '@reduxjs/toolkit';
import playersReducer from './playersSlice';
import gameReducer from "./gameSlice"

export const store = configureStore({
  reducer: {
    players: playersReducer,
    game: gameReducer
  },
});
