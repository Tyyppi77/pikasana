import React, { useState, useEffect } from "react"

import topics from "../core/topics"
import letters from "../core/letters"

import Card from "../components/Card"
import Scores from "../components/Scores"

import GameOver from "./game-over"
import MainMenu from "./main-menu"

import "./main.css"

// TODO: Refactor components
// TODO: Enable ESlint
// TODO: Consider TypeScript
// TODO: Consider Redux for the game state
// TODO: Consider React Router for the game state

const createUser = (name) => ({
  name,
  score: 0
})

// TODO:
// Lisää pisteitä pottiin Uusi kirjain -napista

const Index = () => {
  const [letter, setLetter] = useState(letters.chooseRandom());
  const [topic, setTopic] = useState(topics.chooseRandom());

  const shortWait = 1000
  const longWait = 3000

  const [waitTime, setWaitTime] = useState(longWait)

  const [users, setUsers] = useState([
    createUser("Juho"),
    createUser("O-S"),
    createUser("Äiti"),
    createUser("Isi"),
  ])

  const totalRounds = 40
  const [round, setRound] = useState(0)

  const [state, setState] = useState('game')

  const [scoreAddition, setScoreAddition] = useState(1)

  const disabledNewLetter = (time) => {
    setNewLetterEnabled(false)
    setTimeout(() => setNewLetterEnabled(true), time)
  }

  const newTopic = (updateRound = false) => {
    if (updateRound)
      setRound(round + 1)
    setWaitTime(longWait)
    setScoreAddition(1)
    setLetter(letters.chooseRandom());
    setTopic(topics.chooseRandom())
    disabledNewLetter(longWait)
  };

  const newLetter = () => {
    let next = letter
    while (next == letter) {
      next = letters.chooseRandom()
    }
    setWaitTime(shortWait)
    setLetter(next);
    setScoreAddition(scoreAddition + 1)
    disabledNewLetter(shortWait)
  }

  const endGame = () => {
    setState('over')
  }

  const newGame = () => {
    setRound(0)
    setState('game')
    newTopic(false)
    setUsers(users.map((u) => ({
      ...u,
      score: 0
    })))
  }

  const mainMenu = () => {
    setState('main')
  }

  useEffect(() => disabledNewLetter(longWait), [])

  const [newLetterEnabled, setNewLetterEnabled] = useState(true)

  const canContinue = round + 1 != totalRounds

  const continueButton = canContinue
    ? <button onClick={newTopic}>Seuraava aihe</button>
    : <button onClick={endGame}>Lopeta</button>

  if (state === 'over') {
    return <GameOver 
      users={users}
      newGame={newGame}
      mainMenu={mainMenu}
      />
  }
  else if (state === 'main') {
    return <MainMenu />
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
      <button onClick={newLetter} disabled={!newLetterEnabled}>Uusi kirjain</button>
      { continueButton }

      <Scores 
        users={users} 
        setUsers={setUsers} 
        scoreAddition={scoreAddition}
      />
    </>
  );
};

export default Index
