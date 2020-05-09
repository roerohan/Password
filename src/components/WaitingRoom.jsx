import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import propTypes from 'prop-types';

import API from '../API';

function WaitingRoom(props) {
  const {
    username,
    roomId,
    setRoomId,
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

  console.log(username, roomId);
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/room/create');
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button type="submit" onClick={handleClick}>Play</button>
  );
}

WaitingRoom.propTypes = {
  username: propTypes.string.isRequired,
  roomId: propTypes.string.isRequired,
  setRoomId: propTypes.func.isRequired,
};

export default WaitingRoom;
