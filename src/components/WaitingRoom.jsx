import React from 'react';
import API from '../API';

function WaitingRoom() {
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

export default WaitingRoom;
