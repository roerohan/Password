import React from 'react';
import {
  Container,
  Row,
  Col,
  Button,
} from 'react-bootstrap';
import propTypes from 'prop-types';

import Heading from './Heading';
import Chat from './Chat';

function Game(props) {
  const {
    username,
    roomId,
    sendMessage,
    messageList,
  } = props;

  return (
    <Container fluid className="lobby-container">
      <Heading />
      <Row className="mt-4">
        <Col md />
        <Col md className="text-center mb-4">
          <Button type="submit" variant="success">Game</Button>
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
  // eslint-disable-next-line react/forbid-prop-types
  messageList: propTypes.array.isRequired,
};

export default Game;
