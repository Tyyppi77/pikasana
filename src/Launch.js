import React from 'react';
import './App.css';

const Player = ({ name }) => {
    return (
        <div className="player" id={name}>
            <p>{name}</p>
        </div>
    )
}

const Launch = () => {
    return (
        <div className="page">
            <header>
                <h1>Pikasana</h1>
                <button type="button" className="highlight">Aloita</button>
            </header>
            <div className="input-group">
                <label for="peas">Lisää pelaaja:</label>
                <input type="text" placeholder="Pelaaja 1" name="player" id="player"></input>
            </div>

            <div className="players">
                <header>
                    <h1>Pelaajat:</h1>
                    <h3>Poista napauttamalla</h3>
                </header>
                <div className="players-grid">
                    <Player name="Pelaaja 1 Pitkänimi" />
                    <Player name="Pelaaja 2" />
                    <Player name="Pelaaja 3" />
                    <Player name="Pelaaja 4" />
                    <Player name="Pelaaja 5" />
                    <Player name="Pelaaja 6" />
                    <Player name="Pelaaja 7" />
                </div>
            </div>
        </div>
    )
}

export default Launch;