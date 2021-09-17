import { createSlice } from "@reduxjs/toolkit";

export const playersSlice = createSlice({
    name: "players",
    initialState: [],
    reducers: {
        addPlayer: (state, action) => {
            state.push({ name: action.payload, score: 0 })
        },
        removePlayer: (state, action) => {
            state = state.filter(player => player.name !== action.payload)
        }
    }
})

export const { addPlayer, removePlayer } = playersSlice.actions

export default playersSlice.reducer
