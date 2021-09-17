import React, { useState, useEffect, } from "react";
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { nextTopic, requestNewLetter, revealNewLetter, markPlayerAsScored } from "./gameSlice"
import { awardScore } from "./playersSlice"

import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from "react-router";

const RoundInfo = () => {
    const game = useSelector(state => state.game)
    const history = useHistory()

    const dispatch = useDispatch()

    const revealLetter = () => {
        dispatch(revealNewLetter())
    }

    const nextLetterCallback = () => {
        dispatch(requestNewLetter())
    }

    const counting = game.currentLetter === '-'

    const isFinalRound = game.currentRound === game.totalRounds - 1
    const continueText = isFinalRound ? "Lopeta" : "Uusi aihe"

    const continueCallback = () => {
        if (isFinalRound)
            history.push("/results")
        else
            dispatch(nextTopic())
    }
  
    return (
        <div className="round-info">
            <span className="topic-parent">
                <h5 className="topic-title">Aihe ({game.currentRound + 1}/{game.totalRounds}):</h5>
                <h3 className="topic">{game.topics[game.currentRound]}</h3>
            </span>
            <div className="letter-wrapper">
                {
                    counting
                    ? (
                        <CountdownCircleTimer
                            isPlaying={true}
                            duration={game.waitDuration}
                            size={300}
                            strokeWidth={20}
                            colors={[
                                ['#ffffff', 1.0],
                            ]}
                            trailColor="rgba(0, 0, 0, 0.1)"
                            onComplete={revealLetter}
                        >
                            {({ remainingTime }) => remainingTime}
                        </CountdownCircleTimer>
                    )
                    : <h1 className={`letter ${counting ? "" : "bounce"}`}>{game.currentLetter}</h1>
                }
            </div>

            <span className="round-bottom">
                <button type="button" onClick={nextLetterCallback} disabled={counting || game.scoredPlayers.length > 0} className="link-button">Uusi kirjain</button>
                <button type="button" onClick={continueCallback} disabled={counting} className="new-topic">{continueText}</button>
            </span>
        </div>
    );
};

const Player = ({ player }) => {
    const game = useSelector(state => state.game)
    const dispatch = useDispatch()

    const clickCallback = () => {
        dispatch(awardScore({ name: player.name, addition: game.scoreAddition }))
        dispatch(markPlayerAsScored(player.name))
    }

    const scored = game.scoredPlayers.find(p => p === player.name) !== undefined

    return (
        <button className="player" onClick={clickCallback} disabled={scored}>
            {player.name} ({player.score})
        </button>
    )
}

const Players = () => {
    const game = useSelector(state => state.game)
    const players = useSelector(state => state.players)

    return (
        <div className="players">
            <header>
                <h4>Anna pisteitä (jaossa {game.scoreAddition})</h4>
            </header>
            <div className="players-grid">
                { players.map(player => <Player key={player.name} player={player} />) }
            </div>
        </div>
    )
}

const Game = () => {
    return (
        <div className="page game">
            <RoundInfo />
            <Players />
        </div>
    )
}

export default Game