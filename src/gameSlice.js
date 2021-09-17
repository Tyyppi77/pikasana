import { createSlice } from "@reduxjs/toolkit";

import arrayShuffle from "array-shuffle";

import topics from "./topics.json"

const totalRounds = 25

export const chooseRandomLetter = (options) => {
    const alphabet = "aaabcdeefghhiijjkkklllmmnnnnoopprrsssttuuvvwyäö"
    return alphabet[Math.floor(Math.random() * alphabet.length)]
}

const longWait = 3
const shortWait = 1

const initialState = () => {
    return {
        topics: arrayShuffle(topics).slice(0, totalRounds),
        currentRound: 0,
        totalRounds,

        currentLetter: "-",
        previousLetter: "",
        waitDuration: longWait,

        scoreAddition: 1,
        scoredPlayers: []
    }
}

export const gameSlice = createSlice({
    name: "game",
    initialState: initialState(),
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
        },
        resetGame: state => {
            return initialState()
        }
    }
})

export const { nextTopic, requestNewLetter, revealNewLetter, markPlayerAsScored, resetGame } = gameSlice.actions

export default gameSlice.reducer
