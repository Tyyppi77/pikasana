import React, { useState, useEffect, } from "react";
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { nextTopic, requestNewLetter, revealNewLetter } from "./gameSlice"

import { useSelector, useDispatch } from 'react-redux'

const RoundInfo = ({ topic, round, totalRounds }) => {
    const game = useSelector(state => state.game)

    const dispatch = useDispatch()

    const revealLetter = () => {
        dispatch(revealNewLetter())
    }

    const nextLetterCallback = () => {
        dispatch(requestNewLetter())
    }

    const counting = game.currentLetter === '-'
  
    return (
        <div className="round-info">
            <span className="topic-parent">
                <h5 className="topic-title">Aihe ({round}/{totalRounds}):</h5>
                <h3 className="topic">{topic}</h3>
            </span>
            <div className="letter-wrapper">
                {
                    counting
                    ? (
                        <CountdownCircleTimer
                            isPlaying={true}
                            duration={game.waitDuration}
                            size={400}
                            strokeWidth={30}
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
                <button type="button" onClick={nextLetterCallback} disabled={counting}>Uusi kirjain</button>
            </span>
        </div>
    );
};

const Player = ({ player }) => {
    return (
        <div className="player">
            {player.name} ({player.score})
        </div>
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
    const game = useSelector(state => state.game)

    const shortWait = 1000
    const longWait = 3000

    const [waitTime, setWaitTime] = useState(longWait)

    return (
        <div className="page game">
            <RoundInfo 
                topic={game.topics[game.currentRound]} 
                waitTime={waitTime}
                round={game.currentRound + 1}
                totalRounds={game.totalRounds}
            />

            <Players />
        </div>
    )
}

export default Game