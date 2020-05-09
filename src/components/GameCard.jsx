import React from 'react';
import { Card } from 'react-bootstrap';
import propTypes from 'prop-types';

import '../assets/css/GameCard.css';

function Header(props) {
  const { children } = props;
  return (
    <Card.Header>{children}</Card.Header>
  );
}

function Body(props) {
  const { children } = props;
  return (
    <Card.Body>{children}</Card.Body>
  );
}

function GameCard(props) {
  const { children } = props;
  console.log(children);
  return (
    <Card className="display-card">{children}</Card>
  );
}

Header.propTypes = {
  children: propTypes.node.isRequired,
};

Body.propTypes = {
  children: propTypes.node.isRequired,
};

GameCard.propTypes = {
  children: propTypes.node.isRequired,
};

GameCard.Body = Body;
GameCard.Header = Header;

export default GameCard;
