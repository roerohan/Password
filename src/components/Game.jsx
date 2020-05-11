import React from 'react';
import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import propTypes from 'prop-types';

import Heading from './Heading';
import Chat from './Chat';
import PlayerList from './PlayerList';
import GameCard from './GameCard';

function Game(props) {
  const {
    username,
    roomId,
    players,
    sendMessage,
    messageList,
  } = props;

  return (
    <Container fluid className="lobby-container">
      <Heading />
      <Row className="mt-4">
        <Col md>
          <PlayerList
            players={players}
          />
        </Col>
        <Col md className="text-center mb-4">
          <GameCard>
            <GameCard.Body>
              HelloWorld
            </GameCard.Body>
          </GameCard>
          <div>
            {username}
            ,
            {' '}
            {roomId}

          </div>
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
