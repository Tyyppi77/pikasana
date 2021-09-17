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
            name: "Player 3 adsadsadsadsads",
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
            name: "Player 6 asdsad",
            score: 0
        },
        {
            name: "Player 7",
            score: 0
        },
    ],
    reducers: {
        addPlayer: (state, action) => {
            state.push({ name: action.payload, score: 0 })
            state.sort((a, b) => {
                const aName = a.name.toUpperCase()
                const bName = b.name.toUpperCase()
                if (aName < bName) return -1;
                if (aName > bName) return 1;
                return 0;
            })
        },
        removePlayer: (state, action) => {
            return state.filter(player => player.name !== action.payload)
        },
        awardScore: (state, action) => {
            return state.map(player => player.name === action.payload.name ? { ...player, score: player.score + action.payload.addition} : player)
        }
    }
})

export const { addPlayer, removePlayer, awardScore } = playersSlice.actions

export default playersSlice.reducer
