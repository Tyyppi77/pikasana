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
            <header>
                <h1>Pikasana</h1>
                <button type="button" className={ players.length > 1 ? "highlight" : ""} onClick={startGame}>Aloita</button>
            </header>
            <form className="input-group" onSubmit={addPlayerCallback}>
                <label>Lisää pelaaja:</label>
                <input placeholder="Pelaaja 1" name="player" id="player" {...playerName}></input>
            </form>

            <div className="players">
                <header>
                    <h1>Pelaajat:</h1>
                    <h3>Poista napauttamalla</h3>
                </header>
                <div className="players-grid">
                    { players.map(player => <Player key={player.name} name={player.name} />) }
                </div>
            </div>
        </div>
    )
}

export default Launch;