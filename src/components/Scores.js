import React, { useState } from 'react'

const Scores = ({users, setUsers, scoreAddition}) => {

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

export default Scores
