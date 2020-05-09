import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './components/Home';
import WaitingRoom from './components/WaitingRoom';

import './assets/css/App.css';

function App() {
  const [username, setUsername] = useState(localStorage.getItem('username') || '');

  useEffect(() => {
    localStorage.setItem('username', username);
  }, [username]);

  const [roomId, setRoomId] = useState('');
  const [creator, setCreator] = useState('');

  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={
            () => (
              <Home
                username={username}
                setUsername={setUsername}
                setRoomId={setRoomId}
                setCreator={setCreator}
              />
            )
          }
        />

        <Route
          exact
          path="/play"
          render={
            () => <WaitingRoom username={username} roomId={roomId} creator={creator} />
          }
        />
      </Switch>
    </Router>
  );
}

export default App;
