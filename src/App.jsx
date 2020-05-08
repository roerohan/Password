import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './components/Home';
import WaitingRoom from './components/WaitingRoom';

import './assets/css/App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/play" component={WaitingRoom} />
      </Switch>
    </Router>
  );
}

export default App;
