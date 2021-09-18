import React from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux'
import { addPlayer, removePlayer } from "./playersSlice"
import { useHistory } from 'react-router';

import useField from './useField'

const Player = ({ name }) => {
    const dispatch = useDispatch()

    const onClick = () => {
        dispatch(removePlayer(name))
    }

    return (
        <button className="player" onClick={onClick}>
            {name}
        </button>
    )
}

const Launch = () => {
    const players = useSelector(state => state.players)
    const dispatch = useDispatch()
    const history = useHistory()

    const addPlayerCallback = (event) => {
        event.preventDefault()
        const name = playerName.value
        if (playerName.value.length > 0 && players.find(player => player.name === name) === undefined) {
            dispatch(addPlayer(name))
            resetPlayerName()
        }
    }

    const startGame = () => {
        history.push("/game")
    }

    const [playerName, resetPlayerName] = useField("text", () => {})

    return (
        <div className="page launch">
            <header className="title">
                <h1 className="title-bounce">Pikasana</h1>
                <button type="button" onClick={startGame} disabled={players.length < 2}>Aloita</button>
            </header>
            <div className="players">
                <header>
                    <form className="input-group" onSubmit={addPlayerCallback}>
                        <input placeholder="Lisää pelaaja" name="player" id="player" {...playerName}></input>
                    </form>

                    <span className="title-line">
                        <h1>Pelaajat ({players.length}):</h1>
                        <h3>Poista napauttamalla</h3>
                    </span>
                </header>
                <div className="players-grid">
                    { players.map(player => <Player key={player.name} name={player.name} />) }
                </div>
            </div>
        </div>
    )
}

export default Launch;