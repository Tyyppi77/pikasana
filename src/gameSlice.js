import { createSlice } from "@reduxjs/toolkit";

import arrayShuffle from "array-shuffle";

import topics from "./topics.json"

const totalRounds = 40

export const chooseRandomLetter = (options) => {
    const alphabet = "aaabcdeefghhiijjkkklllmmnnnnoopprrsssttuuvvwyäö"
    return alphabet[Math.floor(Math.random() * alphabet.length)]
}

export const gameSlice = createSlice({
    name: "game",
    initialState: {
        topics: arrayShuffle(topics).slice(0, totalRounds),
        currentRound: 0,
        currentLetter: chooseRandomLetter(),
        totalRounds,
        scoreAddition: 1,
    },
    reducers: {
        nextTopic: state => {
            state.currentTopic += 1
            state.scoreAddition = 1
            state.currentLetter = chooseRandomLetter()
        }
    }
})

export const { nextTopic } = gameSlice.actions

export default gameSlice.reducer
