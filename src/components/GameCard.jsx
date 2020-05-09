import React from 'react';
import { Card } from 'react-bootstrap';
import propTypes from 'prop-types';

import '../assets/css/GameCard.css';

function Title(props) {
  const { children } = props;
  return (
    <Card.Title>{children}</Card.Title>
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

Title.propTypes = {
  children: propTypes.node.isRequired,
};

Body.propTypes = {
  children: propTypes.node.isRequired,
};

GameCard.propTypes = {
  children: propTypes.node.isRequired,
};

GameCard.Body = Body;
GameCard.Title = Title;

export default GameCard;
