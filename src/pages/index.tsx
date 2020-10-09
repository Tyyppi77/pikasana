import React, { useState, useEffect } from 'react';

import topics from '../core/topics';
import letters from '../core/letters';

import Card from '../components/Card';
import Scores from '../components/Scores';

import GameOver from './game-over';
import MainMenu from './main-menu';

import User from '../core/user';

import './main.css';

// TODO: Consider Redux for the game state
// TODO: Consider React Router for the game state

type Time = number;
type State = 'game' | 'over' | 'main';

const Index: React.FC = () => {
    const [letter, setLetter] = useState(letters.chooseRandom());
    const [topic, setTopic] = useState(topics.chooseRandom());

    const shortWait: Time = 1000;
    const longWait: Time = 3000;

    const [waitTime, setWaitTime] = useState<Time>(longWait);

    const [users, setUsers] = useState([
        new User('Juho'),
        new User('O-S'),
        new User('Äiti'),
        new User('Isi'),
    ]);

    const totalRounds = 40;
    const [round, setRound] = useState(0);

    const [state, setState] = useState<State>('game');

    const [scoreAddition, setScoreAddition] = useState(1);

    const [newLetterEnabled, setNewLetterEnabled] = useState(true);

    const disabledNewLetter = (time: Time) => {
        setNewLetterEnabled(false);
        setTimeout(() => setNewLetterEnabled(true), time);
    };

    const createNewTopic = (updateRound = false) => {
        if (updateRound) setRound(round + 1);
        setWaitTime(longWait);
        setScoreAddition(1);
        setLetter(letters.chooseRandom());
        setTopic(topics.chooseRandom());
        disabledNewLetter(longWait);
    };

    const newTopic = () => {
        createNewTopic();
    };

    const newLetter = () => {
        let next = letter;
        while (next === letter) {
            next = letters.chooseRandom();
        }
        setWaitTime(shortWait);
        setLetter(next);
        setScoreAddition(scoreAddition + 1);
        disabledNewLetter(shortWait);
    };

    const endGame = () => {
        setState('over');
    };

    const newGame = () => {
        setRound(0);
        setState('game');
        createNewTopic(false);
        setUsers(users.map((u) => ({
            ...u,
            score: 0,
        })));
    };

    const mainMenu = () => {
        setState('main');
    };

    useEffect(() => disabledNewLetter(longWait), []);

    const canContinue = round + 1 !== totalRounds;

    const continueButton = canContinue
        ? <button type="button" onClick={newTopic}>Seuraava aihe</button>
        : <button type="button" onClick={endGame}>Lopeta</button>;

    if (state === 'over') {
        return (
            <GameOver
                users={users}
                newGame={newGame}
                mainMenu={mainMenu}
            />
        );
    }
    if (state === 'main') {
        return <MainMenu />;
    }

    return (
        <>
            <Card
                letter={letter}
                topic={topic}
                waitTime={waitTime}
                round={round + 1}
                totalRounds={totalRounds}
            />
            <button type="button" onClick={newLetter} disabled={!newLetterEnabled}>Uusi kirjain</button>
            { continueButton }

            <Scores
                users={users}
                setUsers={setUsers}
                scoreAddition={scoreAddition}
            />
        </>
    );
};

export default Index;
