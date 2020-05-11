import React from 'react';
import propTypes from 'prop-types';

import GameCard from './GameCard';

function PlayerList(props) {
  const {
    players,
  } = props;

  return (
    <GameCard className="chat">
      <GameCard.Body className="d-flex flex-column justify-content-between">
        {
          players.map((player) => player.username)
        }
      </GameCard.Body>
    </GameCard>
  );
}

PlayerList.propTypes = {
  players: propTypes.arrayOf(propTypes.shape({
    username: propTypes.string,
    points: propTypes.number,
    _id: propTypes.string,
  })).isRequired,
};

export default PlayerList;
