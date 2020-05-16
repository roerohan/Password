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
import PlayerList from './PlayerList';
import Settings from './Settings';

import '../assets/css/WaitingRoom.css';

function WaitingRoom(props) {
  const {
    username,
    roomId,
    players,
    setRoomId,
    sendMessage,
    messageList,
    startGame,
  } = props;

  const [currentRoom] = useState(roomId);
  const history = useHistory();

  const { room } = useParams();
  useEffect(() => {
    setRoomId(room);
    if (!currentRoom) {
      history.push('/');
    }
  }, [room, currentRoom, setRoomId, history]);

  const [rounds, setRounds] = useState(3);
  console.log(rounds);
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = (await API.post('/game/start', { roomId, username, rounds })).data;
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
        <Col md className="lobby-players">
          <PlayerList
            header="Joined"
            players={players}
            footer={
              <Button type="submit" variant="success" onClick={handleClick}>Play</Button>
            }
          />
        </Col>
        <Col className="d-flex flex-column">
          <Settings
            setRounds={setRounds}
          />
          <Chat
            className="lobby-chat"
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
  players: propTypes.arrayOf(propTypes.shape({
    username: propTypes.string,
    points: propTypes.number,
    _id: propTypes.string,
  })).isRequired,
  startGame: propTypes.func.isRequired,
};

export default WaitingRoom;
