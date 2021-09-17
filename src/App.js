import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Launch from './Launch';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/game">

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
