import React, { useState, useEffect, useCallback } from 'react';
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
import API from './API';

const socket = socketio(process.env.REACT_APP_SOCKET_SERVER);

function App() {
  const [username, setUsername] = useState(localStorage.getItem('username') || '');

  useEffect(() => {
    localStorage.setItem('username', username);
  }, [username]);

  const [roomId, setRoomId] = useState('');
  const [creator, setCreator] = useState('');
  const [players, setPlayersState] = useState([]);
  const [messageList, setMessageList] = useState([]);
  const [hasStarted, setHasStarted] = useState(false);
  const [passwordHolder, setPasswordHolder] = useState('');
  const [hints, setHints] = useState([]);
  const [previousPassword, setPreviousPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [passwordLength, setPasswordLength] = useState(0);
  const [currentRound, setCurrentRound] = useState(0);

  useEffect(() => {
    console.log(`username: ${username}`);
    console.log(`roomId: ${roomId}`);
    console.log(`creator: ${creator}`);
    console.log(`players: ${players.map((player) => player.username)}`);
    console.log(`started: ${hasStarted}`);
    console.log(`hints: ${hints}`);
    console.log(`passwordHolder: ${passwordHolder}`);
    console.log(`previousPassword: ${previousPassword}`);
    console.log(`passwordLength: ${passwordLength}`);
    console.log(`currentRound: ${currentRound}`);
  }, [username, roomId, creator, players, hasStarted, hints,
    passwordHolder, previousPassword, passwordLength, currentRound]);

  const setPlayers = (ps) => {
    ps.sort((a, b) => b.points - a.points);
    setPlayersState(ps);
  };

  useEffect(() => {
    socket.on('message', (data) => {
      const { username: u, message: m, time } = data;
      setMessageList((messageL) => messageL.concat({ username: u, message: m, time }));
    });

    socket.on('join', (data) => {
      const { players: ps } = data;
      setPlayers(ps);
    });

    socket.on('start', (data) => {
      const { hasStarted: hs } = data;
      if (!hs) return;

      setHasStarted(hs);
    });

    socket.on('next', () => {
      console.log('Execute fetchData() again.');
    });

    socket.on('correct', (data) => {
      const { players: ps } = data;
      setPlayers(ps);
    });

    socket.on('hint', (data) => {
      const { hints: h } = data;
      console.log('RECEIVED HINT');
      setHints(h);
    });
  }, []);

  useEffect(() => {
    socket.on('disconnect', (data) => {
      const { username: u, creator: c } = data;
      setPlayers(players.filter((p) => p.username !== u));
      setCreator(c);
    });
  }, [players]);

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

  const sendHint = (h, r, u) => {
    if (!h || !r || !u) return;
    console.log('RAN');
    socket.emit('hint', {
      passwordHolder,
      hints: h,
      roomId: r,
      username: u,
    });
  };

  const startGame = (r, u) => {
    socket.emit('start', {
      roomId: r,
      username: u,
    });
  };

  const fetchData = useCallback(async () => {
    if (!username) return;

    const response = (await API.post('/game/next', {
      username,
      roomId,
    })).data;

    if (!response.success) {
      console.error(response.message);
    }

    console.log('FETCHED DATA');
    const {
      passwordHolder: ph,
      previousPassword: pp,
      currentPassword: cp,
      currentRound: cr,
      passwordLength: pl,
      hints: h,
    } = response.message;
    setPasswordHolder(ph);
    setPreviousPassword(pp);
    setCurrentPassword(cp);
    setCurrentRound(cr);
    setPasswordLength(pl);
    setHints(h);
  }, [username, roomId]);

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
    return (
      <Game
        username={username}
        roomId={roomId}
        players={players}
        hints={hints}
        sendHint={sendHint}
        sendMessage={sendMessage}
        messageList={messageList}
        previousPassword={previousPassword}
        currentPassword={currentPassword}
        passwordLength={passwordLength}
        currentRound={currentRound}
        passwordHolder={passwordHolder}
        fetchData={fetchData}
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

        <Route exact path="/test">
          <Game
            username={username}
            roomId={roomId}
            players={players}
            hints={hints}
            sendHint={sendHint}
            sendMessage={sendMessage}
            messageList={messageList}
            previousPassword={previousPassword}
            currentPassword={currentPassword}
            passwordLength={passwordLength}
            currentRound={currentRound}
            passwordHolder={passwordHolder}
            fetchData={fetchData}
          />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
