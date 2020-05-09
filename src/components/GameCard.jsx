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
    <Card.Body className={`display-card-body ${className}`}>{children}</Card.Body>
  );
}

function GameCard(props) {
  const { children, className } = props;
  return (
    <Card className={`display-card ${className}`}>{children}</Card>
  );
}

const propType = {
  children: propTypes.node,
  className: propTypes.string,
};

const defaultProps = {
  children: <></>,
  className: '',
};

Header.propTypes = propType;
Body.propTypes = propType;
GameCard.propTypes = propType;

Header.defaultProps = defaultProps;
Body.defaultProps = defaultProps;
GameCard.defaultProps = defaultProps;

GameCard.Body = Body;
GameCard.Header = Header;

export default GameCard;
