import React from 'react';

const GameOver = ({ users, newGame, mainMenu }) => {
    const sortedUsers = users.concat().sort((a, b) => {
        if (a.score < b.score) return 1;
        if (a.score > b.score) return -1;
        return 0;
    });

    return (
        <div>
            <ul>
                {
                    sortedUsers.map((user) => (
                        <li>{user.name} - {user.score}</li>
                    ))
                }
            </ul>
            <button type="button" onClick={newGame}>Uusi peli</button>
            <button type="button" onClick={mainMenu}>Päävalikko</button>
        </div>
    );
};

export default GameOver;
