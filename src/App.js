import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Game from './Game';
import Launch from './Launch';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/game">
                    <Game />
                </Route>
                <Route path="/over">

                </Route>
                <Route path="/">
                    <Launch />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
