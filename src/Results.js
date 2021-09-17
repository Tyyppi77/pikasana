import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'

import { resetGame } from "./gameSlice"
import { clearScores } from "./playersSlice"

const Player = ({ player }) => {
    return (<li>{player.name} ({player.score})</li>)
}

const Players = () => {
    const players = useSelector(state => state.players).concat()
    players.sort((a, b) => b.score - a.score)

    const winner = players[0]
    const rest = players.slice(1)

    return (
        <>
            <h2 className="bounce">Voittaja: {winner.name} ({winner.score})</h2>
            <ol start="2">
                {
                    rest.map(player => <Player key={player.name} player={player} />)
                }
            </ol>
        </>
    )
}

const Results = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const reset = () => {
        dispatch(clearScores())
        dispatch(resetGame())
    }

    const rematch = () => {
        reset()
        history.push("/game")
    }

    const returnToFront = () => {
        reset()
        history.push("/")
    }

    return (
        <div className="page results">
            <header>
                <h1>Tulokset</h1>
            </header>

            <Players />

            <div class="actions">
                <button onClick={rematch}>Revanssi</button>
                <button onClick={returnToFront}>Etusivu</button>
            </div>
        </div>
    )
}

export default Results
