import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './components/Home';
import WaitingRoom from './components/WaitingRoom';

import './assets/css/App.css';

function App() {
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  localStorage.setItem('username', username);

  const [roomId, setRoomId] = useState('');

  console.log(username);
  console.log(roomId);
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          component={
            () => <Home username={username} setUsername={setUsername} setRoomId={setRoomId} />
          }
        />
        <Route exact path="/play" component={WaitingRoom} />
      </Switch>
    </Router>
  );
}

export default App;
