import React, { useState, useEffect, useCallback } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import socketio from 'socket.io-client';

import Home from './components/Home';
import Game from './components/Game';
import Error from './components/Error';
import About from './components/About';
import WaitingRoom from './components/WaitingRoom';

import './assets/css/App.css';
import API from './API';

const socket = socketio(process.env.REACT_APP_SOCKET_SERVER);

function App() {
  const [username, setUsername] = useState(localStorage.getItem('username') || '');

  useEffect(() => {
    localStorage.setItem('username', username);
  }, [username]);

  const [error, setError] = useState('');
  const [roomId, setRoomId] = useState('');
  const [creator, setCreator] = useState('');
  const [passwordHolder, setPasswordHolder] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [previousPassword, setPreviousPassword] = useState('');

  const [hints, setHints] = useState([]);
  const [players, setPlayersState] = useState([]);
  const [messageList, setMessageList] = useState([]);
  const [solvedBy, setSolvedBy] = useState([]);

  const [rounds, setRounds] = useState(0);
  const [roundEnd, setRoundEnd] = useState(0);
  const [currentRound, setCurrentRound] = useState(0);
  const [passwordLength, setPasswordLength] = useState(0);

  const [hasStarted, setHasStarted] = useState(false);

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

    socket.on('correct', (data) => {
      const { players: ps, solvedBy: sb } = data;
      setPlayers(ps);
      setSolvedBy(sb);
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
      if (response.message === 'versionError') {
        await fetchData();
        return;
      }
      setError(response.message);
      console.error(response.message);
      return;
    }

    const {
      hints: h,
      rounds: r,
      roundEnd: re,
      currentRound: cr,
      passwordHolder: ph,
      passwordLength: pl,
      currentPassword: cp,
      previousPassword: pp,
    } = response.message;

    setHints(h);
    setRounds(r);
    setRoundEnd(re);
    setCurrentRound(cr);
    setPasswordLength(pl);
    setPasswordHolder(ph);
    setCurrentPassword(cp);
    setPreviousPassword(pp);
  }, [username, roomId]);

  useEffect(() => {
    socket.on('next', async () => {
      await fetchData();
    });
  }, [fetchData]);

  const playComponent = () => {
    if (!hasStarted) {
      return (
        <WaitingRoom
          roomId={roomId}
          creator={creator}
          players={players}
          setError={setError}
          username={username}
          startGame={startGame}
          setRoomId={setRoomId}
          sendMessage={sendMessage}
          messageList={messageList}
        />
      );
    }
    return (
      <Game
        hints={hints}
        roomId={roomId}
        rounds={rounds}
        players={players}
        username={username}
        sendHint={sendHint}
        roundEnd={roundEnd}
        solvedBy={solvedBy}
        setError={setError}
        fetchData={fetchData}
        sendMessage={sendMessage}
        messageList={messageList}
        currentRound={currentRound}
        passwordHolder={passwordHolder}
        passwordLength={passwordLength}
        currentPassword={currentPassword}
        previousPassword={previousPassword}
      />
    );
  };

  return (
    <Router>
      <Error
        error={error}
        setError={setError}
      />
      <Switch>
        <Route
          exact
          path="/"
          render={
            () => (
              <Home
                roomId={roomId}
                username={username}
                joinRoom={joinRoom}
                setError={setError}
                setRoomId={setRoomId}
                setCreator={setCreator}
                setUsername={setUsername}
                setHasStarted={setHasStarted}
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
        <Route
          path="/about"
        >
          <About />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
