import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  Container,
} from 'react-bootstrap';
import propTypes from 'prop-types';

import API from '../API';
import Chat from './Chat';

function WaitingRoom(props) {
  const {
    username,
    roomId,
    setRoomId,
    sendMessage,
    messageList,
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

  console.log(username, roomId);
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/game/start');
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <Chat
        username={username}
        roomId={roomId}
        connected={connected}
        setConnected={setConnected}
        sendMessage={sendMessage}
        messageList={messageList}
      />
      <button type="submit" onClick={handleClick}>Play</button>
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
};

export default WaitingRoom;
