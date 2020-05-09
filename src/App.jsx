import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import socketio from 'socket.io-client';

import Home from './components/Home';
import WaitingRoom from './components/WaitingRoom';

import './assets/css/App.css';

const socket = socketio(process.env.REACT_APP_SOCKET_SERVER);

function App() {
  const [username, setUsername] = useState(localStorage.getItem('username') || '');

  useEffect(() => {
    localStorage.setItem('username', username);
  }, [username]);

  const [roomId, setRoomId] = useState('');
  const [creator, setCreator] = useState('');
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    console.log(`username: ${username}`);
    console.log(`roomId: ${roomId}`);
    console.log(`creator: ${creator}`);
    console.log(`players: ${players.map((player) => player.username)}`);
  }, [username, roomId, creator, players]);

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
                roomId={roomId}
                setUsername={setUsername}
                setRoomId={setRoomId}
                setCreator={setCreator}
                setPlayers={setPlayers}
              />
            )
          }
        />

        <Route
          exact
          path="/play/:room"
        >
          <WaitingRoom
            username={username}
            roomId={roomId}
            creator={creator}
            setRoomId={setRoomId}
            socket={socket}
          />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
