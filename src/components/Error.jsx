import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import propTypes from 'prop-types';

import '../assets/css/Error.css';

function Error(props) {
  const { error, setError } = props;

  const [show, setShow] = useState(error !== '');

  useEffect(() => {
    if (error === 'noRooms') {
      setError('The are no active rooms you can join!');
    } else if (error === 'usernameAlreadyExists') {
      setError('A user with this username already exists in this room.');
    } else if (error === 'gameNotFound') {
      setError('Game with current room-id not found, please refresh the page or visit a valid link.');
    } else if (error === 'serverError') {
      setError('The server ran into an error!');
    } else if (error === 'usernameInvalid') {
      setError('Your username is not valid.');
    } else if (error === 'notEnoughPlayers') {
      setError('Haha loner get some friends.');
    } else if (error === 'notAdmin') {
      setError('Only the room creator can start the game!');
    } else if (error === 'gameEnded') {
      setError('The game has ended!');
    }

    setShow(error);
  }, [error, setError]);

  const handleClose = () => {
    setShow(false);
    setError('');
  };

  if (show) {
    return (
      <Alert variant="danger" className="error" onClose={handleClose} dismissible>
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>
          {error}
        </p>
      </Alert>
    );
  }

  return <></>;
}

Error.propTypes = {
  error: propTypes.string.isRequired,
  setError: propTypes.func.isRequired,
};

export default Error;
