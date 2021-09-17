import { createSlice } from "@reduxjs/toolkit";

export const playersSlice = createSlice({
    name: "players",
    initialState: [
        {
            name: "Player 1",
            score: 0
        },
        {
            name: "Player 2",
            score: 0
        },
        {
            name: "Player 3",
            score: 0
        },
        {
            name: "Player 4",
            score: 0
        },
        {
            name: "Player 5",
            score: 0
        },
        {
            name: "Player 6",
            score: 0
        },
        {
            name: "Player 7",
            score: 0
        },
        {
            name: "Player 8",
            score: 0
        },
    ],
    reducers: {
        addPlayer: (state, action) => {
            state.push({ name: action.payload, score: 0 })
        },
        removePlayer: (state, action) => {
            return state.filter(player => player.name !== action.payload)
        }
    }
})

export const { addPlayer, removePlayer } = playersSlice.actions

export default playersSlice.reducer
