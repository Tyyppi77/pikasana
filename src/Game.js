import React, { useState, useEffect, } from "react";

import { useSelector, useDispatch } from 'react-redux'

const RoundInfo = ({ letter, topic, waitTime, round, totalRounds }) => {
    const [display, setDisplay] = useState('-')
  
    const [currentWaitStart, setCurrentWaitStart] = useState(new Date())
    const [progress, setProgress] = useState(waitTime)
  
    useEffect(() => {
        setDisplay('-')
        setCurrentWaitStart(new Date())
        setTimeout(() => {
            setDisplay(letter)
        }, waitTime)
    }, [letter])
  
    useEffect(() => {
        setTimeout(() => {
            const now = new Date()
            const elapsed = now.getTime() - currentWaitStart.getTime()
            const progress = elapsed / waitTime;
            setProgress((1.0 - progress) * waitTime)
        }, 1)
    })
  
    return (
        <div className="round-info">
            <span className="topic-parent">
                <h5 className="topic-title">Aihe ({round}/{totalRounds}):</h5>
                <h3 className="topic">{topic}</h3>
            </span>
            <h1 className={`letter ${display === "-" ? "" : "bounce"}`}>{display}</h1>
            <progress value={progress} max={waitTime}> 32% </progress>
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
                letter={game.currentLetter} 
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