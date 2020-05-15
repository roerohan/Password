import React from 'react';
import propTypes from 'prop-types';
import {
  Row,
  Col,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';

import GameCard from './GameCard';

import '../assets/css/PlayerList.css';

function PlayerList(props) {
  const {
    players,
    header,
  } = props;

  const userBox = (username, points, id) => (
    <Row key={id} className="list-row py-2">
      <Col className="m-auto"><FontAwesomeIcon icon={faUserCircle} size="3x" /></Col>
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

  const renderHeader = () => {
    if (!header) {
      return <></>;
    }

    return <GameCard.Header className="text-center playerlist-header">{header}</GameCard.Header>;
  };

  return (
    <GameCard className="chat">
      {renderHeader()}
      <GameCard.Body className="text-center">
        <div className="player-list">{players.map((player) => userBox(player.username, player.points, player._id))}</div>
      </GameCard.Body>
    </GameCard>
  );
}

PlayerList.defaultProps = {
  header: '',
};

PlayerList.propTypes = {
  players: propTypes.arrayOf(propTypes.shape({
    username: propTypes.string,
    points: propTypes.number,
    _id: propTypes.string,
  })).isRequired,
  header: propTypes.string,
};

export default PlayerList;
