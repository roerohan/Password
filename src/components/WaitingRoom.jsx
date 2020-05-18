import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Button,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard } from '@fortawesome/free-regular-svg-icons';
import propTypes from 'prop-types';

import API from '../API';
import Chat from './Chat';
import Heading from './Heading';
import PlayerList from './PlayerList';
import Settings from './Settings';

import '../assets/css/WaitingRoom.css';
import GameCard from './GameCard';

function WaitingRoom(props) {
  const {
    roomId,
    players,
    setError,
    username,
    setRoomId,
    startGame,
    sendMessage,
    messageList,
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

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = (await API.post('/game/start', { roomId, username, rounds })).data;
      if (!response.success) {
        console.error(response.message);
        setError(response.message);
        return;
      }

      if (!response.message.hasStarted) {
        return;
      }

      startGame(roomId, username);
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  const copyToClipboard = () => {
    const link = document.getElementById('copy-link');
    link.select();
    link.setSelectionRange(0, 99999);
    document.execCommand('copy');
    console.log('Copied!');
  };

  return (
    <Container fluid className="lobby-container">
      <Heading />
      <div className="text-center subtitle mt-3">Send this link to your friends!</div>
      <GameCard className="mt-2">
        <GameCard.Body className="p-0 text-center">
          <button
            type="button"
            className="copy-button p-2"
            onClick={copyToClipboard}
          >
            <input type="text" className="text-center" id="copy-link" readOnly value={window.location.href} />
            <FontAwesomeIcon icon={faClipboard} size="1x" className="copy-icon" />
          </button>
        </GameCard.Body>
      </GameCard>
      <Row className="mt-2">
        <Col md className="lobby-players">
          <PlayerList
            header="Joined"
            players={players}
            footer={
              <Button type="submit" variant="success" onClick={handleClick}>Play</Button>
            }
          />
        </Col>
        <Col className="d-flex flex-column lobby-right">
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
  roomId: propTypes.string.isRequired,
  username: propTypes.string.isRequired,

  setError: propTypes.func.isRequired,
  setRoomId: propTypes.func.isRequired,
  startGame: propTypes.func.isRequired,
  sendMessage: propTypes.func.isRequired,

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

export default WaitingRoom;
