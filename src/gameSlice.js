import { createSlice } from "@reduxjs/toolkit";

import arrayShuffle from "array-shuffle";

import topics from "./topics.json"

const totalRounds = 40

export const chooseRandomLetter = (options) => {
    const alphabet = "aaabcdeefghhiijjkkklllmmnnnnoopprrsssttuuvvwyäö"
    return alphabet[Math.floor(Math.random() * alphabet.length)]
}

const longWait = 3
const shortWait = 1

export const gameSlice = createSlice({
    name: "game",
    initialState: {
        topics: arrayShuffle(topics).slice(0, totalRounds),
        currentRound: 0,
        totalRounds,

        currentLetter: "-",
        previousLetter: "",
        waitDuration: longWait,

        scoreAddition: 1,
        scoredPlayers: []
    },
    reducers: {
        nextTopic: state => {
            state.currentRound += 1
            state.scoreAddition = 1
            state.currentLetter = "-"
            state.waitDuration = longWait
            state.scoredPlayers = []
        },
        requestNewLetter: state => {
            state.previousLetter = state.currentLetter
            state.currentLetter = "-"
            state.waitDuration = shortWait
            state.scoreAddition += 1
        },
        revealNewLetter: state => {
            do {
                state.currentLetter = chooseRandomLetter()
            }
            while (state.currentLetter === state.previousLetter)
        },
        markPlayerAsScored: (state, action) => {
            state.scoredPlayers.push(action.payload)
        }
    }
})

export const { nextTopic, requestNewLetter, revealNewLetter, markPlayerAsScored } = gameSlice.actions

export default gameSlice.reducer
