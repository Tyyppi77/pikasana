import React, { useState, useEffect } from 'react';

const Card = ({
    letter, topic, waitTime, round, totalRounds,
}) => {
    const [display, setDisplay] = useState('-');

    const [currentWaitStart, setCurrentWaitStart] = useState(new Date());
    const [progress, setProgress] = useState(waitTime);

    useEffect(() => {
        setDisplay('-');
        setCurrentWaitStart(new Date());
        setTimeout(() => {
            setDisplay(letter);
        }, waitTime);
    }, [letter]);

    useEffect(() => {
        setTimeout(() => {
            const now = new Date();
            const elapsed = now.getTime() - currentWaitStart.getTime();
            const seconds = elapsed;
            setProgress((1.0 - seconds / waitTime) * waitTime);
        }, 1);
    });

    return (
        <div className="card">
            <h5>Aihe ({round}/{totalRounds}):</h5>
            <h3>{topic}</h3>
            <h1 className="letter">{display}</h1>
            <progress value={progress} max={waitTime}> 32% </progress>
        </div>
    );
};

export default Card;
