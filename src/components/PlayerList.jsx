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
    footer,
  } = props;

  const userBox = (username, points, index, id) => (
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
      <Col className="m-auto rank">
        #
        {index + 1}
      </Col>
    </Row>
  );

  const renderHeader = () => {
    if (!header) {
      return <></>;
    }

    return <GameCard.Header className="text-center playerlist-header">{header}</GameCard.Header>;
  };

  const renderFooter = () => {
    if (!footer) {
      return <></>;
    }

    return <GameCard.Footer className="text-center playerlist-footer">{footer}</GameCard.Footer>;
  };

  return (
    <GameCard className="chat">
      {renderHeader()}
      <GameCard.Body className="text-center py-0">
        <div className="player-list">{players.map((player, index) => userBox(player.username, player.points, index, player._id))}</div>
      </GameCard.Body>
      {renderFooter()}
    </GameCard>
  );
}

PlayerList.defaultProps = {
  header: '',
  footer: <></>,
};

PlayerList.propTypes = {
  players: propTypes.arrayOf(propTypes.shape({
    _id: propTypes.string,
    username: propTypes.string,
    points: propTypes.number,
  })).isRequired,

  header: propTypes.string,
  footer: propTypes.node,
};

export default PlayerList;
