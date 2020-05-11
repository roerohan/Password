import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Button,
} from 'react-bootstrap';
import propTypes from 'prop-types';

import API from '../API';
import Chat from './Chat';
import Heading from './Heading';

import '../assets/css/WaitingRoom.css';

function WaitingRoom(props) {
  const {
    username,
    roomId,
    setRoomId,
    sendMessage,
    messageList,
    startGame,
  } = props;

  const [currentRoom] = useState(roomId);
  const [connected, setConnected] = useState(false);
  const history = useHistory();

  const { room } = useParams();
  useEffect(() => {
    setRoomId(room);
    if (!currentRoom) {
      history.push('/');
    }
  }, [room, currentRoom, setRoomId, history]);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = (await API.post('/game/start', { roomId, username })).data;
      if (!response.success) {
        console.error(response.message);
        return;
      }

      if (!response.message.hasStarted) {
        return;
      }

      startGame(roomId, username);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Container fluid className="lobby-container">
      <Heading />
      <Row className="mt-4">
        <Col md />
        <Col md className="text-center mb-4">
          <Button type="submit" variant="success" onClick={handleClick}>Start</Button>
        </Col>
        <Col>
          <Chat
            username={username}
            roomId={roomId}
            connected={connected}
            setConnected={setConnected}
            sendMessage={sendMessage}
            messageList={messageList}
          />
        </Col>
      </Row>
    </Container>
  );
}

WaitingRoom.propTypes = {
  username: propTypes.string.isRequired,
  roomId: propTypes.string.isRequired,
  setRoomId: propTypes.func.isRequired,
  sendMessage: propTypes.func.isRequired,
  messageList: propTypes.arrayOf(propTypes.shape({
    message: propTypes.string,
    username: propTypes.string,
    time: propTypes.string,
  })).isRequired,
  startGame: propTypes.func.isRequired,
};

export default WaitingRoom;
