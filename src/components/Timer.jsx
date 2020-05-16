import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStopwatch } from '@fortawesome/free-solid-svg-icons';
import propTypes from 'prop-types';

import GameCard from './GameCard';

import '../assets/css/Timer.css';

function Timer(props) {
  const { roundEnd, currentRound, className } = props;

  const calculateTimeLeft = () => {
    const timeLeft = Math.floor((roundEnd - new Date().getTime()) / 1000);
    if (timeLeft < 0) return 0;
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timeOut);
  });

  return (
    <GameCard className={className}>
      <GameCard.Body className="timer text-center d-flex justify-content-center">
        <div className="left-timer py-2">
          <FontAwesomeIcon icon={faStopwatch} />
          {' '}
          {timeLeft}
          s
        </div>
        <div className="right-rounds py-2">
          Round
          {' '}
          {currentRound}
          {' '}
          of 3
        </div>
      </GameCard.Body>
    </GameCard>
  );
}

Timer.defaultProps = {
  className: '',
};

Timer.propTypes = {
  roundEnd: propTypes.number.isRequired,
  currentRound: propTypes.number.isRequired,
  className: propTypes.string,
};

export default Timer;
