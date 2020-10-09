import React from 'react';

import User from '../core/user';

type Props = {
    users: Array<User>,
    setUsers: (users: Array<User>) => void,
    scoreAddition: number,
};

const Scores: React.FC<Props> = ({ users, setUsers, scoreAddition } : Props) => {
    const addScore = (user: User) => {
        const updated = users.map((u) => {
            if (u.name === user.name) {
                return {
                    ...u,
                    score: u.score + scoreAddition,
                };
            }
            return u;
        });
        setUsers(updated);
    };

    return (
        <div className="usersParent">
            <h4>Anna pisteitä (jaossa {scoreAddition})</h4>
            <div className="users">
                {
                    users.map((user) => (
                        <button type="button" onClick={() => addScore(user)}>{user.name} ({user.score})</button>
                    ))
                }
            </div>
        </div>
    );
};

export default Scores;
