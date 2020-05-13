import React, { useState } from 'react';
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

function Game(props) {
  const {
    username,
    roomId,
    players,
    hints,
    sendMessage,
    sendHint,
    messageList,
  } = props;

  const [hint, setHint] = useState('');

  const handleChange = ({ target }) => setHint(target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = (await API.post('/game/hint', {
      username,
      roomId,
      hint,
    })).data;

    if (response.success) sendHint(response.message.hint, username, roomId);
  };

  return (
    <Container fluid className="lobby-container">
      <Heading />
      <Row className="mt-4">
        <Col md>
          <PlayerList
            players={players}
          />
        </Col>
        <Col md className="mb-4 d-flex flex-column justify-content-center">
          <GameCard>
            <GameCard.Body className="text-center password-card">
              The Password is:
            </GameCard.Body>
          </GameCard>
          <GameCard className="mt-2">
            <GameCard.Body className="d-flex flex-column justify-content-between hint-card">
              <div className="hints">
                <div className="text-center">
                  <div className="hint-pretext">The current hint is:</div>
                  <div className="current-hint mb-2">Bath</div>
                </div>
                <div className="prev-hint-container">
                  <div>
                    The 1st hint was: Washroom
                    {' '}
                    {hints}
                  </div>
                  <div>The 2st hint was: Shower</div>
                </div>
              </div>
              <Form onSubmit={handleSubmit} className="send-hint">
                <Row>
                  <Col>
                    <Form.Control type="text" placeholder="Type the hint here!" value={hint} onChange={handleChange} />
                  </Col>
                  <Col xs="auto">
                    <Button type="submit" variant="success">Send</Button>
                  </Col>
                </Row>
              </Form>
            </GameCard.Body>
          </GameCard>
        </Col>
        <Col>
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
  username: propTypes.string.isRequired,
  roomId: propTypes.string.isRequired,
  hints: propTypes.arrayOf(propTypes.string).isRequired,
  sendHint: propTypes.func.isRequired,
  sendMessage: propTypes.func.isRequired,
  messageList: propTypes.arrayOf(propTypes.shape({
    message: propTypes.string,
    username: propTypes.string,
    time: propTypes.string,
  })).isRequired,
  players: propTypes.arrayOf(propTypes.shape({
    username: propTypes.string,
    points: propTypes.number,
    _id: propTypes.string,
  })).isRequired,
};

export default Game;
