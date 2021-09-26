import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Game from './Game';
import Launch from './Launch';
import Results from './Results';

function App() {
    return (
        <Router basename="/pikasana">
            <Switch>
                <Route path="/game">
                    <Game />
                </Route>
                <Route path="/results">
                    <Results />
                </Route>
                <Route path="/">
                    <Launch />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
