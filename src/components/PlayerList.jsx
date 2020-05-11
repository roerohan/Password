import React from 'react';
import propTypes from 'prop-types';
import {
  Row,
  Col,
} from 'react-bootstrap';

import GameCard from './GameCard';

import '../assets/css/PlayerList.css';

function PlayerList(props) {
  const {
    players,
  } = props;

  const userBox = (username, points, id) => (
    <Row key={id} className="list-row">
      <Col className="m-auto">Av</Col>
      <Col sm="auto" className="user-col m-auto">
        <div className="list-username">{username}</div>
        <div className="list-points">
          Points:
          {' '}
          {points}
        </div>
      </Col>
      <Col className="m-auto">#1</Col>
    </Row>
  );

  return (
    <GameCard className="chat">
      <GameCard.Body className="text-center">
        <div className="player-list">{players.map((player) => userBox(player.username, player.points, player._id))}</div>
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
