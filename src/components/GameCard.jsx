import React from 'react';
import { Card } from 'react-bootstrap';
import propTypes from 'prop-types';

import '../assets/css/GameCard.css';

function Header(props) {
  const { children, className } = props;
  return (
    <Card.Header className={className}>{children}</Card.Header>
  );
}

function Body(props) {
  const { children, className } = props;
  return (
    <Card.Body className={className}>{children}</Card.Body>
  );
}

function GameCard(props) {
  const { children, className } = props;
  return (
    <Card className={`display-card ${className}`}>{children}</Card>
  );
}

Header.propTypes = {
  children: propTypes.node.isRequired,
  className: propTypes.string.isRequired,
};

Body.propTypes = {
  children: propTypes.node.isRequired,
  className: propTypes.string.isRequired,
};

GameCard.propTypes = {
  children: propTypes.node.isRequired,
  className: propTypes.string.isRequired,
};

GameCard.Body = Body;
GameCard.Header = Header;

export default GameCard;
