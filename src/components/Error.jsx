import React, { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-bootstrap';
import propTypes from 'prop-types';

import '../assets/css/Error.css';

function Error(props) {
  const { error, setError } = props;

  const [show, setShow] = useState(error !== '');

  const handleClose = useCallback(() => {
    setShow(false);
    setError('');
  }, [setError]);

  useEffect(() => {
    if (error === 'noRooms') {
      setError('The are no active rooms that you can join!');
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
    } else if (error === 'hintInvalid') {
      setError('The hint you entered is not valid. Note: The password can\'t be in the hint.');
    } else if (error === 'gameEnded') {
      setError('The game has ended!');
    }

    setShow(error);

    const escapeListener = (event) => { if (event.keyCode === 27) handleClose(); };
    document.addEventListener('keydown', escapeListener, false);

    return () => { document.removeEventListener('keydown', escapeListener, false); };
  }, [error, setError, handleClose]);

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
