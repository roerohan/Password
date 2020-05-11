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
import Game from './components/Game';

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
  const [messageList, setMessageList] = useState([]);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    console.log(`username: ${username}`);
    console.log(`roomId: ${roomId}`);
    console.log(`creator: ${creator}`);
    console.log(`players: ${players.map((player) => player.username)}`);
    console.log(`started: ${hasStarted}`);
  }, [username, roomId, creator, players, hasStarted]);

  useEffect(() => {
    socket.on('message', (data) => {
      const { username: u, message: m, time } = data;
      setMessageList((messageL) => messageL.concat({ username: u, message: m, time }));
    });
  }, [setMessageList]);

  useEffect(() => {
    socket.on('join', (data) => {
      const { players: ps } = data;
      setPlayers(ps);
    });

    socket.on('disconnect', (data) => {
      const { username: u, creator: c } = data;
      setPlayers(players.filter((p) => p.username !== u));
      setCreator(c);
    });
  }, [setPlayers, players]);

  useEffect(() => {
    socket.on('start', (data) => {
      const { hasStarted: hs } = data;
      if (!hs) return;

      setHasStarted(hs);
    });
  });

  const joinRoom = (u, r, ps) => {
    if (!u || !r || !ps) return;
    socket.emit('join', {
      username: u,
      roomId: r,
      players: ps,
    });
  };

  const sendMessage = (message) => {
    if (!message) return;

    socket.emit('message', {
      username,
      roomId,
      message,
    });
  };

  const startGame = (r, u) => {
    socket.emit('start', {
      roomId: r,
      username: u,
    });
  };

  const playComponent = () => {
    if (!hasStarted) {
      return (
        <WaitingRoom
          username={username}
          roomId={roomId}
          players={players}
          creator={creator}
          setRoomId={setRoomId}
          sendMessage={sendMessage}
          messageList={messageList}
          startGame={startGame}
        />
      );
    }
    console.log(`Players: ${players}`);
    return (
      <Game
        username={username}
        roomId={roomId}
        players={players}
        sendMessage={sendMessage}
        messageList={messageList}
      />
    );
  };

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
                setHasStarted={setHasStarted}
                setRoomId={setRoomId}
                setCreator={setCreator}
                setPlayers={setPlayers}
                joinRoom={joinRoom}
              />
            )
          }
        />

        <Route
          exact
          path="/play/:room"
        >
          {playComponent()}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
