import { createSlice } from "@reduxjs/toolkit";

export const playersSlice = createSlice({
    name: "players",
    initialState: [],
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
        },
        clearScores: state => {
            return state.map(player => ({...player, score: 0}))
        }
    }
})

export const { addPlayer, removePlayer, awardScore, clearScores } = playersSlice.actions

export default playersSlice.reducer
