import React, { useState, useEffect } from "react";
import { render } from "react-dom";

import "./main.css"
import topics from "./topics.json"

const pickRandom = (options) => {
  return options[Math.floor(Math.random() * options.length)]
}

const pickRandomLetter = () => {
  const alphabet = "aaabcdeefghhiijjkkklllmmnnnnoopprrsssttuuvvwyäö";
  return pickRandom(alphabet).toUpperCase();
};

const pickRandomTopic = () => {
  return pickRandom(topics)
}

const Card = ({ letter, topic, waitTime, round, totalRounds }) => {
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
      const seconds = elapsed;
      setProgress((1.0 - seconds / waitTime) * waitTime)
    }, 1)
  })

  return (
    <div className="card">
      <h5>Aihe ({round}/{totalRounds}):</h5>
      <h3>{topic}</h3>
      <h1 className="letter">{display}</h1>
      <progress value={progress} max={waitTime}> 32% </progress>
    </div>
  );
};

const createUser = (name) => ({
  name,
  score: 0
})

const Users = ({users, setUsers, scoreAddition}) => {

  const addScore = (user) => {
    const updated = users.map((u) => {
      if (u.name === user.name) return {
        ...u,
        score: u.score + scoreAddition
      }
      return u
    })
    setUsers(updated)
  }

  return (
    <div className="usersParent">
      <h4>Anna pisteitä (jaossa {scoreAddition})</h4>
      <div className="users">
        {
          users.map((user) => (
            <button onClick={() => addScore(user)}>{user.name} ({user.score})</button>    
          ))
        }
      </div>
    </div>
  )
}

const GameOver = ({users, newGame, mainMenu}) => {
  const sortedUsers = users.concat().sort((a, b) => {
    if (a.score < b.score) return 1
    else if (a.score > b.score) return -1
    return 0
  })

  return (
    <div>
      <ul>
        {
          sortedUsers.map((user) => (
            <li>{user.name} - {user.score}</li>
          ))
        }
      </ul>
      <button onClick={newGame}>Uusi peli</button>
      <button onClick={mainMenu}>Päävalikko</button>
    </div>
  )
}

// TODO:
// Lisää pisteitä pottiin Uusi kirjain -napista

const MainMenu = () => {

}

const IndexPage = () => {
  const [letter, setLetter] = useState(pickRandomLetter());
  const [topic, setTopic] = useState(pickRandomTopic());

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
    setLetter(pickRandomLetter());
    setTopic(pickRandomTopic())
    disabledNewLetter(longWait)
  };

  const newLetter = () => {
    let next = letter
    while (next == letter) {
      next = pickRandomLetter()
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

      <Users 
        users={users} 
        setUsers={setUsers} 
        scoreAddition={scoreAddition}
      />
    </>
  );
};

export default IndexPage
