import React from 'react';

import User from '../core/user';

type Props = {
    users: Array<User>,
    newGame: () => void,
    mainMenu: () => void,
};

const GameOver: React.FC<Props> = ({ users, newGame, mainMenu } : Props) => {
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
