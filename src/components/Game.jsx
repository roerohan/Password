import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
} from 'react-bootstrap';
import propTypes from 'prop-types';

import Heading from './Heading';
import Chat from './Chat';
import PlayerList from './PlayerList';
import GameCard from './GameCard';
import API from '../API';

import '../assets/css/Game.css';
import Timer from './Timer';

function Game(props) {
  const {
    hints,
    roomId,
    rounds,
    players,
    username,
    sendHint,
    setError,
    roundEnd,
    solvedBy,
    fetchData,
    sendMessage,
    messageList,
    currentRound,
    passwordHolder,
    passwordLength,
    currentPassword,
    previousPassword,
  } = props;

  const [hint, setHint] = useState('');

  useEffect(() => {
    const fetch = async () => { await fetchData(); };
    fetch();
  }, [fetchData]);

  useEffect(() => {
    if (solvedBy.length !== players.length - 1) return;
    const fetch = async () => { await fetchData(); };
    fetch();
  }, [solvedBy, fetchData, players]);

  useEffect(() => {
    const timeOut = setTimeout(async () => {
      await fetchData();
    }, roundEnd - new Date().getTime());

    return () => clearTimeout(timeOut);
  }, [fetchData, roundEnd]);

  useEffect(() => {
    console.log(hints, previousPassword);
  }, [hints, previousPassword]);

  const handleChange = ({ target }) => setHint(target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = (await API.post('/game/hint', {
      username,
      roomId,
      hint,
    })).data;

    if (!response.success) {
      console.error(response.message);
      setError(response.message);
      return;
    }

    sendHint(response.message.hints, roomId, username);
    setHint('');
  };

  const renderBlanks = () => {
    if (currentPassword) {
      return (
        <div className="current-password">
          {currentPassword}
        </div>
      );
    }
    const blanks = new Array(passwordLength).fill(
      '_ ',
    );
    return blanks.map((blank) => blank);
  };

  const renderPreiviousHints = () => (hints.map((h, index) => (
    <div key={Math.random().toString()}>
      Hint
      {' '}
      {index + 1}
      :
      {' '}
      {h}
    </div>
  ))
  );

  return (
    <Container fluid className="game-container">
      <Heading />
      <Row className="mt-4">
        <Col md>
          <PlayerList
            players={players}
          />
        </Col>
        <Col md className="d-flex flex-column justify-content-center">
          <GameCard>
            <GameCard.Body className="text-center password-card">
              <div>The Password is:</div>
              <div className="blanks">{renderBlanks()}</div>
            </GameCard.Body>
          </GameCard>
          <GameCard className="mt-2">
            <GameCard.Body className="d-flex flex-column justify-content-between hint-card">
              <div className="hints">
                <div className="text-center">
                  <div className="hint-pretext">The current hint is:</div>
                  <div className="current-hint mb-2">{hints.slice(-1)[0]}</div>
                </div>
                <div className="prev-hint-container">
                  {renderPreiviousHints()}
                </div>
              </div>
              <Form onSubmit={handleSubmit} className="send-hint">
                <Row>
                  <Col>
                    <Form.Control
                      type="text"
                      disabled={username !== passwordHolder}
                      placeholder="Type the hint here!"
                      value={hint}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col xs="auto">
                    <Button type="submit" variant="success">Send</Button>
                  </Col>
                </Row>
              </Form>
            </GameCard.Body>
          </GameCard>
          <Timer
            className="mt-4 w-75 mx-auto"
            roundEnd={roundEnd}
            rounds={rounds}
            currentRound={currentRound}
          />
        </Col>
        <Col className="game-chat">
          <Chat
            sendMessage={sendMessage}
            messageList={messageList}
          />
        </Col>
      </Row>
    </Container>
  );
}

Game.propTypes = {
  roomId: propTypes.string.isRequired,
  username: propTypes.string.isRequired,
  passwordHolder: propTypes.string.isRequired,
  currentPassword: propTypes.string.isRequired,
  previousPassword: propTypes.string.isRequired,

  rounds: propTypes.number.isRequired,
  roundEnd: propTypes.number.isRequired,
  currentRound: propTypes.number.isRequired,
  passwordLength: propTypes.number.isRequired,

  sendHint: propTypes.func.isRequired,
  setError: propTypes.func.isRequired,
  fetchData: propTypes.func.isRequired,
  sendMessage: propTypes.func.isRequired,

  hints: propTypes.arrayOf(propTypes.string).isRequired,
  solvedBy: propTypes.arrayOf(propTypes.string).isRequired,

  messageList: propTypes.arrayOf(propTypes.shape({
    time: propTypes.string,
    message: propTypes.string,
    username: propTypes.string,
  })).isRequired,
  players: propTypes.arrayOf(propTypes.shape({
    _id: propTypes.string,
    username: propTypes.string,
    points: propTypes.number,
  })).isRequired,
};

export default Game;
